import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Repeat2, Send, Globe, MoreHorizontal, Eye, ChevronDown } from 'lucide-react';

export default function LinkedInPreviewCard({ postText, author, archetypeTitle }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Split lines to detect where the LinkedIn fold line falls (~3-4 lines)
  const lines = (postText || '').split('\n').filter(Boolean);
  const foldLines = lines.slice(0, 3).join('\n');
  const hasMore = lines.length > 3;

  return (
    <div className="linkedin-dark-card p-4 sm:p-5 text-slate-100 flex flex-col justify-between">
      <div>
        {/* Card Header: Profile Info */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <img
              src={author.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={author.name}
              className="w-11 h-11 rounded-full object-cover border border-slate-700 ring-2 ring-indigo-500/30"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-white hover:text-indigo-400 transition cursor-pointer">
                  {author.name}
                </span>
                <span className="text-slate-400 text-xs">• 1st</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight line-clamp-1 max-w-[260px] sm:max-w-md">
                {author.headline || author.role}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                <span>1h • Edited •</span>
                <Globe className="w-3 h-3 text-slate-500 inline" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 hidden sm:inline-block">
              {archetypeTitle}
            </span>
            <button className="p-1 text-slate-400 hover:text-white rounded">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Post Text Body with LinkedIn Feed Simulation */}
        <div className="text-[13px] leading-relaxed text-slate-200 whitespace-pre-wrap font-sans my-3 select-text">
          {!isExpanded && hasMore ? (
            <>
              <div>{foldLines}</div>
              <button
                onClick={() => setIsExpanded(true)}
                className="text-slate-400 hover:text-white font-medium text-xs mt-1 transition cursor-pointer underline flex items-center gap-1"
              >
                ...see more
              </button>
            </>
          ) : (
            <div>{postText}</div>
          )}
        </div>

        {/* Fold Cutoff Guide Alert */}
        {hasMore && (
          <div className="my-2 px-3 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-900/40 flex items-center justify-between text-[11px] text-indigo-300">
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-indigo-400" />
              <span>Fold check: Scrollers decide in lines 1-3 whether to click "...see more"</span>
            </span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 hover:text-indigo-200 ml-2"
            >
              {isExpanded ? 'Fold Preview' : 'Expand Full'}
            </button>
          </div>
        )}
      </div>

      {/* Social Reaction Counts & Action Bar */}
      <div className="mt-4 pt-3 border-t border-slate-800">
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3 px-1">
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-1">
              <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-[9px] text-white">👍</div>
              <div className="w-4 h-4 rounded-full bg-emerald-600 flex items-center justify-center text-[9px] text-white">💡</div>
              <div className="w-4 h-4 rounded-full bg-rose-600 flex items-center justify-center text-[9px] text-white">❤️</div>
            </div>
            <span>142 reactions</span>
          </div>
          <span>38 comments • 12 reposts</span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-4 gap-1 text-slate-400 text-xs font-semibold border-t border-slate-800/80 pt-2">
          <button className="flex items-center justify-center gap-1.5 py-1.5 rounded hover:bg-slate-800 transition text-slate-300 hover:text-white">
            <ThumbsUp className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Like</span>
          </button>
          <button className="flex items-center justify-center gap-1.5 py-1.5 rounded hover:bg-slate-800 transition text-slate-300 hover:text-white">
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Comment</span>
          </button>
          <button className="flex items-center justify-center gap-1.5 py-1.5 rounded hover:bg-slate-800 transition text-slate-300 hover:text-white">
            <Repeat2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Repost</span>
          </button>
          <button className="flex items-center justify-center gap-1.5 py-1.5 rounded hover:bg-slate-800 transition text-slate-300 hover:text-white">
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
