import React, { useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { DemoId, ServiceItem } from '../types';
import { GENERATED_IMAGES, ResilientImage } from './ResilientImage';

export const SERVICES_DATA: (ServiceItem & { previewImage: string; previewAlt: string })[] = [
  {
    id: 'business-website',
    index: '01.',
    title: 'Business Website Development',
    tagline: 'Responsive websites for local businesses, cafés, salons, agencies, and service providers.',
    description:
      'We architect fast, mobile-first websites designed around clear customer journeys, service credibility, and direct lead capture.',
    industries: 'Local Businesses · Cafés · Salons · Real Estate · Service Agencies',
    features: [
      'Custom responsive layouts tailored to your brand identity',
      'Interactive service showcases, photo galleries & location details',
      'Validated inquiry & appointment request forms connected to your inbox',
      'Search engine metadata (SEO), OpenGraph social cards & high speed'
    ],
    demoId: 'urbancafe',
    demoLabel: 'View Urban Café Demo',
    iconType: 'website-cube',
    previewImage: GENERATED_IMAGES.urbanCafeLatte,
    previewAlt: 'Modern specialty café and business website showcase'
  },
  {
    id: 'restaurant-website',
    index: '02.',
    title: 'Restaurant Website Design',
    tagline: 'Digital menus, food galleries, location maps, opening hours, reservation inquiries, and WhatsApp ordering.',
    description:
      'Turn hungry visitors into confirmed diners and takeaway orders with an interactive culinary experience built for smartphones and desktops.',
    industries: 'Fine Dining · Casual Restaurants · Bistros · Cloud Kitchens',
    features: [
      'Filterable digital menus with course categories & dietary indicators',
      'Editorial food photography galleries & chef tasting highlights',
      'Table reservation inquiry system & live opening hours schedule',
      'One-click WhatsApp order summary builder for direct takeaway orders'
    ],
    demoId: 'finedine',
    demoLabel: 'View FineDine Demo',
    iconType: 'restaurant-cloche',
    previewImage: GENERATED_IMAGES.finedineWagyu,
    previewAlt: 'FineDine restaurant digital menu and Wagyu culinary showcase'
  },
  {
    id: 'shopify-store',
    index: '03.',
    title: 'Shopify Store Development',
    tagline: 'Product catalogs, collections, product details, cart functionality, and checkout integration.',
    description:
      'Launch a polished direct-to-consumer storefront structured to highlight product quality, simplify variant selection, and streamline checkout.',
    industries: 'Skincare & Beauty · Apparel · Artisanal Goods · Specialty Retail',
    features: [
      'Curated collection grids with category filtering & search',
      'Contiguous product detail views with variant & size selectors',
      'Slide-over shopping bag drawer with real-time subtotal calculation',
      'Prepared for live Shopify Payments, Stripe, or Cash on Delivery'
    ],
    demoId: 'glowskin',
    demoLabel: 'View GlowSkin Store Demo',
    iconType: 'shopify-gem',
    previewImage: GENERATED_IMAGES.glowskinSerum,
    previewAlt: 'GlowSkin luxury skincare Shopify storefront product showcase'
  },
  {
    id: 'whatsapp-chatbot',
    index: '04.',
    title: 'WhatsApp Chatbot Automation',
    tagline: 'Automated FAQs, service information, lead collection, product inquiries, and customer support.',
    description:
      'Respond to customer questions immediately at any hour with structured conversation flows that answer FAQs and capture qualified leads.',
    industries: 'Hospitality · E-Commerce Support · Clinics · Real Estate Inquiries',
    features: [
      'Automated responses for business hours, location, and service FAQs',
      'Interactive menu & product catalog previews inside the chat flow',
      'Structured customer inquiry & booking lead capture',
      'Supports web chat simulation or live WhatsApp Business API integration'
    ],
    demoId: 'whatsapp-bot',
    demoLabel: 'View Chatbot Demo',
    iconType: 'whatsapp-node',
    previewImage: GENERATED_IMAGES.glowskinNiacinamide,
    previewAlt: 'Automated WhatsApp customer inquiry and product support showcase'
  }
];

interface ServicesSectionProps {
  onSelectDemo: (demoId: DemoId) => void;
  onGetStarted: (serviceName: string) => void;
}

const Sculptural3DIcon: React.FC<{ type: ServiceItem['iconType']; active: boolean }> = ({
  type,
  active
}) => {
  return (
    <div
      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600/25 via-indigo-950/60 to-[#080A18] border border-violet-400/30 flex items-center justify-center relative perspective-stage shrink-0 shadow-lg shadow-violet-950/50"
      aria-hidden="true"
    >
      <div
        className={`w-10 h-10 transition-transform duration-300 preserve-3d ${
          active ? 'rotate-y-12 -rotate-x-12 scale-110' : ''
        }`}
      >
        {type === 'website-cube' && (
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]">
            <defs>
              <linearGradient id="cubeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C4B5FD" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#4C1D95" />
              </linearGradient>
            </defs>
            <polygon points="24,4 42,14 24,24 6,14" fill="url(#cubeGrad)" opacity="0.95" />
            <polygon points="6,14 24,24 24,44 6,34" fill="#6D28D9" opacity="0.85" />
            <polygon points="42,14 24,24 24,44 42,34" fill="#4C1D95" opacity="0.9" />
            <polyline
              points="12,17 24,24 36,17"
              fill="none"
              stroke="#EDE9FE"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}

        {type === 'restaurant-cloche' && (
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-[0_0_10px_rgba(167,139,250,0.5)]">
            <defs>
              <linearGradient id="clocheGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DDD6FE" />
                <stop offset="55%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#3B0764" />
              </linearGradient>
            </defs>
            <ellipse cx="24" cy="36" rx="18" ry="5" fill="#4C1D95" stroke="#A78BFA" strokeWidth="1.2" />
            <path
              d="M9,34 C9,20 15,12 24,12 C33,12 39,20 39,34 Z"
              fill="url(#clocheGrad)"
              stroke="#DDD6FE"
              strokeWidth="1.2"
            />
            <circle cx="24" cy="9" r="3" fill="#EDE9FE" />
          </svg>
        )}

        {type === 'shopify-gem' && (
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-[0_0_10px_rgba(139,92,246,0.55)]">
            <defs>
              <linearGradient id="gemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E0E7FF" />
                <stop offset="50%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#311068" />
              </linearGradient>
            </defs>
            <polygon points="16,14 32,14 40,22 24,42 8,22" fill="url(#gemGrad)" stroke="#C4B5FD" strokeWidth="1.3" />
            <path d="M18,14 C18,8 30,8 30,14" fill="none" stroke="#EDE9FE" strokeWidth="2" strokeLinecap="round" />
            <polyline points="8,22 40,22" fill="none" stroke="#DDD6FE" strokeWidth="1.2" opacity="0.7" />
            <polyline points="16,14 24,42 32,14" fill="none" stroke="#DDD6FE" strokeWidth="1.2" opacity="0.7" />
          </svg>
        )}

        {type === 'whatsapp-node' && (
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-[0_0_10px_rgba(139,92,246,0.55)]">
            <defs>
              <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A7F3D0" />
                <stop offset="45%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#4C1D95" />
              </linearGradient>
            </defs>
            <ellipse
              cx="24"
              cy="24"
              rx="19"
              ry="9"
              transform="rotate(-28 24 24)"
              fill="none"
              stroke="#A78BFA"
              strokeWidth="1.5"
            />
            <path
              d="M12,14 H36 A4,4 0 0 1 40,18 V30 A4,4 0 0 1 36,34 H20 L12,40 V34 A4,4 0 0 1 8,30 V18 A4,4 0 0 1 12,14 Z"
              fill="url(#nodeGrad)"
              opacity="0.92"
            />
            <circle cx="18" cy="24" r="2" fill="#FFFFFF" />
            <circle cx="24" cy="24" r="2" fill="#FFFFFF" />
            <circle cx="30" cy="24" r="2" fill="#FFFFFF" />
          </svg>
        )}
      </div>
    </div>
  );
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectDemo,
  onGetStarted
}) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="services" className="py-24 relative border-b border-white/10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-medium tracking-wider text-violet-300 mb-3">
            Capabilities & Digital Architecture
          </p>
          <h2
            className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            Specialized Digital Solutions Built to Convert Visitors Into Clients
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            Every project is tailored to your industry workflow—combining custom visual design, mobile-first engineering, and practical automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES_DATA.map((service) => {
            const isHovered = hoveredCard === service.id;
            return (
              <article
                key={service.id}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative rounded-2xl bg-[#0D1025]/85 backdrop-blur-xl border border-white/10 hover:border-violet-400/50 p-7 sm:p-8 transition-all duration-200 flex flex-col justify-between hover:-translate-y-1 shadow-xl shadow-black/40"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <span className="text-xs font-mono-tabular text-violet-300 block mb-1.5">
                        {service.index} Core Service
                      </span>
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                        {service.title}
                      </h3>
                    </div>
                    <Sculptural3DIcon type={service.iconType} active={isHovered} />
                  </div>

                  {/* Service Visual Thumbnail Preview */}
                  <div
                    onClick={() => onSelectDemo(service.demoId)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && onSelectDemo(service.demoId)}
                    className="h-44 w-full rounded-xl overflow-hidden mb-5 relative border border-white/10 bg-[#080A18] cursor-pointer"
                  >
                    <ResilientImage
                      src={service.previewImage}
                      alt={service.previewAlt}
                      fallbackCategory="agency"
                      fallbackTitle={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080A18]/90 via-black/25 to-transparent flex items-end justify-between p-3.5">
                      <span className="text-xs font-medium text-slate-200">
                        Interactive Sample Preview Available
                      </span>
                      <span className="text-xs font-mono-tabular text-violet-300 font-semibold">
                        Click to Launch →
                      </span>
                    </div>
                  </div>

                  <p className="text-sm font-medium text-violet-200/95 mb-3 leading-relaxed">
                    {service.tagline}
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="border-t border-white/10 pt-5 mb-6">
                    <p className="text-xs font-semibold text-slate-200 mb-3">
                      Included Deliverables:
                    </p>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-violet-400 font-mono-tabular select-none">
                            —
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-slate-400 mb-5 pb-4 border-b border-white/10">
                    {service.industries}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectDemo(service.demoId)}
                      className="px-4 py-2.5 rounded-xl bg-violet-600/20 hover:bg-violet-600 border border-violet-400/35 text-white text-xs font-semibold transition-all duration-150 flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{service.demoLabel}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onGetStarted(service.title)}
                      className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-slate-200 hover:text-white text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <span>Get Started</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
