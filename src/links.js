/**
 * Generate affiliate links for travel services - Voyago Bot Partners
 */

/**
 * Generate Booking.com flight search link with pre-filled data
 * @param {string} origin - Origin city
 * @param {string} destination - Destination city
 * @param {string} checkIn - Check-in date (YYYY-MM-DD)
 * @param {string} checkOut - Check-out date (YYYY-MM-DD)
 * @returns {string} Booking.com flights link with parameters
 */
function generateFlightLink(origin, destination, checkIn, checkOut) {
  // Booking.com flights uses different parameter structure
  const baseUrl = 'https://www.booking.com/flights/index.html';
  
  const params = new URLSearchParams({
    'type': 'ROUNDTRIP',
    'adults': '2',
    'children': '0',
    'infants': '0',
    'cabinclass': 'ECONOMY',
    'from_sf': origin,
    'from_st': origin,
    'to_sf': destination, 
    'to_st': destination,
    'depart_date': checkIn,
    'return_date': checkOut
  });
  
  return `${baseUrl}?${params.toString()}`;
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