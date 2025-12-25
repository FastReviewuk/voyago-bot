/**
 * Generate affiliate links for travel services - Voyago Bot Partners
 */

/**
 * Generate Booking.com flight search link with pre-filled data
 * Using the correct Booking.com flights URL format
 * @param {string} origin - Origin city
 * @param {string} destination - Destination city
 * @param {string} checkIn - Check-in date (YYYY-MM-DD)
 * @param {string} checkOut - Check-out date (YYYY-MM-DD)
 * @param {string} travelerType - Type of traveler (Solo/Couple/Family/Friends)
 * @returns {string} Booking.com flights link with parameters
 */
function generateFlightLink(origin, destination, checkIn, checkOut, travelerType) {
  // Get city codes and country codes for cities
  const getCityInfo = (city) => {
    const cities = {
      // European cities
      'milan': { code: 'MIL.CITY', country: 'IT', name: 'Milan' },
      'milano': { code: 'MIL.CITY', country: 'IT', name: 'Milan' },
      'paris': { code: 'PAR.CITY', country: 'FR', name: 'Paris' },
      'london': { code: 'LON.CITY', country: 'GB', name: 'London' },
      'rome': { code: 'ROM.CITY', country: 'IT', name: 'Rome' },
      'roma': { code: 'ROM.CITY', country: 'IT', name: 'Rome' },
      'barcelona': { code: 'BCN.CITY', country: 'ES', name: 'Barcelona' },
      'madrid': { code: 'MAD.CITY', country: 'ES', name: 'Madrid' },
      'amsterdam': { code: 'AMS.CITY', country: 'NL', name: 'Amsterdam' },
      'berlin': { code: 'BER.CITY', country: 'DE', name: 'Berlin' },
      'vienna': { code: 'VIE.CITY', country: 'AT', name: 'Vienna' },
      'prague': { code: 'PRG.CITY', country: 'CZ', name: 'Prague' },
      'lisbon': { code: 'LIS.CITY', country: 'PT', name: 'Lisbon' },
      'lisboa': { code: 'LIS.CITY', country: 'PT', name: 'Lisbon' },
      'venice': { code: 'VCE.CITY', country: 'IT', name: 'Venice' },
      'venezia': { code: 'VCE.CITY', country: 'IT', name: 'Venice' },
      'florence': { code: 'FLR.CITY', country: 'IT', name: 'Florence' },
      'firenze': { code: 'FLR.CITY', country: 'IT', name: 'Florence' },
      'naples': { code: 'NAP.CITY', country: 'IT', name: 'Naples' },
      'napoli': { code: 'NAP.CITY', country: 'IT', name: 'Naples' },
      'dublin': { code: 'DUB.CITY', country: 'IE', name: 'Dublin' },
      'zurich': { code: 'ZUR.CITY', country: 'CH', name: 'Zurich' },
      'brussels': { code: 'BRU.CITY', country: 'BE', name: 'Brussels' },
      'bruxelles': { code: 'BRU.CITY', country: 'BE', name: 'Brussels' },
      'copenhagen': { code: 'CPH.CITY', country: 'DK', name: 'Copenhagen' },
      'stockholm': { code: 'STO.CITY', country: 'SE', name: 'Stockholm' },
      'oslo': { code: 'OSL.CITY', country: 'NO', name: 'Oslo' },
      'helsinki': { code: 'HEL.CITY', country: 'FI', name: 'Helsinki' },
      'warsaw': { code: 'WAW.CITY', country: 'PL', name: 'Warsaw' },
      'krakow': { code: 'KRK.CITY', country: 'PL', name: 'Krakow' },
      'budapest': { code: 'BUD.CITY', country: 'HU', name: 'Budapest' },
      'athens': { code: 'ATH.CITY', country: 'GR', name: 'Athens' },
      'istanbul': { code: 'IST.CITY', country: 'TR', name: 'Istanbul' },
      
      // American cities
      'new york': { code: 'NYC.CITY', country: 'US', name: 'New York' },
      'newyork': { code: 'NYC.CITY', country: 'US', name: 'New York' },
      'nyc': { code: 'NYC.CITY', country: 'US', name: 'New York' },
      'los angeles': { code: 'LAX.CITY', country: 'US', name: 'Los Angeles' },
      'losangeles': { code: 'LAX.CITY', country: 'US', name: 'Los Angeles' },
      'la': { code: 'LAX.CITY', country: 'US', name: 'Los Angeles' },
      'chicago': { code: 'CHI.CITY', country: 'US', name: 'Chicago' },
      'miami': { code: 'MIA.CITY', country: 'US', name: 'Miami' },
      'las vegas': { code: 'LAS.CITY', country: 'US', name: 'Las Vegas' },
      'lasvegas': { code: 'LAS.CITY', country: 'US', name: 'Las Vegas' },
      'vegas': { code: 'LAS.CITY', country: 'US', name: 'Las Vegas' },
      'san francisco': { code: 'SFO.CITY', country: 'US', name: 'San Francisco' },
      'sanfrancisco': { code: 'SFO.CITY', country: 'US', name: 'San Francisco' },
      'sf': { code: 'SFO.CITY', country: 'US', name: 'San Francisco' },
      'boston': { code: 'BOS.CITY', country: 'US', name: 'Boston' },
      'washington': { code: 'WAS.CITY', country: 'US', name: 'Washington' },
      'seattle': { code: 'SEA.CITY', country: 'US', name: 'Seattle' },
      
      // Asian cities
      'tokyo': { code: 'TYO.CITY', country: 'JP', name: 'Tokyo' },
      'osaka': { code: 'OSA.CITY', country: 'JP', name: 'Osaka' },
      'kyoto': { code: 'KIX.CITY', country: 'JP', name: 'Kyoto' },
      'singapore': { code: 'SIN.CITY', country: 'SG', name: 'Singapore' },
      'bangkok': { code: 'BKK.CITY', country: 'TH', name: 'Bangkok' },
      'hong kong': { code: 'HKG.CITY', country: 'HK', name: 'Hong Kong' },
      'hongkong': { code: 'HKG.CITY', country: 'HK', name: 'Hong Kong' },
      'seoul': { code: 'SEL.CITY', country: 'KR', name: 'Seoul' },
      'mumbai': { code: 'BOM.CITY', country: 'IN', name: 'Mumbai' },
      'delhi': { code: 'DEL.CITY', country: 'IN', name: 'Delhi' },
      'new delhi': { code: 'DEL.CITY', country: 'IN', name: 'New Delhi' }
    };
    
    const cityKey = city.toLowerCase();
    if (cities[cityKey]) {
      return cities[cityKey];
    }
    
    // Default fallback
    const cityName = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    return {
      code: cityName.substring(0, 3).toUpperCase() + '.CITY',
      country: 'XX',
      name: cityName
    };
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
  
  const originInfo = getCityInfo(origin);
  const destInfo = getCityInfo(destination);
  const travelers = getTravelerCount(travelerType);
  
  // Build the URL using the correct Booking.com flights format
  const baseUrl = `https://flights.booking.com/flights/${originInfo.code}-${destInfo.code}/`;
  
  const params = new URLSearchParams({
    'type': 'ROUNDTRIP',
    'adults': travelers.adults.toString(),
    'cabinClass': 'ECONOMY',
    'children': travelers.children > 0 ? travelers.children.toString() : '',
    'from': originInfo.code,
    'to': destInfo.code,
    'fromCountry': originInfo.country,
    'toCountry': destInfo.country,
    'fromLocationName': originInfo.name,
    'toLocationName': destInfo.name,
    'depart': checkIn,
    'return': checkOut,
    'sort': 'BEST',
    'travelPurpose': 'leisure',
    'ca_source': 'flights_index_sb',
    'aid': '304142',
    'label': 'gen173nr-10EgdmbGlnaHRzKIICOOgHSDNYBGhQiAEBmAEzuAEHyAEN2AED6AEB-AEBiAIBqAIBuAKb2bbKBsACAdICJGE1NDQwYTRhLWZhOGQtNGI5YS05MTA3LWEwNWQwZGJmZWJmONgCAeACAQ'
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