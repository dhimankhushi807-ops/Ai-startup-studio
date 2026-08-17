import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Server-side Gemini API client lazy getter
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health & Status endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  const hasKey = !!process.env.GEMINI_API_KEY;
  res.json({
    status: "ok",
    appName: "AI Startup Studio",
    aiConfigured: hasKey,
    timestamp: new Date().toISOString(),
  });
});

// Generation endpoint
app.post("/api/gemini/generate", async (req: Request, res: Response) => {
  try {
    const { systemInstruction, prompt, schema, temperature } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        error: "GEMINI_API_KEY is not configured on the server. Please check Settings > Secrets in AI Studio.",
        code: "KEY_MISSING",
      });
    }

    const config: any = {
      temperature: typeof temperature === "number" ? temperature : 0.7,
      responseMimeType: "application/json",
    };

    if (systemInstruction) {
      config.systemInstruction = systemInstruction;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config,
    });

    const rawText = response.text || "{}";
    
    // Parse JSON safely
    let parsedData;
    try {
      // Strip markdown backticks if model wrapped JSON in ```json ... ```
      const cleaned = rawText.replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();
      parsedData = JSON.parse(cleaned);
    } catch (e) {
      parsedData = { raw: rawText };
    }

    return res.json({
      success: true,
      data: parsedData,
      raw: rawText,
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({
      error: error.message || "Failed to generate content via Gemini API",
      details: error.toString(),
    });
  }
});

// Vite middleware or static serving
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AI Startup Studio running at http://0.0.0.0:${PORT}`);
  });
}

setupVite();
