#!/bin/bash

# WEO Competitive Intelligence - Startup Script

echo "🚀 Starting WEO Competitive Intelligence System..."
echo "=============================================="
echo ""

# Navigate to the comp-analysis-system directory
cd "$(dirname "$0")/comp-analysis-system" || exit 1

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies (first time setup)..."
    echo "This may take a few minutes..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
    echo "✅ Dependencies installed!"
    echo ""
fi

# Test email configuration first
echo "📧 Testing email configuration..."
node test-email.js
echo ""
echo "Did you receive the test email? (Y/n): "
read -r response

if [[ "$response" =~ ^[Nn]$ ]]; then
    echo "❌ Please check your email configuration in .env file"
    exit 1
fi

echo ""
echo "🎯 Starting the monitoring system..."
echo "====================================="
echo ""
echo "The system will:"
echo "✓ Monitor 4 competitors every 6 hours"
echo "✓ Track Google rankings daily at 2 AM"
echo "✓ Send alerts to: weomedia.marketing@gmail.com"
echo "✓ Generate weekly reports on Mondays"
echo ""
echo "Press Ctrl+C to stop"
echo ""

# Start in development mode for first run to see what's happening
NODE_ENV=development HEADLESS_MODE=false npm start