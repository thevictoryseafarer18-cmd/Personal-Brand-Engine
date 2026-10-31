import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import StyleProfileSection from './components/StyleProfileSection';
import RawInputSection from './components/RawInputSection';
import PostStudioSection from './components/PostStudioSection';
import StyleDnaModal from './components/StyleDnaModal';
import SettingsModal from './components/SettingsModal';
import { SAMPLE_PROFILES, SAMPLE_INPUTS } from './data/sampleDataset';
import { analyzeWritingStyle } from './engine/styleAnalyzer';
import { generateDistinctivePosts } from './engine/contentGenerator';

export default function App() {
  // 1. Profile State
  const [selectedProfile, setSelectedProfile] = useState(SAMPLE_PROFILES[0]);
  const [isCustom, setIsCustom] = useState(false);
  const [customPosts, setCustomPosts] = useState([
    `We spent 3 months debating our pricing page redesign.\n14 meetings.\n3 Figma prototypes.\n\nThen our lead engineer simply changed the button copy from "Start Trial" to "Calculate Your Cost".\n\nSignups jumped 34% by Friday.\n\nThe lesson: Don't redesign the car when the tire just needs air.`,
    `Stop hiring for "culture fit".\n\nCulture fit usually just means: "This person laughs at my jokes and went to a school like mine."\n\nHire for "culture add" instead:\n• Do they challenge our unstated assumptions?\n• Do they bring a perspective our leadership team lacks?\n• Will they tell us when our roadmap makes no sense?`
  ]);

  // Author details synced to profile or custom
  const [author, setAuthor] = useState({
    name: SAMPLE_PROFILES[0].name,
    headline: SAMPLE_PROFILES[0].headline,
    avatar: SAMPLE_PROFILES[0].avatar
  });

  // 2. Raw Input State (Preloaded with sample voice note for instant gratification)
  const [rawInput, setRawInput] = useState(SAMPLE_INPUTS[0].content);

  // 3. Computed Style DNA
  const activeSamplePosts = useMemo(() => {
    if (isCustom) {
      return customPosts.filter(p => p.trim().length > 0);
    }
    return selectedProfile.samplePosts;
  }, [isCustom, customPosts, selectedProfile]);

  const styleDna = useMemo(() => {
    return analyzeWritingStyle(activeSamplePosts);
  }, [activeSamplePosts]);

  // When profile changes, update author details
  useEffect(() => {
    if (!isCustom) {
      setAuthor({
        name: selectedProfile.name,
        headline: selectedProfile.headline,
        avatar: selectedProfile.avatar
      });
    } else {
      setAuthor({
        name: 'You (Custom Voice)',
        headline: 'Author & Domain Expert • Sharing Field Lessons',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
      });
    }
  }, [selectedProfile, isCustom]);

  // 4. Generated Posts & Studio State
  const [generatedPosts, setGeneratedPosts] = useState([]);
  const [activeFormatIndex, setActiveFormatIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  // Initial synthesis on mount
  useEffect(() => {
    const initialPosts = generateDistinctivePosts(rawInput, styleDna, author.name);
    setGeneratedPosts(initialPosts);
  }, []);

  // 5. Modals State
  const [isDnaModalOpen, setIsDnaModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [llmConfig, setLlmConfig] = useState({ apiKey: '', model: 'gemini-1.5-pro' });

  // Handle generation trigger
  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const posts = generateDistinctivePosts(rawInput, styleDna, author.name);
      setGeneratedPosts(posts);
      setActiveFormatIndex(0);
      setIsGenerating(false);
    }, 400);
  };

  // Update in-place edited content
  const handleUpdatePostContent = (index, newContent) => {
    setGeneratedPosts((prev) => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index] = {
          ...updated[index],
          content: newContent
        };
      }
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Navbar */}
      <Header
        onOpenDna={() => setIsDnaModalOpen(true)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        activeProfileName={isCustom ? 'Custom Voice' : selectedProfile.name}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full">
        {/* Value Proposition Hero Banner */}
        <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900/80 to-slate-900 border border-indigo-900/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Distinctive Voice Engine
              </span>
              <span className="text-xs text-slate-400">• Anti-Generic AI</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Turn messy expertise into magnetic LinkedIn posts — in your actual voice.
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              No generic "I'm thrilled to share" fluff. The engine analyzes your unique sentence cadence, strips AI buzzwords, and generates 4 distinct content archetypes.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setIsDnaModalOpen(true)}
              className="btn-secondary text-xs"
            >
              Inspect Voice DNA
            </button>
            <button
              onClick={handleGenerate}
              className="btn-primary text-xs"
            >
              Generate Content
            </button>
          </div>
        </div>

        {/* Step 1: Voice Profile & Style DNA */}
        <StyleProfileSection
          selectedProfile={selectedProfile}
          onSelectProfile={setSelectedProfile}
          customPosts={customPosts}
          onUpdateCustomPosts={setCustomPosts}
          styleDna={styleDna}
          isCustom={isCustom}
          setIsCustom={setIsCustom}
        />

        {/* Step 2: Raw Ideas & Voice Transcripts */}
        <RawInputSection
          rawInput={rawInput}
          onUpdateRawInput={setRawInput}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />

        {/* Step 3: Multi-Format Studio, In-place Editor & LinkedIn Preview */}
        <PostStudioSection
          generatedPosts={generatedPosts}
          activeFormatIndex={activeFormatIndex}
          onSelectFormat={setActiveFormatIndex}
          onUpdatePostContent={handleUpdatePostContent}
          author={author}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 px-6 text-center text-xs text-slate-500">
        Personal Brand Engine MVP • Built for Distinctive Authentic Thought Leadership • 100% Client-Side Privacy
      </footer>

      {/* Modals */}
      <StyleDnaModal
        isOpen={isDnaModalOpen}
        onClose={() => setIsDnaModalOpen(false)}
        styleDna={styleDna}
        profileName={isCustom ? 'Custom Trained Voice' : selectedProfile.name}
        samplePosts={activeSamplePosts}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        author={author}
        onUpdateAuthor={setAuthor}
        llmConfig={llmConfig}
        onUpdateLlmConfig={setLlmConfig}
      />
    </div>
  );
}
