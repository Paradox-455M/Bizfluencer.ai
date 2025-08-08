# Frontend (Vite + React)

## Local Dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy on Vercel

- Set Environment Variable:
  - `VITE_API_BASE_URL` = your backend public URL (Railway)
- Use Vercel project settings → Build & Output:
  - Framework: Other
  - Build Command: `npm run build`
  - Output Directory: `dist`
- Or keep `vercel.json` in this folder. 