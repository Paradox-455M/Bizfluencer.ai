import React, { useState } from 'react';
import { UserType } from '../types';
import { CheckCircleIcon } from './icons';
import { addToWaitlist, WaitlistEntry } from '../utils/api';

const WaitlistForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState<UserType>(UserType.INFLUENCER);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successData, setSuccessData] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Client-side validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
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

  if (isSubmitted) {
    return (
        <section className="bg-white py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-md mx-auto">
                    <CheckCircleIcon className="h-16 w-16 mx-auto text-green-500" />
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Thank You!
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Thank you for joining, {successData?.email ? successData.email : 'valued user'}! 
                        We'll be in touch soon with your early access details.
                    </p>
                    <div className="mt-4 text-sm text-slate-500">
                      <p>✨ Welcome to the {userType.toLowerCase()} early access program</p>
                      {successData?.created_at && (
                        <p className="mt-1">Joined on {new Date(successData.created_at).toLocaleDateString()}</p>
                      )}
                    </div>
                </div>
            </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Join the Waitlist
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Sign up now to secure your spot and get exclusive early access.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-10 space-y-4">
            <div className="space-y-4">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-5 py-3.5 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-indigo-500/50 focus:border-brand-indigo-500 sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="you@example.com"
                disabled={isLoading}
              />
              <select
                id="userType"
                name="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value as UserType)}
                className="block w-full px-5 py-3.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-indigo-500/50 focus:border-brand-indigo-500 sm:text-base bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                <option>{UserType.INFLUENCER}</option>
                <option>{UserType.BRAND}</option>
              </select>
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600 text-center">{error}</p>
              </div>
            )}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-brand-indigo-600 hover:bg-brand-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-indigo-500 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Joining...
                  </div>
                ) : (
                  'Get Early Access'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default WaitlistForm;