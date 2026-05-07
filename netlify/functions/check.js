import Groq from 'groq-sdk';

const SYSTEM_PROMPT = `You are LegalCheck, an AI legal assistant that helps everyday people instantly understand if their situation involves illegal activity or a violation of their rights.

Your personality: Clear, calm, direct — like a smart friend who knows the law. Never vague. Empathetic. Confident but honest about limitations.

ALWAYS respond in this exact format, no exceptions:

---
[VERDICT EMOJI] VERDICT: [Likely Illegal / Gray Area / Likely Legal]

📋 WHAT'S HAPPENING:
[2-3 sentences explaining the situation in plain language]

⚖️ THE LAW SAYS:
[Specific law or regulation. Example: Under the Fair Housing Act (42 U.S.C. § 3604)... Be specific.]

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

⚠️ DISCLAIMER: This is for informational purposes only and does not constitute legal advice. Consult a qualified attorney for advice specific to your situation.
---

Verdict emoji rules:
🔴 = Likely Illegal
🟡 = Gray Area
🟢 = Likely Legal

Default to US law. If user mentions another country adapt accordingly.
If situation is unclear ask ONE clarifying question before giving verdict.`;

const LEGAL_ALT_PROMPT = (situation, verdict) =>
  `The user's situation was: ${situation}
Your previous verdict was: ${verdict}

Now give them the legal way to accomplish their goal.

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
[Common mistakes people make]`;

function validateResponse(text) {
  return text.includes('VERDICT:') && text.includes('THE LAW SAYS:') && text.includes('ACTION STEPS:');
}

export default async function handler(req, context) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const { situation, type = 'check', verdict = '' } = await req.json();

  if (!situation || situation.trim().length < 10) {
    return new Response(JSON.stringify({ error: 'Situation too short' }), { status: 400 });
  }

  const groq = new Groq({ apiKey: process.env.VITE_GROQ_API_KEY });

  const callGroq = async (userContent) => {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      temperature: 0.2,
      max_tokens: 1024,
      messages: [
        { role: 'system', content: type === 'check' ? SYSTEM_PROMPT : 'You are LegalCheck, a legal assistant.' },
        { role: 'user', content: userContent }
      ]
    });
    return completion.choices[0]?.message?.content || '';
  };

  try {
    const userContent = type === 'check' ? situation : LEGAL_ALT_PROMPT(situation, verdict);
    let text = await callGroq(userContent);

    if (type === 'check' && !validateResponse(text)) {
      // Silent retry once
      text = await callGroq(userContent);
      if (!validateResponse(text)) {
        return new Response(JSON.stringify({ error: 'INVALID_FORMAT' }), { status: 422 });
      }
    }

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Groq error:', err);
    return new Response(JSON.stringify({ error: 'API_FAILED' }), { status: 500 });
  }
}
