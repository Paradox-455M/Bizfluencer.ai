import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { TwitterIcon, InstagramIcon, CheckCircleIcon } from './icons';
import { UserType } from '../types';
import { addToWaitlist, WaitlistEntry } from '../utils/api';
import WaitlistStats from './WaitlistStats';

export interface HeroRef {
  resetForm: () => void;
}

const Hero = forwardRef<HeroRef>((props, ref) => {
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState<UserType>(UserType.INFLUENCER);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successData, setSuccessData] = useState<any>(null);

  const resetForm = () => {
    setEmail('');
    setUserType(UserType.INFLUENCER);
    setIsSubmitted(false);
    setIsLoading(false);
    setError('');
    setSuccessData(null);
  };

  useImperativeHandle(ref, () => ({
    resetForm
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email.');
      return;
    }
    
    setError('');
    setIsLoading(true);

    try {
      const waitlistData: WaitlistEntry = {
        email: email.toLowerCase().trim(),
        user_type: userType
      };

      const response = await addToWaitlist(waitlistData);
      
      setSuccessData(response.data);
      setIsSubmitted(true);
      
      // Analytics or tracking can be added here
      console.log('✅ User successfully added to waitlist:', response);
      
    } catch (error: any) {
      console.error('❌ Waitlist submission failed:', error);
      
      // Handle specific error cases
      if (error.message.includes('already exists')) {
        setError('This email is already on our waitlist! Thanks for your interest.');
      } else if (error.message.includes('Invalid email')) {
        setError('Please enter a valid email address.');
      } else if (error.message.includes('Failed to fetch')) {
        setError('Unable to connect to our servers. Please try again later.');
      } else {
        setError(error.message || 'Something went wrong. Please try again.');
      }
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative py-20 md:py-24 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-brand-blue/20 blur-3xl rounded-full" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute -top-4 -left-4 -right-4 -bottom-4 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-3xl z-0" style={{WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', padding: '1px'}}></div>
          <div className="relative bg-dark-card p-8 md:p-10 rounded-3xl text-center shadow-2xl shadow-black/50">
            {isSubmitted ? (
               <div className="flex flex-col items-center justify-center min-h-[400px]">
                <CheckCircleIcon className="h-20 w-20 text-green-400 mb-6" />
                <h2 className="text-3xl font-bold text-light-text">You're on the list!</h2>
                <p className="mt-2 text-gray-text">
                  Thank you for joining, {successData?.email ? successData.email : 'valued user'}! 
                  We'll be in touch soon with your early access details.
                </p>
                <div className="mt-4 text-sm text-gray-text">
                  <p>✨ Welcome to the {userType.toLowerCase()} early access program</p>
                  {successData?.created_at && (
                    <p className="mt-1">Joined on {new Date(successData.created_at).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-4xl md:text-5xl font-bold text-light-text leading-tight">Where Brands & Influencers Collaborate with Confidence</h1>
                <p className="mt-4 max-w-lg mx-auto text-gray-text">
                  A trusted platform to find the right creator, manage campaigns, and protect your payments — all in one place.
                </p>
                
                <div className="my-10 text-left">
                  <h2 className="text-xl font-semibold text-center text-light-text mb-6">Join the Early Access Waitlist</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-light-text placeholder-gray-text focus:outline-none focus:ring-2 focus:ring-brand-blue disabled:opacity-50"
                      required
                      disabled={isLoading}
                    />
                    <select
                      value={userType}
                      onChange={(e) => setUserType(e.target.value as UserType)}
                      className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-light-text focus:outline-none focus:ring-2 focus:ring-brand-blue disabled:opacity-50"
                      disabled={isLoading}
                    >
                      <option>{UserType.INFLUENCER}</option>
                      <option>{UserType.BRAND}</option>
                    </select>
                    {error && (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                        <p className="text-sm text-red-400 text-center">{error}</p>
                      </div>
                    )}
                    <button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full bg-brand-blue text-light-text font-semibold rounded-lg px-4 py-3.5 hover:bg-opacity-90 transition-all shadow-glow-blue disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-light-text border-t-transparent rounded-full animate-spin"></div>
                          Joining...
                        </>
                      ) : (
                        'Get Early Access'
                      )}
                    </button>
                  </form>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-center">
                    <div className="flex -space-x-2">
                      <img className="inline-block h-6 w-6 rounded-full ring-2 ring-dark-card" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                      <img className="inline-block h-6 w-6 rounded-full ring-2 ring-dark-card" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                      <img className="inline-block h-6 w-6 rounded-full ring-2 ring-dark-card" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                    </div>
                    <p className="ml-3 text-xs text-gray-text">Join creators & brands</p>
                  </div>
                  <WaitlistStats />
                </div>
                
                <div className="mt-8 flex justify-center space-x-6">
                    <a href="#" className="text-gray-text hover:text-light-text transition-colors"><TwitterIcon className="w-5 h-5" /></a>
                    <a href="#" className="text-gray-text hover:text-light-text transition-colors"><InstagramIcon className="w-5 h-5" strokeWidth={2}/></a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

export default Hero;