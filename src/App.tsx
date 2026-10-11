import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AgencyConfig, DemoId } from './types';
import { HeroScene3D } from './components/HeroScene3D';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioDemos } from './components/PortfolioDemos';
import { ProcessAndWhyUs } from './components/ProcessAndWhyUs';
import { PricingSection } from './components/PricingSection';
import { ContactSection } from './components/ContactSection';
import { FooterSection } from './components/FooterSection';

const INITIAL_CONFIG: AgencyConfig = {
  whatsappNumber: '923088913584',
  contactEmail: 'novaaimarketingagency@gmail.com',
  agencyLocation: 'International Digital Studio · Remote & Global Delivery',
  consultationHeading: 'Book a Free 30-Minute Digital Strategy & Scope Consultation',
  pricingCards: [
    {
      id: 'starter-website',
      title: 'Starter Website',
      subtitle: 'Custom responsive web presence for growing local businesses and service brands.',
      audience: 'Salons, clinics, real estate agencies, consultants & small businesses',
      deliverables: [
        'Custom mobile-first multi-section architecture',
        'Service showcase, gallery & location map integration',
        'Validated lead capture inquiry form & WhatsApp click-to-chat',
        'On-page SEO metadata, OpenGraph cards & fast page speed setup',
        'Content management handover & training session'
      ],
      timeline: 'Typical build window: 2–3 weeks'
    },
    {
      id: 'restaurant-website',
      title: 'Restaurant Website',
      subtitle: 'High-conversion culinary experience built to showcase menus and capture direct bookings.',
      audience: 'Fine dining restaurants, specialty cafés, bakeries & cloud kitchens',
      deliverables: [
        'Interactive digital menu with category filters & dietary tags',
        'High-resolution food gallery & ambiance showcase',
        'Table reservation inquiry workflow & opening hours schedule',
        'Direct WhatsApp ordering cart & pre-formatted order summary',
        'Location directions, parking notes & contact links'
      ],
      timeline: 'Typical build window: 2–4 weeks'
    },
    {
      id: 'shopify-store',
      title: 'Shopify Store',
      subtitle: 'Complete direct-to-consumer e-commerce storefront engineered for catalog clarity and conversion.',
      audience: 'Skincare brands, fashion boutiques, specialty food & retail brands',
      deliverables: [
        'Custom Shopify theme styling, collections & product filtering',
        'Detailed product pages with variants, ingredients/specs & media gallery',
        'Slide-out shopping bag drawer & streamlined checkout preparation',
        'Payment provider & shipping zone configuration support',
        'Inventory structure setup & store launch checklist'
      ],
      timeline: 'Typical build window: 3–5 weeks'
    }
  ],
  chatbotPackage: {
    title: 'WhatsApp Chatbot Automation Package',
    subtitle: 'Automated customer inquiry handling, menu/catalog lookup, and structured lead capture.',
    deliverables: [
      'Custom conversation decision flows for FAQs, business hours & pricing rules',
      'Automated lead qualification (captures name, service needed & contact details)',
      'Product or restaurant menu browsing directly inside the chat thread',
      'Seamless human handover escalation for complex customer requests'
    ],
    integrationNote:
      'Available as an interactive web-embedded assistant or connected to your live WhatsApp number via official WhatsApp Business Platform (Cloud API) providers.'
  }
};

export default function App() {
  const [config, setConfig] = useState<AgencyConfig>(INITIAL_CONFIG);
  const [activeDemo, setActiveDemo] = useState<DemoId>('finedine');
  const [selectedService, setSelectedService] = useState<string>('Restaurant Website Design');
  const [selectedBusinessType, setSelectedBusinessType] = useState<string>('Restaurant / Fine Dining');
  const [prefillNote, setPrefillNote] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch('/api/agency-config')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.config) {
          setConfig(data.config);
        }
      })
      .catch(() => {
        // Fallback to initial config if offline
      });
  }, []);

  const handleSaveConfig = async (updated: Partial<AgencyConfig>) => {
    try {
      const res = await fetch('/api/agency-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.config) {
          setConfig(data.config);
        }
      }
    } catch {
      setConfig((prev) => ({ ...prev, ...updated }));
    }
  };

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenDemo = (demoId?: DemoId) => {
    if (demoId) {
      setActiveDemo(demoId);
    }
    scrollToSection('portfolio');
  };

  const handleStartInquiry = (
    serviceName?: string,
    businessType?: string,
    customNote?: string
  ) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    if (businessType) {
      setSelectedBusinessType(businessType);
    }
    if (customNote) {
      setPrefillNote(customNote);
    }
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-[#060711] text-[#F3F4F8] flex flex-col">
      {/* Top Navigation Bar: Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 h-16 bg-[#060711]/85 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1280px] mx-auto h-full px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#hero"
            className="text-xl font-display font-bold tracking-tight text-white whitespace-nowrap shrink-0"
          >
            NovaAI
          </a>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300"
          >
            <a
              href="#services"
              className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a
              href="#portfolio"
              className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Live Demos
            </a>
            <a
              href="#process"
              className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Process
            </a>
            <a
              href="#pricing"
              className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleStartInquiry('Full Digital Upgrade Bundle')}
              className="px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Free Consultation
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/[0.06] text-slate-200 hover:text-white cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#080A18] border-b border-white/10 px-6 py-4 space-y-3 text-sm font-medium text-slate-200">
            <button
              type="button"
              onClick={() => scrollToSection('services')}
              className="block w-full text-left py-1.5 hover:text-white"
            >
              Services
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('portfolio')}
              className="block w-full text-left py-1.5 hover:text-white"
            >
              Live Demos
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('process')}
              className="block w-full text-left py-1.5 hover:text-white"
            >
              How It Works
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('pricing')}
              className="block w-full text-left py-1.5 hover:text-white"
            >
              Pricing
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left py-1.5 hover:text-white"
            >
              Contact
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <HeroScene3D
          onOpenConsultation={(srv) => handleStartInquiry(srv)}
          onExploreWork={(demoId) => handleOpenDemo(demoId)}
        />

        <ServicesSection
          onSelectDemo={(demoId) => handleOpenDemo(demoId)}
          onGetStarted={(srv) => handleStartInquiry(srv)}
        />

        <PortfolioDemos
          activeDemo={activeDemo}
          onSelectDemo={(id) => setActiveDemo(id)}
          onRequestSimilarProject={(serviceName, demoName) =>
            handleStartInquiry(
              serviceName,
              undefined,
              `I explored the ${demoName} interactive sample demo and would like a custom quote for a similar build tailored to my business.`
            )
          }
          agencyWhatsapp={config.whatsappNumber.replace(/[^\d]/g, '') || '923088913584'}
        />

        <ProcessAndWhyUs
          onStartConsultation={() => handleStartInquiry('Full Digital Upgrade Bundle')}
        />

        <PricingSection
          config={config}
          onSaveConfig={handleSaveConfig}
          onRequestQuote={(pkgName, bizType) => handleStartInquiry(pkgName, bizType)}
        />

        <ContactSection
          config={config}
          selectedService={selectedService}
          selectedBusinessType={selectedBusinessType}
          prefillNote={prefillNote}
          onSaveConfig={handleSaveConfig}
        />
      </main>

      <FooterSection
        config={config}
        onSelectDemo={(demoId) => handleOpenDemo(demoId)}
        onSelectService={(srv) => handleStartInquiry(srv)}
      />
    </div>
  );
}
