import React, { useEffect, useState } from 'react';
import {
  MessageSquare,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Settings,
  Inbox,
  Calendar,
  X
} from 'lucide-react';
import { AgencyConfig, InquiryRecord } from '../types';

interface ContactSectionProps {
  config: AgencyConfig;
  selectedService: string;
  selectedBusinessType: string;
  prefillNote: string;
  onSaveConfig: (updated: Partial<AgencyConfig>) => Promise<void>;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  config,
  selectedService,
  selectedBusinessType,
  prefillNote,
  onSaveConfig
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessType, setBusinessType] = useState(
    selectedBusinessType || 'Restaurant / Fine Dining'
  );
  const [service, setService] = useState(
    selectedService || 'Restaurant Website Design'
  );
  const [budget, setBudget] = useState('Standard Business Build — Request Custom Quote');
  const [description, setDescription] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedRecord, setSubmittedRecord] = useState<InquiryRecord | null>(null);

  // Editable Contact Placeholders state
  const [editingContacts, setEditingContacts] = useState(false);
  const [draftWhatsapp, setDraftWhatsapp] = useState(config.whatsappNumber);
  const [draftEmail, setDraftEmail] = useState(config.contactEmail);
  const [savingContact, setSavingContact] = useState(false);

  // Backend Inbox Drawer state
  const [inboxOpen, setInboxOpen] = useState(false);
  const [inquiriesList, setInquiriesList] = useState<InquiryRecord[]>([]);
  const [loadingInbox, setLoadingInbox] = useState(false);

  useEffect(() => {
    if (selectedService) {
      setService(selectedService);
    }
  }, [selectedService]);

  useEffect(() => {
    if (selectedBusinessType) {
      setBusinessType(selectedBusinessType);
    }
  }, [selectedBusinessType]);

  useEffect(() => {
    if (prefillNote) {
      setDescription(prefillNote);
    }
  }, [prefillNote]);

  const fetchInquiries = async () => {
    setLoadingInbox(true);
    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const data = await res.json();
        setInquiriesList(data.inquiries || []);
      }
    } catch {
      // ignore
    } finally {
      setLoadingInbox(false);
    }
  };

  const handleOpenInbox = () => {
    setInboxOpen(true);
    fetchInquiries();
  };

  const handleSaveContacts = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingContact(true);
    await onSaveConfig({
      whatsappNumber: draftWhatsapp,
      contactEmail: draftEmail
    });
    setSavingContact(false);
    setEditingContacts(false);
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (name.trim().length < 2) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (description.trim().length < 10) {
      setErrorMsg(
        'Please include a brief project description (at least 10 characters) so we can prepare for your consultation.'
      );
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          businessType,
          service,
          budget,
          description
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Could not submit inquiry. Please check your inputs.');
      } else {
        setSubmittedRecord(data.inquiry);
        setName('');
        setEmail('');
        setPhone('');
        setDescription('');
      }
    } catch {
      setErrorMsg('Unable to reach the server. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const cleanWhatsappDigits = config.whatsappNumber.replace(/[^\d]/g, '') || '15550192834';
  const whatsappUrl = `https://wa.me/${cleanWhatsappDigits}?text=${encodeURIComponent(
    `Hello NovaAI! I'm interested in ${service} for my ${businessType}.`
  )}`;

  return (
    <section id="contact" className="py-24 relative border-b border-white/10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left 5 Columns: Direct Contact Channels, Editable Placeholders & Consultation CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs font-medium tracking-wider text-violet-300 mb-3">
                Contact & Lead Generation · Start Your Project
              </p>
              <h2
                className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight mb-4"
                style={{ textWrap: 'balance' }}
              >
                Book Your Free Consultation or Request a Custom Quote
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Tell us about your restaurant, e-commerce brand, or local business. Inquiries submitted through this form are validated and saved directly to our agency backend server.
              </p>
            </div>

            {/* Book a Free Consultation CTA Box */}
            <div className="rounded-2xl bg-gradient-to-br from-[#161A3A] to-[#0C0F24] border border-violet-400/35 p-6">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-violet-300 mb-2">
                <Calendar className="w-4 h-4" />
                <span>Complimentary Discovery Session</span>
              </div>
              <h3 className="text-lg font-display font-bold text-white mb-2">
                {config.consultationHeading}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                We review your current online presence, walk through live sample demos relevant to your industry, and outline a realistic build timeline.
              </p>
              <button
                type="button"
                onClick={() => {
                  setDescription(
                    'I would like to book a Free 30-Minute Consultation Call to discuss my business website / automation goals.'
                  );
                  const el = document.getElementById('inquiry-name-input');
                  el?.focus();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Book a Free Consultation
              </button>
            </div>

            {/* Direct WhatsApp & Email Links + Editable Placeholder Controls */}
            <div className="rounded-2xl bg-[#0D1025] border border-white/10 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-display font-bold text-white">
                  Direct Agency Contact Channels
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setDraftWhatsapp(config.whatsappNumber);
                    setDraftEmail(config.contactEmail);
                    setEditingContacts(!editingContacts);
                  }}
                  className="text-xs text-violet-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>{editingContacts ? 'Cancel Edit' : 'Edit Contact Info'}</span>
                </button>
              </div>

              {editingContacts ? (
                <form onSubmit={handleSaveContacts} className="space-y-3 pt-2 border-t border-white/10">
                  <p className="text-[11px] text-slate-400">
                    Update your agency WhatsApp number and email placeholder below. Changes save to the backend server.
                  </p>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      Your WhatsApp Number (International digits, e.g. 15550192834)
                    </label>
                    <input
                      type="text"
                      value={draftWhatsapp}
                      onChange={(e) => setDraftWhatsapp(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#080A18] border border-white/15 text-xs text-white font-mono-tabular"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      Your Agency Contact Email
                    </label>
                    <input
                      type="email"
                      value={draftEmail}
                      onChange={(e) => setDraftEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#080A18] border border-white/15 text-xs text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={savingContact}
                    className="w-full py-2 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs cursor-pointer"
                  >
                    {savingContact ? 'Saving...' : 'Save Contact Details'}
                  </button>
                </form>
              ) : (
                <div className="space-y-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/35 text-emerald-200 flex items-center justify-between text-xs font-semibold transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      <span>Chat on WhatsApp (+{cleanWhatsappDigits})</span>
                    </span>
                    <span className="text-[11px] text-emerald-300">Open Chat →</span>
                  </a>

                  <a
                    href={`mailto:${config.contactEmail}?subject=${encodeURIComponent(
                      'NovaAI Project Inquiry'
                    )}`}
                    className="w-full py-3 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-200 flex items-center justify-between text-xs font-semibold transition-colors"
                  >
                    <span className="flex items-center gap-2.5 truncate pr-2">
                      <Mail className="w-4 h-4 text-violet-300 shrink-0" />
                      <span className="truncate">{config.contactEmail}</span>
                    </span>
                    <span className="text-[11px] text-violet-300 shrink-0">Email Us →</span>
                  </a>

                  <p className="text-[11px] text-slate-400">
                    Using editable contact placeholders. Click &ldquo;Edit Contact Info&rdquo; above to set your personal WhatsApp number and email.
                  </p>
                </div>
              )}

              {/* Server Inquiry Verification Trigger */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">Backend Lead Storage</span>
                <button
                  type="button"
                  onClick={handleOpenInbox}
                  className="text-xs font-medium text-violet-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <Inbox className="w-3.5 h-3.5" />
                  <span>View Submitted Inquiries</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right 7 Columns: Validated Project Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#0D1025]/90 backdrop-blur-xl border border-white/15 p-7 sm:p-9 shadow-2xl shadow-black/60">
              <div className="mb-6 pb-4 border-b border-white/10">
                <h3 className="text-xl font-display font-bold text-white mb-1">
                  Project Scope & Consultation Inquiry Form
                </h3>
                <p className="text-xs text-slate-400">
                  All fields marked with * are required and validated before backend storage.
                </p>
              </div>

              {errorMsg && (
                <div
                  role="alert"
                  className="mb-6 p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200 flex items-start gap-2.5"
                >
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {submittedRecord ? (
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-mono-tabular text-emerald-300 block mb-1">
                        Backend Delivery Confirmed · Reference #{submittedRecord.id}
                      </span>
                      <h4 className="text-lg font-display font-bold text-white">
                        Thank You, {submittedRecord.name}! Your Inquiry Has Been Recorded.
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                        We have saved your project brief for <strong>{submittedRecord.service}</strong> ({submittedRecord.businessType}) on the NovaAI server.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#080A18] border border-white/10 text-xs space-y-1.5 font-mono-tabular text-slate-300">
                    <p>Reference ID: {submittedRecord.id}</p>
                    <p>Contact Email: {submittedRecord.email}</p>
                    <p>Selected Service: {submittedRecord.service}</p>
                    <p>Budget Scope: {submittedRecord.budget}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setSubmittedRecord(null)}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                    <button
                      type="button"
                      onClick={handleOpenInbox}
                      className="px-4 py-2 rounded-xl bg-violet-600/25 border border-violet-400/40 text-violet-200 text-xs font-semibold cursor-pointer"
                    >
                      Verify in Server Inbox
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitInquiry} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="inquiry-name-input"
                        className="block text-xs font-semibold text-slate-200 mb-1.5"
                      >
                        Your Full Name *
                      </label>
                      <input
                        id="inquiry-name-input"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Marco Bellini"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#080A18] border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-400"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-email-input"
                        className="block text-xs font-semibold text-slate-200 mb-1.5"
                      >
                        Email Address *
                      </label>
                      <input
                        id="inquiry-email-input"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="marco@restaurant-example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#080A18] border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="inquiry-business-type"
                        className="block text-xs font-semibold text-slate-200 mb-1.5"
                      >
                        Business Type *
                      </label>
                      <select
                        id="inquiry-business-type"
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#080A18] border border-white/15 text-sm text-white focus:outline-none focus:border-violet-400"
                      >
                        <option>Restaurant / Fine Dining</option>
                        <option>Café / Bakery / Roastery</option>
                        <option>E-Commerce / Retail Brand</option>
                        <option>Salon / Spa / Wellness Studio</option>
                        <option>Real Estate Agency</option>
                        <option>Local Service Business</option>
                        <option>International Corporate / Agency</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-service"
                        className="block text-xs font-semibold text-slate-200 mb-1.5"
                      >
                        Required Service *
                      </label>
                      <select
                        id="inquiry-service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#080A18] border border-white/15 text-sm text-white focus:outline-none focus:border-violet-400"
                      >
                        <option>Business Website Development</option>
                        <option>Restaurant Website Design</option>
                        <option>Shopify Store Development</option>
                        <option>WhatsApp Chatbot Automation</option>
                        <option>Full Digital Upgrade Bundle</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="inquiry-budget"
                        className="block text-xs font-semibold text-slate-200 mb-1.5"
                      >
                        Budget Range / Scope *
                      </label>
                      <select
                        id="inquiry-budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#080A18] border border-white/15 text-sm text-white focus:outline-none focus:border-violet-400"
                      >
                        <option>Starter Scope — Essential Web Presence</option>
                        <option>Standard Business Build — Request Custom Quote</option>
                        <option>Comprehensive Storefront + Chatbot Bundle</option>
                        <option>Not Sure Yet — Advise on Free Consultation Call</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-phone"
                        className="block text-xs font-semibold text-slate-200 mb-1.5"
                      >
                        WhatsApp or Phone Number (Optional)
                      </label>
                      <input
                        id="inquiry-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 234-5678"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#080A18] border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-description"
                      className="block text-xs font-semibold text-slate-200 mb-1.5"
                    >
                      Project Description & Goals *
                    </label>
                    <textarea
                      id="inquiry-description"
                      rows={4}
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Tell us about your business, key pages or products you want to showcase, and your desired launch timeframe..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#080A18] border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold text-sm transition-all shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>
                      {submitting
                        ? 'Validating & Submitting Inquiry...'
                        : 'Submit Project Inquiry & Request Quote'}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Backend Submitted Inquiries Modal */}
      {inboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Submitted Inquiries Server Inbox"
        >
          <div className="w-full max-w-2xl rounded-2xl bg-[#0D1025] border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="px-6 py-4 bg-[#080A18] border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-base font-display font-bold text-white">
                  NovaAI Server Inquiry Inbox ({inquiriesList.length})
                </h3>
                <p className="text-xs text-slate-400">
                  Real lead records persisted via POST /api/inquiries
                </p>
              </div>
              <button
                type="button"
                onClick={() => setInboxOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 cursor-pointer"
                aria-label="Close Inbox"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              {loadingInbox ? (
                <p className="text-xs text-slate-400">Loading stored inquiries from server...</p>
              ) : inquiriesList.length === 0 ? (
                <p className="text-xs text-slate-400 py-8 text-center">
                  No inquiries submitted yet. Submit the form to test real backend storage.
                </p>
              ) : (
                inquiriesList.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-[#080A18] border border-white/10 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono-tabular font-semibold text-violet-300">
                        {item.id}
                      </span>
                      <span className="font-mono-tabular text-slate-400">
                        {new Date(item.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-white">
                      {item.name} · <span className="text-slate-300 font-normal">{item.email}</span>
                    </p>
                    <p className="text-slate-300">
                      {item.businessType} · {item.service} · {item.budget}
                    </p>
                    <p className="text-slate-400 pt-1 border-t border-white/10">
                      {item.description}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
