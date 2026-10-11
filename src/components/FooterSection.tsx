import React, { useState } from 'react';
import { X } from 'lucide-react';
import { AgencyConfig, DemoId } from '../types';

interface FooterSectionProps {
  config: AgencyConfig;
  onSelectDemo: (demoId: DemoId) => void;
  onSelectService: (serviceName: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  config,
  onSelectDemo,
  onSelectService
}) => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  const cleanWhatsappDigits = config.whatsappNumber.replace(/[^\d]/g, '') || '15550192834';

  return (
    <footer className="bg-[#05060E] pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Agency Branding (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <a
              href="#hero"
              className="text-xl font-display font-bold tracking-tight text-white inline-block"
            >
              NovaAI
            </a>
            <p className="text-sm font-medium text-violet-300">
              Build. Automate. Grow.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Creative technology agency designing custom business websites, restaurant digital menus, Shopify e-commerce stores, and WhatsApp chatbot automation.
            </p>
            <p className="text-[11px] text-slate-500 pt-1">
              {config.agencyLocation}
            </p>
          </div>

          {/* Col 2: Services (3 Cols) */}
          <div className="lg:col-span-3 space-y-2.5">
            <h3 className="text-xs font-semibold text-white mb-3">
              Agency Services
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectService('Business Website Development')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Business Website Development
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectService('Restaurant Website Design')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Restaurant Website Design
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectService('Shopify Store Development')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Shopify Store Development
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectService('WhatsApp Chatbot Automation')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  WhatsApp Chatbot Automation
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Interactive Sample Portfolio (3 Cols) */}
          <div className="lg:col-span-3 space-y-2.5">
            <h3 className="text-xs font-semibold text-white mb-3">
              Interactive Sample Demos
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectDemo('finedine')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  FineDine Restaurant (Sample Demo)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectDemo('urbancafe')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Urban Café & Roastery (Sample Demo)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectDemo('glowskin')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  GlowSkin Shopify Store (Sample Demo)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectDemo('whatsapp-bot')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Smart WhatsApp Assistant (Sample Demo)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Social Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-2.5">
            <h3 className="text-xs font-semibold text-white mb-3">
              Connect & Inquire
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={`https://wa.me/${cleanWhatsappDigits}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Direct
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${config.contactEmail}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {config.contactEmail}
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Request a Quote
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Book Consultation
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500">
            © {new Date().getFullYear()} NovaAI Digital Agency. All rights reserved. Sample portfolio demos represent fictional concepts.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => setLegalModal('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setLegalModal('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <a
              href={`https://wa.me/${cleanWhatsappDigits}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${config.contactEmail}`}
              className="hover:text-white transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>

      {/* Privacy Policy & Terms of Service Modals */}
      {legalModal && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={legalModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
        >
          <div className="w-full max-w-xl rounded-2xl bg-[#0D1025] border border-white/15 shadow-2xl overflow-hidden">
            <div className="px-6 py-4 bg-[#080A18] border-b border-white/10 flex items-center justify-between">
              <h3 className="text-base font-display font-bold text-white">
                {legalModal === 'privacy'
                  ? 'NovaAI Privacy Policy'
                  : 'NovaAI Terms of Service & Project Scope Disclosures'}
              </h3>
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed max-h-[70vh] overflow-y-auto">
              {legalModal === 'privacy' ? (
                <>
                  <p>
                    <strong className="text-white">1. Data Collection & Purpose:</strong> When you submit an inquiry through the NovaAI consultation form or test our interactive demos, we collect only the details you voluntarily provide (such as your name, email address, phone number, business type, and project description) to respond to your inquiry and prepare your project quote.
                  </p>
                  <p>
                    <strong className="text-white">2. Storage & Security:</strong> Submitted inquiries are stored on our application backend and are never sold or rented to third-party marketing lists.
                  </p>
                  <p>
                    <strong className="text-white">3. Third-Party Services:</strong> Clicking direct WhatsApp links (`wa.me`) or email links opens your chosen communication client subject to their respective privacy terms.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong className="text-white">1. Custom Scope & Quotes:</strong> All website, Shopify store, and WhatsApp chatbot projects are scoped individually based on client requirements. Project quotes cover agreed design, development, and setup milestones.
                  </p>
                  <p>
                    <strong className="text-white">2. Third-Party Fees & Subscriptions:</strong> Domain registration, web hosting, Shopify monthly subscription plans, paid third-party apps/plugins, official WhatsApp Business API conversation fees, and ongoing post-launch maintenance retainers are separate from initial build quotes unless explicitly bundled in writing.
                  </p>
                  <p>
                    <strong className="text-white">3. Sample Portfolio Demos:</strong> FineDine, Urban Café, GlowSkin Store, and Smart WhatsApp Assistant are fictional sample demonstrations created by NovaAI to showcase interactive capabilities and are not presented as real client businesses.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
