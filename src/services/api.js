// In production (Netlify), calls the serverless function.
// In local dev, calls Groq directly (key is in VITE_ env).
const IS_DEV = import.meta.env.DEV;
const API_ENDPOINT = '/.netlify/functions/check';
const GROQ_KEY = import.meta.env.VITE_GROQ_API_KEY;

const SYSTEM_PROMPT = `You are LegalCheck, an AI legal assistant that helps everyday people instantly understand if their situation involves illegal activity or a violation of their rights.

Your personality: Clear, calm, direct — like a smart friend who knows the law. Never vague. Empathetic. Confident but honest about limitations.

ALWAYS respond in this exact format, no exceptions:

---
[VERDICT EMOJI] VERDICT: [Likely Illegal / Gray Area / Likely Legal]

📋 WHAT'S HAPPENING:
[2-3 sentences explaining the situation in plain language]

⚖️ THE LAW SAYS:
[Specific law or regulation relevant to the user's jurisdiction. Example (USA): Under the Fair Housing Act (42 U.S.C. § 3604)... Example (UK): Under the Employment Rights Act 1996 section 1... Be specific.]

🚨 SEVERITY: [Low / Medium / High / Urgent]
[One sentence explaining why]

✅ YOUR ACTION STEPS:
1. [Do this right now]
2. [Do this next]
3. [Do this if it escalates]
4. [Final option]

👨‍💼 DO YOU NEED A LAWYER?
[Yes / No / Maybe] — [One clear sentence why]

🔓 LEGAL ALTERNATIVE EXISTS: [Yes / No]
[If Yes: One teaser sentence hinting at the legal method. Do NOT reveal the full method.]

⚠️ DISCLAIMER: This is for informational purposes only and does not constitute legal advice.
---

Verdict emoji rules: 🔴 = Likely Illegal, 🟡 = Gray Area, 🟢 = Likely Legal
If situation is unclear ask ONE clarifying question before giving verdict.`;

// ── Direct Groq call (dev only) ───────────────────────────
async function callGroqDirect(userContent, systemOverride) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_KEY}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      temperature: 0.2,
      max_tokens: 1024,
      messages: [
        { role: 'system', content: systemOverride || SYSTEM_PROMPT },
        { role: 'user', content: userContent }
      ]
    })
  });
  if (!res.ok) throw new Error('API_FAILED');
  const data = await res.json();
  return data.choices[0]?.message?.content || '';
}

function validateResponse(text) {
  return text.includes('VERDICT:') && text.includes('LAW SAYS') && text.includes('ACTION STEPS');
}

// ── Response parsers ──────────────────────────────────────
function extract(text, start, ...ends) {
  const idx = text.indexOf(start);
  if (idx === -1) return '';
  let chunk = text.slice(idx + start.length);
  for (const end of ends) {
    const ei = chunk.indexOf(end);
    if (ei !== -1) chunk = chunk.slice(0, ei);
  }
  return chunk.trim();
}

export function parseVerdictText(text) {
  const verdictMatch = text.match(/VERDICT:\s*(.+)/);
  const verdictLine = verdictMatch ? verdictMatch[1].trim() : '';
  const verdictType = text.includes('🔴') ? '🔴 Likely Illegal'
    : text.includes('🟡') ? '🟡 Gray Area'
    : text.includes('🟢') ? '🟢 Likely Legal'
    : verdictLine;

  const sevMatch = text.match(/SEVERITY:\s*(Low|Medium|High|Urgent)/i);
  const severity = sevMatch ? sevMatch[1] : 'Unknown';

  const stepsRaw = extract(text, "YOUR ACTION STEPS:", "DO YOU NEED A LAWYER");
  const actionSteps = stepsRaw.split('\n').map(l => l.trim()).filter(l => /^\d+\./.test(l)).map(l => l.replace(/^\d+\.\s*/, ''));

  const altRaw = extract(text, "LEGAL ALTERNATIVE EXISTS:", "DISCLAIMER");
  const legalAlternativeExists = altRaw.toLowerCase().startsWith('yes');
  const altLines = altRaw.split('\n').map(l => l.trim()).filter(Boolean);
  const legalAlternativeTeaser = altLines.length > 1 ? altLines.slice(1).join(' ') : '';

  return {
    verdict: verdictType,
    whatsHappening: extract(text, "WHAT'S HAPPENING:", "THE LAW SAYS"),
    theLawSays: extract(text, "THE LAW SAYS:", "SEVERITY"),
    severity,
    actionSteps: actionSteps.length ? actionSteps : ['Review your situation carefully', 'Seek professional advice'],
    needLawyer: extract(text, "DO YOU NEED A LAWYER?", "LEGAL ALTERNATIVE"),
    legalAlternativeExists,
    legalAlternativeTeaser
  };
}

