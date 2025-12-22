// Test traveler count in generated links
require('dotenv').config();

const { generateFlightLink, generateHotelLink } = require('./src/links');

console.log('🧪 Testing Traveler Count in Links\n');

const testCases = [
  { type: 'Solo', expected: { adults: 1, children: 0 } },
  { type: 'Couple', expected: { adults: 2, children: 0 } },
  { type: 'Family', expected: { adults: 2, children: 2 } },
  { type: 'Friends', expected: { adults: 4, children: 0 } }
];

testCases.forEach(testCase => {
  console.log(`\n🎯 Testing ${testCase.type}:`);
  
  const flightLink = generateFlightLink('Milan', 'Paris', '2024-06-15', '2024-06-22', testCase.type);
  const hotelLink = generateHotelLink('Paris', '2024-06-15', '2024-06-22', testCase.type);
  
  console.log(`Expected: ${testCase.expected.adults} adults, ${testCase.expected.children} children`);
  
  // Extract parameters from flight link
  const flightUrl = new URL(flightLink);
  const flightAdults = flightUrl.searchParams.get('adults');
  const flightChildren = flightUrl.searchParams.get('children');
  
  console.log(`Flight Link Adults: ${flightAdults}, Children: ${flightChildren}`);
  console.log(`✅ Flight Match: ${flightAdults == testCase.expected.adults && flightChildren == testCase.expected.children ? 'YES' : 'NO'}`);
  
  // Extract parameters from hotel link
  const hotelUrl = new URL(hotelLink);
  const hotelAdults = hotelUrl.searchParams.get('group_adults');
  const hotelChildren = hotelUrl.searchParams.get('group_children');
  
  console.log(`Hotel Link Adults: ${hotelAdults}, Children: ${hotelChildren}`);
  console.log(`✅ Hotel Match: ${hotelAdults == testCase.expected.adults && hotelChildren == testCase.expected.children ? 'YES' : 'NO'}`);
  
  console.log(`\n🔗 Flight Link: ${flightLink}`);
  console.log(`🔗 Hotel Link: ${hotelLink}`);
});

console.log('\n📋 Summary:');
console.log('If any matches show "NO", there\'s a bug in the traveler count logic.');
console.log('Check the getTravelerCount and getHotelBooking functions.');