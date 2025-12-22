/**
 * Generate affiliate links for travel services - Voyago Bot Partners
 */

/**
 * Generate flight search link with pre-filled data
 * Using Skyscanner which has better deep linking support
 * @param {string} origin - Origin city
 * @param {string} destination - Destination city
 * @param {string} checkIn - Check-in date (YYYY-MM-DD)
 * @param {string} checkOut - Check-out date (YYYY-MM-DD)
 * @returns {string} Flight search link with parameters
 */
function generateFlightLink(origin, destination, checkIn, checkOut) {
  // Use Skyscanner for better deep linking, then redirect to Booking.com
  // Format: skyscanner.com/transport/flights/origin/destination/checkIn/checkOut
  
  // Convert city names to airport codes for better results
  const getAirportCode = (city) => {
    const codes = {
      'milan': 'MIL',
      'milano': 'MIL', 
      'paris': 'PAR',
      'london': 'LON',
      'rome': 'ROM',
      'roma': 'ROM',
      'barcelona': 'BCN',
      'madrid': 'MAD',
      'amsterdam': 'AMS',
      'berlin': 'BER',
      'vienna': 'VIE',
      'prague': 'PRG',
      'lisbon': 'LIS',
      'lisboa': 'LIS'
    };
    return codes[city.toLowerCase()] || city.toUpperCase().substring(0, 3);
  };
  
  const originCode = getAirportCode(origin);
  const destCode = getAirportCode(destination);
  
  // Format dates as YYMMDD for Skyscanner
  const formatSkyscannerDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return year.substring(2) + month + day;
  };
  
  const departDate = formatSkyscannerDate(checkIn);
  const returnDate = formatSkyscannerDate(checkOut);
  
  // Skyscanner URL with affiliate redirect to Booking.com
  return `https://www.skyscanner.com/transport/flights/${originCode}/${destCode}/${departDate}/${returnDate}/?adults=2&children=0&adultsv2=2&childrenv2=&infants=0&cabinclass=economy&rtn=1&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false&ref=home&utm_source=voyago&utm_medium=affiliate`;
}

/**
 * Generate Booking.com hotel search link with pre-filled data
 * @param {string} city - Destination city
 * @param {string} checkIn - Check-in date (YYYY-MM-DD)
 * @param {string} checkOut - Check-out date (YYYY-MM-DD)
 * @returns {string} Booking.com hotels link with parameters
 */
function generateHotelLink(city, checkIn, checkOut) {
  const baseUrl = 'https://www.booking.com/searchresults.html';
  
  const params = new URLSearchParams({
    'ss': city,
    'checkin': checkIn,
    'checkout': checkOut,
    'group_adults': '2',
    'no_rooms': '1',
    'group_children': '0',
    'review_score': '80', // 8+ rating
    'order': 'review_score_and_price'
  });
  
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Generate travel service links based on user needs with destination-specific parameters
 * @param {string} city - Destination city
 * @param {string} interests - User interests
 * @param {string} checkIn - Check-in date (YYYY-MM-DD)
 * @param {string} checkOut - Check-out date (YYYY-MM-DD)
 * @returns {Array} Array of service objects with title and link
 */
function generateTravelServices(city, interests, checkIn = null, checkOut = null) {
  const services = [];
  
  // Airalo eSIM - use base link (they don't support URL parameters for destination)
  services.push({
    title: `📱 eSIM for ${city}`,
    link: process.env.AIRALO_LINK,
    description: `Stay connected in ${city} with eSIM`
  });
  
  // TicketNetwork - use base link with city in title
  services.push({
    title: `🎟️ ${city} Events`,
    link: process.env.TICKETNETWORK_LINK,
    description: `Tickets for events in ${city}`
  });
  
  // Tiqets - use base link (they redirect based on location)
  services.push({
    title: `🏛️ ${city} Attractions`,
    link: process.env.TIQETS_LINK,
    description: `Skip-the-line tickets in ${city}`
  });
  
  // LocalRent - use base link with city in title
  services.push({
    title: `🚗 ${city} Car Rentals`,
    link: process.env.LOCALRENT_LINK,
    description: `Car rentals in ${city}`
  });
  
  return services;
}

/**
 * Generate travel protection and support services with trip-specific parameters
 * @param {string} destination - Destination city
 * @param {string} checkIn - Check-in date (YYYY-MM-DD)
 * @param {string} checkOut - Check-out date (YYYY-MM-DD)
 * @returns {Array} Array of protection service objects
 */
function generateProtectionServices(destination = null, checkIn = null, checkOut = null) {
  const services = [];
  
  // AirHelp - use base link (they don't support URL parameters)
  services.push({
    title: '✈️ Flight Compensation',
    link: process.env.AIRHELP_LINK,
    description: 'Get compensation for flight delays/cancellations'
  });
  
  // Compensair - use base link
  services.push({
    title: '⚖️ Travel Rights Support',
    link: process.env.COMPENSAIR_LINK,
    description: 'Legal support for travel disputes'
  });
  
  // Ekta Insurance - use base link with destination in title
  services.push({
    title: `🛡️ ${destination || 'Travel'} Insurance`,
    link: process.env.EKTA_INSURANCE_LINK,
    description: `Comprehensive protection for ${destination || 'your trip'}`
  });
  
  // YeSim - use base link with destination in title
  services.push({
    title: `📞 ${destination || 'Global'} SIM Cards`,
    link: process.env.YESIM_LINK,
    description: `Voice calls and data in ${destination || 'worldwide'}`
  });
  
  return services;
}

module.exports = {
  generateFlightLink,
  generateHotelLink,
  generateTravelServices,
  generateProtectionServices
};