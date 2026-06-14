# Quick Start Guide - Toronto Sell My Car Website

## ⚡ 5-Minute Setup

### Prerequisites
- Python 3.8+ installed
- Telegram account

### Step 1: Install Dependencies

**macOS/Linux:**
```bash
cd google-ads-project
chmod +x setup.sh
./setup.sh
```

**Windows:**
```cmd
cd google-ads-project
setup.bat
```

### Step 2: Get Telegram Bot Token

1. Open Telegram
2. Search for `@BotFather`
3. Send `/newbot`
4. Follow instructions
5. Copy the token provided

### Step 3: Get Your Chat ID

1. Click on your new bot
2. Send `/start`
3. Go to: `https://api.telegram.org/bot<TOKEN>/getUpdates`
   (Replace `<TOKEN>` with your token)
4. Look for `"id"` in the response - that's your chat ID

### Step 4: Configure

Edit `.env` file:
```env
TELEGRAM_BOT_TOKEN=your_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

### Step 5: Run the Server

**Terminal 1 - Backend:**
```bash
source venv/bin/activate  # macOS/Linux
# or: venv\Scripts\activate.bat  # Windows
python api/app.py
```

**Terminal 2 - Frontend (macOS/Linux):**
```bash
cd google-ads-project
python -m http.server 8000
```

**Terminal 2 - Frontend (Windows):**
```bash
cd google-ads-project
python -m http.server 8000
```

### Step 6: Test It

1. Open http://localhost:8000
2. Fill in calculator form
3. Submit
4. Check Telegram - you should receive the offer!

## 📁 Project Structure

```
google-ads-project/
├── index.html           # Main page
├── pages/              # City pages
├── css/                # Styling
├── js/                 # Calculator & logic
├── api/
│   └── app.py         # Backend server
├── .env               # Configuration (create this!)
├── requirements.txt   # Python packages
├── README.md          # Full documentation
├── DEPLOYMENT.md      # Deployment guide
└── GOOGLE_ADS_STRATEGY.md
```

## 🔧 Common Commands

### View logs:
```bash
heroku logs --tail
```

### Update code and deploy:
```bash
git add .
git commit -m "Update message"
git push origin main
git push heroku main
```

### Check API health:
```bash
curl http://localhost:5000/api/health
```

### Test Telegram:
```bash
curl -X POST "https://api.telegram.org/bot<TOKEN>/sendMessage" \
  -d "chat_id=<CHAT_ID>&text=Test"
```

## 📱 Mobile Testing

### Test on your phone:
1. Get your computer's IP: `ipconfig` (Windows) or `ifconfig` (Mac)
2. On phone, visit: `http://YOUR_IP:8000`

### Test responsiveness:
- Press F12 in browser
- Click device toolbar
- Test on all screen sizes

## 🌐 Going Live - Step by Step

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/toronto-sell-my-car
git push -u origin main
```

### 2. Deploy to Heroku
```bash
heroku login
heroku create app-name
heroku config:set TELEGRAM_BOT_TOKEN=xxx
heroku config:set TELEGRAM_CHAT_ID=yyy
git push heroku main
```

### 3. Connect Domain
- Update domain nameservers in registrar
- Point to Heroku
- Wait 24-48 hours for propagation

### 4. Test Production
- Visit your domain
- Test all forms
- Check Telegram
- Verify analytics

## 📊 Monitor Your Site

### Google Analytics
1. Create account at google.com/analytics
2. Get tracking ID
3. Add to HTML (if deployed)

### Uptime Monitoring
Use services like:
- UptimeRobot (free)
- Pingdom (free tier)

### Performance
- Use PageSpeed Insights
- Check mobile performance
- Monitor load times

## 💡 Tips & Tricks

### Speed up development:
- Use VS Code with Live Server extension
- Enable auto-reload
- Keep browser dev tools open

### Debug forms:
- Open browser console (F12)
- Check Network tab
- Look at API responses

### Test WhatsApp link:
- Click WhatsApp button
- Should open chat on desktop
- Message auto-fills on mobile

### Backup your code:
```bash
git push origin main  # Every change!
```

## ❓ Troubleshooting

### Port already in use:
```bash
# macOS/Linux
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Python version issues:
```bash
python3 --version  # Should be 3.8+
```

### Telegram not receiving:
1. Double-check token in .env
2. Double-check chat ID
3. Test with curl command above
4. Check bot is not disabled

### Form not submitting:
1. Open browser console
2. Check for JavaScript errors
3. Make sure backend is running
4. Check API endpoint in JS

### CORS errors:
- Already handled in our Flask app
- Should work out of the box

## 🎯 Next Steps

1. ✅ Get site running locally
2. ✅ Test all functionality
3. ✅ Create GitHub repo
4. ✅ Deploy to Heroku/Vercel
5. ✅ Connect domain
6. ✅ Set up Google Ads
7. ✅ Monitor conversions
8. ✅ Optimize based on data

## 📞 Support

If something doesn't work:

1. Check the error message carefully
2. Read README.md and DEPLOYMENT.md
3. Check Google (usually someone had same issue)
4. Delete venv and reinstall
5. Try on different browser

## 🚀 You're Ready!

Your website is modern, fast, and ready to make money!

Next: Set up Google Ads campaigns 💰
