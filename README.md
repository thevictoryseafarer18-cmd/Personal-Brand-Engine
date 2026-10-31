# 🚀 Personal Brand Engine

> **Turn messy expertise, voice notes, and raw transcripts into distinctive, high-signal LinkedIn posts in your authentic voice — without sounding like generic AI sludge.**

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🎯 The Problem

Professionals have valuable, hard-won expertise, but struggle to turn their daily experiences, war stories, and voice memos into consistent content. 

When they try traditional AI writing tools, the output is **generic AI sludge**:
- ❌ Cliches: *"In today's fast-paced world...", "🚀 Thrilled to announce...", "Here are 5 key takeaways:"*
- ❌ Robotic, uniform sentence cadence with zero white-space.
- ❌ Corporate buzzwords: *delve, synergy, pivotal, paradigm shift, supercharge*.
- ❌ Sterile tone with zero vulnerability, failure metrics, or honest trade-offs.

## ✨ The Solution: Personal Brand Engine

Personal Brand Engine learns the author's **Style DNA** (sentence cadence, hook style, formatting habits, and personal register) and synthesizes raw, unstructured inputs into **4 distinctive content archetypes**.

---

## ⚡ Core Features

- 🧬 **Style DNA Analyzer**: Analyzes 1–3 past posts to extract sentence cadence (words per sentence), staccato index, emoji density, and dominant hook archetypes.
- 🎙️ **Raw Input & Voice Memo Intake**: Accepts voice notes, stream-of-consciousness brain dumps, or meeting transcripts. Includes a built-in voice memo simulator and one-click filler word cleaner (`um`, `like`, `so basically`).
- 🛡️ **Anti-AI Sludge Filter & Authenticity Audit**: Real-time scanner checking for 24+ forbidden AI buzzwords, sentence length monotony, and generic openings with a 0–100% Authenticity Score.
- 📱 **LinkedIn Live Preview with Feed Fold Check**: Simulates the real LinkedIn post feed, showing the author avatar, headline, engagement bar, and critically the **`...see more` fold line** (lines 1–3) so you can test if your hook earns the click.
- 🎨 **4 Distinct Content Archetypes**:
  1. **The Hard-Learned Lesson** (Story / In Media Res Conflict)
  2. **The Contrarian Teardown** (Myth-Busting & Industry Reality)
  3. **The Tactical Playbook** (Zero-fluff 3-Step Framework)
  4. **The Staccato Punch** (Short, High-Density Rhythm)
  5. **Bonus: Multi-Platform** (X / Twitter Thread & Newsletter hook)
- 🎛️ **Live In-Place Editor & Voice Tuners**:
  - `⚡ Make It Punchier` (shortens lines and cuts filler)
  - `🛡️ Add Vulnerability & Stakes` (adds honest failure context)
  - `📋 Make It Tactical` (converts prose into numbered operational rules)
  - `🎯 Alternate Hook` (cycles through 3 alternative opening lines)
- 📋 **One-Click Copy with Confetti**: Instant formatted clipboard export.
- 🔒 **100% Client-Side Privacy**: Runs completely offline in your browser with zero mandatory external API keys or trackers.

---

## 🏗️ Architecture

```
personal-brand-engine/
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── LICENSE
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── sampleDataset.js        # Realistic author personas & messy test inputs
    ├── engine/
    │   ├── styleAnalyzer.js        # Style DNA extraction & Anti-AI auditor
    │   └── contentGenerator.js     # Semantic cleaner & 4-format synthesis engine
    └── components/
        ├── Header.jsx              # App bar, voice badge & actions
        ├── StyleProfileSection.jsx # Persona picker & custom sample post learner
        ├── RawInputSection.jsx     # Voice note simulator & messy idea intake
        ├── PostStudioSection.jsx   # Tabbed formats, live editor & voice tuners
        ├── LinkedInPreviewCard.jsx # Feed card simulator with "...see more" fold check
        ├── StyleDnaModal.jsx       # Deep metrics & banned AI blacklist inspector
        └── SettingsModal.jsx       # Author profile & optional cloud LLM settings
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation

```bash
# 1. Clone repository
git clone https://github.com/<your-username>/personal-brand-engine.git

# 2. Navigate into project
cd personal-brand-engine

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 🧪 Testing the Prototype in 60 Seconds

1. **Pick an Author Persona**: Select **Elena** (Staccato Infrastructure Engineer) or **Marcus** (Contrarian B2B Founder), or click **Custom Voice** and paste your own past post.
2. **Load a Sample Input**: Click `🎙️ Voice Note: Incident Post-Mortem` to load a raw, messy voice transcript with speech fillers.
3. **Generate**: Click **Generate in My Voice (4 Formats)**.
4. **Inspect & Refine**:
   - Check the **Authenticity Score** (100% Fluff-Free).
   - Test the **LinkedIn Preview** to verify the `...see more` fold line.
   - Click **⚡ Make It Punchier** to tighten cadence.
   - Click **Copy Post** for one-click clipboard export.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
