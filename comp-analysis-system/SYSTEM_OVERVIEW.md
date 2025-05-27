# WEO Competitive Intelligence System - Overview

## 🎯 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   WEO Intelligence System                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  Monitors   │  │   Alerts     │  │   Reporting      │   │
│  ├─────────────┤  ├──────────────┤  ├──────────────────┤   │
│  │ Competitor  │  │ Email Service│  │ Weekly Reports   │   │
│  │ Monitor     │  │ Alert Manager│  │ Data Analysis    │   │
│  │ Ranking     │  │ Rate Limiter │  │ Change Summary   │   │
│  │ Tracker     │  │ Queue System │  │ Visualizations   │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   Data Storage                        │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │  Screenshots │ Rankings │ Competitors │ Logs │ Queue │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                    Scheduler                          │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │  Every 6h: Competitors  │  Daily: Rankings          │    │
│  │  Weekly: Full Report    │  Daily: Cleanup           │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## 📊 Data Flow

```
1. MONITORING PHASE
   ┌─────────┐
   │ Cron Job├──────┐
   └─────────┘      │
                    ▼
   ┌─────────────────────┐     ┌──────────────┐
   │ Competitor Monitor  │────▶│ Screenshots  │
   └─────────────────────┘     └──────────────┘
                    │
                    ▼
   ┌─────────────────────┐     ┌──────────────┐
   │   Change Detection  │────▶│ JSON Data    │
   └─────────────────────┘     └──────────────┘

2. ALERT PHASE
   ┌─────────────────────┐
   │   Changes Detected  │
   └──────────┬──────────┘
              │
              ▼
   ┌─────────────────────┐     ┌──────────────┐
   │   Priority Check    │────▶│ Rate Limiter │
   └──────────┬──────────┘     └──────┬───────┘
              │                        │
              ▼                        ▼
   ┌─────────────────────┐     ┌──────────────┐
   │   Email Alert       │     │ Alert Queue  │
   └─────────────────────┘     └──────────────┘

3. REPORTING PHASE
   ┌─────────────────────┐
   │   Weekly Trigger    │
   └──────────┬──────────┘
              │
              ▼
   ┌─────────────────────┐     ┌──────────────┐
   │  Aggregate Data     │────▶│ Generate HTML│
   └─────────────────────┘     └──────┬───────┘
                                       │
                                       ▼
                                ┌──────────────┐
                                │ Email Report │
                                └──────────────┘
```

## 🔍 What Gets Monitored

### Competitor Websites (Every 6 Hours)
```
ProSites.com
├── /home ──────────── Title, Meta, Content Hash
├── /pricing ────────── Price Detection, Changes
├── /features ───────── Feature Lists, Updates
└── /about ──────────── Awards, Client Count

SmileShop Marketing
├── /home ──────────── Partnership Badges
├── /services ───────── Service Offerings
├── /about ──────────── Team Growth
└── /blog ───────────── Post Frequency

Golden Proportions (GPM)
├── /home ──────────── Messaging Changes
├── /results ────────── Metrics, Statistics
├── /services ───────── Service Updates
└── /testimonials ───── New Reviews

Roadside/Marketly
├── /home ──────────── Rebrand Progress
├── /services ───────── Service Changes
└── /about ──────────── Client Claims
```

### Google Rankings (Daily at 2 AM)
```
Keywords Tracked:
┌────────────────────────────┬──────────┬────────────┐
│ Keyword                    │ WEO Pos  │ Top Comp   │
├────────────────────────────┼──────────┼────────────┤
│ dental marketing agency    │ #12      │ ProSites#3 │
│ dental SEO services        │ #8       │ SmileShop#5│
│ dental website design      │ #15      │ GPM#7      │
│ dental practice marketing  │ #6       │ ProSites#2 │
└────────────────────────────┴──────────┴────────────┘
```

## 📧 Alert Examples

### 🚨 Critical Alert
```
Subject: 🚨 WEO Alert: Pricing changes detected at ProSites

ProSites
• Pricing Changed
  Page: pricing
  Previous: $299/mo, $399/mo
  Current: $349/mo, $449/mo, $599/mo
  Significance: High - 17% price increase
```

### ⚡ Warning Alert
```
Subject: ⚡ WEO Ranking Alert: Changes for 3 keywords

Ranking Changes:
• dental marketing agency
  WEO Media: #12 → #16 (↓4)
  Action: Review on-page SEO
  
• dental SEO services  
  WEO Media: #8 → #5 (↑3)
  Status: Improvement!
```

### 📊 Weekly Report
```
Subject: 📊 WEO Weekly Competitive Intelligence Report

This Week's Summary:
• Total Changes: 24
• Critical Alerts: 2
• Competitors Monitored: 4
• Rankings Tracked: 50 keywords

Key Insights:
1. ProSites increased pricing by 17%
2. SmileShop added AI features
3. WEO improved 5 keyword rankings
4. Roadside rebrand 60% complete
```

## 🛠️ Quick Commands

```bash
# One-time setup
./start.sh

# Manual runs
npm start                    # Start monitoring
npm test                     # Test all components
npm run clean               # Clean old data

# PM2 commands (production)
pm2 start weo-intelligence  # Start service
pm2 logs weo-intelligence   # View logs
pm2 monit                   # Monitor resources
pm2 stop weo-intelligence   # Stop service

# Check data
ls data/screenshots/        # View screenshots
tail -f data/logs/combined.log  # Watch logs
cat data/rankings/history.json  # Check rankings
```

## 📁 Data Locations

```
comp-analysis-system/
├── data/
│   ├── screenshots/        # Visual evidence
│   │   ├── prosites_home_2024-01-26.jpg
│   │   └── rankings/       # Google search results
│   ├── competitors/        # JSON snapshots
│   │   ├── prosites_latest.json
│   │   └── prosites_2024-01-26_14-30-00.json
│   ├── rankings/          # Position tracking
│   │   ├── history.json   # Current positions
│   │   └── rankings_2024-01-26.json
│   ├── alerts/            # Alert management
│   │   ├── history.json   # Sent alerts
│   │   └── queue/         # Pending alerts
│   └── logs/              # System logs
│       ├── combined.log   # All logs
│       └── error.log      # Errors only
```

## 🔒 Security Features

- ✅ Gmail App Passwords (not regular passwords)
- ✅ Environment variables for secrets
- ✅ .gitignore for sensitive data
- ✅ Rate limiting on alerts
- ✅ No credentials in logs
- ✅ Automated data cleanup

## 💡 Pro Tips

1. **First Run**: Set `HEADLESS_MODE=false` to watch it work
2. **Testing**: Always run `npm test` after configuration changes
3. **Debugging**: Check `data/logs/error.log` first
4. **Performance**: Increase `REQUEST_DELAY_MS` if getting blocked
5. **Disk Space**: Adjust retention in `.env` if running low

---

Ready to monitor? Run `./start.sh` to begin! 🚀