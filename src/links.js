/**
 * Generate affiliate links for travel services - Voyago Bot Partners
 */

/**
 * Generate Booking.com flight search link with pre-filled data
 * Using the correct Booking.com flights URL structure
 * @param {string} origin - Origin city
 * @param {string} destination - Destination city
 * @param {string} checkIn - Check-in date (YYYY-MM-DD)
 * @param {string} checkOut - Check-out date (YYYY-MM-DD)
 * @param {string} travelerType - Type of traveler (Solo/Couple/Family/Friends)
 * @returns {string} Booking.com flights link with parameters
 */
function generateFlightLink(origin, destination, checkIn, checkOut, travelerType) {
  // Get airport codes and country codes for cities
  const getAirportInfo = (city) => {
    const airports = {
      // European cities
      'milan': { code: 'MXP.AIRPORT', country: 'IT', name: 'Milan+Malpensa+Airport' },
      'milano': { code: 'MXP.AIRPORT', country: 'IT', name: 'Milan+Malpensa+Airport' },
      'paris': { code: 'CDG.AIRPORT', country: 'FR', name: 'Paris+Charles+de+Gaulle+Airport' },
      'london': { code: 'LHR.AIRPORT', country: 'GB', name: 'London+Heathrow+Airport' },
      'rome': { code: 'FCO.AIRPORT', country: 'IT', name: 'Rome+Fiumicino+Airport' },
      'roma': { code: 'FCO.AIRPORT', country: 'IT', name: 'Rome+Fiumicino+Airport' },
      'barcelona': { code: 'BCN.AIRPORT', country: 'ES', name: 'Barcelona+Airport' },
      'madrid': { code: 'MAD.AIRPORT', country: 'ES', name: 'Madrid+Barajas+Airport' },
      'amsterdam': { code: 'AMS.AIRPORT', country: 'NL', name: 'Amsterdam+Schiphol+Airport' },
      'berlin': { code: 'BER.AIRPORT', country: 'DE', name: 'Berlin+Brandenburg+Airport' },
      'vienna': { code: 'VIE.AIRPORT', country: 'AT', name: 'Vienna+International+Airport' },
      'prague': { code: 'PRG.AIRPORT', country: 'CZ', name: 'Prague+Airport' },
      'lisbon': { code: 'LIS.AIRPORT', country: 'PT', name: 'Lisbon+Airport' },
      'lisboa': { code: 'LIS.AIRPORT', country: 'PT', name: 'Lisbon+Airport' },
      'venice': { code: 'VCE.AIRPORT', country: 'IT', name: 'Venice+Marco+Polo+Airport' },
      'venezia': { code: 'VCE.AIRPORT', country: 'IT', name: 'Venice+Marco+Polo+Airport' },
      'cardiff': { code: 'CWL.AIRPORT', country: 'GB', name: 'Cardiff+Airport' },
      'manchester': { code: 'MAN.AIRPORT', country: 'GB', name: 'Manchester+Airport' },
      'dublin': { code: 'DUB.AIRPORT', country: 'IE', name: 'Dublin+Airport' },
      'zurich': { code: 'ZUR.AIRPORT', country: 'CH', name: 'Zurich+Airport' },
      // American cities
      'new york': { code: 'JFK.AIRPORT', country: 'US', name: 'New+York+JFK+Airport' },
      'newyork': { code: 'JFK.AIRPORT', country: 'US', name: 'New+York+JFK+Airport' },
      'nyc': { code: 'JFK.AIRPORT', country: 'US', name: 'New+York+JFK+Airport' },
      'los angeles': { code: 'LAX.AIRPORT', country: 'US', name: 'Los+Angeles+International+Airport' },
      'losangeles': { code: 'LAX.AIRPORT', country: 'US', name: 'Los+Angeles+International+Airport' },
      'la': { code: 'LAX.AIRPORT', country: 'US', name: 'Los+Angeles+International+Airport' },
      'chicago': { code: 'ORD.AIRPORT', country: 'US', name: 'Chicago+O\'Hare+International+Airport' },
      'miami': { code: 'MIA.AIRPORT', country: 'US', name: 'Miami+International+Airport' },
      'las vegas': { code: 'LAS.AIRPORT', country: 'US', name: 'Las+Vegas+McCarran+International+Airport' },
      'lasvegas': { code: 'LAS.AIRPORT', country: 'US', name: 'Las+Vegas+McCarran+International+Airport' },
      'vegas': { code: 'LAS.AIRPORT', country: 'US', name: 'Las+Vegas+McCarran+International+Airport' },
      'san francisco': { code: 'SFO.AIRPORT', country: 'US', name: 'San+Francisco+International+Airport' },
      'sanfrancisco': { code: 'SFO.AIRPORT', country: 'US', name: 'San+Francisco+International+Airport' },
      'sf': { code: 'SFO.AIRPORT', country: 'US', name: 'San+Francisco+International+Airport' }
    };
    
    const cityKey = city.toLowerCase();
    if (airports[cityKey]) {
      return airports[cityKey];
    }
    
    // Default fallback
    const cityName = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    return {
      code: cityName.substring(0, 3).toUpperCase() + '.AIRPORT',
      country: 'XX',
      name: cityName.replace(' ', '+') + '+Airport'
    };
  };
  
  // Determine number of travelers based on type
  const getTravelerCount = (type) => {
    const typeKey = type ? type.toLowerCase() : 'couple';
    switch (typeKey) {
      case 'solo':
        return { adults: '1', children: '0', infants: '0' };
      case 'couple':
        return { adults: '2', children: '0', infants: '0' };
      case 'family':
        return { adults: '2', children: '1', infants: '1' }; // Adjusted for realistic family
      case 'friends':
        return { adults: '3', children: '0', infants: '0' }; // Adjusted to 3 friends
      default:
        return { adults: '2', children: '0', infants: '0' };
    }
  };
  
  const originInfo = getAirportInfo(origin);
  const destInfo = getAirportInfo(destination);
  const travelers = getTravelerCount(travelerType);
  
  // Build the URL using Booking.com flights format
  const baseUrl = `https://flights.booking.com/flights/${originInfo.code}-${destInfo.code}/`;
  
  const params = new URLSearchParams({
    'type': 'ROUNDTRIP',
    'adults': travelers.adults,
    'cabinClass': 'ECONOMY',
    'children': travelers.children,
    'infants': travelers.infants,
    'from': originInfo.code,
    'to': destInfo.code,
    'fromCountry': originInfo.country,
    'toCountry': destInfo.country,
    'fromLocationName': originInfo.name,
    'toLocationName': destInfo.name,
    'depart': checkIn,
    'return': checkOut,
    'sort': 'BEST',
    'travelPurpose': 'leisure'
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
        return { adults: '2', children: '2', rooms: '1' }; // Keep 2 children for hotel
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
  
  // Tiqets with proper city-specific URLs
  const getTiqetsLink = (city) => {
    const cityMappings = {
      // European cities
      'venice': 'venice-attractions-c71510',
      'venezia': 'venice-attractions-c71510',
      'paris': 'paris-attractions-c75',
      'rome': 'rome-attractions-c71631',
      'roma': 'rome-attractions-c71631',
      'barcelona': 'barcelona-attractions-c76',
      'madrid': 'madrid-attractions-c77',
      'amsterdam': 'amsterdam-attractions-c78',
      'london': 'london-attractions-c79',
      'berlin': 'berlin-attractions-c80',
      'milan': 'milan-attractions-c81',
      'milano': 'milan-attractions-c81',
      'florence': 'florence-attractions-c82',
      'firenze': 'florence-attractions-c82',
      'vienna': 'vienna-attractions-c83',
      'prague': 'prague-attractions-c84',
      'lisbon': 'lisbon-attractions-c85',
      'lisboa': 'lisbon-attractions-c85',
      // American cities
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
    const cityPath = cityMappings[cityKey] || `${city.toLowerCase().replace(' ', '-')}-attractions`;
    
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