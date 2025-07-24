import React from 'react';
import { VerifiedIcon, CampaignIcon, EscrowIcon } from './icons';

const benefits = [
  {
    icon: VerifiedIcon,
    title: 'Verified Influencer Profiles',
    description: 'Avoid fake followers & engagement with our thorough vetting process.',
  },
  {
    icon: CampaignIcon,
    title: 'Structured Campaigns',
    description: 'Collaborate with clarity using templated briefs and clear milestones.',
  },
  {
    icon: EscrowIcon,
    title: 'Escrow Payments',
    description: 'Pay safely with funds held until work is approved. Guaranteed delivery.',
  },
];

const BenefitCard: React.FC<{ benefit: typeof benefits[0] }> = ({ benefit }) => (
  <div className="bg-white p-8 rounded-xl border border-slate-200/70 hover:shadow-xl hover:border-brand-indigo-200 transition-all duration-300 transform hover:-translate-y-1">
    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-brand-indigo-100 text-brand-indigo-600 mb-6">
      <benefit.icon className="h-6 w-6" />
    </div>
    <h3 className="text-lg font-semibold text-slate-900">{benefit.title}</h3>
    <p className="mt-2 text-base text-slate-600">{benefit.description}</p>
  </div>
);

const WhyBizfluencer: React.FC = () => {
  return (
    <section className="bg-slate-50 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Why Bizfluencer.ai?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            We built a platform that puts trust and professionalism first.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {benefits.map((benefit) => (
            <BenefitCard key={benefit.title} benefit={benefit} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBizfluencer;