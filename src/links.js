/**
 * Generate affiliate links for travel services - Voyago Bot Partners
 */

/**
 * Generate Booking.com flight search link with pre-filled data
 * Using a simplified URL structure that works reliably with Booking.com
 * @param {string} origin - Origin city
 * @param {string} destination - Destination city
 * @param {string} checkIn - Check-in date (YYYY-MM-DD)
 * @param {string} checkOut - Check-out date (YYYY-MM-DD)
 * @param {string} travelerType - Type of traveler (Solo/Couple/Family/Friends)
 * @returns {string} Booking.com flights link with parameters
 */
function generateFlightLink(origin, destination, checkIn, checkOut, travelerType) {
  // Get airport codes for cities
  const getAirportCode = (city) => {
    const airports = {
      // European cities
      'milan': 'MXP', 'milano': 'MXP',
      'paris': 'CDG',
      'london': 'LHR',
      'rome': 'FCO', 'roma': 'FCO',
      'barcelona': 'BCN',
      'madrid': 'MAD',
      'amsterdam': 'AMS',
      'berlin': 'BER',
      'vienna': 'VIE',
      'prague': 'PRG',
      'lisbon': 'LIS', 'lisboa': 'LIS',
      'venice': 'VCE', 'venezia': 'VCE',
      'cardiff': 'CWL',
      'manchester': 'MAN',
      'dublin': 'DUB',
      'zurich': 'ZUR',
      // American cities
      'new york': 'JFK', 'newyork': 'JFK', 'nyc': 'JFK',
      'los angeles': 'LAX', 'losangeles': 'LAX', 'la': 'LAX',
      'chicago': 'ORD',
      'miami': 'MIA',
      'las vegas': 'LAS', 'lasvegas': 'LAS', 'vegas': 'LAS',
      'san francisco': 'SFO', 'sanfrancisco': 'SFO', 'sf': 'SFO'
    };
    
    const cityKey = city.toLowerCase();
    return airports[cityKey] || city.substring(0, 3).toUpperCase();
  };
  
  // Determine number of travelers based on type
  const getTravelerCount = (type) => {
    const typeKey = type ? type.toLowerCase() : 'couple';
    switch (typeKey) {
      case 'solo':
        return { adults: 1, children: 0 };
      case 'couple':
        return { adults: 2, children: 0 };
      case 'family':
        return { adults: 2, children: 2 };
      case 'friends':
        return { adults: 3, children: 0 };
      default:
        return { adults: 2, children: 0 };
    }
  };
  
  const originCode = getAirportCode(origin);
  const destCode = getAirportCode(destination);
  const travelers = getTravelerCount(travelerType);
  
  // Use Booking.com's simplified flight search URL
  const baseUrl = 'https://www.booking.com/flights/';
  
  const params = new URLSearchParams({
    'aid': '304142', // Booking.com affiliate ID placeholder
    'from_sf': originCode,
    'to_sf': destCode,
    'depart': checkIn,
    'return': checkOut,
    'adults': travelers.adults.toString(),
    'children': travelers.children.toString(),
    'cabinclass': 'economy',
    'type': 'roundtrip'
  });
  
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Generate Booking.com hotel search link with pre-filled data
 * @param {string} city - Destination city
 * @param {string} checkIn - Check-in date (YYYY-MM-DD)
 * @param {string} checkOut - Check-out date (YYYY-MM-DD)
 * @param {string} travelerType - Type of traveler (Solo/Couple/Family/Friends)
 * @returns {string} Booking.com hotels link with parameters
 */
function generateHotelLink(city, checkIn, checkOut, travelerType) {
  // Determine number of travelers and rooms based on type
  const getHotelBooking = (type) => {
    const typeKey = type ? type.toLowerCase() : 'couple';
    switch (typeKey) {
      case 'solo':
        return { adults: '1', children: '0', rooms: '1' };
      case 'couple':
        return { adults: '2', children: '0', rooms: '1' };
      case 'family':
        return { adults: '2', children: '2', rooms: '1' };
      case 'friends':
        return { adults: '3', children: '0', rooms: '2' }; // 3 friends, 2 rooms
      default:
        return { adults: '2', children: '0', rooms: '1' };
    }
  };
  
  const booking = getHotelBooking(travelerType);
  const baseUrl = 'https://www.booking.com/searchresults.html';
  
  const params = new URLSearchParams({
    'ss': city,
    'checkin': checkIn,
    'checkout': checkOut,
    'group_adults': booking.adults,
    'no_rooms': booking.rooms,
    'group_children': booking.children,
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
  
  // Tiqets with proper city-specific URLs using c71506 format for European cities
  const getTiqetsLink = (city) => {
    const cityMappings = {
      // European cities - using c71506 as default code
      'venice': 'venice-attractions-c71510', // Keep specific code for Venice
      'venezia': 'venice-attractions-c71510',
      'rome': 'rome-attractions-c71631', // Keep specific code for Rome
      'roma': 'rome-attractions-c71631',
      'paris': 'paris-attractions-c71506',
      'barcelona': 'barcelona-attractions-c71506',
      'madrid': 'madrid-attractions-c71506',
      'amsterdam': 'amsterdam-attractions-c71506',
      'london': 'london-attractions-c71506',
      'berlin': 'berlin-attractions-c71506',
      'milan': 'milan-attractions-c71506',
      'milano': 'milan-attractions-c71506',
      'florence': 'florence-attractions-c71506',
      'firenze': 'florence-attractions-c71506',
      'vienna': 'vienna-attractions-c71506',
      'prague': 'prague-attractions-c71506',
      'lisbon': 'lisbon-attractions-c71506',
      'lisboa': 'lisbon-attractions-c71506',
      'brussels': 'brussels-attractions-c71506',
      'bruxelles': 'brussels-attractions-c71506',
      'zurich': 'zurich-attractions-c71506',
      'geneva': 'geneva-attractions-c71506',
      'dublin': 'dublin-attractions-c71506',
      'edinburgh': 'edinburgh-attractions-c71506',
      'munich': 'munich-attractions-c71506',
      'munchen': 'munich-attractions-c71506',
      'copenhagen': 'copenhagen-attractions-c71506',
      'stockholm': 'stockholm-attractions-c71506',
      'oslo': 'oslo-attractions-c71506',
      'helsinki': 'helsinki-attractions-c71506',
      'athens': 'athens-attractions-c71506',
      'budapest': 'budapest-attractions-c71506',
      'krakow': 'krakow-attractions-c71506',
      'warsaw': 'warsaw-attractions-c71506',
      // American cities - keep specific codes
      'new york': 'new-york-attractions-c260932',
      'newyork': 'new-york-attractions-c260932',
      'nyc': 'new-york-attractions-c260932',
      'los angeles': 'los-angeles-attractions-c260933',
      'losangeles': 'los-angeles-attractions-c260933',
      'la': 'los-angeles-attractions-c260933',
      'chicago': 'chicago-attractions-c260934',
      'miami': 'miami-attractions-c260935',
      'las vegas': 'las-vegas-attractions-c260936',
      'lasvegas': 'las-vegas-attractions-c260936',
      'vegas': 'las-vegas-attractions-c260936',
      'san francisco': 'san-francisco-attractions-c260937',
      'sanfrancisco': 'san-francisco-attractions-c260937',
      'sf': 'san-francisco-attractions-c260937'
    };
    
    const cityKey = city.toLowerCase();
    const cityPath = cityMappings[cityKey] || `${city.toLowerCase().replace(' ', '-')}-attractions-c71506`;
    
    return `https://www.tiqets.com/en/${cityPath}/?partner=travelpayouts.com&tq_campaign=voyago-bot&tq_click_id=voyago-${Date.now()}`;
  };
  
  services.push({
    title: `🏛️ ${city} Attractions`,
    link: getTiqetsLink(city),
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