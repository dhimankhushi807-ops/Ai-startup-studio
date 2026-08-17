import React, { useState } from 'react';
import { X, Share2, Copy, Check, ExternalLink, Code, Info } from 'lucide-react';
import { StartupProject } from '../../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: StartupProject;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, project }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  if (!isOpen) return null;

  const shareUrl = `${window.location.origin}/share/${project.id}`;
  const embedCode = `<iframe src="${shareUrl}" width="100%" height="700" frameborder="0"></iframe>`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        id="share-project-modal"
        className="w-full max-w-lg bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 relative"
      >
        <button
          id="close-share-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Share2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white font-display">
              Share {project.concept?.startupName || project.name}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Read-only venture blueprint & presentation view
            </p>
          </div>
        </div>

        {/* Info notice explaining offline/local nature as specified in prompt requirement #13 */}
        <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-800 dark:text-amber-300 mb-4 leading-relaxed">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Local Architecture Note:</span> This link loads the saved project from this browser session/device. For permanent cloud sharing across devices, use the <strong>Export PDF</strong> or <strong>JSON Backup</strong> feature in Settings.
          </div>
        </div>

        <div className="space-y-4">
          {/* Direct Link */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Direct Project URL
            </label>
            <div className="flex items-center gap-2">
              <input
                id="share-link-input"
                type="text"
                readOnly
                value={shareUrl}
                className="w-full px-3 py-2 rounded-xl text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 font-mono truncate focus:outline-none"
              />
              <button
                id="copy-share-link-btn"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shrink-0 transition-all"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Embed snippet */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Embed HTML Snippet
            </label>
            <div className="flex items-center gap-2">
              <input
                id="share-embed-input"
                type="text"
                readOnly
                value={embedCode}
                className="w-full px-3 py-2 rounded-xl text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 font-mono truncate focus:outline-none"
              />
              <button
                id="copy-share-embed-btn"
                onClick={handleCopyEmbed}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 shrink-0 transition-all"
              >
                {copiedEmbed ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Code className="w-3.5 h-3.5" />}
                <span>{copiedEmbed ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
          </div>

          {/* Quick Preview Button */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <a
              id="open-share-preview-link"
              href={`/share/${project.id}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
            >
              <span>Open Share Preview</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
