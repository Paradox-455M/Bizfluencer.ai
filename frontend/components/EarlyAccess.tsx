import React from 'react';
import { CheckCircleIcon } from './icons';

interface EarlyAccessProps {
  onWaitlistClick: () => void;
}

const perks = [
  'Lifetime pro access for the first 100 users',
  'Priority listing in our launch directory',
  'Exclusive access to our private feedback community',
];

const EarlyAccess: React.FC<EarlyAccessProps> = ({ onWaitlistClick }) => {
  return (
    <section className="bg-slate-50 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-4xl mx-auto bg-brand-indigo-700 rounded-2xl shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-indigo-700 to-brand-indigo-900 mix-blend-multiply"></div>
           <div
            className="absolute -top-1/2 -right-1/4 w-full h-full opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, white, transparent 40%)',
            }}
            aria-hidden="true"
          />
          <div className="relative p-8 sm:p-12 lg:flex lg:items-center">
            <div className="lg:flex-1">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Get Early Access & Exclusive Perks
              </h2>
              <p className="mt-4 text-lg text-brand-indigo-200">
                Be among the first to experience Bizfluencer.ai. Sign up for the waitlist and help shape the future of creator collaborations.
              </p>
              <ul className="mt-8 space-y-4">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircleIcon className="h-6 w-6 text-brand-indigo-400" />
                    </div>
                    <p className="ml-3 text-base text-brand-indigo-100">{perk}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 lg:mt-0 lg:ml-12 lg:flex-shrink-0">
              <button
                onClick={onWaitlistClick}
                className="w-full inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-brand-indigo-700 bg-white hover:bg-brand-indigo-50 shadow-lg transition-all transform hover:scale-105"
              >
                Apply for Early Access
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccess;