import React, { useState } from 'react';
import {
  Utensils,
  Coffee,
  ShoppingBag,
  MessageSquare,
  Plus,
  Minus,
  CheckCircle2,
  MapPin,
  Clock,
  Phone,
  Send,
  Maximize2,
  Minimize2,
  ArrowRight,
  Info,
  Sparkles,
  Eye
} from 'lucide-react';
import { DemoId } from '../types';
import { GENERATED_IMAGES, ResilientImage } from './ResilientImage';

interface PortfolioDemosProps {
  activeDemo: DemoId;
  onSelectDemo: (id: DemoId) => void;
  onRequestSimilarProject: (serviceName: string, demoName: string) => void;
  agencyWhatsapp: string;
}

interface FineDineDish {
  id: string;
  name: string;
  category: 'Wagyu & Mains' | 'Seafood' | 'Starters' | 'Desserts';
  price: number;
  description: string;
  dietary: string;
  image: string;
}

const FINEDINE_MENU: FineDineDish[] = [
  {
    id: 'fd-1',
    name: 'A5 Miyazaki Wagyu & Black Truffle Jus',
    category: 'Wagyu & Mains',
    price: 94,
    description: 'Charcoal-seared tenderloin, 36-hour Périgord truffle reduction, crispy potato mille-feuille.',
    dietary: 'Chef Signature · Gluten-Free Option',
    image: GENERATED_IMAGES.finedineWagyu
  },
  {
    id: 'fd-2',
    name: 'Pan-Seared Hokkaido Scallops',
    category: 'Seafood',
    price: 46,
    description: 'Hand-dived scallops, golden saffron emulsion, Oscietra caviar pearls, coastal micro-herbs.',
    dietary: 'Sustainable Catch · Gluten-Free',
    image: GENERATED_IMAGES.finedineScallops
  },
  {
    id: 'fd-3',
    name: 'Wild Mushroom & Aged Parmesan Velouté',
    category: 'Starters',
    price: 26,
    description: 'Foraged chanterelles, roasted chestnut crema, 24-month Reggiano foam, herb brioche crisp.',
    dietary: 'Vegetarian',
    image: GENERATED_IMAGES.finedineScallops
  },
  {
    id: 'fd-4',
    name: 'Miso-Glazed Black Cod',
    category: 'Seafood',
    price: 58,
    description: '72-hour Den miso marinade, charred baby bok choy, yuzu dashi broth, pickled ginger shoots.',
    dietary: 'Signature Course',
    image: GENERATED_IMAGES.finedineBlackCod
  },
  {
    id: 'fd-5',
    name: 'Herb-Crusted Rack of Pasture Lamb',
    category: 'Wagyu & Mains',
    price: 68,
    description: 'Smoked aubergine purée, heirloom baby carrots, rosemary jus.',
    dietary: 'Halal Certified · Gluten-Free',
    image: GENERATED_IMAGES.finedineWagyu
  },
  {
    id: 'fd-6',
    name: 'Valrhona Dark Chocolate & Gold Leaf Sphere',
    category: 'Desserts',
    price: 24,
    description: '70% Guanaja chocolate mousse, espresso hazelnut praline center, warm salted caramel pour.',
    dietary: 'Vegetarian · Contains Nuts',
    image: GENERATED_IMAGES.finedineChocolate
  }
];

interface CafeItem {
  id: string;
  name: string;
  category: 'Specialty Coffee' | 'Artisanal Bakery' | 'All-Day Brunch';
  price: string;
  notes: string;
  image: string;
}

const URBAN_CAFE_MENU: CafeItem[] = [
  {
    id: 'uc-1',
    name: 'Single-Origin Ethiopian Pour-Over (V60)',
    category: 'Specialty Coffee',
    price: '$6.50',
    notes: 'Floral jasmine aroma, bergamot & white peach finish · Light roast',
    image: GENERATED_IMAGES.urbanCafeLatte
  },
  {
    id: 'uc-2',
    name: 'Oat Milk Velvet Cortado',
    category: 'Specialty Coffee',
    price: '$5.25',
    notes: 'Double ristretto espresso with micro-steamed barista oat milk',
    image: GENERATED_IMAGES.urbanCafeLatte
  },
  {
    id: 'uc-3',
    name: 'Ceremonial Uji Matcha Latte',
    category: 'Specialty Coffee',
    price: '$6.75',
    notes: 'Stone-ground first-harvest Kyoto matcha whisked to order',
    image: GENERATED_IMAGES.urbanCafeLatte
  },
  {
    id: 'uc-4',
    name: 'Roasted Pistachio & Crème Laminated Croissant',
    category: 'Artisanal Bakery',
    price: '$7.50',
    notes: '72-hour fermented French butter pastry filled with Sicilian pistachio crema',
    image: GENERATED_IMAGES.urbanCafeLatte
  },
  {
    id: 'uc-5',
    name: 'Valrhona Dark Chocolate Brioche Tart',
    category: 'Artisanal Bakery',
    price: '$6.25',
    notes: 'Warm dark chocolate ganache, toasted hazelnut praline, flaky pastry crust',
    image: GENERATED_IMAGES.finedineChocolate
  },
  {
    id: 'uc-6',
    name: 'Seared Scallop & Herb Sourdough Brunch Plate',
    category: 'All-Day Brunch',
    price: '$18.50',
    notes: 'Pasture-raised poached eggs, saffron citrus butter, grilled country levain',
    image: GENERATED_IMAGES.finedineScallops
  }
];

interface GlowSkinProduct {
  id: string;
  name: string;
  category: 'Serums' | 'Moisturizers' | 'Cleansers';
  subtitle: string;
  basePrice: number;
  sizes: { label: string; multiplier: number }[];
  actives: string;
  skinType: string;
  description: string;
  image: string;
}

const GLOWSKIN_PRODUCTS: GlowSkinProduct[] = [
  {
    id: 'gs-1',
    name: 'Botanical Renewal Plum & Amethyst Serum',
    category: 'Serums',
    subtitle: 'Concentrated antioxidant & Phyto-retinol night treatment',
    basePrice: 68,
    sizes: [
      { label: '30ml Standard', multiplier: 1 },
      { label: '50ml Studio Size', multiplier: 1.45 }
    ],
    actives: 'Kakadu Plum Vitamin C · Bakuchiol 1.5% · Polyglutamic Acid',
    skinType: 'All Skin Types · Dullness & Fine Lines',
    description:
      'Cold-pressed botanical concentrate designed to restore overnight luminosity and deeply hydrate the skin barrier without irritation.',
    image: GENERATED_IMAGES.glowskinSerum
  },
  {
    id: 'gs-2',
    name: 'Cellular Hydra-Repair Peptide Cream',
    category: 'Moisturizers',
    subtitle: 'Ceramide & biomimetic peptide barrier moisturizer',
    basePrice: 74,
    sizes: [
      { label: '50ml Jar', multiplier: 1 },
      { label: '100ml Refill Pod', multiplier: 1.6 }
    ],
    actives: 'Multi-Peptide Complex · Ceramide NP · Squalane',
    skinType: 'Dry, Sensitive & Compromised Barriers',
    description:
      'Weightless whipped emulsion that locks in 48-hour hydration and reinforces structural lipid layers.',
    image: GENERATED_IMAGES.glowskinCream
  },
  {
    id: 'gs-3',
    name: 'Niacinamide 10% + Zinc Clarity Drops',
    category: 'Serums',
    subtitle: 'Pore-refining & redness-calming daily essence',
    basePrice: 52,
    sizes: [
      { label: '30ml Standard', multiplier: 1 },
      { label: '50ml Studio Size', multiplier: 1.4 }
    ],
    actives: '10% Niacinamide · Zinc PCA · Centella Asiatica',
    skinType: 'Combination & Blemish-Prone Skin',
    description:
      'Balances excess sebum production while visibly smoothing texture and calming environmental redness.',
    image: GENERATED_IMAGES.glowskinNiacinamide
  },
  {
    id: 'gs-4',
    name: 'pH-Balanced Blue Tansy Gel Cleanser',
    category: 'Cleansers',
    subtitle: 'Non-stripping amino acid & botanical daily wash',
    basePrice: 44,
    sizes: [
      { label: '150ml Glass Pump', multiplier: 1 },
      { label: '300ml Duo Bottle', multiplier: 1.65 }
    ],
    actives: 'Moroccan Blue Tansy · Oat Amino Acids · White Willow Bark',
    skinType: 'Normal, Sensitive & Combination Skin',
    description:
      'Dissolves daily SPF and impurities without disrupting the delicate acid mantle.',
    image: GENERATED_IMAGES.glowskinCleanser
  }
];

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  meta?: string;
}

