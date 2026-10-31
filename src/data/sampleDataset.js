/**
 * Sample dataset for Personal Brand Engine
 * Includes distinct professional voice profiles and realistic raw inputs (voice notes, rough ideas, messy transcripts).
 */

export const SAMPLE_PROFILES = [
  {
    id: 'elena-tech',
    name: 'Elena Rostova',
    role: 'Staff Infrastructure Engineer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    headline: 'Staff Infra Engineer @ FinTech Scaleup • Distributed Systems & Incident Postmortems',
    vibeTag: 'Staccato & Gritty Engineer',
    description: 'Short sentences, brutal honesty about outages, numbers over buzzwords, zero emojis, candid post-mortems.',
    styleSignature: {
      avgSentenceLength: 'Short (7-11 words)',
      hookStyle: 'In media res failure or metric anomaly',
      tone: 'Pragmatic, cynical-yet-constructive, engineering-first',
      emojiUsage: 'Near Zero (only structural arrows or code blocks)',
      signatureTropes: ['Post-mortem breakdown', 'Numbers before and after', 'The real culprit vs what we thought'],
      bannedWords: ['supercharge', 'thrilled', 'game-changer', 'delve', 'synergy', 'testament', 'pivotal']
    },
    samplePosts: [
      `We spent 3 weeks optimizing a Postgres query.
Shaved 45ms off p99 latency.
Nobody noticed.

Then I checked the network waterfall.
The real bottleneck was a synchronous 1.8-second HTTP call inside our auth middleware on every single request.

One caching header fixed it in 10 minutes.

The engineering trap:
We optimize what is intellectually stimulating.
We ignore what is boringly obvious.

Before you touch index tuning, trace the whole path from edge to egress.
You usually don't need a distributed cache. You just need to stop calling third-party APIs inside hot loops.`,

      `Senior engineers don't write clever code.
They delete it.

Yesterday I opened a PR with -520 lines.
Replaced a custom retry-and-backoff state machine with 4 lines using the standard SDK policy.

The best architecture review question is never:
"How does this handle edge case X?"

It's:
"What happens if we don't build this at all?"

Code you write is a liability.
Code you delete is a permanent bug fix.`
    ]
  },
  {
    id: 'marcus-founder',
    name: 'Marcus Vance',
    role: 'Bootstrapped B2B Founder',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    headline: 'Founder @ OpsFlow ($2.4M ARR, Zero VC) • Writing about pricing, churn & sustainable growth',
    vibeTag: 'Contrarian Operator',
    description: 'Challenging conventional startup myths, high conviction, ruthless focus on unit economics and cash flow.',
    styleSignature: {
      avgSentenceLength: 'Medium-Punchy (10-15 words)',
      hookStyle: 'Direct contrarian statement challenging conventional wisdom',
      tone: 'Confident, grounded, field-tested, operator perspective',
      emojiUsage: 'Minimal (1-2 purposeful bullet markers)',
      signatureTropes: ['Conventional wisdom vs cold reality', 'Rule of 3', 'Direct call to action without desperation'],
      bannedWords: ['humbled', 'delighted', 'paradigm shift', 'in today\'s fast-paced world', 'unlock your potential']
    },
    samplePosts: [
      `Stop asking your churned customers why they left.
They will lie to you to avoid hurting your feelings.

They'll say:
"It was too expensive."
"We didn't have the budget this quarter."

Translate that:
"Your software didn't solve a burning, daily problem, so you were the first line item we cut."

The only honest feedback in SaaS:
1. When did daily active usage drop to zero? (Log files don't lie)
2. What tool did they replace you with?
3. If they replaced you with a spreadsheet, you lost to convenience, not competitors.

Price is almost never the reason they left. It's just the easiest excuse to get off a cancellation call.`,

      `The worst pricing advice in B2B SaaS:
"Give a 20% discount to close the deal before month-end."

Every time we offered a quick discount, the deal actually took LONGER to close.
Why?
Because discounting signals weakness. It triggers procurement to ask:
"If they dropped 20% in an email, what else can we squeeze?"

Last year we stopped discounting entirely.
Instead, we offered a 30-day onboarding guarantee with dedicated Slack support.

Result:
- Deal cycles sped up by 11 days.
- Close rate went from 24% to 33%.
- Customers respected our team more from day one.

Price with conviction. Fluff discounts attract your highest-maintenance customers.`
    ]
  },
  {
    id: 'maya-product',
    name: 'Maya Lin',
    role: 'Product Strategist & Advisor',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    headline: 'VP Product • Ex-Stripe, Ex-Linear • Helping tech companies craft high-velocity product orgs',
    vibeTag: 'High-Signal Product Mind',
    description: 'Reflective, structured frameworks, deep user empathy, questions over assertions, clean mental models.',
    styleSignature: {
      avgSentenceLength: 'Varied Rhythm (mix of short punchlines and clear frameworks)',
      hookStyle: 'Counter-intuitive observation from user research',
      tone: 'Insightful, empathetic, analytical, mentor-like',
      emojiUsage: 'Selective (used as visual list dividers)',
      signatureTropes: ['Mental model breakdowns', 'The hidden question behind the request', 'Tactical diagnostic questions'],
      bannedWords: ['disruptive', 'synergistic', 'spearhead', 'revolutionary', 'game-changing']
    },
    samplePosts: [
      `Most product roadmaps are just wish lists disguised as Gantt charts.

The problem with 12-month roadmaps:
They create an illusion of certainty in an environment of continuous ambiguity.

Teams celebrate shipping feature #7 on schedule.
Nobody tracks whether feature #7 moved user retention by even 0.1%.

Instead of roadmapping "features", try roadmapping "customer problems to resolve":
• Q1: Eliminate the 4-step friction in team onboarding.
• Q2: Cut invoice reconciliation time from 20 minutes to 3.
• Q3: Solve permission sharing for enterprise compliance.

Features are just hypotheses.
The outcome is the only thing that matters.`,

      `A user interview rule that changed how I build products:

Never ask: "Would you like a feature that does X?"
They will always say yes. It costs them nothing to agree with you.

Ask instead:
"Show me the last time you tried to solve this. What tab was open? What broke?"

If they haven't cobbled together an ugly workaround (spreadsheets, Zapier, manual copy-pasting), the problem isn't painful enough for them to pay you to fix it.`
    ]
  }
];

