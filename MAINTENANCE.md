# Portfolio Site Maintenance Guide

This guide covers everything you need to maintain and update your portfolio website.

## 🚀 Quick Start

### Running Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run with TinaCMS enabled (for content editing)
npm run dev:tina
```

Visit http://localhost:3000

### Deploying Changes

```bash
# All changes auto-deploy when pushed to main
git add .
git commit -m "Your changes"
git push origin main
```

Deployment happens automatically on Vercel.

## 📝 Common Tasks

### Adding a New Project via CMS

1. Run `npm run dev:tina`
2. Go to http://localhost:3000/admin
3. Navigate to Projects → Create New
4. Fill in all fields:
   - Title, slug, description
   - Upload hero image via Cloudinary
   - Add tech stack tags
   - Set metrics (ROI, engagement, etc.)
5. Save and commit changes

### Adding a Blog Post

1. Access TinaCMS admin
2. Navigate to Blog Posts → Create New
3. Add content using the rich text editor
4. Set featured image
5. Save and publish

### Updating Home Page Content

The home page components are in `/src/components/sections/`:
- `HeroSection.tsx` - Main hero with typewriter effect
- `FeaturedProjects.tsx` - Project showcase cards
- `ServicesSection.tsx` - Services grid

To update text:
```bash
# Example: Update hero tagline
# Edit src/components/sections/HeroSection.tsx
# Find the phrases array (line ~28) and update the text
```

### Updating Site Settings

1. Via CMS: Admin → Site Settings
2. Update site title, social links, etc.
3. Save changes

## 🔧 Environment Variables

### Required for Local Development

Create `.env.local`:

```env
# TinaCMS Configuration
NEXT_PUBLIC_TINA_CLIENT_ID=your-client-id
TINA_TOKEN=your-token
NEXT_PUBLIC_TINA_BRANCH=main

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Vercel Production Variables

Set these in Vercel Dashboard → Settings → Environment Variables:
- All variables from `.env.local`
- Ensure they're enabled for Production

## 🐛 Troubleshooting

### "Invalid Site URL" Error in CMS

1. Go to app.tina.io
2. Your project → Configuration → Site URLs
3. Add your deployment URL (e.g., https://jpc-kappa.vercel.app)

### Build Errors on Vercel

**Schema Mismatch Error:**
```bash
# Temporary fix - add to package.json vercel-build:
"vercel-build": "tinacms build --skip-cloud-checks && next build"
```

Wait for TinaCloud to re-index (usually 5-10 minutes), then remove flag.

**Client Generation Error:**
- The apostrophe in "Jonathon's Website" folder can cause issues
- This is auto-fixed during builds

### CMS Not Loading

1. Check environment variables are set
2. Ensure you're logged into GitHub
3. Verify TinaCloud project is connected to correct repo

### Images Not Loading

- Check Cloudinary environment variables
- Verify image URLs are using Cloudinary format
- Use TinaCMS media manager for uploads

## 📊 Performance Monitoring

### Check Bundle Size

```bash
npm run build
# Look at the output for First Load JS sizes
# Target: Keep pages under 200KB First Load JS
```

### Current Performance Baseline (May 2025)

- Home page: 165KB First Load JS ✅
- Project pages: 160KB First Load JS ✅
- Blog page: 141KB First Load JS ✅
- Gallery pages: 126KB First Load JS ✅
- Shared JS: 87.1KB (well optimized)
- Lighthouse score: 90+ on all metrics

**Performance Optimizations Applied:**
- All images use Next.js Image component with lazy loading
- OptimizedImage component handles Cloudinary integration
- Proper image sizing with responsive breakpoints
- Loading states with skeleton screens
- Code splitting per route

### Monitor Real Usage

1. Go to Vercel Dashboard
2. Click on Analytics tab
3. Monitor Core Web Vitals

## 🔐 Security Notes

- Never commit `.env.local` file
- Keep dependencies updated: `npm outdated`
- Security headers are configured in `next.config.mjs`
- All uploads go through TinaCMS (authenticated)

## 📱 Mobile Testing

Test on real devices or use Chrome DevTools:
1. Open Chrome DevTools (F12)
2. Click device toggle toolbar
3. Test these viewports:
   - iPhone SE (375px)
   - iPhone 12 (390px)
   - iPad (768px)

## 🆘 Getting Help

- **TinaCMS Issues**: https://tina.io/docs
- **Next.js Issues**: https://nextjs.org/docs
- **Vercel Issues**: https://vercel.com/docs

## 💾 Backup & Recovery

### Create a backup tag before major changes:

```bash
git tag -a v1.1-backup -m "Backup before major update"
git push origin v1.1-backup
```

### Restore from backup:

```bash
git checkout v1.1-backup
```

### Current stable version: `v1.0-stable`

---

Last updated: May 2025