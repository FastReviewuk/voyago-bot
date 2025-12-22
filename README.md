# Voyago Bot 🌍

AI-powered Telegram travel planning bot with affiliate monetization. Helps travelers plan custom vacations with real-time AI insights and earns commissions through affiliate links.

## Features ✨

- **Guided Trip Planning**: Interactive onboarding with sequential questions
- **AI-Generated Insights**: Real-time travel tips using OpenRouter API (Mistral-7B free model)
- **Affiliate Monetization**: Commission links for Booking.com, Kiwi.com, GetYourGuide, and Tiqets
- **No Data Storage**: Privacy-focused with session-only data handling
- **IONOS Compatible**: Ready for shared hosting deployment with webhook support

## Quick Start 🚀

### 1. Prerequisites

- Node.js 18+
- Telegram Bot Token (from @BotFather)
- OpenRouter API Key (free tier available)
- Affiliate accounts (optional for testing)

### 2. Installation

```bash
# Clone and install dependencies
npm install

# Copy environment template
cp .env.example .env
```

### 3. Configuration

Edit `.env` with your credentials:

```env
BOT_TOKEN=your_bot_token_from_botfather
WEBHOOK_URL=https://yourdomain.com/webhook
OPENROUTER_API_KEY=your_openrouter_api_key

# Affiliate IDs
BOOKING_AFFILIATE_ID=your_booking_affiliate_id
KIWI_AFFILIATE_ID=your_kiwi_affiliate_id
GETYOURGUIDE_AFFILIATE_ID=your_getyourguide_affiliate_id
TIQETS_AFFILIATE_ID=your_tiqets_affiliate_id
```

### 4. Development

```bash
# Start with polling (development)
npm run dev
```

### 5. Production Deployment

```bash
# Set NODE_ENV=production in .env
# Deploy to IONOS or any Node.js hosting
npm start
```

## Bot Commands 🤖

- `/start` - Welcome message and main menu
- `/plan` - Start guided trip planning
- `/help` - Show help information

## Planning Flow 📋

1. **Destination**: User enters city name
2. **Dates**: Travel dates (DD/MM/YYYY format)
3. **Traveler Type**: Solo/Couple/Family/Friends
4. **Interests**: Culture, Food, Nature, Beach, Nightlife
5. **Budget**: Total trip budget
6. **AI Generation**: Custom travel plan with affiliate links

## Architecture 🏗️

```
/
├── src/
│   ├── bot.js          # Main bot logic and conversation flow
│   ├── ai.js           # OpenRouter AI integration
│   └── links.js        # Affiliate link generation
├── server.js           # Express server with webhook support
├── package.json        # Dependencies and scripts
└── .env.example        # Environment template
```

## Affiliate Integration 💰

### Supported Platforms

- **Booking.com**: Hotel bookings with 8+ rating filter
- **Kiwi.com**: Flight search with flexible dates
- **GetYourGuide**: Tours and experiences
- **Tiqets**: Skip-the-line tickets and attractions

### Revenue Model

- Commission-based through affiliate links
- No payment processing in bot
- Users redirected to partner platforms
- Transparent affiliate disclosure

## AI Integration 🧠

### OpenRouter Configuration

- **Model**: `mistralai/mistral-7b-instruct:free`
- **Timeout**: 10 seconds
- **Fallback**: Pre-written tips for popular destinations
- **Privacy**: No conversation data stored

### Prompt Engineering

Optimized prompts for:
- Concise, actionable advice (110 words max)
- Local insider tips
- Traveler type personalization
- Interest-based recommendations

## IONOS Deployment 🚀

### Requirements

- Node.js 18+ support
- HTTPS domain for webhooks
- Environment variables support

### Deployment Steps

1. **Upload Files**: Transfer all project files to IONOS
2. **Install Dependencies**: Run `npm install` on server
3. **Set Environment**: Configure `.env` with production values
4. **Start Service**: Use `npm start` or process manager
5. **Test Webhook**: Verify `/webhook` endpoint responds

### IONOS-Specific Configuration

```javascript
// server.js automatically handles:
// - Webhook mode for production
// - Polling mode for development
// - Health check endpoint
// - Graceful shutdown
```

## Error Handling 🛡️

### AI Failures
- 10-second timeout on OpenRouter calls
- Automatic fallback to pre-written content
- Graceful degradation of service

### Network Issues
- Retry logic for critical operations
- User-friendly error messages
- Logging for debugging

### Input Validation
- Date format validation
- Required field checking
- Sanitized user inputs

## Testing Checklist ✅

### Before Going Live

1. **Bot Registration**
   - [ ] Register @Voyago_bot with BotFather
   - [ ] Set bot description and commands
   - [ ] Configure bot privacy settings

2. **API Keys**
   - [ ] OpenRouter account and API key
   - [ ] Test AI generation with sample requests
   - [ ] Verify rate limits and quotas

3. **Affiliate Accounts**
   - [ ] Booking.com Partner Program
   - [ ] Kiwi.com Affiliate Program  
   - [ ] GetYourGuide Partner Program
   - [ ] Tiqets Affiliate Program

4. **Deployment**
   - [ ] IONOS hosting setup
   - [ ] HTTPS domain configuration
   - [ ] Environment variables set
   - [ ] Webhook endpoint tested

5. **Functionality**
   - [ ] Complete planning flow
   - [ ] AI insight generation
   - [ ] Affiliate link generation
   - [ ] Error handling scenarios

## Monitoring 📊

### Key Metrics
- User engagement (planning completions)
- AI success rate
- Affiliate click-through rates
- Error rates and types

### Logging
- All errors logged to console
- User interactions tracked
- API response times monitored

## Support 🆘

### Common Issues

**Bot not responding**: Check webhook URL and SSL certificate
**AI not working**: Verify OpenRouter API key and quota
**Links not working**: Confirm affiliate IDs are correct

### Debug Mode

Set `NODE_ENV=development` for:
- Detailed error logging
- Polling instead of webhooks
- Local testing capabilities

## License 📄

MIT License - feel free to modify and distribute.

---

**Ready to launch your travel bot empire? 🚀**

Follow the setup guide, test thoroughly, and start helping travelers discover amazing destinations while earning affiliate commissions!