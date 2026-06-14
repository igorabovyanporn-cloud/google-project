# Deployment Guide - Toronto Sell My Car

## GitHub Setup

### 1. Initialize Git Repository

```bash
cd google-ads-project
git init
git add .
git commit -m "Initial commit: Car buyback website"
```

### 2. Create GitHub Repository

1. Go to github.com and create a new repository called `toronto-sell-my-car`
2. Do NOT initialize with README (we already have one)
3. Copy the repository URL

### 3. Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/toronto-sell-my-car.git
git branch -M main
git push -u origin main
```

## Hosting Options

### Option A: Heroku (Recommended for beginners)

**Pros:** Easy deployment, automatic HTTPS, free tier available
**Cons:** May have slight delays on free tier

#### Steps:

1. **Install Heroku CLI:**
   ```bash
   brew tap heroku/brew && brew install heroku
   ```

2. **Create Procfile** (already included in project):
   ```
   web: gunicorn api.app:app
   ```

3. **Login to Heroku:**
   ```bash
   heroku login
   ```

4. **Create Heroku App:**
   ```bash
   heroku create your-app-name
   ```

5. **Set environment variables:**
   ```bash
   heroku config:set TELEGRAM_BOT_TOKEN=your_token_here
   heroku config:set TELEGRAM_CHAT_ID=your_chat_id_here
   ```

6. **Deploy:**
   ```bash
   git push heroku main
   ```

7. **View logs:**
   ```bash
   heroku logs --tail
   ```

### Option B: Vercel (Best for frontend)

**Pros:** Extremely fast, automatic deployments from GitHub, free
**Cons:** Limited backend support on free tier

#### Steps:

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Connect GitHub account to Vercel**

3. **Deploy from GitHub:**
   - Push your code to GitHub
   - Go to vercel.com
   - Click "New Project"
   - Select your GitHub repo
   - Deploy

4. **Custom domain:**
   - Settings > Domains
   - Add torontosellmycar.ca

### Option C: AWS + EC2

**Pros:** Scalable, reliable, lots of features
**Cons:** More complex setup

#### Basic Steps:

1. Launch EC2 instance (Ubuntu)
2. Install Python, Nginx, Gunicorn
3. Clone GitHub repo
4. Set up virtual environment
5. Configure Nginx as reverse proxy
6. Set up SSL with Certbot
7. Configure domain

### Option D: DigitalOcean (Recommended for professionals)

**Pros:** Simple, affordable, good documentation
**Cons:** Requires Linux knowledge

#### Steps:

1. Create Droplet (Ubuntu 20.04)
2. SSH into droplet
3. Install dependencies:
   ```bash
   sudo apt update
   sudo apt install python3-pip python3-venv nginx
   ```
4. Clone your repo
5. Set up virtual environment
6. Configure Nginx
7. Set up SSL
8. Configure domain

### Option E: Railway.app (Modern alternative)

**Pros:** Simple, GitHub integration, good pricing
**Cons:** Newer platform

#### Steps:

1. Go to railway.app
2. Connect GitHub
3. Select your repo
4. Add environment variables
5. Deploy automatically

## Domain Setup (torontosellmycar.ca)

### 1. Register Domain
- Go to Godaddy.com, Namecheap.com, or Google Domains
- Search for torontosellmycar.ca
- Complete registration

### 2. Point Domain to Your Host

**For Heroku:**
- Go to Heroku app settings
- Custom Domains section
- Add your domain
- Follow DNS instructions

**For Vercel:**
- Go to Project Settings > Domains
- Add your domain
- Update nameservers at registrar

**For DigitalOcean/AWS:**
- Point nameservers to provider
- Or use A record pointing to IP

### 3. SSL Certificate

Most modern hosts provide free SSL:
- Heroku: Automatic
- Vercel: Automatic
- DigitalOcean: Use Let's Encrypt
- AWS: Use AWS Certificate Manager

## Environment Variables Checklist

Make sure these are set on your hosting:

```
TELEGRAM_BOT_TOKEN=xxxxx
TELEGRAM_CHAT_ID=xxxxx
WHATSAPP_API_KEY=xxxxx (optional)
WHATSAPP_PHONE=16475551234
FLASK_ENV=production
```

## Post-Deployment Steps

### 1. Test Everything

- [ ] Visit your domain
- [ ] Test calculator on desktop
- [ ] Test calculator on mobile
- [ ] Fill out offer form
- [ ] Check Telegram receives message
- [ ] Test WhatsApp link
- [ ] Test phone number link

### 2. Configure Analytics

Add Google Analytics:

1. Create account at google.com/analytics
2. Get your Tracking ID
3. Add to HTML `<head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### 3. Google Search Console

1. Go to search.google.com/search-console
2. Add property (your domain)
3. Verify ownership via DNS
4. Submit sitemap
5. Monitor search performance

### 4. Monitor Performance

Set up error tracking with Sentry:

1. Create account at sentry.io
2. Create project for JavaScript
3. Add script to HTML:
```html
<script src="https://browser.sentry-cdn.com/7.xx.x/bundle.min.js"></script>
```

## Continuous Deployment

### GitHub Actions (Free)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Heroku

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.14
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "your-app-name"
          heroku_email: "your-email@gmail.com"
```

## Troubleshooting

### 500 Error
- Check logs: `heroku logs --tail`
- Verify environment variables
- Check .env file is in .gitignore

### Form not submitting
- Check CORS settings in app.py
- Verify backend URL in JavaScript
- Check browser console for errors

### Telegram messages not arriving
- Verify token is correct
- Verify chat ID is correct
- Test with `curl`:
  ```bash
  curl -X POST "https://api.telegram.org/botTOKEN/sendMessage" \
    -d "chat_id=CHAT_ID&text=Test"
  ```

### Domain not working
- Wait 24-48 hours for DNS propagation
- Verify nameservers at registrar
- Check domain settings in hosting provider

## Performance Optimization

### Frontend
- Images are minimal (no large assets)
- CSS and JS are optimized
- Mobile-first design
- Fast load times

### Backend
- Use `gunicorn` in production
- Enable caching
- Use CDN for static files
- Monitor response times

## Security Checklist

- [ ] Use HTTPS only (no HTTP)
- [ ] .env is in .gitignore
- [ ] No secrets in code
- [ ] Input validation on backend
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Backup system in place
- [ ] Monitor API usage

## Maintenance

### Regular Tasks
- Check logs weekly
- Monitor uptime
- Backup data
- Update dependencies
- Review form submissions

### Update Process
```bash
git pull origin main
# Test locally
git push heroku main  # or your hosting method
```

## Support & Help

- GitHub Issues: Report bugs
- Email: info@torontosellmycar.ca
- Telegram: Direct message bot
- WhatsApp: Available

## Next Steps

1. ✅ Code is ready
2. ✅ GitHub repo created
3. ✅ Choose hosting option
4. ✅ Deploy
5. ✅ Configure domain
6. ✅ Test thoroughly
7. ⏭️ Set up Google Ads campaigns
8. ⏭️ Monitor performance
9. ⏭️ Optimize based on data
10. ⏭️ Scale as needed
