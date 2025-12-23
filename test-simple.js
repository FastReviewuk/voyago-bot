// Simple test to check traveler count in URLs
const { generateFlightLink, generateHotelLink } = require('./src/links');

console.log('Testing Couple (should show 2 adults, 0 children):');

const flightLink = generateFlightLink('Milan', 'Paris', '2024-06-15', '2024-06-22', 'Couple');
const hotelLink = generateHotelLink('Paris', '2024-06-15', '2024-06-22', 'Couple');

console.log('\nFlight Link:');
console.log(flightLink);

console.log('\nHotel Link:');
console.log(hotelLink);

// Extract and display parameters
try {
  const flightUrl = new URL(flightLink);
  console.log('\nFlight Parameters:');
  console.log('Adults:', flightUrl.searchParams.get('adults'));
  console.log('Children:', flightUrl.searchParams.get('children'));
  
  const hotelUrl = new URL(hotelLink);
  console.log('\nHotel Parameters:');
  console.log('Adults:', hotelUrl.searchParams.get('group_adults'));
  console.log('Children:', hotelUrl.searchParams.get('group_children'));
} catch (error) {
  console.log('Error parsing URLs:', error.message);
}