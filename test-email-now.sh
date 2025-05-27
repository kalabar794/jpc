#!/bin/bash

echo "📧 Testing WEO Email Configuration..."
echo ""

cd "$(dirname "$0")/comp-analysis-system" || exit 1

node test-email.js