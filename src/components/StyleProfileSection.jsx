import React, { useState } from 'react';
import { SAMPLE_PROFILES } from '../data/sampleDataset';
import { User, Sparkles, Feather, Sliders, Plus, Check, AlertCircle } from 'lucide-react';

export default function StyleProfileSection({
  selectedProfile,
  onSelectProfile,
  customPosts,
  onUpdateCustomPosts,
  styleDna,
  isCustom,
  setIsCustom
}) {
  const [activeCustomTab, setActiveCustomTab] = useState(0);

  return (
    <div className="glass-panel p-5 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-xs flex items-center justify-center border border-indigo-500/30">
              1
            </span>
            <h2 className="text-base font-bold text-white tracking-tight">
              Establish Your Writing Voice (Style Profile)
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            The engine analyzes cadence, vocabulary, and formatting habits from real posts so the output sounds like you.
          </p>
        </div>

        {/* Style DNA Live Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="px-2.5 py-1 rounded-md bg-indigo-950/80 border border-indigo-700/50 text-indigo-300 flex items-center gap-1.5">
            <span className="text-slate-400">Rhythm:</span>
            <span className="font-semibold">{styleDna?.avgWordsPerSentence || 9} words/sentence</span>
          </div>
          <div className="px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 flex items-center gap-1.5">
            <span className="text-slate-400">Hook:</span>
            <span className="font-semibold">{styleDna?.dominantHook?.split(' ')[1] || 'Direct'}</span>
          </div>
          <div className="px-2.5 py-1 rounded-md bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 flex items-center gap-1.5">
            <span className="text-slate-400">Emojis:</span>
            <span className="font-semibold">{styleDna?.emojiProfile?.split(' ')[0] || 'Near Zero'}</span>
          </div>
        </div>
      </div>

      {/* Profile Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {SAMPLE_PROFILES.map((profile) => {
          const isSelected = !isCustom && selectedProfile.id === profile.id;
          return (
            <div
              key={profile.id}
              onClick={() => {
                setIsCustom(false);
                onSelectProfile(profile);
              }}
              className={`p-3.5 rounded-xl cursor-pointer transition-all border text-left relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-950/50 border-indigo-500 shadow-md shadow-indigo-500/10 ring-1 ring-indigo-500'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-8 h-8 rounded-full object-cover border border-slate-700"
                    />
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1">
                        {profile.name}
                        {isSelected && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">{profile.role}</div>
                    </div>
                  </div>
                </div>

                <div className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-indigo-300 border border-slate-700/60 mb-2">
                  {profile.vibeTag}
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {profile.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/70 flex items-center justify-between text-[10px] text-slate-400">
                <span>{profile.samplePosts.length} sample posts</span>
                <span className="text-indigo-400 font-medium">Click to select</span>
              </div>
            </div>
          );
        })}

        {/* Custom Persona Card */}
        <div
          onClick={() => setIsCustom(true)}
          className={`p-3.5 rounded-xl cursor-pointer transition-all border text-left relative flex flex-col justify-between ${
            isCustom
              ? 'bg-indigo-950/50 border-indigo-500 shadow-md shadow-indigo-500/10 ring-1 ring-indigo-500'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
          }`}
        >
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                <Sliders className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1">
                  Custom Voice
                  {isCustom && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                </div>
                <div className="text-[11px] text-slate-400">Train on your posts</div>
              </div>
            </div>

            <div className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20 mb-2">
              Personalized DNA
            </div>

            <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
              Paste 1 to 3 of your own highest-performing posts to extract your unique cadence.
            </p>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-800/70 flex items-center justify-between text-[10px] text-slate-400">
            <span>{customPosts.filter(p => p.trim()).length} posts loaded</span>
            <span className="text-amber-400 font-medium">{isCustom ? 'Active' : 'Configure'}</span>
          </div>
        </div>
      </div>

      {/* Custom Post Input Box if Custom selected */}
      {isCustom && (
        <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-indigo-900/40">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-200">
                Provide Sample Posts (Exemplars of your true voice):
              </span>
              <span className="text-[11px] text-slate-400">
                (The engine extracts sentence rhythm, line breaks, and vocabulary)
              </span>
            </div>
            <div className="flex gap-1.5">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCustomTab(idx)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                    activeCustomTab === idx
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Post #{idx + 1} {customPosts[idx]?.trim() ? '✓' : ''}
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={customPosts[activeCustomTab] || ''}
            onChange={(e) => {
              const updated = [...customPosts];
              updated[activeCustomTab] = e.target.value;
              onUpdateCustomPosts(updated);
            }}
            placeholder={`Paste sample post #${activeCustomTab + 1} here...\n\nExample:\nWe launched our new feature yesterday.\nZero fanfare.\nJust an email to 50 churned customers.\n\nHere is what happened next...`}
            rows={5}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono transition"
          />

          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
            <span>
              {customPosts[activeCustomTab]?.length || 0} characters •{' '}
              {customPosts[activeCustomTab]?.split(/\s+/).filter(Boolean).length || 0} words
            </span>
            <span className="text-indigo-400">
              {customPosts.filter(p => p.trim()).length >= 1
                ? '✓ Style DNA learned from your samples'
                : 'Paste at least 1 post to capture your cadence'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
