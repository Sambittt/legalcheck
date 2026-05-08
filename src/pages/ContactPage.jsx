import React, { useState } from 'react';
import { Mail, MessageSquare, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Get in Touch</div>
            <h1 className="section-h2">We're Here to Help</h1>
            <p className="section-sub">Have questions about our AI reports or need technical support? Drop us a message.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '80px', maxWidth: '1100px', margin: '0 auto' }}>
            <div className="fade-in-up">
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '24px' }}>Contact Information</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--bg2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
                      <Mail className="text-accent" size={20} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>Email Us</p>
                      <p style={{ color: 'var(--text3)', fontSize: '0.9rem' }}>legalcheck.ai@gmail.com</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--bg2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
                      <Clock className="text-accent" size={20} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>Response Time</p>
                      <p style={{ color: 'var(--text3)', fontSize: '0.9rem' }}>Within 24 hours (Mon-Fri)</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--bg2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
                      <MessageSquare className="text-accent" size={20} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>Live Support</p>
                      <p style={{ color: 'var(--text3)', fontSize: '0.9rem' }}>Available for Premium members</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass" style={{ padding: '40px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <CheckCircle2 size={64} className="text-green" style={{ marginBottom: '24px' }} />
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--text3)' }}>Thank you for reaching out. Our team will get back to you shortly.</p>
                  <button className="btn btn-secondary" style={{ marginTop: '32px' }} onClick={() => setSubmitted(false)}>Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600 }}>Name</label>
                      <input type="text" required style={{ width: '100%', padding: '12px', borderRadius: 'var(--r)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600 }}>Email</label>
                      <input type="email" required style={{ width: '100%', padding: '12px', borderRadius: 'var(--r)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
                    </div>
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600 }}>Subject</label>
                    <select style={{ width: '100%', padding: '12px', borderRadius: 'var(--r)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}>
                      <option>General Inquiry</option>
                      <option>Technical Support</option>
                      <option>Billing Question</option>
                      <option>Partnership</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: '32px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600 }}>Message</label>
                    <textarea required rows={5} style={{ width: '100%', padding: '12px', borderRadius: 'var(--r)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Send Message <ArrowRight size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
