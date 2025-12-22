// Simple startup script for testing
console.log('🚀 Starting Voyago Bot...');
console.log('Bot Token:', process.env.BOT_TOKEN ? 'Configured ✅' : 'Missing ❌');
console.log('Environment:', process.env.NODE_ENV || 'development');

// Try to start the server
try {
  require('./server.js');
} catch (error) {
  console.error('❌ Error starting bot:', error.message);
  console.log('\n📋 Setup checklist:');
  console.log('1. Install Node.js 18+ (current issue detected)');
  console.log('2. Run: npm install');
  console.log('3. Configure .env file');
  console.log('4. Get OpenRouter API key from openrouter.ai');
  console.log('5. Run: npm start');
}