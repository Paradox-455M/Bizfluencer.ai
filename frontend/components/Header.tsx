import React from 'react';
import { LogoIcon } from './icons';
import logoUrl from '../assets/bizfluencer.png';

interface HeaderProps {
  onWaitlistClick: () => void;
  onBenefitsClick: () => void;
  onReviewsClick: () => void;
  onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onWaitlistClick, onBenefitsClick, onReviewsClick, onHomeClick }) => {
  return (
    <header className="bg-dark-bg/80 sticky top-0 z-50 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 border-b border-dark-border">
          <button 
            onClick={onHomeClick}
            className="flex items-center gap-2 text-xl font-bold text-light-text hover:opacity-80 transition-opacity cursor-pointer"
          >
            <img src={logoUrl} alt="Bizfluencer" className="h-6 w-6 rounded" />
            Bizfluencer.ai
          </button>
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={onBenefitsClick} className="text-sm font-medium text-gray-text hover:text-light-text transition-colors">Why Bizfluencer.ai</button>
            <button onClick={onReviewsClick} className="text-sm font-medium text-gray-text hover:text-light-text transition-colors">Testimonials</button>
          </nav>
          <button
            onClick={onWaitlistClick}
            className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-lg text-light-text bg-brand-blue hover:bg-opacity-90 transition-all"
          >
            Join Waitlist
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;