export function parseAlternativeText(text) {
  return {
    theWay: extract(text, "THE LEGAL WAY TO DO THIS:", "WHAT YOU'LL NEED"),
    whatYouNeed: extract(text, "WHAT YOU'LL NEED:", "HOW LONG IT TAKES"),
    howLong: extract(text, "HOW LONG IT TAKES:", "WHAT IT MIGHT COST"),
    cost: extract(text, "WHAT IT MIGHT COST:", "WATCH OUT FOR"),
    watchOut: extract(text, "WATCH OUT FOR:", "HOW YOU CAN BENEFIT"),
    potentialBenefit: extract(text, "HOW YOU CAN BENEFIT:", "ESTIMATED LAWSUIT WINNINGS"),
    lawsuitWinnings: extract(text, "ESTIMATED LAWSUIT WINNINGS:")
  };
}

// ── API calls ─────────────────────────────────────────────
export async function getVerdict(situation, region = 'USA') {
  let text;
  const userPrompt = `JURISDICTION: ${region}
SITUATION: ${situation}

Analyze this situation specifically under ${region} law. Cite relevant statutes, acts, or regulations from ${region}.`;

  if (IS_DEV && GROQ_KEY) {
    // Direct call in dev
    text = await callGroqDirect(userPrompt);
    if (!validateResponse(text)) {
      text = await callGroqDirect(userPrompt); // silent retry
    }
    if (!validateResponse(text)) throw new Error('INVALID_FORMAT');
  } else {
    // Netlify function in prod
    const res = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ situation: userPrompt, type: 'check' })
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || 'API_FAILED');
    }
    const data = await res.json();
    text = data.text;
  }

  return parseVerdictText(text);
}

export async function getLegalAlternative(situation, verdict, region = 'USA') {
  const prompt = `JURISDICTION: ${region}
The user's situation was: ${situation}
Your previous verdict was: ${verdict}

Now give them the legal way to accomplish their goal under ${region} law.

Respond in this exact format:

🔓 THE LEGAL WAY TO DO THIS:
[Clear step by step explanation]

📝 WHAT YOU'LL NEED:
[Documents or processes required]

⏱️ HOW LONG IT TAKES:
[Realistic timeline]

💰 WHAT IT MIGHT COST:
[Free / filing fees / estimated cost]

⚠️ WATCH OUT FOR:
[Common mistakes people make]

🎁 HOW YOU CAN BENEFIT:
[Explain the benefits of following the legal path or resolving the situation correctly]

💵 ESTIMATED LAWSUIT WINNINGS:
[Provide a realistic estimate of potential damages, settlements, or compensation based on statutes and precedents in ${region}. Use currency symbols relevant to ${region}.]`;

  let text;

  if (IS_DEV && GROQ_KEY) {
    text = await callGroqDirect(prompt, 'You are LegalCheck, a legal assistant.');
  } else {
    const res = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ situation: prompt, type: 'alternative' })
    });
    if (!res.ok) throw new Error('API_FAILED');
    const data = await res.json();
    text = data.text;
  }

  return parseAlternativeText(text);
}

// ── Gumroad license validation ────────────────────────────
export async function validateGumroadLicense(licenseKey, productPermalink) {
  const res = await fetch('https://api.gumroad.com/v2/licenses/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      product_permalink: productPermalink,
      license_key: licenseKey
    })
  });
  const data = await res.json();
  if (!data.success) throw new Error('INVALID_KEY');
  return data;
}
