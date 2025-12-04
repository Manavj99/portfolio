# Step-by-Step Deployment Guide

## ✅ Step 1: Commit Complete ✓
Your code is now committed locally.

## 📤 Step 2: Push to GitHub

### Option A: Create New GitHub Repository (Recommended)

1. **Go to GitHub**: [github.com/new](https://github.com/new)
2. **Create repository**:
   - Repository name: `portfolio` (or any name you like)
   - Description: "My personal portfolio website"
   - Make it **Public** (or Private if you prefer)
   - **DO NOT** initialize with README, .gitignore, or license
   - Click "Create repository"

3. **Copy the repository URL** (it will look like: `https://github.com/yourusername/portfolio.git`)

4. **Run these commands in your terminal**:
   ```bash
   git remote add origin https://github.com/yourusername/portfolio.git
   git branch -M main
   git push -u origin main
   ```

### Option B: If You Already Have a GitHub Repo

If you already have a GitHub repository, just add it as remote:
```bash
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```

## 🚀 Step 3: Deploy to Vercel

1. **Go to Vercel**: [vercel.com](https://vercel.com)
2. **Sign up/Login** (use GitHub to sign in - it's easiest)
3. **Click "Add New Project"**
4. **Import your GitHub repository**:
   - Select your portfolio repository
   - Click "Import"
5. **Configure project** (Vercel auto-detects Next.js):
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
6. **Click "Deploy"**
7. **Wait 2-3 minutes** for deployment to complete
8. **Your site is LIVE!** 🎉 (You'll get a URL like `your-portfolio.vercel.app`)

## 📧 Step 4: Set Up Email with Resend

### Get Resend API Key:

1. **Go to Resend**: [resend.com](https://resend.com)
2. **Sign up** (free account)
3. **Verify your email** (check your inbox)
4. **Get API Key**:
   - Go to [resend.com/api-keys](https://resend.com/api-keys)
   - Click "Create API Key"
   - Name it: "Portfolio Contact Form"
   - Copy the key (starts with `re_`)

### Add to Vercel:

1. **In Vercel**, go to your project
2. **Click "Settings"** (top menu)
3. **Click "Environment Variables"** (left sidebar)
4. **Add these 3 variables**:

   **Variable 1:**
   - Name: `RESEND_API_KEY`
   - Value: `re_your_actual_key_here` (paste your Resend key)
   - Environment: Select all (Production, Preview, Development)
   - Click "Save"

   **Variable 2:**
   - Name: `CONTACT_EMAIL`
   - Value: `manavj99@gmail.com`
   - Environment: Select all
   - Click "Save"

   **Variable 3:**
   - Name: `RESEND_FROM_EMAIL`
   - Value: `onboarding@resend.dev`
   - Environment: Select all
   - Click "Save"

5. **IMPORTANT**: After adding variables, you MUST redeploy:
   - Go to "Deployments" tab
   - Click the "..." menu on the latest deployment
   - Click "Redeploy"
   - Or push a new commit to trigger auto-deploy

## ✅ Step 5: Test Everything

1. **Visit your live site** (the Vercel URL)
2. **Test the contact form**:
   - Go to Contact section
   - Fill out the form
   - Submit it
3. **Check your email**:
   - Go to manavj99@gmail.com
   - Check inbox AND spam folder
   - You should receive an email with the form submission!

## 🎉 Done!

Your portfolio is now live with working email functionality!

## 🔧 Troubleshooting

**Email not working?**
- Make sure you redeployed after adding environment variables
- Check Vercel function logs: Deployments → Click deployment → Functions tab
- Verify API key is correct
- Check spam folder

**Need to update code?**
- Make changes locally
- `git add .`
- `git commit -m "Your message"`
- `git push`
- Vercel will auto-deploy!

