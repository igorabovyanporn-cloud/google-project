@echo off
REM Quick Start Setup Script for Windows

echo.
echo Toronto Sell My Car - Quick Setup
echo ==================================
echo.

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed. Please install Python 3.8+
    echo Download from: https://www.python.org
    exit /b 1
)

echo Ok Python found
echo.

REM Create virtual environment
echo Creating virtual environment...
python -m venv venv
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt

echo.
echo Configuration
echo =============
echo.
echo Please update .env file with:
echo 1. Your Telegram Bot Token
echo    - Talk to @BotFather on Telegram
echo    - Create new bot with /newbot
echo    - Copy token to .env TELEGRAM_BOT_TOKEN
echo.
echo 2. Your Telegram Chat ID
echo    - Send /start to your bot
echo    - Copy chat ID to .env TELEGRAM_CHAT_ID
echo.
echo.
echo Setup complete! To start the server:
echo 1. Make sure venv\Scripts\activate.bat was run
echo 2. Run: python api/app.py
echo 3. Open http://localhost:5000 in your browser
