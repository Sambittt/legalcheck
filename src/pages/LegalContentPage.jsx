import React from 'react';

const CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'May 7, 2026',
    sections: [
      {
        h: '1. Information We Collect',
        p: 'We collect the legal situations you describe to provide our AI analysis. If you sign in, we store your email address and plan status. We do not sell your personal data to third parties.'
      },
      {
        h: '2. Data Usage',
        p: 'Your descriptions are processed by Groq Cloud (AI engine) to generate legal information. This data is not used to train global AI models without your consent.'
      },
      {
        h: '3. Data Security',
        p: 'We use industry-standard 256-bit AES encryption. While we take reasonable steps to secure your data, no internet transmission is 100% secure.'
      }
    ]
  },
  terms: {
    title: 'Terms of Service',
    lastUpdated: 'May 7, 2026',
    sections: [
      {
        h: '1. Not Legal Advice',
        p: 'LegalCheck is an AI-powered information service. It does not provide legal advice, and its use does not create an attorney-client relationship. Always consult a licensed attorney.'
      },
      {
        h: '2. Disclaimer of Accuracy',
        p: 'Laws change frequently. While we strive for accuracy, LegalCheck does not guarantee the completeness or correctness of the information provided.'
      },
      {
        h: '3. Payments & Refunds',
        p: 'Payments for one-time checks or lifetime access are processed via Gumroad. Refunds are handled on a case-by-case basis if the AI provides a malformed response.'
      }
    ]
  }
};

export default function LegalContentPage({ type }) {
  const data = CONTENT[type];

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="fade-in-up">
          <h1 className="hero-h1" style={{ fontSize: '2.5rem' }}>{data.title}</h1>
          <p className="check-sub">Last updated: {data.lastUpdated}</p>
          <div className="divider" style={{ margin: '32px 0' }} />
          
          <div className="legal-body">
            {data.sections.map((s, i) => (
              <div key={i} style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--text)' }}>{s.h}</h2>
                <p style={{ color: 'var(--text2)', lineHeight: '1.7' }}>{s.p}</p>
              </div>
            ))}
          </div>

          <div className="disclaimer" style={{ marginTop: '60px' }}>
            Questions? Contact support at legalcheck.ai@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
}
