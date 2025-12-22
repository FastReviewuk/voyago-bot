/**
 * Generate affiliate links for travel services - Voyago Bot Partners
 */

/**
 * Generate Booking.com flight and hotel search link
 * @param {string} destination - Destination city
 * @param {string} checkIn - Check-in date (YYYY-MM-DD)
 * @param {string} checkOut - Check-out date (YYYY-MM-DD)
 * @returns {string} Booking.com affiliate link
 */
function generateFlightLink(destination, checkIn, checkOut) {
  // Using Booking.com for flights as specified
  return process.env.BOOKING_LINK || 'https://booking.com';
}

/**
 * Generate Booking.com hotel search link
 * @param {string} city - Destination city
 * @param {string} checkIn - Check-in date (YYYY-MM-DD)
 * @param {string} checkOut - Check-out date (YYYY-MM-DD)
 * @returns {string} Booking.com affiliate link
 */
function generateHotelLink(city, checkIn, checkOut) {
  // Using Booking.com for hotels as specified
  return process.env.BOOKING_LINK || 'https://booking.com';
}

/**
 * Generate travel service links based on user needs
 * @param {string} city - Destination city
 * @param {string} interests - User interests
 * @returns {Array} Array of service objects with title and link
 */
function generateTravelServices(city, interests) {
  const services = [];
  
  // Always include core travel services
  services.push({
    title: '📱 eSIM & Data Plans',
    link: process.env.AIRALO_LINK,
    description: 'Stay connected worldwide with eSIM'
  });
  
  services.push({
    title: '🎟️ Events & Shows',
    link: process.env.TICKETNETWORK_LINK,
    description: 'Tickets for concerts, sports, theater'
  });
  
  services.push({
    title: '🏛️ Museums & Attractions',
    link: process.env.TIQETS_LINK,
    description: 'Skip-the-line tickets worldwide'
  });
  
  services.push({
    title: '🚗 Local Car Rentals',
    link: process.env.LOCALRENT_LINK,
    description: 'Best local car rental deals'
  });
  
  return services;
}

/**
 * Generate travel protection and support services
 * @returns {Array} Array of protection service objects
 */
function generateProtectionServices() {
  return [
    {
      title: '✈️ Flight Compensation',
      link: process.env.AIRHELP_LINK,
      description: 'Get compensation for flight delays/cancellations'
    },
    {
      title: '⚖️ Travel Rights Support',
      link: process.env.COMPENSAIR_LINK,
      description: 'Legal support for travel disputes'
    },
    {
      title: '🛡️ Travel Insurance',
      link: process.env.EKTA_INSURANCE_LINK,
      description: 'Comprehensive travel protection (ages 3-85)'
    },
    {
      title: '📞 Global SIM Cards',
      link: process.env.YESIM_LINK,
      description: 'Voice calls and data worldwide'
    }
  ];
}

module.exports = {
  generateFlightLink,
  generateHotelLink,
  generateTravelServices,
  generateProtectionServices
};