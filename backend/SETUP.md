# Backend Setup Guide

## Supabase Database Setup

Since we're using Supabase, you'll need to create the database tables manually through the Supabase dashboard.

### Step 1: Access Supabase Dashboard

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Login and navigate to your project: `uccaoznyhlxixoiuwgtv`
3. Click on "SQL Editor" in the sidebar

### Step 2: Create the Waitlist Table

Copy and paste the following SQL into the SQL Editor and run it:

```sql
-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  user_type VARCHAR(50) NOT NULL CHECK (user_type IN ('Influencer', 'Brand')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_user_type ON waitlist(user_type);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at);

-- Add trigger to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_waitlist_updated_at 
  BEFORE UPDATE ON waitlist 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
```

### Step 3: Enable Row Level Security (Optional but Recommended)

For production, you should enable RLS:

```sql
-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust as needed)
CREATE POLICY "Allow public read access" ON waitlist
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON waitlist
  FOR INSERT WITH CHECK (true);
```

### Step 4: Test the Setup

After running the SQL, restart your backend server and test these endpoints:

- `GET http://localhost:5000/api/waitlist` - Should return empty array
- `POST http://localhost:5000/api/waitlist` - Should accept email and user_type
- `GET http://localhost:5000/api/waitlist/stats` - Should return statistics

### Step 5: Test Data (Optional)

You can add some test data:

```sql
INSERT INTO waitlist (email, user_type) VALUES
('john.doe@example.com', 'Influencer'),
('jane.brand@company.com', 'Brand')
ON CONFLICT (email) DO NOTHING;
```

## Available API Endpoints

### Waitlist Endpoints
- `GET /api/waitlist` - Get all waitlist entries
- `POST /api/waitlist` - Add new waitlist entry
- `GET /api/waitlist/stats` - Get waitlist statistics

### System Endpoints
- `GET /` - API status
- `GET /health` - Health check with Supabase status
- `GET /db-test` - Database connection test

## Example API Usage

### Add to Waitlist
```bash
curl -X POST http://localhost:5000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "user_type": "Influencer"}'
```

### Get Waitlist Stats
```bash
curl http://localhost:5000/api/waitlist/stats
``` 