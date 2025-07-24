const express = require('express');
const { supabase } = require('../config/database');

const router = express.Router();

// Get all waitlist entries
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('waitlist')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({
        message: 'Failed to fetch waitlist entries',
        error: error.message
      });
    }

    res.json({
      message: 'Waitlist entries fetched successfully',
      data: data || [],
      count: data ? data.length : 0
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

// Add new waitlist entry
router.post('/', async (req, res) => {
  try {
    const { email, user_type } = req.body;

    // Validate required fields
    if (!email || !user_type) {
      return res.status(400).json({
        message: 'Email and user_type are required',
        required_fields: ['email', 'user_type']
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Invalid email format'
      });
    }

    // Validate user_type
    if (!['Influencer', 'Brand'].includes(user_type)) {
      return res.status(400).json({
        message: 'user_type must be either "Influencer" or "Brand"'
      });
    }

    // Check if email already exists
    const { data: existing, error: checkError } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email.toLowerCase())
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      return res.status(500).json({
        message: 'Error checking existing email',
        error: checkError.message
      });
    }

    if (existing) {
      return res.status(409).json({
        message: 'Email already exists in waitlist',
        email: email
      });
    }

    // Insert new waitlist entry
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{
        email: email.toLowerCase(),
        user_type: user_type,
        created_at: new Date().toISOString()
      }])
      .select();

    if (error) {
      return res.status(500).json({
        message: 'Failed to add to waitlist',
        error: error.message
      });
    }

    res.status(201).json({
      message: 'Successfully added to waitlist',
      data: data[0]
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

// Get waitlist statistics
router.get('/stats', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('waitlist')
      .select('user_type, created_at');

    if (error) {
      return res.status(500).json({
        message: 'Failed to fetch waitlist statistics',
        error: error.message
      });
    }

    const stats = {
      total: data ? data.length : 0,
      influencers: data ? data.filter(entry => entry.user_type === 'Influencer').length : 0,
      brands: data ? data.filter(entry => entry.user_type === 'Brand').length : 0,
      recent_signups: data ? data.filter(entry => {
        const entryDate = new Date(entry.created_at);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return entryDate > weekAgo;
      }).length : 0
    };

    res.json({
      message: 'Waitlist statistics',
      stats
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router; 