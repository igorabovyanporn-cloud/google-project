#!/bin/bash

# Quick Start Setup Script for Toronto Sell My Car

echo "🚗 Toronto Sell My Car - Quick Setup"
echo "===================================="
echo ""

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+"
    exit 1
fi

echo "✅ Python 3 found: $(python3 --version)"
echo ""

# Create virtual environment
echo "📦 Creating virtual environment..."
python3 -m venv venv
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

echo ""
echo "⚙️  Configuration"
echo "==============="
echo ""
echo "Please update .env file with:"
echo "1. Your Telegram Bot Token"
echo "   - Talk to @BotFather on Telegram"
echo "   - Create new bot with /newbot"
echo "   - Copy token to .env TELEGRAM_BOT_TOKEN"
echo ""
echo "2. Your Telegram Chat ID"
echo "   - Send /start to your bot"
echo "   - Copy chat ID to .env TELEGRAM_CHAT_ID"
echo ""
echo "3. (Optional) WhatsApp API credentials"
echo ""

# Ask if they want to start the server
echo ""
echo "Ready to start? (y/n)"
read -r response

if [ "$response" = "y" ]; then
    echo ""
    echo "🚀 Starting server..."
    echo "📱 Frontend: http://localhost:8000"
    echo "⚙️  Backend API: http://localhost:5000"
    echo ""
    echo "In another terminal, run:"
    echo "cd google-ads-project"
    echo "source venv/bin/activate"
    echo "python api/app.py"
    echo ""
    echo "Then open http://localhost:8000 in your browser"
fi
