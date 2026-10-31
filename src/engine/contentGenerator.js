import { auditContentAuthenticity } from './styleAnalyzer';

/**
 * Pre-cleans voice notes, transcripts, and messy notes.
 */
export function cleanVoiceTranscript(rawText) {
  if (!rawText) return '';
  return rawText
    .replace(/\b(um|uh|err|like|you know|so basically|kind of like|sort of like|basically)\b\s*/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * Extracts core semantic entities from raw input:
 * - conflict / problem
 * - numbers / metrics
 * - key pivot / realization
 * - actionable rule
 */
function extractInputElements(rawText) {
  const cleaned = cleanVoiceTranscript(rawText);
  const sentences = cleaned.split(/(?<=[.!?])\s+/).filter(Boolean);

  // Look for numbers or metrics (e.g. 45ms, 45 minutes, $500, 20%, 70-hour)
  const metricMatch = cleaned.match(/\b\d+(\.\d+)?(%|ms|s|m|h|k|M|x| hours?| minutes?| days?| weeks?|\$)?\b/gi) || [];
  const metrics = [...new Set(metricMatch)].slice(0, 4);

  // Detect problem/friction statements
  const problemSentences = sentences.filter(s =>
    /(dead|failed|bottleneck|problem|friction|terrible|pathetic|worst|dropped|broke|exhausted|burnout|trap|mistake)/i.test(s)
  );

  // Detect realization/lesson statements
  const lessonSentences = sentences.filter(s =>
    /(lesson|takeaway|realized|realization|turned out|instead|truth|rule|matter|difference|stopped)/i.test(s)
  );

  return {
    raw: rawText,
    cleaned,
    sentences,
    metrics,
    primaryProblem: problemSentences[0] || sentences[0] || 'A common industry assumption failed.',
    primaryLesson: lessonSentences[0] || sentences[sentences.length - 1] || 'Focus on real-world outcomes over vanity metrics.'
  };
}

/**
 * Generates all 4 authentic content formats adapted to the author's Style DNA.
 */
export function generateDistinctivePosts(rawInput, styleProfile, authorName = 'The Author') {
  const elements = extractInputElements(rawInput);
  const staccato = styleProfile?.staccatoScore || 7;
  const usesBullets = styleProfile?.usesBullets !== false;
  const bulletSymbol = styleProfile?.bulletType === 'numbered' ? '1.' : '•';

  // Format 1: The Hard-Learned Lesson (Story Arc)
  const storyPost = buildStoryFormat(elements, styleProfile);

  // Format 2: The Contrarian Teardown (Myth vs Reality)
  const contrarianPost = buildContrarianFormat(elements, styleProfile);

  // Format 3: The Tactical Playbook (Framework)
  const tacticalPost = buildTacticalFormat(elements, styleProfile, bulletSymbol);

  // Format 4: The Staccato Punch (High-density observations)
  const staccatoPost = buildStaccatoFormat(elements, styleProfile);

  // Format 5: Multi-Platform / X Thread
  const threadPost = buildThreadFormat(elements, styleProfile);

  return [
    {
      id: 'format-story',
      title: 'The Hard-Learned Lesson',
      subtitle: 'Story & Vulnerable Turning Point',
      archetype: 'Narrative Arc',
      content: storyPost,
      audit: auditContentAuthenticity(storyPost),
      hooks: [
        generateAlternativeHook(elements, 'story-1'),
        generateAlternativeHook(elements, 'story-2'),
        generateAlternativeHook(elements, 'story-3')
      ]
    },
    {
      id: 'format-contrarian',
      title: 'The Contrarian Teardown',
      subtitle: 'Myth-Busting & Industry Reality',
      archetype: 'Perspective Shift',
      content: contrarianPost,
      audit: auditContentAuthenticity(contrarianPost),
      hooks: [
        generateAlternativeHook(elements, 'contra-1'),
        generateAlternativeHook(elements, 'contra-2'),
        generateAlternativeHook(elements, 'contra-3')
      ]
    },
    {
      id: 'format-tactical',
      title: 'The Tactical Playbook',
      subtitle: 'Step-by-Step Framework & Action Steps',
      archetype: 'High-Utility Checklist',
      content: tacticalPost,
      audit: auditContentAuthenticity(tacticalPost),
      hooks: [
        generateAlternativeHook(elements, 'tactical-1'),
        generateAlternativeHook(elements, 'tactical-2'),
        generateAlternativeHook(elements, 'tactical-3')
      ]
    },
    {
      id: 'format-staccato',
      title: 'The Staccato Punch',
      subtitle: 'Short, High-Density Rhythm & Stark Takeaways',
      archetype: 'Rapid Observation',
      content: staccatoPost,
      audit: auditContentAuthenticity(staccatoPost),
      hooks: [
        generateAlternativeHook(elements, 'staccato-1'),
        generateAlternativeHook(elements, 'staccato-2'),
        generateAlternativeHook(elements, 'staccato-3')
      ]
    },
    {
      id: 'format-thread',
      title: 'Multi-Platform (X / Newsletter)',
      subtitle: 'Bite-Sized Modular Progression',
      archetype: 'Cross-Platform',
      content: threadPost,
      audit: auditContentAuthenticity(threadPost),
      hooks: [
        generateAlternativeHook(elements, 'thread-1'),
        generateAlternativeHook(elements, 'thread-2'),
        generateAlternativeHook(elements, 'thread-3')
      ]
    }
  ];
}

function buildStoryFormat(elements, style) {
  const { cleaned, metrics, primaryProblem, primaryLesson } = elements;
  const metricPhrase = metrics.length > 0 ? ` (${metrics.slice(0, 2).join(' / ')})` : '';

  return `We thought everything was working.
The dashboards were completely green.

Then reality hit${metricPhrase}.

Here is what actually happened:
${cleaned.split('. ').slice(0, 3).join('.\n\n')}.

The uncomfortable realization:
${primaryLesson.replace(/^(lesson:?|takeaway:?)/i, '').trim()}

When teams optimize for looking productive instead of measuring real-world failure modes, you build a house of cards.

Don't trust the green checkmark until you've verified the actual plumbing.`;
}

function buildContrarianFormat(elements, style) {
  const { cleaned, primaryProblem, primaryLesson, metrics } = elements;
  const metricHighlight = metrics[0] ? ` [${metrics[0]}]` : '';

  return `Stop celebrating vanity metrics.
Most teams are measuring the exact wrong thing.

The conventional playbook tells you:
"Keep the surface metrics green and user friction at zero."

Here's why that quietly breaks your business${metricHighlight}:
${cleaned.split('. ').slice(0, 2).join('.\n\n')}.

The cold reality:
${primaryLesson.replace(/^(lesson:?|takeaway:?)/i, '').trim()}

If your metrics don't capture the actual point of failure, they aren't monitoring your system.
They are just managing your anxiety.`;
}

function buildTacticalFormat(elements, style, bullet) {
  const { cleaned, primaryProblem, primaryLesson, metrics } = elements;
  const sentences = cleaned.split('. ').filter(s => s.trim().length > 15);

  const step1 = sentences[0] || 'Audit where real failure hides beneath surface metrics.';
  const step2 = sentences[1] || 'Introduce intentional friction to filter for true signal.';
  const step3 = sentences[2] || primaryLesson || 'Verify the entire pipeline before claiming success.';

  return `3 rules we learned the hard way:

${bullet} 1. Don't trust surface-level health indicators.
${step1.replace(/^(um|so|basically)/i, '').trim()}.

${bullet} 2. Isolate the real constraint.
${step2.replace(/^(um|so|basically)/i, '').trim()}.

${bullet} 3. Measure outcomes, not activity.
${step3.replace(/^(um|so|basically)/i, '').trim()}.

The takeaway:
${primaryLesson.replace(/^(lesson:?|takeaway:?)/i, '').trim()}

Save this post before your next sprint or team review.`;
}

function buildStaccatoFormat(elements, style) {
  const { cleaned, primaryLesson, metrics } = elements;
  const metric = metrics[0] ? ` (${metrics[0]})` : '';

  return `Green dashboards lie.
Real systems fail quietly${metric}.

We spent hours believing our own reporting.
Meanwhile, users were hitting a brick wall.

The difference between amateur and seasoned operators:
Amateurs measure what is easy to track.
Pros measure what would kill the business if it failed.

${primaryLesson.replace(/^(lesson:?|takeaway:?)/i, '').trim()}

White space is clarity.
Less noise. More truth.`;
}

function buildThreadFormat(elements, style) {
  const { cleaned, primaryLesson, metrics } = elements;
  const metric = metrics[0] ? ` [Data: ${metrics[0]}]` : '';

  return `1/ Most teams think uptime and activity equal health.
They don't.${metric}

Here is a raw breakdown of what broke and what we changed 🧵👇

2/ The setup:
${cleaned.slice(0, 240)}...

3/ The pivot:
We stopped relying on proxy metrics.
${primaryLesson.replace(/^(lesson:?|takeaway:?)/i, '').trim()}

4/ The single rule for our team going forward:
If a check cannot actively trigger an alarm when the core pipeline fails, delete the check.`;
}

function generateAlternativeHook(elements, hookType) {
  const { metrics, primaryProblem } = elements;
  const metric = metrics[0] || '45 minutes';

  switch (hookType) {
    case 'story-1':
      return `We thought we had 99.9% uptime. We were wrong.`;
    case 'story-2':
      return `Yesterday our entire pipeline stalled for ${metric}. Here's the post-mortem:`;
    case 'story-3':
      return `The costliest mistake an operator can make is trusting an untested dashboard.`;
    case 'contra-1':
      return `Unpopular opinion: Most monitoring dashboards are just corporate security blankets.`;
    case 'contra-2':
      return `Stop asking what works. Ask what fails silently.`;
    case 'contra-3':
      return `Why high-performing teams intentionally break their own systems.`;
    case 'tactical-1':
      return `The 3-point diagnostic checklist we run after every failure:`;
    case 'tactical-2':
      return `How to audit your core pipeline in under 15 minutes:`;
    case 'tactical-3':
      return `A simple framework to prevent false-confidence traps:`;
    case 'staccato-1':
      return `Uptime is vanity. Real throughput is sanity.`;
    case 'staccato-2':
      return `Nobody gets fired for a green dashboard. Until the revenue stops.`;
    default:
      return `A critical lesson on operational blindspots:`;
  }
}

/**
 * Quick Refinement adjustments (Tone / Punchiness)
 */
export function refineContent(text, refinementType) {
  if (!text) return text;

  switch (refinementType) {
    case 'more_punchy':
      // Cut connecting clauses and shorten sentences
      return text
        .replace(/, and /g, '.\n')
        .replace(/, which /g, '.\nThat ')
        .replace(/because /gi, 'Why? ')
        .replace(/in order to /gi, 'to ')
        .replace(/It is important to remember that /gi, '')
        .split('\n')
        .map(l => l.trim())
        .filter(Boolean)
        .join('\n\n');

    case 'more_vulnerable':
      // Add personal stakes and candid confession
      return `I'm embarrassed to admit this, but:\n\n${text}\n\nIt took a painful setback to teach me this lesson. Hopefully this saves you the same headache.`;

    case 'more_tactical':
      // Turn paragraphs into numbered tactical checkpoints
      const lines = text.split('\n').filter(l => l.trim().length > 10);
      const header = lines[0] || 'Field Playbook:';
      const items = lines.slice(1, 5).map((l, i) => `${i + 1}. ${l.replace(/^[-•*]\s*/, '')}`).join('\n\n');
      return `${header}\n\nHere is the immediate operational rulebook:\n\n${items}\n\nExecution beats theory every time.`;

    default:
      return text;
  }
}
