import { BANNED_AI_WORDS } from '../data/sampleDataset';

/**
 * Analyzes sample posts to extract an author's distinct Style DNA.
 */
export function analyzeWritingStyle(samplePosts) {
  if (!samplePosts || samplePosts.length === 0) {
    return getDefaultStyleProfile();
  }

  const combinedText = samplePosts.join('\n\n');
  const sentences = combinedText
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);

  const words = combinedText
    .split(/\s+/)
    .map(w => w.trim().toLowerCase().replace(/[^\w]/g, ''))
    .filter(w => w.length > 0);

  const lines = combinedText
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0);

  // 1. Average sentence length (in words)
  const totalSentenceWords = sentences.reduce((acc, s) => acc + s.split(/\s+/).length, 0);
  const avgWordsPerSentence = sentences.length > 0 ? Math.round(totalSentenceWords / sentences.length) : 12;

  // 2. Line spacing cadence: ratio of single-line paragraphs to total lines
  const singleLineParas = samplePosts.reduce((acc, post) => {
    const postParagraphs = post.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    const singles = postParagraphs.filter(p => !p.includes('\n') && p.split(/\s+/).length < 20);
    return acc + singles.length;
  }, 0);

  const staccatoScore = Math.min(10, Math.max(1, Math.round((18 - avgWordsPerSentence) * 0.8)));

  // 3. Formatting preferences: bullets, numbers, emojis
  const bulletCount = (combinedText.match(/^(\s*[-•*]\s+)/gm) || []).length;
  const numberedCount = (combinedText.match(/^(\s*\d+\.\s+)/gm) || []).length;
  const usesBullets = bulletCount + numberedCount > 1;

  // 4. Emoji density
  const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;
  const emojiMatches = combinedText.match(emojiRegex) || [];
  const emojiPerHundredWords = Math.round((emojiMatches.length / (words.length || 1)) * 100);

  let emojiProfile = 'Near Zero (Authentic text-first)';
  if (emojiPerHundredWords >= 3) emojiProfile = 'High (Expressive)';
  else if (emojiPerHundredWords >= 1) emojiProfile = 'Accent only (1-2 per post)';

  // 5. Personal pronoun ratio (Authentic vs Corporate passive)
  const firstPersonWords = words.filter(w => ['i', 'we', 'my', 'our', 'me', 'us'].includes(w)).length;
  const firstPersonRatio = Math.round((firstPersonWords / (words.length || 1)) * 100);

  // 6. Question frequency (rhetorical style)
  const questionCount = (combinedText.match(/\?/g) || []).length;
  const usesRhetoricalQuestions = questionCount >= samplePosts.length;

  // 7. Check for generic AI buzzwords in sample posts
  const detectedCliches = BANNED_AI_WORDS.filter(cliche => {
    const regex = new RegExp(`\\b${cliche.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    return regex.test(combinedText);
  });

  // 8. Determine dominant Hook Archetype
  let dominantHook = 'The Direct Metric/Failure Opening';
  if (usesRhetoricalQuestions) {
    dominantHook = 'The Provocative Rhetorical Diagnostic';
  } else if (sentences[0] && sentences[0].toLowerCase().startsWith('stop')) {
    dominantHook = 'The Contrarian Command';
  } else if (staccatoScore >= 7) {
    dominantHook = 'The Staccato In Media Res Drop';
  }

  return {
    avgWordsPerSentence,
    staccatoScore, // 1 (dense/academic) to 10 (rapid staccato punch)
    usesBullets,
    bulletType: numberedCount > bulletCount ? 'numbered' : 'bullet',
    emojiProfile,
    emojiCount: emojiMatches.length,
    firstPersonRatio, // percentage
    usesRhetoricalQuestions,
    dominantHook,
    detectedCliches,
    sampleCount: samplePosts.length,
    totalWords: words.length
  };
}

export function getDefaultStyleProfile() {
  return {
    avgWordsPerSentence: 10,
    staccatoScore: 7,
    usesBullets: true,
    bulletType: 'bullet',
    emojiProfile: 'Near Zero (Authentic text-first)',
    emojiCount: 0,
    firstPersonRatio: 8,
    usesRhetoricalQuestions: true,
    dominantHook: 'The Staccato In Media Res Drop',
    detectedCliches: [],
    sampleCount: 0,
    totalWords: 0
  };
}

/**
 * Audit any text against generic AI patterns.
 * Returns a 0-100% Authenticity Score and details.
 */
export function auditContentAuthenticity(text) {
  if (!text || text.trim().length === 0) {
    return { score: 100, flaggedTerms: [], suggestions: [], readTimeMinutes: 0, wordCount: 0, charCount: 0 };
  }

  const flaggedTerms = [];
  for (const word of BANNED_AI_WORDS) {
    const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (regex.test(text)) {
      flaggedTerms.push(word);
    }
  }

  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const charCount = text.length;

  // AI Penalty: -15 per cliché
  let score = 100 - (flaggedTerms.length * 15);

  // Monotony check: if sentence lengths are too uniform, penalize
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);
  const sentenceLengths = sentences.map(s => s.split(/\s+/).length);
  if (sentenceLengths.length >= 3) {
    const avg = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
    const variance = sentenceLengths.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / sentenceLengths.length;
    if (variance < 4) {
      // Very uniform robotic sentence length
      score -= 10;
    }
  }

  // Hook check: check if first line is generic greeting
  const firstLine = text.trim().split('\n')[0] || '';
  if (/^(hello|hi|welcome|excited to|thrilled to|today i want to)/i.test(firstLine)) {
    score -= 20;
  }

  score = Math.max(10, Math.min(100, score));

  const suggestions = [];
  if (flaggedTerms.length > 0) {
    suggestions.push(`Remove generic AI buzzwords: "${flaggedTerms.join('", "')}".`);
  }
  if (firstLine.length > 120) {
    suggestions.push('Shorten the first hook line. LinkedIn truncates after ~140 characters before "...see more".');
  }
  if (!text.includes('\n\n')) {
    suggestions.push('Add white space between key thoughts to create conversational rhythm.');
  }

  const readTimeMinutes = Math.max(0.5, Math.round((wordCount / 200) * 10) / 10);

  return {
    score,
    flaggedTerms,
    suggestions,
    readTimeMinutes,
    wordCount,
    charCount
  };
}
