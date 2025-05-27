#!/bin/bash

# WEO Competitive Intelligence - Quick Start Script

echo "🚀 WEO Competitive Intelligence System"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to install dependencies${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ Dependencies installed${NC}"
    echo ""
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚙️  No configuration found. Running setup...${NC}"
    echo ""
    npm run setup
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Setup failed${NC}"
        exit 1
    fi
    echo ""
fi

# Offer to run tests
echo -e "${YELLOW}Would you like to run tests first? (recommended) [Y/n]:${NC} "
read -r response
if [[ ! "$response" =~ ^[Nn]$ ]]; then
    echo ""
    echo -e "${YELLOW}🧪 Running tests...${NC}"
    npm test
    echo ""
    echo -e "${YELLOW}Did all tests pass? [Y/n]:${NC} "
    read -r testResponse
    if [[ "$testResponse" =~ ^[Nn]$ ]]; then
        echo -e "${RED}Please fix any issues before starting the system.${NC}"
        exit 1
    fi
fi

# Choose run mode
echo ""
echo "How would you like to run the system?"
echo "1) Development mode (see browser, verbose logging)"
echo "2) Production mode (background, normal logging)"
echo "3) PM2 production mode (recommended for long-term)"
echo ""
echo -n "Choose [1-3]: "
read -r mode

case $mode in
    1)
        echo ""
        echo -e "${GREEN}Starting in development mode...${NC}"
        echo -e "${YELLOW}Press Ctrl+C to stop${NC}"
        echo ""
        NODE_ENV=development HEADLESS_MODE=false npm start
        ;;
    2)
        echo ""
        echo -e "${GREEN}Starting in production mode...${NC}"
        echo -e "${YELLOW}Press Ctrl+C to stop${NC}"
        echo ""
        npm start
        ;;
    3)
        # Check if PM2 is installed
        if ! command -v pm2 &> /dev/null; then
            echo ""
            echo -e "${YELLOW}PM2 not found. Installing...${NC}"
            npm install -g pm2
        fi
        
        echo ""
        echo -e "${GREEN}Starting with PM2...${NC}"
        
        # Stop if already running
        pm2 stop weo-intelligence 2>/dev/null
        
        # Start the service
        pm2 start src/index.js --name weo-intelligence --time
        
        # Save configuration
        pm2 save
        
        echo ""
        echo -e "${GREEN}✓ System started with PM2${NC}"
        echo ""
        echo "Useful PM2 commands:"
        echo "  pm2 logs weo-intelligence    # View logs"
        echo "  pm2 status                   # Check status"
        echo "  pm2 stop weo-intelligence    # Stop service"
        echo "  pm2 restart weo-intelligence # Restart service"
        echo "  pm2 monit                    # Monitor resources"
        echo ""
        
        # Show logs
        echo -e "${YELLOW}Showing logs (press Ctrl+C to exit)...${NC}"
        sleep 2
        pm2 logs weo-intelligence
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac