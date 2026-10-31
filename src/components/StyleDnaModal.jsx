import React from 'react';
import { X, Zap, CheckCircle2, ShieldAlert, Sparkles, FileText, Activity } from 'lucide-react';
import { BANNED_AI_WORDS } from '../data/sampleDataset';

export default function StyleDnaModal({ isOpen, onClose, styleDna, profileName, samplePosts }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 text-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Voice DNA & Style Inspector</h3>
              <p className="text-xs text-slate-400">Extracted metrics for: {profileName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-5">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Sentence Cadence</span>
            <span className="text-base font-bold text-indigo-400 font-mono">
              ~{styleDna?.avgWordsPerSentence || 10} words/sentence
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              Staccato Index: {styleDna?.staccatoScore || 7}/10
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Opening Hook Style</span>
            <span className="text-xs font-bold text-emerald-400 line-clamp-1">
              {styleDna?.dominantHook || 'Direct Failure Opening'}
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">In media res grab</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Emoji Density</span>
            <span className="text-xs font-bold text-cyan-400">
              {styleDna?.emojiProfile || 'Near Zero'}
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Avoids AI emoji-spam</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Pronoun Register</span>
            <span className="text-base font-bold text-white font-mono">
              {styleDna?.firstPersonRatio || 8}% 1st Person
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Candid & human</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Structural Spacing</span>
            <span className="text-xs font-bold text-amber-400">High White Space</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Rapid eye scanning</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Exemplars In Memory</span>
            <span className="text-base font-bold text-white font-mono">
              {samplePosts?.length || 2} Posts
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Few-shot grounded</span>
          </div>
        </div>

        {/* Banned AI Sludge Blacklist */}
        <div className="mb-5 p-4 rounded-xl bg-slate-950/80 border border-rose-900/40">
          <div className="flex items-center gap-2 mb-2 text-rose-400 text-xs font-bold">
            <ShieldAlert className="w-4 h-4" />
            <span>Strict Anti-AI Sludge Blacklist (Automatically Stripped)</span>
          </div>
          <p className="text-[11px] text-slate-400 mb-3">
            To guarantee distinctive content, the engine permanently suppresses generic corporate buzzwords that plague typical AI posts:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {BANNED_AI_WORDS.slice(0, 16).map((word) => (
              <span
                key={word}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/10 text-rose-300 border border-rose-500/20 line-through opacity-85"
              >
                {word}
              </span>
            ))}
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400">
              +{BANNED_AI_WORDS.length - 16} more
            </span>
          </div>
        </div>

        {/* Exemplar Preview */}
        {samplePosts && samplePosts.length > 0 && (
          <div>
            <span className="text-xs font-bold text-slate-300 block mb-2">
              Primary Golden Exemplar (Few-Shot Grounding):
            </span>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono whitespace-pre-wrap max-h-36 overflow-y-auto">
              {samplePosts[0]}
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="btn-secondary">
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
