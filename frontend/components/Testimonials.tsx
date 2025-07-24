import React from 'react';
import { QuoteIcon } from './icons';

interface TestimonialsProps {
    onWaitlistClick: () => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center">
    {Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const testimonials = [
  {
    quote: "Finally, a professional platform for collaborations. The vetting process saved me from working with a fake influencer.",
    rating: 5,
    name: 'Sarah L., D2C Brand Owner',
    title: 'Early Adopter',
    avatar: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    quote: "The structured campaigns and escrow payments are game-changers. No more chasing invoices!",
    rating: 5,
    name: 'David Chen, Micro-influencer',
    title: 'Early Adopter',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

const TestimonialCard: React.FC<{ testimonial: typeof testimonials[0] }> = ({ testimonial }) => (
    <div className="bg-dark-card p-8 rounded-2xl border border-dark-border">
        <QuoteIcon className="w-12 h-12 text-gray-700 transform -scale-y-100" />
        <p className="mt-6 text-xl text-light-text font-medium">"{testimonial.quote}"</p>
        <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <img className="h-10 w-10 rounded-full" src={testimonial.avatar} alt={testimonial.name} />
                <div>
                    <p className="font-semibold text-light-text">{testimonial.name}</p>
                    <p className="text-sm text-gray-text">{testimonial.title}</p>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <StarRating rating={Math.round(testimonial.rating)} />
                <p className="text-sm text-gray-text mt-1">{testimonial.rating.toFixed(1)}</p>
            </div>
        </div>
    </div>
);


const Testimonials: React.FC<TestimonialsProps> = ({ onWaitlistClick }) => {
  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-brand-blue/10 blur-3xl rounded-full opacity-60 -translate-x-1/3" aria-hidden="true" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm font-semibold text-brand-blue uppercase tracking-wider">Trusted By Early Adopters</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-light-text sm:text-5xl">
                Don't Just Take Our Word For It
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-text">
                See what our first users are saying about collaborating on Bizfluencer.ai.
            </p>
            <button onClick={onWaitlistClick} className="mt-6 font-semibold text-brand-blue hover:text-opacity-80 transition-opacity">
                Join the Waitlist &rarr;
            </button>
        </div>
        <div className="mt-16 max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;