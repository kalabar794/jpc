# WEO Competitive Intelligence Tool

Automated competitive analysis tool for monitoring dental marketing competitors.

## Features

- **Automated Scraping**: Monitors competitor websites for changes in pricing, features, and content
- **Change Detection**: Compares current data with previous scans to identify updates
- **Visual Reports**: Generates comprehensive HTML reports with insights
- **Email Notifications**: Sends reports via email when changes are detected
- **Screenshot Capture**: Takes full-page screenshots for visual comparison
- **Scheduled Runs**: Can be configured to run automatically on a schedule

## Monitored Competitors

- Scorpion
- PatientPop
- ProSites
- Dental Marketing Guy
- GPM Dental

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

3. Edit `.env` with your settings:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=recipient@weo.com
SCAN_SCHEDULE=0 9 * * 1
```

## Usage

### Run Once
```bash
npm start
```

### Run with Scheduler
```bash
node src/scheduler.js
```

### Development Mode
```bash
npm run dev
```

## Output

- **Reports**: HTML reports saved to `./output/reports/`
- **Screenshots**: Full-page screenshots saved to `./output/screenshots/`
- **Data**: Raw JSON data saved to `./output/data/`

## What It Monitors

- **Pricing Information**: Detects pricing changes and new pricing models
- **Features**: Tracks feature additions or removals
- **Promotions**: Identifies new promotional offers
- **Content Changes**: Monitors significant content updates
- **Technology Stack**: Detects mentions of new technologies

## Email Reports

When configured, the tool will send email reports containing:
- Summary of all competitors analyzed
- Highlighted changes since last scan
- Pricing information found
- Active promotions
- Key features and technologies mentioned

## Customization

### Adding Competitors
Edit `src/config/competitors.js` to add new competitors or modify existing ones.

### Modifying Keywords
Edit `src/config/keywords.js` to track different keywords or terms.

### Changing Schedule
Modify the `SCAN_SCHEDULE` in `.env` using cron syntax:
- `0 9 * * 1` - Every Monday at 9 AM
- `0 9 * * *` - Every day at 9 AM
- `0 */6 * * *` - Every 6 hours

## Security Notes

- Uses headless Chrome for scraping
- Respects robots.txt (configure if needed)
- Includes delays to avoid overwhelming servers
- User agent set to standard browser

## Troubleshooting

- **Email not sending**: Check Gmail app password and 2FA settings
- **Scraping errors**: Some sites may block automated access
- **Memory issues**: Adjust Puppeteer settings in `competitorScraper.js`