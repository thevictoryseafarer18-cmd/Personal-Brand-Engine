import React, { useState, useEffect } from 'react';
import { SAMPLE_INPUTS } from '../data/sampleDataset';
import { Mic, FileText, Sparkles, Wand2, Trash2, Volume2, StopCircle, RefreshCw } from 'lucide-react';
import { cleanVoiceTranscript } from '../engine/contentGenerator';

export default function RawInputSection({
  rawInput,
  onUpdateRawInput,
  onGenerate,
  isGenerating
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordTimer, setRecordTimer] = useState(0);

  // Voice recording simulation timer
  useEffect(() => {
    let interval = null;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordTimer((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordTimer(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // Append a transcribed voice snippet
      const simulatedVoice = `So I was just talking to our head of engineering after our incident review. We spent 4 hours troubleshooting why our webhook queues got jammed. The crazy thing was our health check was giving 200 OK because it only checked HTTP reachability, not database write locks! The real takeaway: never trust a shallow health check that doesn't exercise a real transaction.`;
      onUpdateRawInput(simulatedVoice);
    } else {
      setIsRecording(true);
    }
  };

  const handleCleanTranscript = () => {
    const cleaned = cleanVoiceTranscript(rawInput);
    onUpdateRawInput(cleaned);
  };

  const wordCount = rawInput.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="glass-panel p-5 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-xs flex items-center justify-center border border-cyan-500/30">
              2
            </span>
            <h2 className="text-base font-bold text-white tracking-tight">
              Feed Your Raw Ideas, Notes, or Voice Transcripts
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Don't worry about grammar or polish. Real thoughts are messy, conversational, and raw.
          </p>
        </div>

        {/* Quick Sample Presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-slate-400 mr-1">Load sample input:</span>
          {SAMPLE_INPUTS.map((sample) => (
            <button
              key={sample.id}
              onClick={() => onUpdateRawInput(sample.content)}
              className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/60 text-xs font-medium transition"
              title={sample.badge}
            >
              {sample.title.split(':')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Text Area Container */}
      <div className="relative">
        <textarea
          value={rawInput}
          onChange={(e) => onUpdateRawInput(e.target.value)}
          placeholder="Speak your mind or paste raw text...&#10;&#10;e.g. 'Hey, quick thought from today's client call. We kept discounting our price to win deals, but every discount made the buyer hesitate more. When we stopped discounting and offered a guarantee instead, deals closed 3x faster...'"
          rows={6}
          className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 font-sans leading-relaxed transition"
        />

        {/* Audio Recording Overlay if active */}
        {isRecording && (
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm rounded-xl border border-rose-500/50 flex flex-col items-center justify-center p-6 z-20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-4 h-4 rounded-full bg-rose-500 animate-ping" />
              <span className="text-sm font-bold text-white uppercase tracking-wider">
                Recording Voice Note... ({recordTimer}s)
              </span>
            </div>

            {/* Pulsing Audio Waveform Simulation */}
            <div className="flex items-center gap-1.5 h-12 my-2">
              {[40, 75, 30, 90, 60, 100, 45, 80, 55, 95, 35, 70, 85, 50].map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-rose-500 to-amber-400 rounded-full animate-pulse"
                  style={{
                    height: `${h}%`,
                    animationDelay: `${i * 80}ms`,
                    animationDuration: '600ms'
                  }}
                />
              ))}
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Speak naturally. Talk through your failure, observation, or counter-intuitive learning.
            </p>

            <button
              onClick={toggleRecording}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition shadow-lg shadow-rose-600/30"
            >
              <StopCircle className="w-4 h-4" />
              Stop & Transcribe Voice Memo
            </button>
          </div>
        )}
      </div>

      {/* Bottom Bar: Action Controls & Generate Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3 pt-3 border-t border-slate-800/80">
        <div className="flex items-center gap-2 flex-wrap text-xs text-slate-400">
          <button
            onClick={toggleRecording}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 font-medium transition"
          >
            <Mic className="w-3.5 h-3.5 text-rose-400" />
            <span>Simulate Voice Memo</span>
          </button>

          {rawInput && (
            <button
              onClick={handleCleanTranscript}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-medium transition"
              title="Strip filler words like 'um', 'like', 'so basically'"
            >
              <Wand2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Clean Fillers ("um", "like")</span>
            </button>
          )}

          {rawInput && (
            <button
              onClick={() => onUpdateRawInput('')}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition"
              title="Clear input"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}

          <span className="ml-auto text-slate-500 font-mono text-[11px]">
            {wordCount} words • {rawInput.length} chars
          </span>
        </div>

        <button
          onClick={onGenerate}
          disabled={!rawInput.trim() || isGenerating}
          className="btn-primary"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Synthesizing Authentic Formats...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate in My Voice (4 Formats)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
