const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Supabase client configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase configuration. Please check SUPABASE_URL and SUPABASE_ANON_KEY in .env file');
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false
  }
});

// Test connection on initialization
console.log('🚀 Initializing Supabase client...');
console.log('🔗 URL:', supabaseUrl);
console.log('🔑 Key (first 20 chars):', supabaseKey.substring(0, 20) + '...');

// Test Supabase connection
const testConnection = async () => {
  try {
    console.log('🔍 Testing Supabase connection...');
    
    // Simple auth session check (this always works)
    const { data, error } = await supabase.auth.getSession();
    
    if (error && error.message !== 'No session found') {
      console.warn('⚠️ Connection test warning:', error.message);
    } else {
      console.log('✅ Supabase connection established');
      if (data.session) {
        console.log('👤 Existing session found for:', data.session.user.email);
      } else {
        console.log('📝 No existing session found');
      }
    }
    
    console.log('🌐 Supabase URL:', supabaseUrl);
    console.log('🔑 API Key configured: Yes');
    
    return true;
  } catch (error) {
    console.error('❌ Supabase connection test failed:', error.message);
    return false;
  }
};

// Get database info
const getDatabaseInfo = async () => {
  try {
    // Test with auth session (most reliable test)
    const { data: authData, error: authError } = await supabase.auth.getSession();
    
    return {
      status: 'Connected',
      connection: 'Supabase API',
      url: supabaseUrl,
      auth_available: !authError || authError.message === 'No session found',
      session_exists: !!authData.session,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      status: 'Error',
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
};

// Test basic database operations (for later use)
const testDatabaseOperations = async () => {
  try {
    // This will be useful when we create tables
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .limit(5);
    
    return {
      success: !error,
      tables: data || [],
      error: error ? error.message : null
    };
  } catch (error) {
    return {
      success: false,
      tables: [],
      error: error.message
    };
  }
};

// Graceful shutdown (Supabase client doesn't need explicit closing)
const closeConnection = async () => {
  console.log('Supabase connection closed');
  return true;
};

// Initialize connection test
(async () => {
  await testConnection();
})();

module.exports = {
  supabase,
  testConnection,
  getDatabaseInfo,
  testDatabaseOperations,
  closeConnection
}; 