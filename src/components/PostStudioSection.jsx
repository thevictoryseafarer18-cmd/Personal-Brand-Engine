import React, { useState } from 'react';
import { Copy, Check, Sparkles, Wand2, RefreshCw, AlertTriangle, ShieldCheck, Clock, Type, ArrowRight, Eye, Edit3 } from 'lucide-react';
import LinkedInPreviewCard from './LinkedInPreviewCard';
import { refineContent } from '../engine/contentGenerator';
import { auditContentAuthenticity } from '../engine/styleAnalyzer';
import confetti from 'canvas-confetti';

export default function PostStudioSection({
  generatedPosts,
  activeFormatIndex,
  onSelectFormat,
  onUpdatePostContent,
  author
}) {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'edit_only' | 'preview_only'

  if (!generatedPosts || generatedPosts.length === 0) {
    return null;
  }

  const currentPost = generatedPosts[activeFormatIndex] || generatedPosts[0];
  const audit = auditContentAuthenticity(currentPost.content);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentPost.content);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    setTimeout(() => setCopied(false), 2200);
  };

  const handleRefine = (type) => {
    const refined = refineContent(currentPost.content, type);
    onUpdatePostContent(activeFormatIndex, refined);
  };

  const handleCycleHook = () => {
    if (!currentPost.hooks || currentPost.hooks.length === 0) return;
    const lines = currentPost.content.split('\n');
    const randomHook = currentPost.hooks[Math.floor(Math.random() * currentPost.hooks.length)];
    // Replace the first line with the alternative hook
    lines[0] = randomHook;
    onUpdatePostContent(activeFormatIndex, lines.join('\n'));
  };

  return (
    <div className="glass-panel p-5 mb-8">
      {/* Studio Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center border border-emerald-500/30">
              3
            </span>
            <h2 className="text-base font-bold text-white tracking-tight">
              Distinctive Content Studio & Real-time LinkedIn Preview
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            4 unique angles synthesized in your voice. Edit in-place, refine the tone, or test the feed fold.
          </p>
        </div>

        {/* View Layout Controls & Copy CTA */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-900 border border-slate-800 p-1 rounded-lg flex items-center text-xs">
            <button
              onClick={() => setViewMode('split')}
              className={`px-2.5 py-1 rounded font-medium transition ${
                viewMode === 'split' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Side-by-Side
            </button>
            <button
              onClick={() => setViewMode('edit_only')}
              className={`px-2.5 py-1 rounded font-medium transition ${
                viewMode === 'edit_only' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Editor Only
            </button>
            <button
              onClick={() => setViewMode('preview_only')}
              className={`px-2.5 py-1 rounded font-medium transition ${
                viewMode === 'preview_only' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              LinkedIn Card
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-md shadow-emerald-600/20"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Post</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Format Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-thin">
        {generatedPosts.map((post, index) => {
          const isActive = index === activeFormatIndex;
          return (
            <button
              key={post.id}
              onClick={() => onSelectFormat(index)}
              className={`px-3 py-2 rounded-xl text-left transition border whitespace-nowrap flex-shrink-0 ${
                isActive
                  ? 'bg-indigo-950/80 border-indigo-500 text-white shadow-sm ring-1 ring-indigo-500'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold flex items-center gap-1.5">
                <span>{post.title}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">{post.archetype}</div>
            </button>
          );
        })}
      </div>

      {/* Authenticity & Distinctiveness Audit Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-md ${audit.score >= 90 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400">Authenticity Score</div>
            <div className="font-bold text-white font-mono">{audit.score}% Distinctive</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-indigo-500/20 text-indigo-400">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400">Est. Read Time</div>
            <div className="font-bold text-white font-mono">{audit.readTimeMinutes} min</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-cyan-500/20 text-cyan-400">
            <Type className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400">Length</div>
            <div className="font-bold text-white font-mono">
              {audit.wordCount} words ({audit.charCount} chars)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-md ${audit.flaggedTerms.length === 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400">Generic AI Clichés</div>
            <div className="font-bold text-white font-mono">
              {audit.flaggedTerms.length === 0 ? '0 (Zero fluff)' : `${audit.flaggedTerms.length} detected`}
            </div>
          </div>
        </div>
      </div>

      {/* Voice Tuning Action Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-4 p-2.5 rounded-xl bg-slate-900/40 border border-slate-800">
        <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 mr-1">
          <Wand2 className="w-3.5 h-3.5 text-indigo-400" />
          Voice Tuners:
        </span>

        <button
          onClick={() => handleRefine('more_punchy')}
          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition"
        >
          ⚡ Make It Punchier
        </button>

        <button
          onClick={() => handleRefine('more_vulnerable')}
          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition"
        >
          🛡️ Add Vulnerability & Stakes
        </button>

        <button
          onClick={() => handleRefine('more_tactical')}
          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition"
        >
          📋 Make It Tactical Rules
        </button>

        <button
          onClick={handleCycleHook}
          className="px-2.5 py-1 rounded bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 hover:text-white border border-indigo-700/60 text-xs font-medium transition flex items-center gap-1 ml-auto"
        >
          <RefreshCw className="w-3 h-3 text-indigo-400" />
          <span>Alternate Hook</span>
        </button>
      </div>

      {/* Main Workspace Area (Split / Editor / Preview) */}
      <div className={`grid gap-5 ${viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        {/* In-Place Editor */}
        {(viewMode === 'split' || viewMode === 'edit_only') && (
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
                Live In-Place Editor
              </span>
              <span className="text-[11px] text-slate-500">Edit directly to add personal specifics</span>
            </div>

            <textarea
              value={currentPost.content}
              onChange={(e) => onUpdatePostContent(activeFormatIndex, e.target.value)}
              rows={14}
              className="w-full h-full min-h-[340px] bg-slate-950 border border-slate-800 rounded-xl p-4 text-[13px] leading-relaxed text-slate-200 focus:outline-none focus:border-indigo-500 font-sans transition"
            />
          </div>
        )}

        {/* Live LinkedIn Card Preview */}
        {(viewMode === 'split' || viewMode === 'preview_only') && (
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                LinkedIn Live Preview
              </span>
              <span className="text-[11px] text-slate-500">Feed simulation with fold check</span>
            </div>

            <LinkedInPreviewCard
              postText={currentPost.content}
              author={author}
              archetypeTitle={currentPost.archetype}
            />
          </div>
        )}
      </div>
    </div>
  );
}
