export type DemoId = 'finedine' | 'urbancafe' | 'glowskin' | 'whatsapp-bot';

export interface PricingCardConfig {
  id: string;
  title: string;
  subtitle: string;
  audience: string;
  deliverables: string[];
  timeline: string;
}

export interface AgencyConfig {
  whatsappNumber: string;
  contactEmail: string;
  agencyLocation: string;
  consultationHeading: string;
  pricingCards: PricingCardConfig[];
  chatbotPackage: {
    title: string;
    subtitle: string;
    deliverables: string[];
    integrationNote: string;
  };
}

export interface InquiryRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  businessType: string;
  service: string;
  budget: string;
  description: string;
  preferredContact: string;
  createdAt: string;
}

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  industries: string;
  features: string[];
  demoId: DemoId;
  demoLabel: string;
  iconType: 'website-cube' | 'restaurant-cloche' | 'shopify-gem' | 'whatsapp-node';
}
