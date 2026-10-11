import React, { useState } from 'react';
import { ArrowRight, Edit3, Check, MessageSquare, Info } from 'lucide-react';
import { AgencyConfig, PricingCardConfig } from '../types';

interface PricingSectionProps {
  config: AgencyConfig;
  onSaveConfig: (updated: Partial<AgencyConfig>) => Promise<void>;
  onRequestQuote: (packageName: string, defaultBusinessType?: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  config,
  onSaveConfig,
  onRequestQuote
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draftCards, setDraftCards] = useState<PricingCardConfig[]>(config.pricingCards);
  const [saving, setSaving] = useState(false);

  const handleToggleEdit = async () => {
    if (isEditing) {
      setSaving(true);
      await onSaveConfig({ pricingCards: draftCards });
      setSaving(false);
      setIsEditing(false);
    } else {
      setDraftCards(config.pricingCards);
      setIsEditing(true);
    }
  };

  const updateCardField = (idx: number, field: keyof PricingCardConfig, value: string | string[]) => {
    setDraftCards((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  };

  const cardsToDisplay = isEditing ? draftCards : config.pricingCards;

  return (
    <section id="pricing" className="py-24 relative border-b border-white/10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Section Header + Editable Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wider text-violet-300 mb-3">
              Tailored Project Packages · Custom Quotes
            </p>
            <h2
              className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight mb-4"
              style={{ textWrap: 'balance' }}
            >
              Flexible Packages Scoped to Your Exact Business Goals
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Every business has unique catalog sizes, menu structures, and integration needs. Request a custom quote for any package below, or edit package details directly to customize your agency offering.
            </p>
          </div>

          <button
            type="button"
            onClick={handleToggleEdit}
            disabled={saving}
            className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all flex items-center gap-2 self-start cursor-pointer whitespace-nowrap shrink-0 ${
              isEditing
                ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                : 'bg-white/[0.05] hover:bg-white/[0.1] border-white/15 text-slate-200'
            }`}
          >
            {isEditing ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{saving ? 'Saving Changes...' : 'Save Package Edits'}</span>
              </>
            ) : (
              <>
                <Edit3 className="w-3.5 h-3.5 text-violet-300" />
                <span>Customize Pricing Cards</span>
              </>
            )}
          </button>
        </div>

        {/* Three Editable Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {cardsToDisplay.map((card, idx) => {
            const isHighlighted = idx === 1;
            return (
              <div
                key={card.id}
                className={`rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all ${
                  isHighlighted
                    ? 'bg-gradient-to-b from-[#171B3D] to-[#0D1025] border border-violet-400/50 shadow-2xl shadow-violet-950/40'
                    : 'bg-[#0D1025]/85 border border-white/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono-tabular text-violet-300">
                      0{idx + 1}. Package Scope
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      Custom Quote
                    </span>
                  </div>

                  {isEditing ? (
                    <div className="space-y-3 mb-6">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Package Title</label>
                        <input
                          type="text"
                          value={card.title}
                          onChange={(e) => updateCardField(idx, 'title', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#080A18] border border-violet-400/40 text-sm font-bold text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Subtitle</label>
                        <textarea
                          rows={2}
                          value={card.subtitle}
                          onChange={(e) => updateCardField(idx, 'subtitle', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#080A18] border border-white/15 text-xs text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Ideal Audience</label>
                        <input
                          type="text"
                          value={card.audience}
                          onChange={(e) => updateCardField(idx, 'audience', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#080A18] border border-white/15 text-xs text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">
                          Deliverables (One per line)
                        </label>
                        <textarea
                          rows={5}
                          value={card.deliverables.join('\n')}
                          onChange={(e) =>
                            updateCardField(
                              idx,
                              'deliverables',
                              e.target.value.split('\n').filter((line) => line.trim().length > 0)
                            )
                          }
                          className="w-full px-3 py-1.5 rounded-lg bg-[#080A18] border border-white/15 text-xs text-slate-200"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-2xl font-display font-bold text-white mb-2">
                        {card.title}
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed mb-5">
                        {card.subtitle}
                      </p>

                      <div className="py-4 px-4 rounded-xl bg-white/[0.03] border border-white/10 mb-6">
                        <span className="text-xs text-slate-400 block mb-0.5">Pricing Model</span>
                        <span className="text-lg font-display font-bold text-white">
                          Request a Quote
                        </span>
                        <span className="text-xs text-violet-300 block mt-0.5">
                          {card.timeline}
                        </span>
                      </div>

                      <div className="mb-6">
                        <p className="text-xs font-semibold text-slate-200 mb-3">
                          What Is Included:
                        </p>
                        <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                          {card.deliverables.map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <span className="text-violet-400 font-mono-tabular select-none">
                                —
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>

                <div>
                  <p className="text-xs text-slate-400 pb-4 mb-5 border-b border-white/10">
                    Best for: {card.audience}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      onRequestQuote(
                        card.title === 'Starter Website'
                          ? 'Business Website Development'
                          : card.title === 'Restaurant Website'
                          ? 'Restaurant Website Design'
                          : 'Shopify Store Development',
                        card.title === 'Restaurant Website'
                          ? 'Restaurant / Fine Dining'
                          : card.title === 'Shopify Store'
                          ? 'E-Commerce / Retail Brand'
                          : 'Local Service Business'
                      )
                    }
                    className={`w-full py-3 px-5 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0 ${
                      isHighlighted
                        ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/30'
                        : 'bg-white/[0.08] hover:bg-violet-600 text-white border border-white/15'
                    }`}
                  >
                    <span>Request a Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Separate WhatsApp Chatbot Automation Package */}
        <div className="rounded-2xl bg-gradient-to-r from-[#111736] via-[#151336] to-[#0D1025] border border-violet-400/35 p-7 sm:p-9 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2.5 text-xs font-mono-tabular text-emerald-300 mb-2">
                <MessageSquare className="w-4 h-4" />
                <span>04. Standalone or Add-On Automation Package</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-2">
                {config.chatbotPackage.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-5 max-w-2xl">
                {config.chatbotPackage.subtitle}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {config.chatbotPackage.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                    <span className="text-emerald-400 font-mono-tabular select-none">—</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {config.chatbotPackage.integrationNote}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
              <div className="w-full lg:max-w-[260px] p-5 rounded-xl bg-[#090B1A]/90 border border-white/10">
                <span className="text-xs text-slate-400 block mb-1">Custom Chatbot Scope</span>
                <p className="text-lg font-display font-bold text-white mb-3">
                  Request a Quote
                </p>
                <button
                  type="button"
                  onClick={() => onRequestQuote('WhatsApp Chatbot Automation')}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Inquire About Chatbot Package</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mandatory Transparency Note on Domain, Hosting, Third-Party & Maintenance Costs */}
        <div className="rounded-xl bg-[#0A0D1E] border border-white/10 p-5 sm:p-6 flex items-start gap-3.5">
          <Info className="w-5 h-5 text-violet-300 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong className="text-white font-semibold block mb-1">
              Transparent Note on Third-Party Subscriptions, Hosting & Ongoing Maintenance:
            </strong>
            Project development quotes cover custom design, engineering, testing, and launch setup. Please note that domain name registration, web hosting infrastructure, Shopify monthly platform subscriptions, paid third-party apps or integrations, official WhatsApp Business API conversation/provider charges, and optional ongoing post-launch maintenance plans are billed separately or directly by their respective providers and may incur additional charges.
          </div>
        </div>
      </div>
    </section>
  );
};
