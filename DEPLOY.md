# 🚀 Voyago Bot - Deploy Instructions

## ✅ Pre-Deploy Checklist

### 1. Bot Registration
- [x] Bot Token: `8452037928:AAFLKdDwK9c5KPsNixPQD55lzr6v8emnvS4`
- [ ] Register @Voyago_bot with BotFather (if not done)
- [ ] Set bot description and commands in BotFather

### 2. API Keys Required
- [ ] **OpenRouter API Key** (FREE): Go to [openrouter.ai](https://openrouter.ai) → Sign up → Get API key
- [ ] Update `.env` file with your OpenRouter key

### 3. Affiliate Links (Already Configured ✅)
- [x] YeSim eSIM: `https://yesim.tp.st/MDrTZawy`
- [x] TicketNetwork: `https://ticketnetwork.tp.st/54S9pwIV`
- [x] Booking.com: `https://booking.com`
- [x] AirHelp: `https://airhelp.tp.st/twpjfhUm`
- [x] Compensair: `https://compensair.tp.st/fsmEoO2H`
- [x] LocalRent: `https://localrent.tp.st/iUB5sTmY`
- [x] Tiqets: `https://tiqets.tp.st/7o1fi7Z4`
- [x] Ekta Insurance: `https://ektatraveling.tp.st/jw1Qj1iv`
- [x] Airalo: `https://airalo.tp.st/Qne85Qor`

## 🛠️ Local Development

```bash
# Fix Node.js version issue (if needed)
nvm install 18
nvm use 18

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your OpenRouter API key

# Start development server
npm run dev
```

## 🌐 IONOS Deployment

### Step 1: Upload Files
Upload all project files to your IONOS hosting directory.

### Step 2: Install Dependencies
```bash
# SSH into your IONOS server
npm install --production
```

### Step 3: Configure Environment
```bash
# Edit .env file on server
nano .env

# Set production values:
NODE_ENV=production
WEBHOOK_URL=https://yourdomain.com/webhook
OPENROUTER_API_KEY=your_actual_key
```

### Step 4: Start Service
```bash
# Start the bot
npm start

# Or use PM2 for process management
npm install -g pm2
pm2 start server.js --name voyago-bot
pm2 startup
pm2 save
```

### Step 5: Set Webhook
The bot automatically sets webhook in production mode. Verify at:
`https://yourdomain.com/` (should show "Voyago Bot is running!")

## 🧪 Testing Commands

Once deployed, test these commands in Telegram:

1. `/start` - Welcome message
2. `/plan` - Start trip planning
3. `/help` - Show help information

### Test Planning Flow:
1. Destination: "Paris"
2. Dates: "15/06/2024 - 22/06/2024"
3. Traveler: Select "Couple"
4. Interests: Select "Culture" and "Food"
5. Budget: "€1500"

Expected result: AI-generated travel plan with affiliate links.

## 🔧 Troubleshooting

### Bot Not Responding
- Check webhook URL is accessible
- Verify SSL certificate is valid
- Check server logs for errors

### AI Not Working
- Verify OpenRouter API key is correct
- Check API quota/limits
- Bot will show fallback content if AI fails

### Links Not Working
- All affiliate links are pre-configured
- No additional setup needed for affiliate programs

## 📊 Monitoring

### Key Metrics to Track:
- User engagement (completed planning sessions)
- AI success rate
- Affiliate link clicks
- Error rates

### Log Files:
- Server logs: Check console output
- Error tracking: All errors logged automatically

## 🎯 Next Steps After Deploy

1. **Test thoroughly** with real users
2. **Monitor performance** and error rates
3. **Optimize AI prompts** based on user feedback
4. **Track affiliate conversions** through partner dashboards
5. **Scale infrastructure** as user base grows

## 🆘 Support

If you encounter issues:
1. Check server logs first
2. Verify all environment variables
3. Test webhook endpoint manually
4. Ensure Node.js version compatibility

---

**Ready to launch! 🚀**

Your Voyago Bot is configured with real affiliate links and ready to help travelers while generating revenue through commissions.