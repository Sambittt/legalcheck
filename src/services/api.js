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

VERDICT: [Likely Illegal / Gray Area / Likely Legal]

WHAT'S HAPPENING:
[2-3 sentences explaining the situation in plain language]

THE LAW SAYS:
[Specific law or regulation relevant to the user's jurisdiction. Example (USA): Under the Fair Housing Act (42 U.S.C. § 3604)... Example (UK): Under the Employment Rights Act 1996 section 1... Be specific.]

SEVERITY: [Low / Medium / High / Urgent]
[One sentence explaining why]

YOUR ACTION STEPS:
1. [Do this right now]
2. [Do this next]
3. [Do this if it escalates]
4. [Final option]

DO YOU NEED A LAWYER?
[Yes / No / Maybe] — [One clear sentence why]

LEGAL ALTERNATIVE EXISTS: [Yes / No]
[If Yes: One teaser sentence hinting at the legal method. Do NOT reveal the full method.]

DISCLAIMER: This analysis is provided for informational purposes only. It is not legal advice and does not create an attorney-client relationship. Laws vary by jurisdiction and are subject to change. Always consult a licensed attorney.
---

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
      max_tokens: 4096,
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
  const verdictType = verdictLine;

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
    caseStrength: extract(text, "CASE STRENGTH SCORE:", "WIN PROBABILITY"),
    winProbability: extract(text, "WIN PROBABILITY:", "SIMILAR CASES"),
    similarCases: extract(text, "SIMILAR CASES & OUTCOMES:", "DEMAND LETTER DRAFT"),
    demandLetter: extract(text, "DEMAND LETTER DRAFT:", "EVIDENCE CHECKLIST"),
    evidenceChecklist: extract(text, "EVIDENCE CHECKLIST:", "NEGOTIATION PLAYBOOK"),
    negotiationPlaybook: extract(text, "NEGOTIATION PLAYBOOK:", "RISK MATRIX"),
    riskMatrix: extract(text, "RISK MATRIX:", "DEADLINE COUNTDOWN"),
    deadlines: extract(text, "DEADLINE COUNTDOWN:", "ESTIMATED SETTLEMENT VALUE"),
    settlementValue: extract(text, "ESTIMATED SETTLEMENT VALUE:", "LAWYER COST ESTIMATOR"),
    lawyerCost: extract(text, "LAWYER COST ESTIMATOR:", "STEP-BY-STEP LEGAL RESOLUTION"),
    theWay: extract(text, "STEP-BY-STEP LEGAL RESOLUTION:", "COMMON MISTAKES TO AVOID"),
    watchOut: extract(text, "COMMON MISTAKES TO AVOID:")
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

You are now generating the PREMIUM LEGAL INTELLIGENCE REPORT. This is a paid product. Be extremely thorough, specific, and actionable. Use real statutes, real precedent names, and real dollar figures. Do NOT be vague. Every section must feel like it was written by a $500/hr attorney.

Respond in this EXACT format (use every section header exactly as shown):

📊 CASE STRENGTH SCORE:
Rate the strength of the user's legal position on a scale of 1-100. Format: "[SCORE]/100 — [RATING]" where RATING is Weak (1-30), Moderate (31-60), Strong (61-80), or Very Strong (81-100). Then explain in 2-3 sentences WHY this score, referencing specific legal factors. List 3 STRENGTHS and 3 WEAKNESSES of their position as bullet points.

📈 WIN PROBABILITY:
Give a specific percentage (e.g., "72%") for how likely they would win if this went to court or a formal complaint in ${region}. Then explain: what factors increase their chances and what factors decrease them. Reference jurisdiction-specific precedent patterns.

📁 SIMILAR CASES & OUTCOMES:
Describe 2-3 real-world cases or typical case patterns in ${region} that are similar to this situation. For EACH case, provide: the case name or description, what happened, and the outcome (especially any monetary award). Use this format:
• Case 1: [Name/Description] — Outcome: [result and amount]
• Case 2: [Name/Description] — Outcome: [result and amount]

📝 DEMAND LETTER DRAFT:
Write a professional, ready-to-send demand letter template for this specific situation. Include: the legal basis, what the user is demanding, a deadline, and consequences of non-compliance. Make it sound like a real attorney wrote it. Use formal legal language. The user should be able to copy-paste this and send it.

📋 EVIDENCE CHECKLIST:
List 8-12 specific pieces of evidence the user should collect RIGHT NOW to strengthen their case. Be very specific (e.g., "Screenshot of text message from [date]" not just "messages"). Prioritize them with [CRITICAL], [IMPORTANT], or [HELPFUL] tags.

🎯 NEGOTIATION PLAYBOOK:
Provide 5 specific negotiation tactics for this situation:
1. Opening move — what to say/do first
2. Leverage points — what gives them power
3. Walk-away number — minimum acceptable outcome
4. Escalation strategy — if negotiation fails
5. Settlement sweet spot — the most likely agreeable range

⚖️ RISK MATRIX:
Create a clear comparison:
• IF YOU DO NOTHING: [specific consequences with timeline]
• IF YOU SEND A DEMAND LETTER: [likely outcome]
• IF YOU FILE A FORMAL COMPLAINT: [likely outcome and timeline]
• IF YOU HIRE A LAWYER AND SUE: [likely outcome, timeline, and cost vs reward]

⏰ DEADLINE COUNTDOWN:
List ALL relevant legal deadlines and statutes of limitations for this situation in ${region}. For each: what the deadline is, how long they have, and what happens if they miss it. Be specific with timeframes.

💰 ESTIMATED SETTLEMENT VALUE:
Provide a specific dollar range for potential compensation. Format: "LOW: $[amount] — MID: $[amount] — HIGH: $[amount]". Then break down: compensatory damages, potential punitive damages, statutory damages, attorney fees recovery, and any other applicable damages. Use ${region} currency.

💼 LAWYER COST ESTIMATOR:
Estimate what hiring a lawyer would cost for this type of case in ${region}. Include: hourly rates, contingency fee percentages, flat fee options if applicable, and total estimated legal costs. Also explain whether this case is worth the legal investment.

🔓 STEP-BY-STEP LEGAL RESOLUTION:
Give an extremely detailed, numbered step-by-step plan (8-12 steps) with specific actions, who to contact (include actual agency names and websites for ${region}), forms to file, and expected timelines for each step.

⚠️ COMMON MISTAKES TO AVOID:
List 5-7 critical mistakes people commonly make in this type of situation that could destroy their case. Be specific and explain WHY each mistake is dangerous.`;

  let text;

  if (IS_DEV && GROQ_KEY) {
    text = await callGroqDirect(prompt, `You are LegalCheck Premium, an elite AI legal strategist. You provide the most thorough, specific, and actionable legal intelligence available. Every response must feel like a $500/hr attorney consultation. Never be vague. Always cite specific laws, real precedent patterns, and real dollar figures. You operate in ${region} jurisdiction.`);
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
