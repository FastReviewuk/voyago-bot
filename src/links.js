/**
 * Generate affiliate links for travel services - Voyago Bot Partners
 */

/**
 * Generate Booking.com flight search link with pre-filled data
 * @param {string} destination - Destination city
 * @param {string} checkIn - Check-in date (YYYY-MM-DD)
 * @param {string} checkOut - Check-out date (YYYY-MM-DD)
 * @returns {string} Booking.com flights link with parameters
 */
function generateFlightLink(destination, checkIn, checkOut) {
  const baseUrl = 'https://www.booking.com/flights';
  
  // Convert dates to booking.com format (YYYY-MM-DD)
  const params = new URLSearchParams({
    'from-destination': 'anywhere',
    'to-destination': destination,
    'departure-date': checkIn,
    'return-date': checkOut,
    'adults': '2',
    'children': '0',
    'infants': '0',
    'cabin-class': 'economy'
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
  
  // eSIM with destination-specific data
  const airaloLink = process.env.AIRALO_LINK + `?destination=${encodeURIComponent(city)}`;
  services.push({
    title: '📱 eSIM & Data Plans',
    link: airaloLink,
    description: `Stay connected in ${city} with eSIM`
  });
  
  // Events with city and date parameters
  let ticketLink = process.env.TICKETNETWORK_LINK;
  if (checkIn) {
    const eventDate = new Date(checkIn);
    const month = eventDate.getMonth() + 1;
    const year = eventDate.getFullYear();
    ticketLink += `?city=${encodeURIComponent(city)}&month=${month}&year=${year}`;
  } else {
    ticketLink += `?city=${encodeURIComponent(city)}`;
  }
  
  services.push({
    title: '🎟️ Events & Shows',
    link: ticketLink,
    description: `Tickets for events in ${city}`
  });
  
  // Attractions with city parameter
  const tiqetsLink = process.env.TIQETS_LINK + `?city=${encodeURIComponent(city)}`;
  services.push({
    title: '🏛️ Museums & Attractions',
    link: tiqetsLink,
    description: `Skip-the-line tickets in ${city}`
  });
  
  // Car rental with city and dates
  let localrentLink = process.env.LOCALRENT_LINK + `?city=${encodeURIComponent(city)}`;
  if (checkIn && checkOut) {
    localrentLink += `&pickup_date=${checkIn}&return_date=${checkOut}`;
  }
  
  services.push({
    title: '🚗 Local Car Rentals',
    link: localrentLink,
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
  
  // Flight compensation with destination
  let airhelpLink = process.env.AIRHELP_LINK;
  if (destination) {
    airhelpLink += `?destination=${encodeURIComponent(destination)}`;
  }
  
  services.push({
    title: '✈️ Flight Compensation',
    link: airhelpLink,
    description: 'Get compensation for flight delays/cancellations'
  });
  
  // Legal support with destination
  let compensairLink = process.env.COMPENSAIR_LINK;
  if (destination) {
    compensairLink += `?destination=${encodeURIComponent(destination)}`;
  }
  
  services.push({
    title: '⚖️ Travel Rights Support',
    link: compensairLink,
    description: 'Legal support for travel disputes'
  });
  
  // Travel insurance with trip dates
  let insuranceLink = process.env.EKTA_INSURANCE_LINK;
  if (destination && checkIn && checkOut) {
    insuranceLink += `?destination=${encodeURIComponent(destination)}&start_date=${checkIn}&end_date=${checkOut}`;
  } else if (destination) {
    insuranceLink += `?destination=${encodeURIComponent(destination)}`;
  }
  
  services.push({
    title: '🛡️ Travel Insurance',
    link: insuranceLink,
    description: `Comprehensive protection for ${destination || 'your trip'}`
  });
  
  // Global SIM with destination
  let yesimLink = process.env.YESIM_LINK;
  if (destination) {
    yesimLink += `?destination=${encodeURIComponent(destination)}`;
  }
  
  services.push({
    title: '📞 Global SIM Cards',
    link: yesimLink,
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