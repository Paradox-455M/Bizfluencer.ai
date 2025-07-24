import React, { useState } from 'react';
import { ChevronDownIcon } from './icons';

interface FAQProps {
    onWaitlistClick: () => void;
}

const faqs = [
  {
    question: "What is Bizfluencer.ai?",
    answer: "Bizfluencer.ai is a two-sided marketplace where brands and influencers can collaborate professionally. We provide tools for verified profiles, structured campaigns, and secure escrow payments to ensure trust and clarity for both parties."
  },
  {
    question: "Who is Bizfluencer.ai for?",
    answer: "Our platform is designed for small to medium-sized D2C brands and startups, as well as micro-influencers (typically with 5k-200k followers) who are serious about professional collaborations."
  },
  {
    question: "How do escrow payments work?",
    answer: "When a campaign starts, the brand's payment is held securely in escrow. Funds are only released to the influencer once predefined campaign milestones are met and the work is approved by the brand, protecting both sides."
  },
  {
    question: "Are influencer profiles verified?",
    answer: "Yes. We have a vetting process to verify influencer profiles, helping brands avoid fake followers and ensuring authentic engagement. We believe in quality over quantity."
  },
   {
    question: "When can I join?",
    answer: "We are currently in an early access phase. You can sign up for the waitlist today to be among the first to get access to the platform and receive exclusive perks."
  }
];

const FaqItem: React.FC<{ faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void; }> = ({ faq, isOpen, onToggle }) => (
    <div className="border-b border-dark-border">
        <button
            onClick={onToggle}
            className="w-full flex justify-between items-center text-left py-6"
        >
            <span className="text-lg font-medium text-light-text">{faq.question}</span>
            <ChevronDownIcon className={`w-6 h-6 text-gray-text transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
        </button>
        <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
                <p className="pb-6 text-gray-text">
                    {faq.answer}
                </p>
            </div>
        </div>
    </div>
);

const FAQ: React.FC<FAQProps> = ({ onWaitlistClick }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

  return (
    <section className="relative py-20 sm:py-24 bg-dark-bg overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-blue/5 blur-3xl rounded-full opacity-70 translate-x-1/2" aria-hidden="true" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
                <p className="text-sm font-semibold text-brand-blue uppercase tracking-wider">Answering Your Questions</p>
                <h2 className="mt-4 text-4xl font-bold tracking-tight text-light-text sm:text-5xl">
                    Frequently Asked Questions
                </h2>
                <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-text">
                    Here are some common questions about how Bizfluencer.ai works and how you can get started.
                </p>
                <button onClick={onWaitlistClick} className="mt-6 font-semibold text-brand-blue hover:text-opacity-80 transition-opacity">
                    Join the Waitlist &rarr;
                </button>
            </div>

            <div className="mt-16 max-w-3xl mx-auto">
                {faqs.map((faq, index) => (
                    <FaqItem
                        key={index}
                        faq={faq}
                        isOpen={openIndex === index}
                        onToggle={() => handleToggle(index)}
                    />
                ))}
            </div>
        </div>
    </section>
  );
};

export default FAQ;