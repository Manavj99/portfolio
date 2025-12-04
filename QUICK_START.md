# Quick Start Guide - Deploy & Enable Email

## 🚀 Step 1: Deploy to Vercel (5 minutes)

1. **Push to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New Project"
   - Import your GitHub repository
   - Click "Deploy" (Vercel auto-detects Next.js)

3. **Your site is now live!** 🎉

## 📧 Step 2: Set Up Email (10 minutes)

### Get Resend API Key:

1. Go to [resend.com](https://resend.com) and sign up (free)
2. Verify your email address
3. Go to [resend.com/api-keys](https://resend.com/api-keys)
4. Click "Create API Key"
5. Copy the key (starts with `re_`)

### Add to Vercel:

1. In Vercel, go to your project → Settings → Environment Variables
2. Add these variables:

   ```
   RESEND_API_KEY = re_your_actual_key_here
   CONTACT_EMAIL = manavj99@gmail.com
   RESEND_FROM_EMAIL = onboarding@resend.dev
   ```

3. **Important**: After adding variables, go to Deployments tab and click "Redeploy" on the latest deployment

### Test It:

1. Visit your live site
2. Go to Contact section
3. Fill out and submit the form
4. Check your email (manavj99@gmail.com) - also check spam folder!

## 🔧 Local Development Setup

1. Create `.env.local` file in the project root:
   ```
   RESEND_API_KEY=re_your_key_here
   CONTACT_EMAIL=manavj99@gmail.com
   RESEND_FROM_EMAIL=onboarding@resend.dev
   ```

2. Restart dev server: `npm run dev`

## ✅ Verification Checklist

- [ ] Code pushed to GitHub
- [ ] Deployed on Vercel
- [ ] Resend account created
- [ ] API key added to Vercel environment variables
- [ ] Vercel project redeployed after adding env vars
- [ ] Contact form tested on live site
- [ ] Email received in inbox

## 🆘 Troubleshooting

**Email not sending?**
- Check Vercel function logs (Deployments → Click deployment → Functions tab)
- Verify API key is correct in Vercel
- Make sure you redeployed after adding env vars
- Check spam folder

**Build failing?**
- Run `npm run build` locally to see errors
- Check for TypeScript errors
- Make sure all dependencies are installed

**Need help?**
- Check `DEPLOYMENT.md` for detailed instructions
- Resend docs: https://resend.com/docs
- Vercel docs: https://vercel.com/docs

