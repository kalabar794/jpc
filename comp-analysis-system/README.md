# WEO Competitive Intelligence System

An automated competitive intelligence system for WEO Media that monitors dental marketing competitors, tracks Google rankings, and sends intelligent alerts.

## 🚀 Features

- **Automated Competitor Monitoring**: Tracks ProSites, SmileShop Marketing, GPM, and Roadside/Marketly
- **Google Ranking Tracker**: Monitors 50+ dental marketing keywords daily
- **Smart Change Detection**: Identifies pricing changes, new features, and content updates
- **Email Alerts**: Sends prioritized notifications (Critical, Warning, Info)
- **Visual Reporting**: Screenshots and comprehensive weekly reports
- **Scheduled Automation**: Runs checks every 6 hours with cron scheduling
- **Data Management**: Auto-cleanup of old data with configurable retention

## 📋 Prerequisites

- Node.js 18+ 
- Mac M3 Pro (optimized for ARM64)
- Gmail account with 2FA enabled
- 2GB+ free disk space for data storage

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone [your-repo-url]
cd weo-competitive-intelligence
```

2. **Install dependencies**
```bash
npm install
```

3. **Run setup wizard**
```bash
npm run setup
```

4. **Configure Gmail**
   - Enable 2-Factor Authentication on your Google account
   - Generate an app password:
     - Go to https://myaccount.google.com/apppasswords
     - Create a new app password for "Mail"
     - Copy the 16-character password
   - Add to `.env` file

## 🧪 Testing

Run the test suite to verify everything is working:

```bash
npm test
```

This will test:
- ✓ Competitor monitoring
- ✓ Ranking tracker
- ✓ Email service
- ✓ Configuration

## 🚀 Usage

### Start the System
```bash
npm start
```

### Run in Production with PM2
```bash
npm install -g pm2
pm2 start src/index.js --name weo-intelligence
pm2 save
pm2 startup
```

### View Logs
```bash
# Development
tail -f data/logs/combined.log

# Production with PM2
pm2 logs weo-intelligence
```

## 📅 Default Schedule

- **Competitor Checks**: Every 6 hours
- **Ranking Checks**: Daily at 2 AM
- **Comprehensive Rankings**: Weekly (Monday 3 AM)
- **Weekly Reports**: Monday at 9 AM
- **Data Cleanup**: Daily at 4 AM

All times are in Pacific Time (Los Angeles).

## 📊 What Gets Monitored

### Competitors
1. **ProSites** - Leader with 7,500+ clients
2. **SmileShop Marketing** - Patterson Dental partner
3. **Golden Proportions Marketing** - Premium custom solutions
4. **Roadside/Marketly** - Legacy player in rebrand

### Tracking Points
- Pricing changes
- New features/services
- Client testimonials
- Team changes
- Partnership announcements
- Award mentions
- Content updates

### Keywords (Top 10)
- dental marketing agency
- dental SEO services
- dental website design
- dental practice marketing
- dental marketing company
- dentist marketing
- dental digital marketing
- dental marketing consultant
- dental practice SEO
- dental office marketing

## 📧 Alert Types

### 🚨 Critical
- Competitor pricing changes
- Major ranking drops (10+ positions)
- New competitor services launched

### ⚡ Warning
- Moderate ranking changes (3-9 positions)
- Significant content updates
- New testimonials/case studies

### 📊 Info
- Weekly summary reports
- Minor changes
- System status updates

## 📁 Data Storage

```
data/
├── screenshots/         # Visual comparisons
├── rankings/           # Ranking history
├── competitors/        # Competitor data snapshots
├── reports/           # Weekly reports
├── logs/              # System logs
└── alerts/            # Alert history and queue
```

## 🔧 Configuration

Edit `.env` file to customize:

```env
# Email Settings
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=alerts@weo.com

# Monitoring Settings
HEADLESS_MODE=true              # Run browser in background
REQUEST_DELAY_MS=5000           # Delay between requests
MAX_ALERTS_PER_HOUR=1          # Rate limiting

# Data Retention (days)
KEEP_SCREENSHOTS_DAYS=30
KEEP_RANKINGS_DAYS=90
KEEP_LOGS_DAYS=7
```

## 🚨 Troubleshooting

### Email Not Sending
1. Verify Gmail app password is correct
2. Check 2FA is enabled on Google account
3. Ensure EMAIL_TO is valid
4. Check logs: `data/logs/error.log`

### Ranking Checks Failing
1. Google may be rate limiting - increase REQUEST_DELAY_MS
2. Try setting HEADLESS_MODE=false to see browser
3. Check for Google CAPTCHA challenges

### High Memory Usage
1. Reduce SCREENSHOT_QUALITY in .env
2. Decrease data retention periods
3. Run cleanup manually: `npm run clean`

## 📈 Extending the System

### Add New Competitor
Edit `src/config/competitors.js`:
```javascript
{
  id: 'new-competitor',
  name: 'New Competitor',
  domain: 'example.com',
  urls: {
    home: 'https://example.com',
    pricing: 'https://example.com/pricing'
  },
  selectors: {
    pricing: '.price-card',
    features: '.feature-list'
  }
}
```

### Add New Keywords
Edit `src/config/keywords.js`:
```javascript
export const primaryKeywords = [
  'dental marketing agency',
  'your new keyword here',
  // ...
];
```

## 🔒 Security

- All credentials stored in `.env` (gitignored)
- Gmail app passwords (not regular passwords)
- No sensitive data in logs
- Automated cleanup of old data

## 📝 License

Internal use only - WEO Media proprietary system.

## 🆘 Support

For issues or questions:
- Check logs in `data/logs/`
- Run test suite: `npm test`
- Review this README
- Contact system administrator