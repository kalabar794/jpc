#!/bin/bash

echo "🔍 Checking DNS status for jonathoncarter.com..."
echo "================================================"

# Check A record
echo -n "A record: "
A_RECORD=$(dig +short jonathoncarter.com A)
if [ -z "$A_RECORD" ]; then
    echo "❌ NOT FOUND - This is the problem!"
else
    echo "✅ $A_RECORD"
fi

# Check www CNAME
echo -n "www CNAME: "
WWW_CNAME=$(dig +short www.jonathoncarter.com CNAME)
if [ -z "$WWW_CNAME" ]; then
    echo "❌ NOT FOUND"
else
    echo "✅ $WWW_CNAME"
fi

# Check if site loads
echo -n "HTTPS connection: "
if curl -s -o /dev/null -w "%{http_code}" https://jonathoncarter.com | grep -q "200\|301\|302"; then
    echo "✅ Site is accessible"
else
    echo "❌ Cannot connect"
fi

echo ""
echo "📝 Next steps:"
echo "1. Add domain in Netlify: https://app.netlify.com/sites/stalwart-smakager-b57fc1/settings/domain"
echo "2. If no auto-config, add A record: @ → 75.2.60.5"
echo "3. Add CNAME: www → stalwart-smakager-b57fc1.netlify.app"
echo ""
echo "Run this script again in 5 minutes to check progress."