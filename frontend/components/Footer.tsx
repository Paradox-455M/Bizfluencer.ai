import React from 'react';
import { LogoIcon, TwitterIcon, InstagramIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <>
      <section className="py-20 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-brand-blue/10 blur-3xl rounded-full opacity-60" aria-hidden="true" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="bg-dark-card border border-dark-border rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold text-light-text">Have Questions?</h2>
              <p className="mt-2 text-gray-text">Get in touch with our team for any inquiries.</p>
              <button className="mt-6 inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg text-light-text bg-brand-blue hover:bg-opacity-90 transition-all">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-dark-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                 <LogoIcon className="h-6 w-6 text-brand-blue" />
                 <span className="text-lg font-semibold text-light-text">Bizfluencer.ai</span>
              </div>
              <p className="text-sm text-gray-text">&copy; {new Date().getFullYear()} Bizfluencer.ai. All rights reserved.</p>
              <div className="flex items-center space-x-5">
                 <a href="#" className="text-gray-text hover:text-light-text transition-colors"><TwitterIcon className="w-5 h-5" /></a>
                 <a href="#" className="text-gray-text hover:text-light-text transition-colors"><InstagramIcon className="w-5 h-5" strokeWidth={2}/></a>
              </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;