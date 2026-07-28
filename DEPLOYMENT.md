# Vercel Deployment Guide

This guide describes how to deploy the **Nirgunam** React + Vite web application to Vercel.

## Option 1: Deploying via Vercel Web Dashboard (Recommended)

1. **Sign Up/Log In**: Go to [vercel.com](https://vercel.com) and log in using your GitHub account.
2. **Import Repository**:
   - Click the **Add New...** button on your dashboard and select **Project**.
   - Under **Import Git Repository**, find your **Nirgunam** repository (`Anirudh-98/Nirgunam`) and click **Import**.
3. **Configure Settings**:
   - Vercel automatically detects the **Vite** setup and configures these defaults:
     - **Framework Preset**: `Vite`
     - **Root Directory**: `./`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
4. **Deploy**:
   - Click **Deploy**. Vercel will pull your code from GitHub, build it, and launch your site in under a minute.

---

## Option 2: Deploying via Vercel CLI

If you prefer to deploy directly from your local terminal:

1. **Install Vercel CLI globally**:
   ```bash
   npm install -g vercel
   ```
2. **Log In to your Vercel account**:
   ```bash
   vercel login
   ```
3. **Initialize and Deploy**:
   From your project root directory, run:
   ```bash
   vercel
   ```
   - Follow the terminal prompts (defaults are highly recommended).
4. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

---

## Technical Details

> [!NOTE]
> **React Router Support**
> This application uses `react-router-dom` for client-side routing. To prevent `404 Not Found` errors when reloading pages or visiting direct routes, we have configured a `vercel.json` file in your repository:
> ```json
> {
>   "rewrites": [
>     { "source": "/(.*)", "destination": "/index.html" }
>   ]
> }
> ```
