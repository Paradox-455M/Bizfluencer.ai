import React, { useState, useEffect } from 'react';
import { getWaitlistStats } from '../utils/api';

interface WaitlistStatsProps {
  className?: string;
}

const WaitlistStats: React.FC<WaitlistStatsProps> = ({ className = '' }) => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getWaitlistStats();
        setStats(response.stats);
      } catch (error: any) {
        console.error('Failed to fetch waitlist stats:', error);
        setError('Unable to load stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className={`text-center ${className}`}>
        <div className="inline-flex items-center gap-2 text-sm text-gray-text">
          <div className="w-4 h-4 border-2 border-gray-text border-t-transparent rounded-full animate-spin"></div>
          Loading stats...
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return null; // Fail silently for better UX
  }

  return (
    <div className={`text-center ${className}`}>
      <p className="text-sm text-gray-text">
        <span className="font-semibold text-brand-blue">{stats.total}</span> people joined • 
        <span className="ml-1">{stats.recent_signups} this week</span>
      </p>
    </div>
  );
};

export default WaitlistStats; 