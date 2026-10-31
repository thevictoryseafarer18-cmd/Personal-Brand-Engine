import React, { useState } from 'react';
import { X, User, Key, Check, Cpu, Cloud, ShieldCheck } from 'lucide-react';

export default function SettingsModal({
  isOpen,
  onClose,
  author,
  onUpdateAuthor,
  llmConfig,
  onUpdateLlmConfig
}) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({ ...author });
  const [apiKey, setApiKey] = useState(llmConfig?.apiKey || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onUpdateAuthor(formData);
    onUpdateLlmConfig({
      ...llmConfig,
      apiKey: apiKey.trim()
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 text-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Engine & Profile Settings</h3>
              <p className="text-xs text-slate-400">Customize author details and generation engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Details */}
        <div className="space-y-4 my-5">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Author Display Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-sans"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              LinkedIn Professional Headline
            </label>
            <input
              type="text"
              value={formData.headline}
              onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-sans"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Profile Avatar Image URL
            </label>
            <input
              type="text"
              value={formData.avatar}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-sans"
            />
          </div>

          {/* Engine Mode */}
          <div className="pt-3 border-t border-slate-800">
            <span className="text-xs font-semibold text-slate-300 block mb-2">
              Generation Engine Mode
            </span>

            <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-700/50 mb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 mb-1">
                <Cpu className="w-4 h-4 text-indigo-400" />
                <span>Deterministic Semantic Style Engine (Active)</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Runs 100% locally in the browser with zero external dependencies, 0ms latency, and hardcoded anti-AI anti-fluff filters.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300 mb-1">
                <Cloud className="w-4 h-4 text-slate-400" />
                <span>Optional Cloud LLM API Key (Gemini / OpenAI)</span>
              </div>
              <p className="text-[11px] text-slate-500 mb-2">
                Leave blank to use the built-in instant local engine, or provide an API key for live external inference.
              </p>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy... or sk-..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Settings saved in local state</span>
          </div>

          <div className="flex gap-2">
            <button onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button onClick={handleSave} className="btn-primary">
              {saved ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Changes</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
