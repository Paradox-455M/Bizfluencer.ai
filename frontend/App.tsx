import React, { useRef } from 'react';
import Header from './components/Header';
import Hero, { HeroRef } from './components/Hero';
import Benefits from './components/Benefits';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

const App: React.FC = () => {
  const waitlistRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HeroRef>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleHomeClick = () => {
    // Reset the hero form and scroll to top
    heroRef.current?.resetForm();
    scrollTo(waitlistRef);
  };

  return (
    <div className="bg-dark-bg font-sans text-light-text antialiased">
      <Header
        onWaitlistClick={() => scrollTo(waitlistRef)}
        onBenefitsClick={() => scrollTo(benefitsRef)}
        onReviewsClick={() => scrollTo(reviewsRef)}
        onHomeClick={handleHomeClick}
      />
      <main>
        <div ref={waitlistRef}>
          <Hero ref={heroRef} />
        </div>
        <div ref={benefitsRef}>
          <Benefits />
        </div>
        <div ref={reviewsRef}>
          <Testimonials onWaitlistClick={() => scrollTo(waitlistRef)} />
        </div>
        <FAQ onWaitlistClick={() => scrollTo(waitlistRef)} />
      </main>
      <Footer />
    </div>
  );
};

export default App;