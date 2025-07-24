const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import Supabase configuration
const { supabase, testConnection, getDatabaseInfo, testDatabaseOperations, closeConnection } = require('./config/database');

// Import routes
const waitlistRoutes = require('./routes/waitlist');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/waitlist', waitlistRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Bizfluencer.ai API is running!',
    environment: process.env.NODE_ENV,
    database: 'Supabase Connected',
    version: '1.0.0'
  });
});

// Health check with Supabase status
app.get('/health', async (req, res) => {
  try {
    const dbInfo = await getDatabaseInfo();
    
    res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      database: dbInfo.status,
      supabase: 'Connected',
      details: dbInfo
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'ERROR', 
      timestamp: new Date().toISOString(),
      database: 'Disconnected',
      supabase: 'Error',
      error: error.message
    });
  }
});

// Supabase test endpoint
app.get('/db-test', async (req, res) => {
  try {
    const dbInfo = await getDatabaseInfo();
    const dbOpsTest = await testDatabaseOperations();
    
    res.json({
      message: 'Supabase test successful',
      connection_info: dbInfo,
      database_operations: dbOpsTest,
      ready_for_tables: dbOpsTest.success
    });
  } catch (error) {
    res.status(500).json({
      message: 'Supabase test failed',
      error: error.message
    });
  }
});

// Create tables endpoint (for initial setup)
app.post('/setup-db', async (req, res) => {
  try {
    // Create waitlist table
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS waitlist (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          user_type VARCHAR(50) NOT NULL CHECK (user_type IN ('Influencer', 'Brand')),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
        CREATE INDEX IF NOT EXISTS idx_waitlist_user_type ON waitlist(user_type);
        CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at);
      `
    });

    if (error) {
      return res.status(500).json({
        message: 'Failed to create tables',
        error: error.message,
        note: 'You may need to run this SQL manually in your Supabase SQL editor'
      });
    }

    res.json({
      message: 'Database tables created successfully',
      data
    });
  } catch (error) {
    res.status(500).json({
      message: 'Database setup failed',
      error: error.message,
      note: 'You may need to run the SQL migration manually in your Supabase dashboard'
    });
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  await closeConnection();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down server...');
  await closeConnection();
  process.exit(0);
});

// Start server and test database connection
const startServer = async () => {
  try {
    // Test database connection on startup
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.log('⚠️  Starting server without database connection');
    }
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV}`);
      console.log(`🔗 API URL: http://localhost:${PORT}`);
      console.log(`❤️  Health Check: http://localhost:${PORT}/health`);
      console.log(`🗄️  DB Test: http://localhost:${PORT}/db-test`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 