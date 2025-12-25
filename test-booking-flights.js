// Test the new Booking.com flights URL format
const { generateFlightLink } = require('./src/links');

console.log('🧪 Testing New Booking.com Flights URL Format\n');

const testCases = [
  {
    origin: 'London',
    destination: 'Paris', 
    checkIn: '2026-01-24',
    checkOut: '2026-01-31',
    travelerType: 'Solo',
    expected: {
      adults: 1,
      children: 0,
      fromCode: 'LON.CITY',
      toCode: 'PAR.CITY'
    }
  },
  {
    origin: 'Milan',
    destination: 'Barcelona',
    checkIn: '2026-02-15',
    checkOut: '2026-02-22', 
    travelerType: 'Couple',
    expected: {
      adults: 2,
      children: 0,
      fromCode: 'MIL.CITY',
      toCode: 'BCN.CITY'
    }
  },
  {
    origin: 'New York',
    destination: 'Tokyo',
    checkIn: '2026-03-10',
    checkOut: '2026-03-20',
    travelerType: 'Family',
    expected: {
      adults: 2,
      children: 2,
      fromCode: 'NYC.CITY', 
      toCode: 'TYO.CITY'
    }
  }
];

testCases.forEach((testCase, index) => {
  console.log(`\n🎯 Test ${index + 1}: ${testCase.origin} → ${testCase.destination} (${testCase.travelerType})`);
  
  const flightLink = generateFlightLink(
    testCase.origin,
    testCase.destination,
    testCase.checkIn,
    testCase.checkOut,
    testCase.travelerType
  );
  
  console.log(`\n🔗 Generated URL:`);
  console.log(flightLink);
  
  // Parse URL to check parameters
  try {
    const url = new URL(flightLink);
    const adults = url.searchParams.get('adults');
    const children = url.searchParams.get('children');
    const from = url.searchParams.get('from');
    const to = url.searchParams.get('to');
    const depart = url.searchParams.get('depart');
    const returnDate = url.searchParams.get('return');
    
    console.log(`\n✅ URL Parameters Check:`);
    console.log(`- Adults: ${adults} (expected: ${testCase.expected.adults}) ${adults == testCase.expected.adults ? '✅' : '❌'}`);
    console.log(`- Children: ${children || '0'} (expected: ${testCase.expected.children}) ${(children || '0') == testCase.expected.children ? '✅' : '❌'}`);
    console.log(`- From: ${from} (expected: ${testCase.expected.fromCode}) ${from === testCase.expected.fromCode ? '✅' : '❌'}`);
    console.log(`- To: ${to} (expected: ${testCase.expected.toCode}) ${to === testCase.expected.toCode ? '✅' : '❌'}`);
    console.log(`- Depart: ${depart} (expected: ${testCase.checkIn}) ${depart === testCase.checkIn ? '✅' : '❌'}`);
    console.log(`- Return: ${returnDate} (expected: ${testCase.checkOut}) ${returnDate === testCase.checkOut ? '✅' : '❌'}`);
    
    // Check if URL structure matches expected format
    const expectedPath = `/${testCase.expected.fromCode}-${testCase.expected.toCode}/`;
    const actualPath = url.pathname;
    console.log(`- URL Path: ${actualPath} ${actualPath.includes(expectedPath) ? '✅' : '❌'}`);
    
    // Check for required parameters
    const hasRequiredParams = url.searchParams.has('type') && 
                             url.searchParams.has('cabinClass') &&
                             url.searchParams.has('aid') &&
                             url.searchParams.has('label');
    console.log(`- Required params: ${hasRequiredParams ? '✅' : '❌'}`);
    
  } catch (error) {
    console.log(`❌ Error parsing URL: ${error.message}`);
  }
});

console.log('\n📋 Summary:');
console.log('✅ = Parameter correct');
console.log('❌ = Parameter incorrect');
console.log('\nIf all parameters show ✅, the Booking.com flights integration should work correctly!');
console.log('\nExpected URL format: https://flights.booking.com/flights/LON.CITY-PAR.CITY/?type=ROUNDTRIP&adults=1&...');