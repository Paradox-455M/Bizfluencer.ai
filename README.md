# Bizfluencer.ai - Where Brands & Influencers Collaborate

A trusted platform for brands and influencers to collaborate with confidence, featuring verified profiles, structured campaigns, and secure escrow payments.

## Project Structure

```
bizfluencer.ai/
├── frontend/          # React + TypeScript frontend
├── backend/           # Node.js + Express backend API
├── package.json       # Root package.json for monorepo management
└── README.md         # This file
```

## Prerequisites

- Node.js (v16 or higher)
- npm

## Quick Start

### Option 1: Run Frontend Only
```bash
npm run dev
```

### Option 2: Run Frontend and Backend Separately

**Frontend:**
```bash
npm run dev:frontend
```

**Backend:**
```bash
npm run dev:backend
```

## Installation

### Install All Dependencies
```bash
npm install
```

### Install Frontend Dependencies Only
```bash
npm run install:frontend
```

### Install Backend Dependencies Only
```bash
npm run install:backend
```

## Database Setup

The backend uses **Supabase** as the database. Before running the backend, you need to set up the database tables:

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to SQL Editor
3. Run the SQL script from `backend/SETUP.md`

**Quick Setup SQL:**
```sql
CREATE TABLE IF NOT EXISTS waitlist (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  user_type VARCHAR(50) NOT NULL CHECK (user_type IN ('Influencer', 'Brand')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Available Scripts

- `npm run dev` - Start frontend development server
- `npm run dev:frontend` - Start frontend only  
- `npm run dev:backend` - Start backend API server (requires database setup)
- `npm run build` - Build frontend for production
- `npm run build:frontend` - Build frontend only
- `npm run build:backend` - Build backend only

## API Endpoints

Once the database is set up, the backend provides these endpoints:

- **Waitlist API**:
  - `GET /api/waitlist` - Get all waitlist entries
  - `POST /api/waitlist` - Add new waitlist entry
  - `GET /api/waitlist/stats` - Get waitlist statistics

- **System API**:
  - `GET /health` - Health check with database status
  - `GET /db-test` - Test database connectivity
