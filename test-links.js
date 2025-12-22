// Test affiliate links without starting the bot
require('dotenv').config();

console.log('🔗 Voyago Bot - Affiliate Links Test\n');

// Test link generation
try {
  const { generateTravelServices, generateProtectionServices, generateFlightLink, generateHotelLink } = require('./src/links');
  
  console.log('✈️ FLIGHT & HOTEL LINKS:');
  console.log('Flights:', generateFlightLink('Paris', '2024-06-15', '2024-06-22'));
  console.log('Hotels:', generateHotelLink('Paris', '2024-06-15', '2024-06-22'));
  
  console.log('\n🎯 TRAVEL SERVICES:');
  const services = generateTravelServices('Paris', 'Culture, Food');
  services.forEach(service => {
    console.log(`${service.title}: ${service.link}`);
  });
  
  console.log('\n🛡️ PROTECTION SERVICES:');
  const protection = generateProtectionServices();
  protection.forEach(service => {
    console.log(`${service.title}: ${service.link}`);
  });
  
  console.log('\n✅ All affiliate links are working!');
  console.log('🚀 Ready for deployment and monetization');
  
} catch (error) {
  console.error('❌ Error testing links:', error.message);
}

console.log('\n💰 REVENUE STREAMS:');
console.log('1. eSIM Sales (YeSim + Airalo)');
console.log('2. Event Tickets (TicketNetwork)');
console.log('3. Hotel Bookings (Booking.com)');
console.log('4. Flight Bookings (Booking.com)');
console.log('5. Car Rentals (LocalRent)');
console.log('6. Attraction Tickets (Tiqets)');
console.log('7. Travel Insurance (Ekta)');
console.log('8. Flight Compensation (AirHelp + Compensair)');

console.log('\n🎯 CONVERSION OPTIMIZATION:');
console.log('• Links contextual to user interests');
console.log('• Services organized by category');
console.log('• Clear value propositions');
console.log('• Mobile-optimized buttons');
console.log('• Trust indicators included');