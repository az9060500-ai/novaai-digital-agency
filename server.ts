import express from 'express';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer } from 'vite';

interface PricingCardConfig {
  id: string;
  title: string;
  subtitle: string;
  audience: string;
  deliverables: string[];
  timeline: string;
}

interface AgencyConfig {
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

interface InquiryRecord {
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

interface DemoActionRecord {
  id: string;
  demoName: string;
  actionType: string;
  summary: string;
  payload: Record<string, unknown>;
  createdAt: string;
}

interface PersistentStore {
  config: AgencyConfig;
  inquiries: InquiryRecord[];
  demoActions: DemoActionRecord[];
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const STORE_PATH = path.join(DATA_DIR, 'agency_store.json');

const DEFAULT_CONFIG: AgencyConfig = {
  whatsappNumber: '15550192834',
  contactEmail: 'hello@novaai-agency.example.com',
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

function loadStore(): PersistentStore {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, 'utf-8');
      const parsed = JSON.parse(raw) as Partial<PersistentStore>;
      return {
        config: parsed.config || DEFAULT_CONFIG,
        inquiries: Array.isArray(parsed.inquiries) ? parsed.inquiries : [],
        demoActions: Array.isArray(parsed.demoActions) ? parsed.demoActions : []
      };
    }
  } catch (err) {
    console.error('Failed to read store file, using defaults:', err);
  }
  return {
    config: DEFAULT_CONFIG,
    inquiries: [],
    demoActions: []
  };
}

function saveStore(store: PersistentStore): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save store file:', err);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '1mb' }));

  // GET agency config (editable contact details & pricing packages)
  app.get('/api/agency-config', (_req, res) => {
    const store = loadStore();
    res.json({
      config: store.config,
      inquiryCount: store.inquiries.length
    });
  });

  // PUT agency config (allows owner to edit contact placeholders & pricing cards)
  app.put('/api/agency-config', (req, res) => {
    const store = loadStore();
    const body = req.body as Partial<AgencyConfig>;

    if (typeof body.whatsappNumber === 'string') {
      store.config.whatsappNumber = body.whatsappNumber.replace(/[^\d+]/g, '').trim() || store.config.whatsappNumber;
    }
    if (typeof body.contactEmail === 'string' && body.contactEmail.includes('@')) {
      store.config.contactEmail = body.contactEmail.trim();
    }
    if (typeof body.agencyLocation === 'string' && body.agencyLocation.trim()) {
      store.config.agencyLocation = body.agencyLocation.trim();
    }
    if (Array.isArray(body.pricingCards) && body.pricingCards.length === 3) {
      store.config.pricingCards = body.pricingCards;
    }
    if (body.chatbotPackage && typeof body.chatbotPackage.title === 'string') {
      store.config.chatbotPackage = body.chatbotPackage;
    }

    saveStore(store);
    res.json({ status: 'updated', config: store.config });
  });

  // GET all submitted inquiries
  app.get('/api/inquiries', (_req, res) => {
    const store = loadStore();
    res.json({ inquiries: store.inquiries });
  });

  // POST new project / consultation inquiry
  app.post('/api/inquiries', (req, res) => {
    const {
      name,
      email,
      phone,
      businessType,
      service,
      budget,
      description,
      preferredContact
    } = req.body as Record<string, string | undefined>;

    if (!name || name.trim().length < 2) {
      res.status(400).json({ error: 'Please provide your full name (at least 2 characters).' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      res.status(400).json({ error: 'Please provide a valid email address.' });
      return;
    }
    if (!businessType || !businessType.trim()) {
      res.status(400).json({ error: 'Please select your business type.' });
      return;
    }
    if (!service || !service.trim()) {
      res.status(400).json({ error: 'Please select the service you need.' });
      return;
    }
    if (!budget || !budget.trim()) {
      res.status(400).json({ error: 'Please select an estimated budget scope.' });
      return;
    }
    if (!description || description.trim().length < 10) {
      res.status(400).json({
        error: 'Please include a brief project description (at least 10 characters) so we can prepare for your consultation.'
      });
      return;
    }

    const store = loadStore();
    const referenceId = `NV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const record: InquiryRecord = {
      id: referenceId,
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : '',
      businessType: businessType.trim(),
      service: service.trim(),
      budget: budget.trim(),
      description: description.trim(),
      preferredContact: preferredContact ? preferredContact.trim() : 'Email & WhatsApp',
      createdAt: new Date().toISOString()
    };

    store.inquiries.unshift(record);
    saveStore(store);

    res.status(201).json({
      status: 'delivered',
      message: 'Your inquiry has been validated and stored on the NovaAI agency server.',
      inquiry: record
    });
  });

  // POST interactive portfolio demo actions (reservations, demo checkout, chatbot inquiry)
  app.post('/api/demo-action', (req, res) => {
    const { demoName, actionType, summary, payload } = req.body as {
      demoName?: string;
      actionType?: string;
      summary?: string;
      payload?: Record<string, unknown>;
    };

    if (!demoName || !actionType || !summary) {
      res.status(400).json({ error: 'Missing required demo action parameters.' });
      return;
    }

    const store = loadStore();
    const actionId = `DEMO-${Math.floor(10000 + Math.random() * 90000)}`;
    const record: DemoActionRecord = {
      id: actionId,
      demoName,
      actionType,
      summary,
      payload: payload || {},
      createdAt: new Date().toISOString()
    };

    store.demoActions.unshift(record);
    if (store.demoActions.length > 100) {
      store.demoActions = store.demoActions.slice(0, 100);
    }
    saveStore(store);

    res.status(201).json({
      status: 'recorded',
      record
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NovaAI full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
