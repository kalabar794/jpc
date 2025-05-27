#!/bin/bash

clear
echo -e "\033[1;36m"
cat << "EOF"
╔══════════════════════════════════════════════════════════════════╗
║          🔍 WEO COMPETITIVE INTELLIGENCE SYSTEM                   ║
╚══════════════════════════════════════════════════════════════════╝
EOF
echo -e "\033[0m"

echo -e "\033[32m✓ System initialized successfully\033[0m"
echo -e "\033[32m✓ Email connected: weomedia.marketing@gmail.com\033[0m"
echo -e "\033[32m✓ 4 competitors configured\033[0m"
echo -e "\033[32m✓ 50 keywords loaded\033[0m"
echo ""

echo -e "\033[1;33m🚀 Starting competitor monitoring cycle...\033[0m"
echo ""

# Simulate ProSites monitoring
echo -e "\033[1;34m┌─ ProSites ─────────────────────────────────┐\033[0m"
echo -e "\033[1;34m│\033[0m Checking: homepage..."
sleep 1
echo -e "\033[1;34m│\033[0m ✓ Title: Professional Dental Websites"
echo -e "\033[1;34m│\033[0m ✓ Screenshot: prosites_home_2024-05-27.jpg"
sleep 1
echo -e "\033[1;34m│\033[0m Checking: pricing..."
echo -e "\033[1;34m│\033[0m \033[1;33m⚠️  CHANGE DETECTED: New pricing tier added\033[0m"
echo -e "\033[1;34m│\033[0m   Previous: $299, $399, $499"
echo -e "\033[1;34m│\033[0m   Current:  $299, $399, $499, $599"
echo -e "\033[1;34m└──────────────────────────────────────────────┘\033[0m"
echo ""

# Simulate SmileShop monitoring
echo -e "\033[1;34m┌─ SmileShop Marketing ──────────────────────┐\033[0m"
echo -e "\033[1;34m│\033[0m Checking: services..."
sleep 1
echo -e "\033[1;34m│\033[0m ✓ No changes detected"
echo -e "\033[1;34m│\033[0m ✓ Screenshot: smileshop_services_2024-05-27.jpg"
echo -e "\033[1;34m└──────────────────────────────────────────────┘\033[0m"
echo ""

# Show alert
echo -e "\033[1;35m📧 Sending Alert Email...\033[0m"
sleep 1
echo -e "\033[32m✓ Email sent to: weomedia.marketing@gmail.com\033[0m"
echo -e "   Subject: 🚨 WEO Alert: Pricing changes detected at ProSites"
echo ""

# Show what's running in background
echo -e "\033[90m📅 Schedule Information:"
echo -e "   • Next competitor check: 1:33 PM (in 5h 57m)"
echo -e "   • Next ranking check: 2:00 AM tomorrow"
echo -e "   • Weekly report: Monday 9:00 AM\033[0m"
echo ""

echo -e "\033[1;32m✨ Monitoring active - Press Ctrl+C to stop\033[0m"
echo ""

# Simulate live monitoring
while true; do
    for i in 1 2 3 4; do
        dots=$(printf '.%.0s' $(seq 1 $i))
        printf "\r\033[36m🔍 Monitoring in progress%-4s\033[0m" "$dots"
        sleep 0.5
    done
done