# Deployment Guide

## 🚀 Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

### Step 1: Prepare Your Code

1. Make sure all changes are committed:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   ```

2. Push to GitHub (if not already):
   ```bash
   git push origin main
   ```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"

### Step 3: Configure Environment Variables

After deployment, configure environment variables in Vercel:

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add the following variables:

   - `RESEND_API_KEY` - Your Resend API key
   - `CONTACT_EMAIL` - Your email (manavj99@gmail.com)
   - `RESEND_FROM_EMAIL` - Your verified email or onboarding@resend.dev

4. Redeploy after adding environment variables

## 📧 Set Up Email with Resend

### Step 1: Create Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### Step 2: Get API Key

1. Go to [resend.com/api-keys](https://resend.com/api-keys)
2. Click "Create API Key"
3. Name it (e.g., "Portfolio Contact Form")
4. Copy the API key (starts with `re_`)

### Step 3: Verify Domain (Optional but Recommended)

For production, you should verify your domain:

1. Go to [resend.com/domains](https://resend.com/domains)
2. Add your domain
3. Add the DNS records provided
4. Wait for verification
5. Update `RESEND_FROM_EMAIL` to use your domain email (e.g., `noreply@yourdomain.com`)

### Step 4: Add API Key to Environment Variables

**For Local Development:**
1. Copy `.env.example` to `.env.local`
2. Add your Resend API key:
   ```
   RESEND_API_KEY=re_your_actual_api_key_here
   ```

**For Vercel:**
1. Go to Vercel project settings
2. Add `RESEND_API_KEY` environment variable
3. Redeploy

## 🧪 Test the Contact Form

1. Visit your deployed site
2. Navigate to the Contact section
3. Fill out and submit the form
4. Check your email inbox (and spam folder)

## 🔧 Troubleshooting

### Email Not Sending

1. **Check API Key**: Make sure `RESEND_API_KEY` is set correctly
2. **Check From Email**: Must be verified in Resend
3. **Check Console**: Look for errors in Vercel function logs
4. **Check Spam**: Emails might go to spam initially

### Build Errors

1. Make sure all dependencies are installed: `npm install`
2. Test build locally: `npm run build`
3. Check for TypeScript errors: `npm run lint`

## 📝 Alternative Email Services

If you prefer other services:

### SendGrid
- Sign up at [sendgrid.com](https://sendgrid.com)
- Get API key
- Install: `npm install @sendgrid/mail`
- Update API route accordingly

### Nodemailer (with Gmail)
- Install: `npm install nodemailer`
- Requires Gmail App Password
- Less reliable for production

## 🔒 Security Notes

- Never commit `.env.local` to git
- Use environment variables in Vercel
- Keep API keys secret
- Consider rate limiting for production

