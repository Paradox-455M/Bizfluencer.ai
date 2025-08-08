import React from 'react';
import { VerifiedIcon, CampaignIcon, EscrowIcon } from './icons';

const benefits = [
  { icon: VerifiedIcon, title: 'Verified Influencer Profiles', description: 'Avoid fake followers & engagement.' },
  { icon: CampaignIcon, title: 'Structured Campaigns', description: 'Collaborate with clarity.' },
  { icon: EscrowIcon, title: 'Escrow Payments', description: 'Pay safely, get guaranteed delivery.' },
];

const BenefitCard: React.FC<{ benefit: typeof benefits[0] }> = ({ benefit }) => (
  <div className="bg-dark-card p-6 rounded-2xl border border-dark-border relative overflow-hidden group">
    <div className="absolute top-0 left-0 w-full h-full bg-brand-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative z-10">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-brand-blue/10 border border-brand-blue/20 text-brand-blue">
            <benefit.icon className="w-5 h-5" />
        </div>
        <div>
            <h3 className="text-base font-semibold text-light-text">{benefit.title}</h3>
            <p className="mt-1 text-sm text-gray-text">{benefit.description}</p>
        </div>
      </div>
    </div>
  </div>
);

import logoUrl from '../assets/bizfluencer.png';

const HowItWorksVideo = () => (
  <div className="mt-12 w-full aspect-video bg-dark-card border border-dark-border rounded-2xl flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 bg-grid-pattern opacity-5" style={{ '--grid-color': 'rgba(255,255,255,0.2)', '--grid-size': '30px' } as React.CSSProperties} />
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
    <div className="relative z-10 flex flex-col items-center text-center">
      <img src={logoUrl} alt="Bizfluencer Logo" className="w-28 h-28 rounded-lg shadow-glow-blue" />
    </div>
  </div>
);


const Benefits: React.FC = () => {
  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      <div className="absolute top-1/4 right-0 w-2/3 h-2/3 bg-brand-blue/10 blur-3xl rounded-full opacity-60 translate-x-1/2" aria-hidden="true" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold tracking-tight text-light-text sm:text-5xl">
            Why Bizfluencer.ai?
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-text">
            We built a platform that puts trust and professionalism first, so you can collaborate with confidence.
          </p>
        </div>
        <div className="mt-16 max-w-4xl mx-auto grid gap-6 md:grid-cols-3">
          {benefits.map((b) => (
            <BenefitCard key={b.title} benefit={b} />
          ))}
        </div>
        <div className="mt-16 max-w-4xl mx-auto">
            <HowItWorksVideo />
        </div>
      </div>
    </section>
  );
};

export default Benefits;