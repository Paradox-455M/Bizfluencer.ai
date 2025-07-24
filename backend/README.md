# Bizfluencer.ai Backend API

Backend API for the Bizfluencer.ai platform built with Node.js and Express.

## Directory Structure

```
backend/
├── src/
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Data models
│   ├── routes/         # API routes
│   └── index.js        # Main server file
├── package.json
└── .env.example        # Environment variables template
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create environment file:
   ```bash
   cp .env.example .env
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Base URL
- Development: `http://localhost:5000`

### Available Endpoints
- `GET /` - API status
- `GET /health` - Health check

## Planned Features

- [ ] User Authentication (JWT)
- [ ] Influencer Profiles
- [ ] Brand Profiles  
- [ ] Campaign Management
- [ ] Escrow Payment System
- [ ] Messaging System
- [ ] File Upload (Profile pictures, media) 