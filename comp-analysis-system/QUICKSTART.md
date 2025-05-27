# 🚀 WEO Competitive Intelligence - Quick Start Guide

Follow these steps to get your competitive intelligence system running in 10 minutes.

## Step 1: Install Dependencies (2 minutes)

Open Terminal in the `comp-analysis-system` directory and run:

```bash
npm install
```

This installs:
- Playwright (for web scraping)
- Nodemailer (for email alerts)
- Winston (for logging)
- Node-cron (for scheduling)
- Other dependencies

## Step 2: Set Up Gmail (5 minutes)

### 2.1 Enable 2-Factor Authentication
1. Go to https://myaccount.google.com/security
2. Click "2-Step Verification"
3. Follow the setup process

### 2.2 Generate App Password
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" from the dropdown
3. Click "Generate"
4. Copy the 16-character password (spaces don't matter)

### 2.3 Save Your Credentials
Keep these handy for the next step:
- Your Gmail address
- The 16-character app password
- Email address to receive alerts

## Step 3: Run Setup Wizard (2 minutes)

```bash
npm run setup
```

The wizard will ask for:
1. **Email Configuration**
   - Email address: `your.email@gmail.com`
   - App password: `xxxx xxxx xxxx xxxx` (paste the 16 characters)
   - Send alerts to: `alerts@weomedia.com`
   - CC alerts to: `team@weomedia.com` (optional)

2. **Monitoring Settings**
   - Headless mode: `Y` (recommended for production)
   - Max alerts per hour: `1` (prevents spam)

## Step 4: Test Your Setup (1 minute)

```bash
npm test
```

This will:
- ✓ Test competitor monitoring (ProSites)
- ✓ Test ranking tracker (1 keyword)
- ✓ Send a test email
- ✓ Verify configuration

Expected output:
```
✅ All tests passed! (3/3)
Your system is ready to run!
```

## Step 5: Start Monitoring!

### Option A: Development Mode (see what's happening)
```bash
NODE_ENV=development npm start
```

### Option B: Production Mode (run in background)
```bash
npm start
```

### Option C: Production with PM2 (recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Start the service
pm2 start src/index.js --name weo-intelligence

# Save PM2 configuration
pm2 save

# Set up auto-start on reboot
pm2 startup
```

## 📊 What Happens Next?

Once running, the system will:

1. **Immediately** (in dev mode):
   - Check all 4 competitors
   - Take screenshots
   - Send test alert if changes detected

2. **On Schedule**:
   - Every 6 hours: Check competitors
   - Daily at 2 AM: Check Google rankings
   - Monday 9 AM: Send weekly report

## 🎯 Verify It's Working

### Check Logs
```bash
# See real-time logs
tail -f data/logs/combined.log

# Or with PM2
pm2 logs weo-intelligence
```

### Check Screenshots
```bash
ls -la data/screenshots/
```

You should see files like:
- `prosites_home_2024-01-26_14-30-00.jpg`
- `smileshop_pricing_2024-01-26_14-31-00.jpg`

### Check Data Files
```bash
ls -la data/competitors/
```

## 🚨 First Alert

When the system detects changes, you'll receive an email like:

**Subject**: 🚨 WEO Alert: 3 changes detected at ProSites

**Content**:
- Pricing changes
- New features added
- Content updates

## 📝 Common Issues & Fixes

### "Email test failed"
- Double-check your app password (no spaces)
- Ensure 2FA is enabled on Google account
- Try regenerating the app password

### "Competitor monitoring failed"
- Set `HEADLESS_MODE=false` in .env to see browser
- Check internet connection
- Increase `REQUEST_DELAY_MS` if rate limited

### "No alerts received"
- Check `MAX_ALERTS_PER_HOUR` in .env
- Look for queued alerts: `ls data/alerts/queue/`
- Verify EMAIL_TO address is correct

## 🎉 Success Checklist

- [ ] Dependencies installed
- [ ] Gmail app password generated
- [ ] Setup wizard completed
- [ ] Test suite passed
- [ ] System started
- [ ] First competitor check completed
- [ ] Screenshots captured
- [ ] Test email received

## 📞 Need Help?

1. Check error logs: `data/logs/error.log`
2. Run diagnostics: `npm test`
3. Review main README.md
4. Check system status:
   ```bash
   # If using PM2
   pm2 status weo-intelligence
   ```

---

**Pro Tips:**
- 🌙 Run in `HEADLESS_MODE=false` first time to see it work
- 📧 Add multiple recipients with comma separation in EMAIL_TO
- 🔄 Force immediate check by restarting the service
- 📊 Weekly reports are comprehensive - check Monday mornings!

Happy monitoring! 🎯