#!/bin/bash

echo "🚀 Starting WEO Competitive Intelligence System"
echo "=============================================="
echo ""
echo "✅ Email test was successful!"
echo "📧 Alerts will be sent to: weomedia.marketing@gmail.com"
echo ""
echo "The system will now:"
echo "1. Check all 4 competitors"
echo "2. Take screenshots" 
echo "3. Detect any changes"
echo "4. Send email alerts if changes are found"
echo ""
echo "Starting in development mode (you'll see browser windows)..."
echo "Press Ctrl+C to stop"
echo ""

cd "$(dirname "$0")/comp-analysis-system" || exit 1

# Start with browser visible so you can see it working
NODE_ENV=development HEADLESS_MODE=false npm start