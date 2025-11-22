# Deploy to Vercel

Follow these steps to deploy your Airdrop Tracker to Vercel.

## 1. Push to GitHub
Ensure your latest code is pushed to a GitHub repository.

```bash
git add .
git commit -m "Ready for deployment"
git push
```

## 2. Import Project in Vercel
1.  Go to [vercel.com](https://vercel.com) and log in.
2.  Click **"Add New..."** -> **"Project"**.
3.  Select your GitHub repository (`airdrop-tracker`).
4.  Click **"Import"**.

## 3. Configure Environment Variables
**CRITICAL STEP**: You must add your environment variables for the app to work.

In the "Configure Project" screen, expand the **"Environment Variables"** section and add:

| Key | Value |
| --- | --- |
| `PUBLIC_SUPABASE_URL` | Your Supabase URL (from `.env`) |
| `PUBLIC_SUPABASE_ANON_KEY` | Your Supabase Anon Key (from `.env`) |
| `VITE_WALLETCONNECT_PROJECT_ID` | Your WalletConnect Project ID (from `.env`) |

## 4. Deploy
1.  Click **"Deploy"**.
2.  Wait for the build to complete.
3.  Once finished, you will get a live URL (e.g., `https://airdrop-tracker-xyz.vercel.app`).

## 5. Update Supabase Auth (Optional)
If you use Supabase Auth Redirects (not currently used in this version but good for future):
1.  Go to Supabase Dashboard > Authentication > URL Configuration.
2.  Add your new Vercel URL to "Site URL" or "Redirect URLs".

## 6. Update WalletConnect (Optional)
1.  Go to [cloud.walletconnect.com](https://cloud.walletconnect.com).
2.  Update your project settings to include your new Vercel domain.
