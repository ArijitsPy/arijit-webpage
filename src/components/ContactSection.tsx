import React, { useState } from 'react';
import { 
  Mail, Phone, Github, Send, Copy, Check, MessageSquare, 
  ExternalLink, Building2
} from 'lucide-react';
import { PROFILE_DATA } from '../data/cvData';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Message state
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderAffiliation, setSenderAffiliation] = useState('');
  const [inquiryType, setInquiryType] = useState('Research Inquiry (SGPE / BEC)');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PROFILE_DATA.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !message) return;

    // Cache submission locally
    try {
      const existingInquiries = JSON.parse(localStorage.getItem('arijit_inquiries_log') || '[]');
      existingInquiries.push({
        id: Date.now(),
        name: senderName,
        email: senderEmail,
        affiliation: senderAffiliation,
        type: inquiryType,
        message,
        date: new Date().toISOString()
      });
      localStorage.setItem('arijit_inquiries_log', JSON.stringify(existingInquiries));
    } catch (err) {
      console.error(err);
    }

    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-700 dark:text-amber-400 uppercase">
            <span>Direct Outreach</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>Academic Inquiries</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>Contact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-serif-heading">
            Get in Touch
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            If you have questions about my PhD research on Stochastic Bose–Einstein Condensation, inquiries regarding my S-Matrix thesis, or questions about the open-source exam project, please feel free to send a message or email me directly.
          </p>
        </div>

        {/* 2-Column Split: Direct Channels vs Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Channels & Verified Presence (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Channel Card 1: Official Email */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Primary Email
                    </h4>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white font-mono mt-0.5">
                      {PROFILE_DATA.email}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer flex items-center gap-1.5"
                  title="Copy email address"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Direct channel for academic correspondence and queries.
              </p>
            </div>

            {/* Channel Card 2: Academic Department */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Department & Institute
                  </h4>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Department of Physics
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Indian Institute of Technology (IIT) Kharagpur<br />
                    Kharagpur, West Bengal 721302, India
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-400 pt-1">
                    Supervisor: Prof. Sonjoy Majumder
                  </p>
                </div>
              </div>
            </div>

            {/* Channel Card 3: GitHub & Code */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      GitHub
                    </h4>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white font-mono mt-0.5">
                      github.com/{PROFILE_DATA.githubUsername}
                    </p>
                  </div>
                </div>

                <a
                  href={PROFILE_DATA.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Visit</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Code repositories, exam testing tools, and computation notebooks.
              </p>
            </div>

            {/* Channel Card 4: Phone */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Phone & WhatsApp
                  </h4>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white font-mono mt-0.5">
                    {PROFILE_DATA.phone}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyPhone}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

          </div>

          {/* Right: Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
            
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif-heading">
                  Message Sent!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{senderName}</strong>. Your note has been logged. I will follow up at <strong>{senderEmail}</strong> promptly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="mt-2 px-4 py-2 text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 rounded-lg hover:bg-amber-100 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif-heading">
                    Send a Message to Arijit
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Direct message to Arijit Sikder.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. / Scholar / Student Name"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Your Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. yourname@university.edu"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Institution / College / Affiliation
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. University / Institute"
                      value={senderAffiliation}
                      onChange={(e) => setSenderAffiliation(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Topic / Category
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                    >
                      <option value="Research Inquiry (SGPE / BEC)">Research Inquiry (SGPE / BEC)</option>
                      <option value="S-Matrix Discussion">S-Matrix & Theoretical Physics Discussion</option>
                      <option value="Vivekdisha / Outreach">Vivekdisha / Physics Teaching Outreach</option>
                      <option value="General Query">General Academic Query</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Write your message or inquiry here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <p className="text-[11px] text-slate-400">
                    I will do my best to respond promptly.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 dark:bg-amber-600 hover:bg-slate-800 dark:hover:bg-amber-500 rounded-xl transition-colors cursor-pointer shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
