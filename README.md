# Toronto Sell My Car - Website

A modern, responsive website for a car buyback service in Toronto and Greater Toronto Area (GTA).

## Features

- **Modern, Beautiful Design** - Clean and professional interface optimized for all devices
- **Mobile Responsive** - Works seamlessly on phones, tablets, and desktops
- **Intelligent Car Valuation Calculator** - Real-time price estimation based on vehicle details
- **Telegram Integration** - Form submissions automatically sent to Telegram bot
- **WhatsApp Integration** - Direct messaging with customers
- **SEO Optimized** - Optimized for search engines with proper keywords
- **City Pages** - Dedicated pages for major GTA cities (Toronto, Mississauga, Brampton, etc.)
- **User-Friendly** - Easy to use interface suitable for users of all ages

## Project Structure

```
google-ads-project/
├── index.html              # Main homepage
├── css/
│   └── styles.css         # All styling
├── js/
│   └── calculator.js      # Client-side logic and calculations
├── pages/
│   ├── toronto.html       # Toronto city page
│   ├── mississauga.html   # Mississauga city page
│   ├── brampton.html      # Brampton city page
│   ├── etobicoke.html     # Etobicoke city page
│   ├── scarborough.html   # Scarborough city page
│   ├── north-york.html    # North York city page
│   ├── markham.html       # Markham city page
│   └── vaughan.html       # Vaughan city page
├── api/
│   └── app.py            # Flask backend for form handling
├── requirements.txt       # Python dependencies
├── .env                  # Environment variables (configure this)
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## Setup Instructions

### Frontend (Static HTML/CSS/JS)

The frontend requires no build process. Simply serve the HTML files.

### Backend Setup

1. **Install Python 3.8+**

2. **Create a virtual environment:**
   ```bash
   cd google-ads-project
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables:**
   - Edit `.env` file
   - Add your Telegram Bot Token
   - Add your Telegram Chat ID
   - (Optional) Add WhatsApp API credentials

5. **Run the server:**
   ```bash
   python api/app.py
   ```
   The server will run on `http://localhost:5000`

### Get Telegram Bot Token

1. Talk to `@BotFather` on Telegram
2. Create a new bot with `/newbot`
3. Copy the token provided
4. Add it to your `.env` file

### Deploy to Hosting

#### Option 1: Heroku
1. Create a `Procfile`:
   ```
   web: gunicorn api.app:app
   ```

2. Deploy:
   ```bash
   heroku create your-app-name
   heroku config:set TELEGRAM_BOT_TOKEN=your_token
   heroku config:set TELEGRAM_CHAT_ID=your_chat_id
   git push heroku main
   ```

#### Option 2: Traditional VPS/Hosting
1. Upload files to your hosting
2. Set up Python virtual environment
3. Install dependencies
4. Use `gunicorn` to run the app
5. Set up Nginx as reverse proxy
6. Configure SSL with Let's Encrypt

#### Option 3: Vercel (Frontend Only)
For the static HTML/CSS/JS part, you can deploy to Vercel:
```bash
npm install -g vercel
vercel
```

## Configuration

### Telegram Integration

To set up Telegram notifications:

1. Create a bot with `@BotFather`
2. Get your chat ID by sending `/start` to the bot and checking `getUpdates`
3. Add credentials to `.env`

### WhatsApp Integration

For WhatsApp integration, you'll need:
- WhatsApp Business API credentials
- Verified phone number
- Add credentials to `.env`

## Customization

### Change Business Phone Number
- Edit in `index.html` - search for "6475551234"
- Update WhatsApp links
- Update Telegram messages

### Change Colors
- Edit CSS variables in `css/styles.css` under `:root`
- Primary color: `--primary-color`
- Secondary color: `--secondary-color`
- Success color: `--success-color`

### Add More Cities
1. Create new HTML file in `pages/` folder
2. Copy structure from existing city page
3. Add link in `index.html` cities section

### Update Car Valuation Algorithm
- Edit `carPricingData` and `carBasePrices` in `js/calculator.js`
- Adjust multipliers and base prices based on market data

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## SEO Keywords

The site is optimized for:
- "Sell my car Toronto"
- "Cash for cars Toronto"
- "Car buyback Toronto"
- "Sell car Mississauga"
- "Sell car Brampton"
- "Used car valuation Toronto"
- "Quick car sale Toronto"

## File Sizes

- HTML: ~50KB total
- CSS: ~30KB
- JavaScript: ~15KB
- Total: ~95KB (very fast load times)

## Security Considerations

1. Never commit `.env` file to Git
2. Use HTTPS in production
3. Validate all inputs on backend
4. Use CORS appropriately
5. Rate limit API endpoints
6. Use environment variables for sensitive data

## Future Enhancements

- Admin dashboard to view submissions
- Email notifications in addition to Telegram
- Payment processing integration
- Appointment scheduling system
- Real photo upload with AI analysis
- SMS notifications
- Multiple language support
- Blog section for SEO
- Customer reviews section

## Support & Contact

For questions or issues:
- Email: info@torontosellmycar.ca
- Phone: (647) 555-1234
- WhatsApp: [WhatsApp Link]

## License

© 2024 Toronto Sell My Car. All rights reserved.

## Deployment Checklist

- [ ] Update Telegram Bot Token in `.env`
- [ ] Update Telegram Chat ID in `.env`
- [ ] Update phone numbers throughout the site
- [ ] Update email address
- [ ] Configure domain (torontosellmycar.ca)
- [ ] Set up SSL certificate
- [ ] Test all forms
- [ ] Test mobile responsiveness
- [ ] Set up analytics (Google Analytics)
- [ ] Set up Google Search Console
- [ ] Create Google Ads campaigns
- [ ] Test WhatsApp integration
- [ ] Set up error tracking (Sentry)
- [ ] Configure backups
- [ ] Document API endpoints
