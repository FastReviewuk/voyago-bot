require('dotenv').config();
const express = require('express');
const bot = require('./src/bot');

const app = express();
const PORT = process.env.PORT || 3000;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

// Middleware for parsing JSON
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'Voyago Bot is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Webhook endpoint for Telegram
app.post('/webhook', (req, res) => {
  try {
    bot.handleUpdate(req.body);
    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start server
async function startServer() {
  try {
    // Set webhook for production
    if (process.env.NODE_ENV === 'production' && WEBHOOK_URL) {
      console.log('Setting webhook for production...');
      await bot.telegram.setWebhook(`${WEBHOOK_URL}/webhook`);
      console.log(`Webhook set to: ${WEBHOOK_URL}/webhook`);
    } else {
      // Use polling for development
      console.log('Starting bot with polling for development...');
      await bot.telegram.deleteWebhook();
      bot.launch();
      console.log('Bot started with polling');
    }

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/`);
      
      if (process.env.NODE_ENV === 'production') {
        console.log(`Webhook endpoint: ${WEBHOOK_URL}/webhook`);
      }
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.once('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully...');
  bot.stop('SIGINT');
  process.exit(0);
});

process.once('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  bot.stop('SIGTERM');
  process.exit(0);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start the server
startServer();