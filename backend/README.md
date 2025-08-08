# Backend (Express + Supabase)

## Run Locally

```bash
npm install
npm run dev
```

## Required Environment Variables

- `PORT` (default 5000)
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

## Deploy on Railway

1. Create a new Railway project → Deploy from GitHub and select this repository.
2. Set environment variables above in Railway project settings.
3. Railway will detect Node and run using `railway.json` with healthcheck `/health`.
4. After deploy, copy the public URL and set it as `VITE_API_BASE_URL` in Vercel. 