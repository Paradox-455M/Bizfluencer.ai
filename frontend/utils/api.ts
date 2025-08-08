// API Configuration
// Use env when provided; otherwise auto-select based on host
// const API_BASE_URL =
//   (import.meta as any).env?.VITE_API_BASE_URL ||
//   (typeof window !== 'undefined' && window.location.hostname.endsWith('vercel.app')
//     ? 'https://bizfluencerai-production.up.railway.app'
//     : 'http://localhost:5000');

const API_BASE_URL ='https://bizfluencerai-production.up.railway.app';
export interface WaitlistEntry {
  email: string;
  user_type: 'Influencer' | 'Brand';
}

export interface WaitlistResponse {
  message: string;
  data?: {
    id: number;
    email: string;
    user_type: string;
    created_at: string;
  };
  error?: string;
  required_fields?: string[];
}

// Add user to waitlist
export const addToWaitlist = async (data: WaitlistEntry): Promise<WaitlistResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to join waitlist');
    }

    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Get waitlist statistics
export const getWaitlistStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/waitlist/stats`);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch stats');
    }

    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Check API health
export const checkAPIHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return await response.json();
  } catch (error) {
    console.error('API Health Check Failed:', error);
    throw error;
  }
}; 