export const PortfolioDemos: React.FC<PortfolioDemosProps> = ({
  activeDemo,
  onSelectDemo,
  onRequestSimilarProject,
  agencyWhatsapp
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // --- DEMO 1: FINEDINE STATE ---
  const [fdCategory, setFdCategory] = useState<'All' | FineDineDish['category']>('All');
  const [fdCart, setFdCart] = useState<Record<string, number>>({ 'fd-1': 1, 'fd-2': 1 });
  const [fdOrderMode, setFdOrderMode] = useState<'Dine-In Pre-Order' | 'Priority Takeaway'>('Dine-In Pre-Order');
  const [fdGuestNote, setFdGuestNote] = useState('');
  const [fdReceipt, setFdReceipt] = useState<string | null>(null);
  const [fdSubmitting, setFdSubmitting] = useState(false);

  // --- DEMO 2: URBAN CAFE STATE ---
  const [ucTab, setUcTab] = useState<'menu' | 'gallery' | 'location' | 'reserve'>('menu');
  const [ucResForm, setUcResForm] = useState({
    name: '',
    contact: '',
    date: '2026-10-16',
    time: '10:30 AM',
    guests: '2 Guests',
    area: 'Sunlit Window Table'
  });
  const [ucResConfirm, setUcResConfirm] = useState<string | null>(null);
  const [ucResError, setUcResError] = useState<string | null>(null);

  // --- DEMO 3: GLOWSKIN SHOPIFY STORE STATE ---
  const [gsCategory, setGsCategory] = useState<'All' | GlowSkinProduct['category']>('All');
  const [gsSelectedProduct, setGsSelectedProduct] = useState<GlowSkinProduct>(GLOWSKIN_PRODUCTS[0]);
  const [gsSizeIndex, setGsSizeIndex] = useState(0);
  const [gsCart, setGsCart] = useState<{ product: GlowSkinProduct; sizeLabel: string; unitPrice: number; qty: number }[]>([
    {
      product: GLOWSKIN_PRODUCTS[0],
      sizeLabel: '30ml Standard',
      unitPrice: 68,
      qty: 1
    }
  ]);
  const [gsCheckoutOpen, setGsCheckoutOpen] = useState(false);
  const [gsCustomer, setGsCustomer] = useState({ name: '', email: '', address: '', paymentMode: 'Simulated Card (Demo)' });
  const [gsOrderReceipt, setGsOrderReceipt] = useState<string | null>(null);

  // --- DEMO 4: SMART WHATSAPP ASSISTANT STATE ---
  const [botPersona, setBotPersona] = useState<'restaurant' | 'ecommerce' | 'agency'>('restaurant');
  const [botMessages, setBotMessages] = useState<ChatMessage[]>([
    {
      id: 'm-init',
      sender: 'bot',
      text: 'Welcome to FineDine Automated Concierge (Sample Demo). How can I assist you today? Choose a quick topic below or type your question.',
      meta: 'Simulated Browser Demo · Instant Automated Reply'
    }
  ]);
  const [botInput, setBotInput] = useState('');
  const [leadCaptureOpen, setLeadCaptureOpen] = useState(false);
  const [botLead, setBotLead] = useState({ name: '', phone: '', inquiry: '' });
  const [, setBotLeadSaved] = useState<string | null>(null);

  const updateFdQty = (id: string, delta: number) => {
    setFdReceipt(null);
    setFdCart((prev) => {
      const next = { ...prev };
      const current = next[id] || 0;
      const updated = Math.max(0, current + delta);
      if (updated === 0) {
        delete next[id];
      } else {
        next[id] = updated;
      }
      return next;
    });
  };

  const fdItemsInCart = FINEDINE_MENU.filter((d) => (fdCart[d.id] || 0) > 0);
  const fdTotal = fdItemsInCart.reduce((acc, item) => acc + item.price * (fdCart[item.id] || 0), 0);

  const buildFineDineWhatsAppText = () => {
    const lines = fdItemsInCart.map((item) => `• ${fdCart[item.id]}x ${item.name} ($${item.price * (fdCart[item.id] || 0)})`);
    return `Hello FineDine (Sample Demo)! I would like to place a ${fdOrderMode}:\n${lines.join('\n')}\nTotal: $${fdTotal}${
      fdGuestNote ? `\nNote: ${fdGuestNote}` : ''
    }`;
  };

  const handleFineDineDemoSubmit = async () => {
    if (fdItemsInCart.length === 0) return;
    setFdSubmitting(true);
    try {
      const res = await fetch('/api/demo-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'FineDine Restaurant',
          actionType: fdOrderMode,
          summary: `${fdItemsInCart.length} dishes · $${fdTotal}`,
          payload: { items: fdCart, note: fdGuestNote, total: fdTotal }
        })
      });
      const data = await res.json();
      setFdReceipt(data.record?.id || 'DEMO-FD-9021');
    } catch {
      setFdReceipt('DEMO-FD-LOCAL');
    } finally {
      setFdSubmitting(false);
    }
  };

  const handleUrbanCafeReserve = async (e: React.FormEvent) => {
    e.preventDefault();
    setUcResError(null);
    if (!ucResForm.name.trim() || !ucResForm.contact.trim()) {
      setUcResError('Please enter your name and email or phone number to test the reservation inquiry.');
      return;
    }
    try {
      const res = await fetch('/api/demo-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Urban Café',
          actionType: 'Table Reservation Inquiry',
          summary: `${ucResForm.guests} on ${ucResForm.date} at ${ucResForm.time} (${ucResForm.area})`,
          payload: ucResForm
        })
      });
      const data = await res.json();
      setUcResConfirm(data.record?.id || 'CAFE-8410');
    } catch {
      setUcResConfirm('CAFE-8410');
    }
  };

  const handleAddToGlowSkinBag = (product: GlowSkinProduct, sizeIdx: number) => {
    const sizeObj = product.sizes[sizeIdx] || product.sizes[0];
    const unitPrice = Math.round(product.basePrice * sizeObj.multiplier);
    setGsOrderReceipt(null);

    setGsCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.sizeLabel === sizeObj.label
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].qty += 1;
        return updated;
      }
      return [...prev, { product, sizeLabel: sizeObj.label, unitPrice, qty: 1 }];
    });
  };

  const updateGsQty = (idx: number, delta: number) => {
    setGsCart((prev) => {
      const updated = [...prev];
      updated[idx].qty += delta;
      if (updated[idx].qty <= 0) {
        updated.splice(idx, 1);
      }
      return updated;
    });
  };

  const gsSubtotal = gsCart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);

  const handleGlowSkinDemoCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gsCustomer.name.trim() || !gsCustomer.email.trim()) return;
    try {
      const res = await fetch('/api/demo-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'GlowSkin Shopify Store',
          actionType: 'Simulated Storefront Checkout',
          summary: `${gsCart.length} line items · Subtotal $${gsSubtotal}`,
          payload: { customer: gsCustomer, subtotal: gsSubtotal }
        })
      });
      const data = await res.json();
      setGsOrderReceipt(data.record?.id || 'GS-1042');
      setGsCart([]);
    } catch {
      setGsOrderReceipt('GS-1042');
    }
  };

  const switchBotPersona = (persona: 'restaurant' | 'ecommerce' | 'agency') => {
    setBotPersona(persona);
    setLeadCaptureOpen(false);
    setBotLeadSaved(null);
    const welcomeMap = {
      restaurant:
        'Welcome to FineDine Automated Concierge (Sample Demo). Ask about our A5 Wagyu menu, dietary options, opening hours, or table availability!',
      ecommerce:
        'Hi there! Welcome to GlowSkin Support Assistant (Sample Demo). Ask about serum ingredients, shipping times, return policy, or skin type recommendations.',
      agency:
        'Hello! I am the NovaAI Agency Assistant (Sample Demo). Ask about website timelines, Shopify setups, WhatsApp integration options, or leave a project inquiry.'
    };
    setBotMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'bot',
        text: welcomeMap[persona],
        meta: 'Simulated Browser Demo · Predefined FAQ & Lead Engine'
      }
    ]);
  };

  const triggerBotReply = (userQuestion: string) => {
    const q = userQuestion.toLowerCase();
    let reply = '';

    if (botPersona === 'restaurant') {
      if (q.includes('menu') || q.includes('wagyu') || q.includes('food') || q.includes('dish')) {
        reply =
          'Our signature dishes tonight include the A5 Miyazaki Wagyu ($94), Pan-Seared Hokkaido Scallops ($46), and Miso-Glazed Black Cod ($58). Gluten-free and halal options are available upon request.';
      } else if (q.includes('hour') || q.includes('open') || q.includes('location') || q.includes('where')) {
        reply =
          'FineDine (Sample Concept) is open Tuesday–Sunday from 5:30 PM to 11:00 PM. Valet parking is available at the main entrance.';
      } else if (q.includes('book') || q.includes('table') || q.includes('reserv')) {
        reply =
          'We have tables available at 7:00 PM and 8:30 PM. Click "Leave Customer Inquiry" below to log your sample reservation request!';
        setLeadCaptureOpen(true);
      } else {
        reply =
          'I can help you explore our tasting menu, check dietary accommodations, verify opening hours, or log a table inquiry. Select a prompt below or click "Leave Customer Inquiry".';
      }
    } else if (botPersona === 'ecommerce') {
      if (q.includes('serum') || q.includes('product') || q.includes('recommend') || q.includes('skin')) {
        reply =
          'For overnight radiance, we recommend the Botanical Renewal Plum & Amethyst Serum ($68). For dry or sensitive skin barriers, pair it with the Cellular Hydra-Repair Peptide Cream ($74).';
      } else if (q.includes('ship') || q.includes('deliver') || q.includes('return')) {
        reply =
          'Orders over $75 qualify for complimentary express shipping (2–4 business days). Unopened products may be returned within 30 days.';
      } else {
        reply =
          'I can answer questions about active botanical ingredients, shipping times, order status, or connect you with a skincare specialist via the inquiry form below.';
      }
    } else {
      if (q.includes('price') || q.includes('quote') || q.includes('cost')) {
        reply =
          'Every NovaAI project is scoped to your exact business requirements. We offer custom quotes for Starter Websites, Restaurant Websites, Shopify Stores, and WhatsApp Automation.';
      } else if (q.includes('whatsapp') || q.includes('api') || q.includes('live')) {
        reply =
          'We offer both interactive website chat widgets and live WhatsApp Business Platform (Cloud API) integrations connected to your verified business phone number.';
      } else {
        reply =
          'We build custom websites, restaurant digital menus, Shopify stores, and WhatsApp bots. Use the "Leave Customer Inquiry" button below to test lead capture!';
      }
    }

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: userQuestion
    };
    const botMsg: ChatMessage = {
      id: `b-${Date.now() + 1}`,
      sender: 'bot',
      text: reply,
      meta: 'Automated FAQ Response'
    };

    setBotMessages((prev) => [...prev, userMsg, botMsg]);
  };

  const handleBotSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!botInput.trim()) return;
    triggerBotReply(botInput.trim());
    setBotInput('');
  };

  const handleBotLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!botLead.name.trim() || !botLead.phone.trim()) return;
    try {
      const res = await fetch('/api/demo-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: `Smart WhatsApp Assistant (${botPersona})`,
          actionType: 'Chatbot Lead Capture',
          summary: `${botLead.name} (${botLead.phone})`,
          payload: botLead
        })
      });
      const data = await res.json();
      const refId = data.record?.id || 'BOT-LEAD-409';
      setBotLeadSaved(refId);
      setBotMessages((prev) => [
        ...prev,
        {
          id: `sys-${Date.now()}`,
          sender: 'bot',
          text: `Thank you, ${botLead.name}! Your sample inquiry (${refId}) has been recorded. In a live deployment, this notifies the business owner immediately via WhatsApp or email.`,
          meta: 'Lead Captured & Validated'
        }
      ]);
      setLeadCaptureOpen(false);
    } catch {
      setBotLeadSaved('BOT-LEAD-409');
    }
  };

  const DEMO_TABS: {
    id: DemoId;
    name: string;
    category: string;
    serviceName: string;
    thumbnail: string;
    summary: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'finedine',
      name: 'FineDine Restaurant',
      category: 'Restaurant Website Sample',
      serviceName: 'Restaurant Website Design',
      thumbnail: GENERATED_IMAGES.finedineWagyu,
      summary: 'Interactive tasting menu, course filters, order tray & WhatsApp pre-order builder.',
      icon: <Utensils className="w-4 h-4" />
    },
    {
      id: 'urbancafe',
      name: 'Urban Café',
      category: 'Café & Reservation Sample',
      serviceName: 'Business Website Development',
      thumbnail: GENERATED_IMAGES.urbanCafeLatte,
      summary: 'Specialty coffee menu, visual gallery, location map & table reservation inquiry.',
      icon: <Coffee className="w-4 h-4" />
    },
    {
      id: 'glowskin',
      name: 'GlowSkin Store',
      category: 'Shopify E-Commerce Sample',
      serviceName: 'Shopify Store Development',
      thumbnail: GENERATED_IMAGES.glowskinSerum,
      summary: 'Skincare product catalog, variant selectors, shopping bag & simulated checkout.',
      icon: <ShoppingBag className="w-4 h-4" />
    },
    {
      id: 'whatsapp-bot',
      name: 'Smart WhatsApp Assistant',
      category: 'Chatbot Automation Sample',
      serviceName: 'WhatsApp Chatbot Automation',
      thumbnail: GENERATED_IMAGES.glowskinCleanser,
      summary: '24/7 automated business FAQ responses, menu lookup & lead capture flow.',
      icon: <MessageSquare className="w-4 h-4" />
    }
  ];

  const currentTabMeta = DEMO_TABS.find((t) => t.id === activeDemo) || DEMO_TABS[0];

  return (
    <section id="portfolio" className="py-24 relative border-b border-white/10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wider text-violet-300 mb-3">
              Interactive Live Demo Portfolio · Sample Concept Projects
            </p>
            <h2
              className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight mb-4"
              style={{ textWrap: 'balance' }}
            >
              Test-Drive Four Working Sample Experiences Right Inside Your Browser
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Explore functional menus, category filters, shopping bag drawers, reservation forms, and automated WhatsApp conversation flows. All four showcases below are fictional sample demos created to demonstrate our engineering quality.
            </p>
          </div>

          <div
            className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#0D1025] border border-white/10 self-start"
            role="tablist"
            aria-label="Select Interactive Portfolio Demo"
          >
            {DEMO_TABS.map((tab) => {
              const isSelected = activeDemo === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => onSelectDemo(tab.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4-Card Project Thumbnail Overview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {DEMO_TABS.map((project) => {
            const isActive = activeDemo === project.id;
            return (
              <div
                key={project.id}
                onClick={() => onSelectDemo(project.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onSelectDemo(project.id)}
                className={`group rounded-2xl overflow-hidden border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#15193B] border-violet-400 shadow-xl shadow-violet-950/40 -translate-y-0.5'
                    : 'bg-[#0D1025]/80 border-white/10 hover:border-violet-400/50'
                }`}
              >
                <div>
                  <div className="h-36 w-full overflow-hidden relative bg-[#080A18] border-b border-white/10">
                    <ResilientImage
                      src={project.thumbnail}
                      alt={`${project.name} sample demo thumbnail`}
                      fallbackCategory="agency"
                      fallbackTitle={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080A18] via-transparent to-transparent" />
                    <span className="absolute bottom-2.5 left-3 text-[11px] font-mono-tabular text-violet-200 font-medium">
                      {project.category}
                    </span>
                  </div>

                  <div className="p-4">
                    <h3 className="text-base font-display font-bold text-white mb-1 flex items-center justify-between">
                      <span>{project.name}</span>
                      {isActive && (
                        <span className="text-[11px] font-mono-tabular text-emerald-300">
                          Active
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>
                </div>

                <div className="px-4 py-2.5 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-xs font-semibold text-violet-300 group-hover:text-white">
                  <span>{isActive ? 'Currently Viewing Below' : 'Launch Interactive Demo'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Browser Sandbox Frame */}
        <div
          className={`${
            isFullscreen
              ? 'fixed inset-3 z-50 flex flex-col bg-[#080A18] rounded-2xl border border-violet-400/40 shadow-2xl overflow-hidden'
              : 'relative rounded-2xl bg-[#0B0E22] border border-white/15 shadow-2xl shadow-black/70 overflow-hidden'
          }`}
        >
          <div className="px-4 sm:px-6 py-3.5 bg-[#070915] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              </div>
              <div className="px-3 py-1 rounded-md bg-white/[0.05] border border-white/10 text-xs font-mono-tabular text-slate-300 flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-violet-400" />
                <span>demo.novaai.studio/{activeDemo}</span>
              </div>
              <span className="hidden md:inline text-xs text-slate-400">
                Sample Demo · Fictional Business Showcase
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onRequestSimilarProject(currentTabMeta.serviceName, currentTabMeta.name)}
                className="px-3.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                Request a Site Like {currentTabMeta.name}
              </button>
              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-slate-200 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                aria-label={isFullscreen ? 'Exit Fullscreen Demo' : 'Expand Demo to Fullscreen'}
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5" />
                    <span>Exit Fullscreen</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Expand View</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className={`${isFullscreen ? 'flex-1 overflow-y-auto' : 'max-h-[780px] overflow-y-auto'}`}>
            {/* DEMO 1: FINEDINE */}
            {activeDemo === 'finedine' && (
              <div className="p-6 sm:p-8 lg:p-10 bg-gradient-to-b from-[#0E101F] to-[#080914]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-10 pb-8 border-b border-white/10">
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-amber-300/90 font-medium mb-2">
                        FineDine · Sample Restaurant Concept · Contemporary Gastronomy
                      </p>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight mb-3">
                        Seasonal Tasting Menus & Direct WhatsApp Ordering
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed max-w-xl mb-6">
                        Experience how your restaurant guests can browse courses, filter by dietary preference, build an order tray, and send a structured pre-order or table request directly to your team.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs text-slate-300">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-white block">Sample Address</span>
                          <span>420 Culinary Row, Suite 100</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-white block">Dinner Service</span>
                          <span>Tue – Sun · 5:30 PM – 11:00 PM</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-white block">Direct Concierge</span>
                          <span>+1 (555) 019-2834 (Demo)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 h-56 lg:h-auto rounded-xl overflow-hidden relative border border-white/10">
                    <ResilientImage
                      src={GENERATED_IMAGES.finedineWagyu}
                      alt="FineDine signature A5 Wagyu tenderloin plated with black truffle reduction"
                      fallbackCategory="restaurant"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                      <p className="text-xs text-slate-200">
                        Chef Tasting Highlight · A5 Miyazaki Wagyu & Truffle Mille-Feuille
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                      <h4 className="text-lg font-display font-bold text-white">
                        Interactive Digital Menu
                      </h4>
                      <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-white/[0.04] border border-white/10">
                        {(['All', 'Wagyu & Mains', 'Seafood', 'Starters', 'Desserts'] as const).map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setFdCategory(cat)}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                              fdCategory === cat
                                ? 'bg-amber-400 text-slate-950 font-semibold'
                                : 'text-slate-300 hover:text-white'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {FINEDINE_MENU.filter((d) => fdCategory === 'All' || d.category === fdCategory).map((dish) => {
                        const qty = fdCart[dish.id] || 0;
                        return (
                          <div
                            key={dish.id}
                            className="rounded-xl bg-[#12162E] border border-white/10 overflow-hidden flex flex-col justify-between"
                          >
                            <div>
                              <div className="h-36 w-full overflow-hidden border-b border-white/10 bg-[#080A18]">
                                <ResilientImage
                                  src={dish.image}
                                  alt={dish.name}
                                  fallbackCategory="restaurant"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="p-4">
                                <div className="flex items-start justify-between gap-2 mb-1.5">
                                  <h5 className="text-sm font-semibold text-white leading-snug">
                                    {dish.name}
                                  </h5>
                                  <span className="text-sm font-mono-tabular font-semibold text-amber-300 shrink-0">
                                    ${dish.price}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                                  {dish.description}
                                </p>
                                <p className="text-[11px] text-slate-400">
                                  {dish.category} · {dish.dietary}
                                </p>
                              </div>
                            </div>

                            <div className="px-4 py-3 bg-white/[0.02] border-t border-white/10 flex items-center justify-between">
                              {qty > 0 ? (
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => updateFdQty(dish.id, -1)}
                                    className="w-7 h-7 rounded-md bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
                                    aria-label={`Decrease quantity of ${dish.name}`}
                                  >
                                    <Minus className="w-3.5 h-3.5" />
                                  </button>
                                  <span className="text-xs font-mono-tabular font-semibold text-white w-5 text-center">
                                    {qty}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => updateFdQty(dish.id, 1)}
                                    className="w-7 h-7 rounded-md bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center cursor-pointer"
                                    aria-label={`Increase quantity of ${dish.name}`}
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => updateFdQty(dish.id, 1)}
                                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-amber-400 hover:text-slate-950 text-white text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>Add to Order</span>
                                </button>
                              )}
                              <span className="text-[11px] text-slate-400 font-mono-tabular">
                                {qty > 0 ? `$${dish.price * qty} in tray` : 'Available'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="lg:col-span-4">
                    <div className="rounded-xl bg-[#12162E] border border-white/15 p-5 sticky top-4">
                      <h4 className="text-base font-display font-bold text-white mb-1">
                        Guest Order & WhatsApp Tray
                      </h4>
                      <p className="text-xs text-slate-400 mb-4">
                        Test how diners assemble an order and send it via WhatsApp or direct checkout.
                      </p>

                      <div className="grid grid-cols-2 gap-1.5 p-1 rounded-lg bg-[#090B18] border border-white/10 mb-4">
                        {(['Dine-In Pre-Order', 'Priority Takeaway'] as const).map((mode) => (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => setFdOrderMode(mode)}
                            className={`py-1.5 px-2 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap truncate ${
                              fdOrderMode === mode
                                ? 'bg-violet-600 text-white'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>

                      {fdItemsInCart.length === 0 ? (
                        <div className="py-8 text-center border border-dashed border-white/10 rounded-lg mb-4">
                          <p className="text-xs text-slate-400">
                            Your sample order tray is empty. Select a dish from the menu to test ordering.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2.5 mb-4 max-h-48 overflow-y-auto pr-1">
                          {fdItemsInCart.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between text-xs py-1.5 border-b border-white/10"
                            >
                              <div className="pr-2">
                                <span className="font-medium text-white block">{item.name}</span>
                                <span className="text-slate-400 font-mono-tabular">
                                  {fdCart[item.id]} × ${item.price}
                                </span>
                              </div>
                              <span className="font-mono-tabular font-semibold text-amber-300">
                                ${item.price * (fdCart[item.id] || 0)}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mb-4">
                        <label className="block text-xs text-slate-300 mb-1">
                          Dietary or Table Notes (Optional)
                        </label>
                        <input
                          type="text"
                          value={fdGuestNote}
                          onChange={(e) => setFdGuestNote(e.target.value)}
                          placeholder="e.g. Table for 2 at 8 PM, no nuts"
                          className="w-full px-3 py-2 rounded-lg bg-[#090B18] border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-400"
                        />
                      </div>

                      <div className="flex items-center justify-between py-3 border-t border-white/10 mb-4">
                        <span className="text-xs text-slate-300">Estimated Total (Demo)</span>
                        <span className="text-lg font-mono-tabular font-bold text-white">
                          ${fdTotal}.00
                        </span>
                      </div>

                      {fdReceipt && (
                        <div className="mb-4 p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-200 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold block text-white">
                              Sample Order Logged ({fdReceipt})
                            </span>
                            <span>
                              Recorded on server. In a live restaurant build, this notifies the kitchen or opens WhatsApp.
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2.5">
                        <button
                          type="button"
                          disabled={fdItemsInCart.length === 0 || fdSubmitting}
                          onClick={handleFineDineDemoSubmit}
                          className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
                        >
                          {fdSubmitting ? 'Processing Sample Order...' : 'Test Instant Order Submission'}
                        </button>

                        {fdItemsInCart.length > 0 && (
                          <a
                            href={`https://wa.me/${agencyWhatsapp}?text=${encodeURIComponent(
                              buildFineDineWhatsAppText()
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Test WhatsApp Order Link</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DEMO 2: URBAN CAFÉ */}
            {activeDemo === 'urbancafe' && (
              <div className="p-6 sm:p-8 lg:p-10 bg-gradient-to-b from-[#131424] to-[#0A0C18]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
                  <div>
                    <p className="text-xs text-amber-200/90 font-medium mb-1">
                      Urban Café · Sample Specialty Roastery & Bakery Website
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                      Artisanal Coffee, Daylight Space & Table Reservations
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#090B16] border border-white/10">
                    {(
                      [
                        { id: 'menu', label: 'Roastery Menu' },
                        { id: 'gallery', label: 'Café Gallery' },
                        { id: 'location', label: 'Hours & Location' },
                        { id: 'reserve', label: 'Book a Table' }
                      ] as const
                    ).map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setUcTab(t.id)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          ucTab === t.id
                            ? 'bg-violet-600 text-white'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {ucTab === 'menu' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {URBAN_CAFE_MENU.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-xl bg-[#141830] border border-white/10 overflow-hidden flex flex-col justify-between"
                        >
                          <div>
                            <div className="h-32 w-full overflow-hidden border-b border-white/10 bg-[#080A18]">
                              <ResilientImage
                                src={item.image}
                                alt={item.name}
                                fallbackCategory="cafe"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-4">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4 className="text-sm font-semibold text-white">{item.name}</h4>
                                <span className="text-xs font-mono-tabular font-semibold text-amber-300 shrink-0">
                                  {item.price}
                                </span>
                              </div>
                              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                                {item.notes}
                              </p>
                            </div>
                          </div>
                          <div className="px-4 pb-3">
                            <span className="text-[11px] text-violet-300">{item.category}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="lg:col-span-5 rounded-xl bg-[#141830] border border-white/10 overflow-hidden">
                      <div className="h-64 w-full overflow-hidden">
                        <ResilientImage
                          src={GENERATED_IMAGES.urbanCafeLatte}
                          alt="Urban Café rosetta latte art and pistachio croissant on warm oak table"
                          fallbackCategory="cafe"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <h4 className="text-base font-display font-bold text-white mb-2">
                          Small-Batch Roasting & Laminated Pastries
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed mb-4">
                          Our sample café layout highlights daily roast notes, pastry baking schedules, and fast reservation inquiries for brunch or remote work tables.
                        </p>
                        <button
                          type="button"
                          onClick={() => setUcTab('reserve')}
                          className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Reserve a Brunch Table
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {ucTab === 'gallery' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#141830]">
                      <div className="h-52">
                        <ResilientImage
                          src={GENERATED_IMAGES.urbanCafeLatte}
                          alt="Specialty pour-over and pistachio croissant"
                          fallbackCategory="cafe"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="text-sm font-semibold text-white">Morning Espresso & Bakery Bar</h4>
                        <p className="text-xs text-slate-400 mt-1">
                          Natural daylight seating with custom oak communal tables.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#141830]">
                      <div className="h-52">
                        <ResilientImage
                          src={GENERATED_IMAGES.finedineScallops}
                          alt="Weekend brunch chef plates"
                          fallbackCategory="cafe"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="text-sm font-semibold text-white">Seasonal Weekend Brunch</h4>
                        <p className="text-xs text-slate-400 mt-1">
                          Locally sourced ingredients plated to order from 8:00 AM to 3:00 PM.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#141830]">
                      <div className="h-52">
                        <ResilientImage
                          src={GENERATED_IMAGES.finedineChocolate}
                          alt="Artisanal chocolate pastry and afternoon tasting"
                          fallbackCategory="cafe"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="text-sm font-semibold text-white">Afternoon Pastry & Tasting Flights</h4>
                        <p className="text-xs text-slate-400 mt-1">
                          Single-origin espresso flights paired with house-made patisserie.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {ucTab === 'location' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-6 rounded-xl bg-[#141830] border border-white/10 p-6">
                      <h4 className="text-base font-display font-bold text-white mb-4">
                        Opening Hours & Roastery Schedule
                      </h4>
                      <div className="space-y-3 text-xs">
                        <div className="flex justify-between py-2 border-b border-white/10">
                          <span className="text-slate-300">Monday – Thursday</span>
                          <span className="font-mono-tabular text-white">07:30 AM – 06:00 PM</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-white/10">
                          <span className="text-slate-300">Friday</span>
                          <span className="font-mono-tabular text-white">07:30 AM – 08:00 PM</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-white/10">
                          <span className="text-slate-300">Saturday – Sunday (Brunch)</span>
                          <span className="font-mono-tabular text-amber-300">08:00 AM – 07:00 PM</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 mt-5">
                        Sample Location: 88 Artisan District Avenue · 3 mins from Central Metro Station.
                      </p>
                    </div>

                    <div className="lg:col-span-6 rounded-xl bg-[#0D1022] border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden">
                      <div className="relative z-10">
                        <span className="text-xs font-mono-tabular text-violet-300 block mb-1">
                          Interactive Neighborhood Map Preview
                        </span>
                        <h4 className="text-base font-display font-bold text-white mb-2">
                          88 Artisan District Avenue (Sample Demo)
                        </h4>
                        <p className="text-xs text-slate-300 max-w-md mb-6">
                          In your live café website, we embed interactive directions, one-tap Apple/Google Maps navigation, and parking instructions.
                        </p>
                      </div>

                      <div className="relative h-36 rounded-lg bg-[#141936] border border-white/10 flex items-center justify-center overflow-hidden">
                        <svg viewBox="0 0 400 140" className="w-full h-full opacity-45">
                          <line x1="0" y1="40" x2="400" y2="40" stroke="#475569" strokeWidth="1.5" />
                          <line x1="0" y1="95" x2="400" y2="95" stroke="#475569" strokeWidth="1.5" />
                          <line x1="120" y1="0" x2="120" y2="140" stroke="#475569" strokeWidth="1.5" />
                          <line x1="270" y1="0" x2="270" y2="140" stroke="#475569" strokeWidth="2.5" />
                          <rect x="135" y="50" width="120" height="35" rx="4" fill="#1E293B" />
                        </svg>
                        <div className="absolute flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-600 text-white text-xs font-semibold shadow-lg">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>Urban Café Roastery Pin</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {ucTab === 'reserve' && (
                  <div className="max-w-2xl mx-auto rounded-xl bg-[#141830] border border-white/15 p-6">
                    <h4 className="text-lg font-display font-bold text-white mb-1">
                      Table & Brunch Reservation Inquiry (Sample Demo)
                    </h4>
                    <p className="text-xs text-slate-300 mb-5">
                      Fill out the sample form below to test instant validation and backend confirmation.
                    </p>

                    {ucResError && (
                      <div className="mb-4 p-3 rounded-lg bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200">
                        {ucResError}
                      </div>
                    )}

                    {ucResConfirm ? (
                      <div className="p-5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-sm text-emerald-100">
                        <div className="flex items-center gap-2 font-semibold text-white mb-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Reservation Inquiry Confirmed — Reference #{ucResConfirm}</span>
                        </div>
                        <p className="text-xs text-slate-300 mb-4">
                          Guest: {ucResForm.name} · {ucResForm.guests} on {ucResForm.date} at {ucResForm.time} ({ucResForm.area}).
                        </p>
                        <button
                          type="button"
                          onClick={() => setUcResConfirm(null)}
                          className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium cursor-pointer"
                        >
                          Test Another Reservation
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleUrbanCafeReserve} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-slate-300 mb-1">Guest Full Name *</label>
                          <input
                            type="text"
                            required
                            value={ucResForm.name}
                            onChange={(e) => setUcResForm({ ...ucResForm, name: e.target.value })}
                            placeholder="e.g. Elena Rostova"
                            className="w-full px-3 py-2 rounded-lg bg-[#090B16] border border-white/15 text-xs text-white focus:outline-none focus:border-violet-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-300 mb-1">Email or WhatsApp Number *</label>
                          <input
                            type="text"
                            required
                            value={ucResForm.contact}
                            onChange={(e) => setUcResForm({ ...ucResForm, contact: e.target.value })}
                            placeholder="elena@example.com"
                            className="w-full px-3 py-2 rounded-lg bg-[#090B16] border border-white/15 text-xs text-white focus:outline-none focus:border-violet-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-300 mb-1">Preferred Date</label>
                          <input
                            type="date"
                            value={ucResForm.date}
                            onChange={(e) => setUcResForm({ ...ucResForm, date: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#090B16] border border-white/15 text-xs text-white focus:outline-none focus:border-violet-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-300 mb-1">Time Slot</label>
                          <select
                            value={ucResForm.time}
                            onChange={(e) => setUcResForm({ ...ucResForm, time: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#090B16] border border-white/15 text-xs text-white focus:outline-none focus:border-violet-400"
                          >
                            <option>09:00 AM</option>
                            <option>10:30 AM</option>
                            <option>12:00 PM</option>
                            <option>02:00 PM</option>
                            <option>04:00 PM</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-slate-300 mb-1">Party Size</label>
                          <select
                            value={ucResForm.guests}
                            onChange={(e) => setUcResForm({ ...ucResForm, guests: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#090B16] border border-white/15 text-xs text-white focus:outline-none focus:border-violet-400"
                          >
                            <option>1 Guest</option>
                            <option>2 Guests</option>
                            <option>4 Guests</option>
                            <option>6+ Guests (Group Table)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-slate-300 mb-1">Seating Preference</label>
                          <select
                            value={ucResForm.area}
                            onChange={(e) => setUcResForm({ ...ucResForm, area: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#090B16] border border-white/15 text-xs text-white focus:outline-none focus:border-violet-400"
                          >
                            <option>Sunlit Window Table</option>
                            <option>Espresso Bar Counter</option>
                            <option>Quiet Courtyard Garden</option>
                          </select>
                        </div>
                        <div className="sm:col-span-2 pt-2">
                          <button
                            type="submit"
                            className="w-full py-2.5 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-colors cursor-pointer"
                          >
                            Submit Sample Table Reservation
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* DEMO 3: GLOWSKIN STORE */}
            {activeDemo === 'glowskin' && (
              <div className="p-6 sm:p-8 lg:p-10 bg-gradient-to-b from-[#111326] to-[#080A16]">
                <div className="mb-6 px-4 py-2.5 rounded-xl bg-violet-950/40 border border-violet-400/25 flex flex-wrap items-center justify-between gap-2 text-xs text-violet-200">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-violet-400 shrink-0" />
                    <span>
                      <strong>Visual & Functional Storefront Demo:</strong> Demonstrates product filtering, variant selection, cart management, and simulated checkout. Deployed client Shopify stores connect to live payment gateways (Shopify Payments, Stripe, or COD).
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
                  <div>
                    <p className="text-xs text-violet-300 font-medium mb-1">
                      GlowSkin Botanicals · Sample Direct-to-Consumer Storefront
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                      Clinical Botanical Formulations
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#090B16] border border-white/10">
                    {(['All', 'Serums', 'Moisturizers', 'Cleansers'] as const).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setGsCategory(cat)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          gsCategory === cat
                            ? 'bg-violet-600 text-white'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-5 space-y-4">
                    <h4 className="text-xs font-semibold text-slate-300">
                      Select a Product to Inspect Details & Variants
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                      {GLOWSKIN_PRODUCTS.filter(
                        (p) => gsCategory === 'All' || p.category === gsCategory
                      ).map((product) => {
                        const isSelected = gsSelectedProduct.id === product.id;
                        return (
                          <div
                            key={product.id}
                            onClick={() => {
                              setGsSelectedProduct(product);
                              setGsSizeIndex(0);
                            }}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                setGsSelectedProduct(product);
                                setGsSizeIndex(0);
                              }
                            }}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-4 ${
                              isSelected
                                ? 'bg-[#181C3B] border-violet-400 shadow-lg'
                                : 'bg-[#12152B] border-white/10 hover:border-white/25'
                            }`}
                          >
                            <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[#090B16] border border-white/10">
                              <ResilientImage
                                src={product.image}
                                alt={product.name}
                                fallbackCategory="skincare"
                                fallbackTitle={product.category}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] text-violet-300">{product.category}</p>
                              <h5 className="text-sm font-semibold text-white truncate">
                                {product.name}
                              </h5>
                              <p className="text-xs text-slate-400 line-clamp-1 mb-1.5">
                                {product.subtitle}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-mono-tabular font-semibold text-white">
                                  From ${product.basePrice}.00
                                </span>
                                <span className="text-[11px] text-violet-300 font-medium">
                                  View Details →
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="lg:col-span-4">
                    <div className="rounded-xl bg-[#141833] border border-white/15 p-5 h-full flex flex-col justify-between">
                      <div>
                        <div className="h-48 w-full rounded-lg overflow-hidden mb-4 bg-[#090B16] border border-white/10">
                          <ResilientImage
                            src={gsSelectedProduct.image}
                            alt={gsSelectedProduct.name}
                            fallbackCategory="skincare"
                            fallbackTitle={gsSelectedProduct.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-xs text-violet-300 mb-1">
                          {gsSelectedProduct.category} · In Stock
                        </p>
                        <h4 className="text-lg font-display font-bold text-white mb-1">
                          {gsSelectedProduct.name}
                        </h4>
                        <p className="text-lg font-mono-tabular font-bold text-violet-200 mb-3">
                          $
                          {Math.round(
                            gsSelectedProduct.basePrice *
                              (gsSelectedProduct.sizes[gsSizeIndex]?.multiplier || 1)
                          )}
                          .00
                        </p>
                        <p className="text-xs text-slate-300 leading-relaxed mb-4">
                          {gsSelectedProduct.description}
                        </p>

                        <div className="mb-4">
                          <label className="block text-xs font-semibold text-slate-200 mb-2">
                            Select Size Variant:
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {gsSelectedProduct.sizes.map((sz, idx) => (
                              <button
                                key={sz.label}
                                type="button"
                                onClick={() => setGsSizeIndex(idx)}
                                className={`py-2 px-3 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                                  gsSizeIndex === idx
                                    ? 'bg-violet-600/30 border-violet-400 text-white'
                                    : 'bg-[#090B16] border-white/10 text-slate-300 hover:text-white'
                                }`}
                              >
                                {sz.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-white/10 text-[11px] text-slate-300 space-y-1 mb-5">
                          <p>
                            <strong className="text-white">Key Actives:</strong> {gsSelectedProduct.actives}
                          </p>
                          <p>
                            <strong className="text-white">Recommended For:</strong> {gsSelectedProduct.skinType}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddToGlowSkinBag(gsSelectedProduct, gsSizeIndex)}
                        className="w-full py-3 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>
                          Add to Shopping Bag — $
                          {Math.round(
                            gsSelectedProduct.basePrice *
                              (gsSelectedProduct.sizes[gsSizeIndex]?.multiplier || 1)
                          )}
                          .00
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-3">
                    <div className="rounded-xl bg-[#12152B] border border-white/15 p-5">
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                        <h4 className="text-sm font-display font-bold text-white">
                          Shopping Bag ({gsCart.reduce((s, i) => s + i.qty, 0)})
                        </h4>
                        <span className="text-[11px] text-violet-300 font-mono-tabular">
                          Demo Checkout
                        </span>
                      </div>

                      {gsOrderReceipt && (
                        <div className="mb-4 p-3.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-100">
                          <p className="font-semibold text-white mb-1">
                            Order #{gsOrderReceipt} Confirmed (Demo)
                          </p>
                          <p className="text-slate-300">
                            Simulated storefront checkout complete! No real payment was charged.
                          </p>
                        </div>
                      )}

                      {gsCart.length === 0 ? (
                        <p className="text-xs text-slate-400 py-6 text-center">
                          Your shopping bag is empty. Add a skincare formulation to test checkout.
                        </p>
                      ) : (
                        <>
                          <div className="space-y-3 mb-4 max-h-52 overflow-y-auto pr-1">
                            {gsCart.map((item, idx) => (
                              <div
                                key={`${item.product.id}-${item.sizeLabel}`}
                                className="p-2.5 rounded-lg bg-[#090B16] border border-white/10 text-xs"
                              >
                                <div className="flex justify-between font-medium text-white mb-1">
                                  <span className="truncate pr-2">{item.product.name}</span>
                                  <span className="font-mono-tabular shrink-0">
                                    ${item.unitPrice * item.qty}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-400 mb-2">{item.sizeLabel}</p>
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => updateGsQty(idx, -1)}
                                    className="w-6 h-6 rounded bg-white/10 text-white flex items-center justify-center cursor-pointer"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="font-mono-tabular text-white">{item.qty}</span>
                                  <button
                                    type="button"
                                    onClick={() => updateGsQty(idx, 1)}
                                    className="w-6 h-6 rounded bg-white/10 text-white flex items-center justify-center cursor-pointer"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="py-3 border-t border-white/10 flex items-center justify-between text-xs mb-4">
                            <span className="text-slate-300">Subtotal</span>
                            <span className="text-base font-mono-tabular font-bold text-white">
                              ${gsSubtotal}.00
                            </span>
                          </div>

                          {!gsCheckoutOpen ? (
                            <button
                              type="button"
                              onClick={() => setGsCheckoutOpen(true)}
                              className="w-full py-2.5 px-4 rounded-xl bg-white text-slate-950 hover:bg-slate-200 font-semibold text-xs transition-colors cursor-pointer"
                            >
                              Proceed to Demo Checkout
                            </button>
                          ) : (
                            <form onSubmit={handleGlowSkinDemoCheckout} className="space-y-2.5 pt-2 border-t border-white/10">
                              <p className="text-[11px] text-amber-300 font-medium">
                                Demo Checkout · No Real Payment Collected
                              </p>
                              <input
                                type="text"
                                required
                                value={gsCustomer.name}
                                onChange={(e) => setGsCustomer({ ...gsCustomer, name: e.target.value })}
                                placeholder="Customer Name *"
                                className="w-full px-2.5 py-1.5 rounded bg-[#090B16] border border-white/15 text-xs text-white"
                              />
                              <input
                                type="email"
                                required
                                value={gsCustomer.email}
                                onChange={(e) => setGsCustomer({ ...gsCustomer, email: e.target.value })}
                                placeholder="Email for Receipt *"
                                className="w-full px-2.5 py-1.5 rounded bg-[#090B16] border border-white/15 text-xs text-white"
                              />
                              <button
                                type="submit"
                                className="w-full py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
                              >
                                Complete Demo Order (${gsSubtotal}.00)
                              </button>
                            </form>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DEMO 4: SMART WHATSAPP ASSISTANT */}
            {activeDemo === 'whatsapp-bot' && (
              <div className="p-6 sm:p-8 lg:p-10 bg-gradient-to-b from-[#0E1528] to-[#080A16]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5 space-y-6">
                    <div>
                      <p className="text-xs text-emerald-300 font-medium mb-1">
                        Smart WhatsApp Assistant · Interactive Simulation
                      </p>
                      <h3 className="text-2xl font-display font-bold text-white mb-2">
                        Automated FAQ Resolution, Menu Lookup & Lead Capture
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        Test how our automated assistant answers common customer questions, shares menu or catalog details, and captures customer contact inquiries.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-2">
                        1. Choose a Sample Business Bot Persona:
                      </label>
                      <div className="space-y-2">
                        {(
                          [
                            {
                              id: 'restaurant',
                              title: 'FineDine Restaurant Concierge Bot',
                              desc: 'Answers menu, dietary, hours & table booking questions'
                            },
                            {
                              id: 'ecommerce',
                              title: 'GlowSkin Store Support Bot',
                              desc: 'Answers skincare routine, shipping & return policy FAQs'
                            },
                            {
                              id: 'agency',
                              title: 'NovaAI Agency Receptionist Bot',
                              desc: 'Answers website scope, Shopify & automation questions'
                            }
                          ] as const
                        ).map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => switchBotPersona(p.id)}
                            className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                              botPersona === p.id
                                ? 'bg-violet-600/20 border-violet-400 text-white'
                                : 'bg-[#12162E] border-white/10 text-slate-300 hover:border-white/25'
                            }`}
                          >
                            <p className="text-xs font-semibold text-white">{p.title}</p>
                            <p className="text-[11px] text-slate-400 mt-0.5">{p.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#10142B] border border-white/10 text-xs text-slate-300 space-y-2">
                      <p className="font-semibold text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-violet-400" />
                        <span>Simulated Browser Demo vs. Live WhatsApp Integration</span>
                      </p>
                      <p className="leading-relaxed">
                        • <strong>This Interactive Demo:</strong> Runs directly in your browser so you can test conversation rules and lead collection immediately without leaving the page.
                      </p>
                      <p className="leading-relaxed">
                        • <strong>Live Client Deployment:</strong> Connects to your verified business phone number through supported WhatsApp Business Platform (Cloud API) providers or click-to-chat workflows.
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-7 rounded-2xl bg-[#0B0F20] border border-white/15 overflow-hidden flex flex-col h-[520px]">
                    <div className="px-5 py-3.5 bg-[#121833] border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white">
                            {botPersona === 'restaurant' && 'FineDine Automated Concierge'}
                            {botPersona === 'ecommerce' && 'GlowSkin Store Assistant'}
                            {botPersona === 'agency' && 'NovaAI Project Receptionist'}
                          </h4>
                          <p className="text-[11px] text-slate-400">
                            Interactive Sample Bot · Instant Predefined & Lead Flows
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setLeadCaptureOpen(!leadCaptureOpen)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 text-emerald-200 text-xs font-medium cursor-pointer whitespace-nowrap shrink-0"
                      >
                        Leave Customer Inquiry
                      </button>
                    </div>

                    <div className="flex-1 p-5 overflow-y-auto space-y-3.5">
                      {botMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${
                            msg.sender === 'user' ? 'items-end' : 'items-start'
                          }`}
                        >
                          <div
                            className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                              msg.sender === 'user'
                                ? 'bg-violet-600 text-white'
                                : 'bg-[#171D3B] border border-white/10 text-slate-100'
                            }`}
                          >
                            {msg.text}
                          </div>
                          {msg.meta && (
                            <span className="text-[10px] text-slate-400 mt-1 px-1">
                              {msg.meta}
                            </span>
                          )}
                        </div>
                      ))}

                      {leadCaptureOpen && (
                        <form
                          onSubmit={handleBotLeadSubmit}
                          className="p-4 rounded-xl bg-[#151B38] border border-violet-400/40 space-y-3 max-w-md"
                        >
                          <p className="text-xs font-semibold text-white">
                            Sample Automated Lead Collection Form
                          </p>
                          <input
                            type="text"
                            required
                            value={botLead.name}
                            onChange={(e) => setBotLead({ ...botLead, name: e.target.value })}
                            placeholder="Your Name *"
                            className="w-full px-3 py-1.5 rounded-lg bg-[#090B16] border border-white/15 text-xs text-white"
                          />
                          <input
                            type="text"
                            required
                            value={botLead.phone}
                            onChange={(e) => setBotLead({ ...botLead, phone: e.target.value })}
                            placeholder="WhatsApp or Email *"
                            className="w-full px-3 py-1.5 rounded-lg bg-[#090B16] border border-white/15 text-xs text-white"
                          />
                          <input
                            type="text"
                            value={botLead.inquiry}
                            onChange={(e) => setBotLead({ ...botLead, inquiry: e.target.value })}
                            placeholder="Request details (e.g. Table for 4 / Custom Quote)"
                            className="w-full px-3 py-1.5 rounded-lg bg-[#090B16] border border-white/15 text-xs text-white"
                          />
                          <div className="flex items-center gap-2">
                            <button
                              type="submit"
                              className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs cursor-pointer"
                            >
                              Send Sample Inquiry
                            </button>
                            <button
                              type="button"
                              onClick={() => setLeadCaptureOpen(false)}
                              className="px-3 py-1.5 rounded-lg bg-white/10 text-slate-300 text-xs cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      )}
                    </div>

                    <div className="px-4 py-2.5 bg-[#0E1329] border-t border-white/10 flex items-center gap-2 overflow-x-auto">
                      {botPersona === 'restaurant' && (
                        <>
                          <button
                            type="button"
                            onClick={() => triggerBotReply('What is on the signature Wagyu menu?')}
                            className="px-3 py-1 rounded-lg bg-white/[0.06] hover:bg-violet-600/30 border border-white/10 text-xs text-slate-200 whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            Signature Menu & Prices
                          </button>
                          <button
                            type="button"
                            onClick={() => triggerBotReply('What are your opening hours and location?')}
                            className="px-3 py-1 rounded-lg bg-white/[0.06] hover:bg-violet-600/30 border border-white/10 text-xs text-slate-200 whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            Opening Hours
                          </button>
                          <button
                            type="button"
                            onClick={() => triggerBotReply('I would like to book a table for tonight')}
                            className="px-3 py-1 rounded-lg bg-white/[0.06] hover:bg-violet-600/30 border border-white/10 text-xs text-slate-200 whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            Book a Table
                          </button>
                        </>
                      )}

                      {botPersona === 'ecommerce' && (
                        <>
                          <button
                            type="button"
                            onClick={() => triggerBotReply('Which serum do you recommend for dry skin?')}
                            className="px-3 py-1 rounded-lg bg-white/[0.06] hover:bg-violet-600/30 border border-white/10 text-xs text-slate-200 whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            Skincare Recommendation
                          </button>
                          <button
                            type="button"
                            onClick={() => triggerBotReply('What are your shipping times and return rules?')}
                            className="px-3 py-1 rounded-lg bg-white/[0.06] hover:bg-violet-600/30 border border-white/10 text-xs text-slate-200 whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            Shipping & Returns
                          </button>
                        </>
                      )}

                      {botPersona === 'agency' && (
                        <>
                          <button
                            type="button"
                            onClick={() => triggerBotReply('How do I request a quote for a website or store?')}
                            className="px-3 py-1 rounded-lg bg-white/[0.06] hover:bg-violet-600/30 border border-white/10 text-xs text-slate-200 whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            Request Project Quote
                          </button>
                          <button
                            type="button"
                            onClick={() => triggerBotReply('How does live WhatsApp API integration work?')}
                            className="px-3 py-1 rounded-lg bg-white/[0.06] hover:bg-violet-600/30 border border-white/10 text-xs text-slate-200 whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            WhatsApp API Setup
                          </button>
                        </>
                      )}
                    </div>

                    <form
                      onSubmit={handleBotSend}
                      className="p-3 bg-[#090C1A] border-t border-white/10 flex items-center gap-2"
                    >
                      <input
                        type="text"
                        value={botInput}
                        onChange={(e) => setBotInput(e.target.value)}
                        placeholder="Type a question (e.g., menu, hours, shipping, book table)..."
                        className="flex-1 px-3.5 py-2 rounded-xl bg-[#121730] border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-400"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <span>Send</span>
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="px-6 py-3.5 bg-[#070915] border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
            <span className="text-slate-400">
              All sample projects above are interactive demonstrations built by NovaAI.
            </span>
            <button
              type="button"
              onClick={() => onRequestSimilarProject(currentTabMeta.serviceName, currentTabMeta.name)}
              className="text-violet-300 hover:text-white font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <span>Customize this layout for your business</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
