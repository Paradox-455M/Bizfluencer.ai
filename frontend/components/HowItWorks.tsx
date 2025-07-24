import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Create Your Profile',
    description: 'Build your brand or creator profile in minutes. Showcase your work and what you\'re looking for.',
  },
  {
    number: '02',
    title: 'Match & Message',
    description: 'Discover and connect with verified partners that align with your goals and values.',
  },
  {
    number: '03',
    title: 'Launch Campaigns',
    description: 'Use our tools to launch collaborations with clear goals, deliverables, and tracked milestones.',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">How It Works</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            A seamless, transparent process for successful collaborations.
          </p>
        </div>

        <div className="mt-20">
          <div className="relative">
            {/* Desktop Connector */}
            <div className="hidden md:block absolute top-8 left-0 w-full h-px bg-slate-200" aria-hidden="true"></div>
            
            <div className="relative grid md:grid-cols-3 gap-x-8 gap-y-16">
              {/* Mobile Connector */}
              <div className="md:hidden absolute top-0 left-8 w-px h-full bg-slate-200" aria-hidden="true"></div>

              {steps.map((step) => (
                <div key={step.number} className="relative md:text-center">
                    <div className="flex items-start md:flex-col md:items-center">
                        <div className="flex-shrink-0 h-16 w-16 flex items-center justify-center rounded-full bg-brand-indigo-600 text-white font-bold text-xl z-10 ring-8 ring-white">
                          {step.number}
                        </div>
                        <div className="ml-6 md:ml-0 md:mt-8">
                          <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                          <p className="mt-2 text-base text-slate-600">{step.description}</p>
                        </div>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;