// Quick test to verify the bot flow and link generation
require('dotenv').config();

console.log('🧪 Testing Voyago Bot Flow\n');

// Test link generation
const { generateFlightLink, generateHotelLink } = require('./src/links');

console.log('✈️ FLIGHT LINK TEST:');
const flightLink = generateFlightLink('Milan', 'Paris', '2024-06-15', '2024-06-22');
console.log('Origin: Milan → Destination: Paris');
console.log('Link:', flightLink);
console.log('✅ Should include both cities and dates\n');

console.log('🏨 HOTEL LINK TEST:');
const hotelLink = generateHotelLink('Paris', '2024-06-15', '2024-06-22');
console.log('Destination: Paris');
console.log('Link:', hotelLink);
console.log('✅ Should include city and dates\n');

console.log('🔄 EXPECTED BOT FLOW:');
console.log('1. 🛫 "Where are you traveling from?" → User: "Milan"');
console.log('2. 🌍 "Where would you like to go?" → User: "Paris"');
console.log('3. 📅 "When are you planning to travel?" → User: "15/06/2024 - 22/06/2024"');
console.log('4. 👥 Traveler type selection');
console.log('5. ❤️ Interests selection');
console.log('6. 💶 Budget input');
console.log('7. ✨ Generate plan with corrected links\n');

console.log('🎯 NEXT STEPS:');
console.log('1. Wait for Render redeploy (2-3 minutes)');
console.log('2. Test @Voyago_bot with /plan command');
console.log('3. Verify origin city question appears first');
console.log('4. Check that Booking.com links open with pre-filled data');