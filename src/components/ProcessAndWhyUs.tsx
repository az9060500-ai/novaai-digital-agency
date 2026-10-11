import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface ProcessAndWhyUsProps {
  onStartConsultation: () => void;
}

const PROCESS_STEPS = [
  {
    number: '01.',
    title: 'Tell us about your business.',
    summary:
      'Share your industry, target customers, brand style, and whether you need a business website, restaurant menu system, Shopify store, or WhatsApp chatbot.',
    clientProvides: 'Business overview, logo/brand preferences, menu or product list',
    novaDeliverable: 'Clear scope recommendation, feature checklist, and transparent project quote'
  },
  {
    number: '02.',
    title: 'Choose your preferred design and features.',
    summary:
      'Review our interactive layouts and select the exact capabilities your customers need—such as category filters, table booking inquiries, cart drawers, or FAQ flows.',
    clientProvides: 'Preferred visual direction and required workflow features',
    novaDeliverable: 'Tailored wireframes, interactive design preview, and milestone schedule'
  },
  {
    number: '03.',
    title: 'We build and test your solution.',
    summary:
      'Our engineering team develops your responsive interface, integrates your content, validates forms and cart workflows, and tests across mobile and desktop screens.',
    clientProvides: 'Feedback on staging preview link and final copy/photo approvals',
    novaDeliverable: 'Fully responsive, speed-optimized build tested on iOS, Android, and desktop'
  },
  {
    number: '04.',
    title: 'Launch your website or chatbot.',
    summary:
      'We connect your custom domain, configure live inquiry delivery or payment gateways, and walk you through managing your new digital platform.',
    clientProvides: 'Domain DNS access or official platform account credentials',
    novaDeliverable: 'Production launch, handover documentation, and optional ongoing maintenance'
  }
];

const WHY_CHOOSE_ITEMS = [
  {
    index: '01.',
    title: 'Modern Architectural Design',
    description:
      'Every interface is crafted with refined typography, balanced dark or light contrast, and subtle 3D depth that sets your brand apart from generic templates.'
  },
  {
    index: '02.',
    title: 'AI-Assisted Development Workflow',
    description:
      'We use modern AI-assisted coding and prototyping tools to accelerate layout iteration and quality assurance—passing the time savings directly to you.'
  },
  {
    index: '03.',
    title: 'Mobile-Friendly Layouts',
    description:
      'From restaurant diners scanning a menu on their phone to shoppers browsing skincare products, every button, filter, and form is optimized for mobile touchscreens.'
  },
  {
    index: '04.',
    title: 'Affordable Custom Solutions',
    description:
      'Scope only the features your business genuinely needs right now, with modular architecture that lets you add e-commerce or chatbot automation as you grow.'
  },
  {
    index: '05.',
    title: 'Transparent Communication',
    description:
      'You receive staging preview links, clear milestone updates, and straightforward explanations of any third-party hosting, Shopify, or API costs upfront.'
  },
  {
    index: '06.',
    title: 'Ongoing Support Options',
    description:
      'Need seasonal menu updates, new product collection launches, or chatbot FAQ refinements after launch? We offer flexible post-launch support plans.'
  }
];

export const ProcessAndWhyUs: React.FC<ProcessAndWhyUsProps> = ({
  onStartConsultation
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  return (
    <section id="process" className="py-24 relative border-b border-white/10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* PART 1: HOW IT WORKS (4-STEP PROCESS) */}
        <div className="mb-24">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-medium tracking-wider text-violet-300 mb-3">
              How It Works · Four-Step Delivery Process
            </p>
            <h2
              className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight mb-4"
              style={{ textWrap: 'balance' }}
            >
              From Initial Discovery to Production Launch in Four Clear Steps
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              We keep the development process structured and predictable so you can focus on running your business while we engineer your digital upgrade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, idx) => {
              const isSelected = activeStepIndex === idx;
              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStepIndex(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveStepIndex(idx)}
                  className={`rounded-2xl p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
                    isSelected
                      ? 'bg-[#131735] border-violet-400/70 shadow-xl shadow-violet-950/30'
                      : 'bg-[#0C0F24]/80 border-white/10 hover:border-white/25'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-mono-tabular font-bold text-violet-300">
                        {step.number}
                      </span>
                      <span className="text-xs text-slate-400">
                        Step {idx + 1} of 4
                      </span>
                    </div>
                    <h3 className="text-lg font-display font-bold text-white mb-3 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                      {step.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 text-xs space-y-2">
                    <div>
                      <span className="text-slate-400 block">Your Input:</span>
                      <span className="text-slate-200">{step.clientProvides}</span>
                    </div>
                    <div>
                      <span className="text-violet-300 block">NovaAI Output:</span>
                      <span className="text-white font-medium">{step.novaDeliverable}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PART 2: WHY CHOOSE US */}
        <div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-wider text-violet-300 mb-3">
                Why Choose NovaAI · Practical Engineering Standards
              </p>
              <h2
                className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight mb-4"
                style={{ textWrap: 'balance' }}
              >
                Thoughtful Design, Honest Scope, and Reliable Technical Execution
              </h2>
              <p className="text-base text-slate-300 leading-relaxed">
                We focus on tangible deliverables—clean code, intuitive user interfaces, and dependable integrations—without inflated promises or hidden lock-in.
              </p>
            </div>

            <button
              type="button"
              onClick={onStartConsultation}
              className="px-5 py-3 rounded-xl bg-white/[0.07] hover:bg-white/[0.14] border border-white/15 text-white text-xs font-semibold transition-colors flex items-center gap-2 self-start cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Discuss Your Project Scope</span>
              <ArrowRight className="w-4 h-4 text-violet-300" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_ITEMS.map((item) => (
              <div
                key={item.index}
                className="rounded-2xl bg-[#0C0F24]/80 border border-white/10 p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono-tabular text-violet-300 block mb-2">
                    {item.index}
                  </span>
                  <h3 className="text-lg font-display font-bold text-white mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