export const SAMPLE_INPUTS = [
  {
    id: 'input-voice-incident',
    title: '🎙️ Voice Note: False Health Check Incident',
    type: 'voice_transcript',
    badge: 'Raw Voice Note Transcript (Messy speech)',
    content: `Um, so hey, recording this quickly while walking back from our post-mortem meeting. Basically yesterday our entire webhook processing pipeline was dead for like 45 minutes during peak hours. And the crazy thing is, our Datadog monitors stayed completely green the whole time! Everyone on the on-call channel thought everything was fine because our health check endpoint was just returning HTTP 200 without actually verifying if Redis was accepting connection queues. So the server was healthy, but zero jobs were running. Customers were emailing support while we were drinking coffee thinking uptime was 100%. The takeaway here is that superficial health checks are worse than no health checks at all, because they give you false confidence. A health check has to simulate a real unit of work or it's just lying to you.`
  },
  {
    id: 'input-notes-pricing',
    title: '📝 Brain Dump: Why We Killed Free Trials',
    type: 'brain_dump',
    badge: 'Rough Notes & Bullet Points',
    content: `rough notes on our switch from 14-day free trial to paid pilot:
- free trial users were treating our software like a toy, never inviting team members
- support tickets were 80% free users demanding enterprise custom features
- conversion rate was pathetic (under 2.1%)
- last month we required $500 refundable deposit for a guided 14-day implementation pilot
- signups dropped by 60%, BUT trial-to-paid conversion jumped to 48%
- revenue grew 3x because only serious buyers signed up
- lesson: friction isn't always bad. Filtering for buyer intent upfront saves hundreds of wasted support hours.`
  },
  {
    id: 'input-transcript-delegation',
    title: '🎙️ Voice Memo: The Micromanagement Trap',
    type: 'voice_transcript',
    badge: 'Raw Voice Memo (Reflective)',
    content: `quick reflection on my first year leading an engineering squad. When I was a solo contributor I was fast, so when I became a lead, every time a junior developer got stuck on an architecture problem, I would just take the ticket and code it myself over the weekend. I told myself I was being helpful and keeping velocity high. But 6 months in, I was working 70-hour weeks, totally exhausted, and my team was actually getting LESS confident because they felt I didn't trust them with critical systems. Real delegation hurts because you have to sit on your hands and let someone do something 80% as well as you would have done it, so that in six months they can do it 120% better than you.`
  }
];

export const BANNED_AI_WORDS = [
  'delve',
  'supercharge',
  'game-changer',
  'gamechanger',
  'testament',
  'pivotal',
  'synergy',
  'paradigm shift',
  'in today\'s fast-paced world',
  'in today\'s digital landscape',
  'thrilled to announce',
  'humbled and honored',
  'excited to share',
  'unlock your potential',
  'revolutionize',
  'seamlessly',
  'ever-evolving',
  'tapestry',
  'beacon',
  'furthermore',
  'moreover',
  'dive deep',
  'at the end of the day',
  'without further ado'
];
