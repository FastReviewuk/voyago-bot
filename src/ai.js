const axios = require('axios');

/**
 * Generate detailed travel guide using OpenRouter AI
 * @param {string} city - Destination city
 * @param {string} travelerType - Type of traveler (Solo/Couple/Family/Friends)
 * @param {string} interests - User interests (Culture, Food, Nature, etc.)
 * @param {string} checkIn - Check-in date (YYYY-MM-DD)
 * @param {string} checkOut - Check-out date (YYYY-MM-DD)
 * @returns {Promise<string>} AI-generated detailed travel guide
 */
async function generateDetailedTravelGuide(city, travelerType, interests, checkIn, checkOut) {
  // Calculate trip duration
  const startDate = new Date(checkIn);
  const endDate = new Date(checkOut);
  const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  
  const prompt = `You are an expert travel guide for ${city}. Create a comprehensive travel guide for a ${travelerType} traveler interested in ${interests}, staying for ${duration} days (${checkIn} to ${checkOut}).

Include:
1. DESTINATION OVERVIEW: Brief introduction to ${city} (2-3 sentences)
2. KEY INFORMATION: Best time to visit, local currency, language, transportation tips
3. MUST-SEE ATTRACTIONS: Top 5 attractions with brief descriptions
4. DAY-BY-DAY ITINERARY: Detailed ${duration}-day itinerary with morning, afternoon, evening activities
5. LOCAL TIPS: 3 insider tips only locals know
6. FOOD RECOMMENDATIONS: Must-try local dishes and where to find them
7. PRACTICAL INFO: Budget estimates, what to pack, cultural etiquette

Keep it practical, engaging, and under 800 words. Use clear sections but no markdown formatting.`;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct:free',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://voyago-bot.com',
          'X-Title': 'Voyago Travel Bot'
        },
        timeout: 15000 // 15 second timeout for detailed guide
      }
    );

    if (response.data?.choices?.[0]?.message?.content) {
      return response.data.choices[0].message.content.trim();
    } else {
      throw new Error('Invalid AI response format');
    }
  } catch (error) {
    console.error('Detailed guide generation failed:', error.message);
    
    // Fallback detailed guide
    return getDetailedFallbackGuide(city, travelerType, interests, duration);
  }
}

/**
 * Detailed fallback travel guide when AI is unavailable
 * @param {string} city - Destination city
 * @param {string} travelerType - Type of traveler
 * @param {string} interests - User interests
 * @param {number} duration - Trip duration in days
 * @returns {string} Detailed fallback travel guide
 */
function getDetailedFallbackGuide(city, travelerType, interests, duration) {
  const guides = {
    'paris': `DESTINATION OVERVIEW: Paris, the City of Light, captivates visitors with its timeless elegance, world-class museums, and romantic atmosphere. From iconic landmarks to charming neighborhoods, Paris offers an unforgettable experience for every traveler.

KEY INFORMATION: Best visited April-June and September-October. Currency: Euro (EUR). Language: French (English widely spoken in tourist areas). Metro system is excellent for getting around.

MUST-SEE ATTRACTIONS: Eiffel Tower for sunset views, Louvre Museum for art masterpieces, Notre-Dame Cathedral (exterior), Montmartre district for bohemian charm, Seine River cruise for city perspectives.

DAY-BY-DAY ITINERARY:
Day 1: Morning - Eiffel Tower and Trocadéro. Afternoon - Seine river cruise. Evening - Dinner in Saint-Germain.
Day 2: Morning - Louvre Museum. Afternoon - Tuileries Garden and Place Vendôme. Evening - Montmartre and Sacré-Cœur.
${duration > 2 ? 'Day 3: Morning - Versailles day trip. Afternoon - Palace gardens. Evening - Return to Paris.' : ''}
${duration > 3 ? 'Day 4: Morning - Marais district exploration. Afternoon - Latin Quarter. Evening - Seine evening stroll.' : ''}

LOCAL TIPS: Visit bakeries early morning for fresh croissants. Many museums are free on first Sunday mornings. Parisians appreciate basic French greetings.

FOOD RECOMMENDATIONS: Try croissants at Du Pain et des Idées, classic bistro fare at L'Ami Jean, macarons at Ladurée. Don't miss French onion soup and coq au vin.

PRACTICAL INFO: Budget €80-120/day for mid-range travel. Pack comfortable walking shoes and light layers. Tipping 5-10% is appreciated but not mandatory.`,

    'rome': `DESTINATION OVERVIEW: Rome, the Eternal City, seamlessly blends ancient history with vibrant modern life. Every corner reveals millennia of civilization, from Roman ruins to Renaissance masterpieces.

KEY INFORMATION: Best visited April-June and September-November. Currency: Euro (EUR). Language: Italian (some English in tourist areas). Walking is best for city center, metro for longer distances.

MUST-SEE ATTRACTIONS: Colosseum and Roman Forum for ancient history, Vatican City with Sistine Chapel, Trevi Fountain for wishes, Pantheon for architecture, Spanish Steps for people-watching.

DAY-BY-DAY ITINERARY:
Day 1: Morning - Colosseum and Roman Forum. Afternoon - Palatine Hill. Evening - Trastevere dinner.
Day 2: Morning - Vatican Museums and Sistine Chapel. Afternoon - St. Peter's Basilica. Evening - Castel Sant'Angelo.
${duration > 2 ? 'Day 3: Morning - Pantheon and Piazza Navona. Afternoon - Trevi Fountain and Spanish Steps. Evening - Villa Borghese.' : ''}
${duration > 3 ? 'Day 4: Morning - Capitoline Museums. Afternoon - Jewish Quarter. Evening - Aperitivo in Campo de\' Fiori.' : ''}

LOCAL TIPS: Book Vatican tickets online to skip lines. Romans eat dinner after 8 PM. Many churches close for lunch 12:30-3:30 PM.

FOOD RECOMMENDATIONS: Try carbonara at Da Enzo, gelato at Giolitti, pizza al taglio at Pizzarium. Must-try: cacio e pepe, supplì, and maritozzo.

PRACTICAL INFO: Budget €70-100/day for mid-range travel. Wear modest clothing for churches. Pickpockets target tourist areas - stay alert.`,

    'london': `DESTINATION OVERVIEW: London masterfully combines royal heritage with cutting-edge culture. From historic palaces to modern skyscrapers, the city offers endless discoveries across its diverse neighborhoods.

KEY INFORMATION: Best visited May-September. Currency: British Pound (GBP). Language: English. Oyster Card essential for public transport. Weather unpredictable - always carry umbrella.

MUST-SEE ATTRACTIONS: Tower of London for Crown Jewels, British Museum for world artifacts, Westminster Abbey and Big Ben, Buckingham Palace, London Eye for city views.

DAY-BY-DAY ITINERARY:
Day 1: Morning - Tower of London. Afternoon - Tower Bridge and Borough Market. Evening - Thames river walk.
Day 2: Morning - British Museum. Afternoon - Covent Garden and West End. Evening - Theater show.
${duration > 2 ? 'Day 3: Morning - Westminster Abbey and Parliament. Afternoon - St. James\'s Park and Buckingham Palace. Evening - Pub dinner.' : ''}
${duration > 3 ? 'Day 4: Morning - Tate Modern and Millennium Bridge. Afternoon - Camden Market. Evening - Greenwich Observatory.' : ''}

LOCAL TIPS: Stand right on escalators. Pub etiquette: order at bar, no table service. Free museums but donations appreciated.

FOOD RECOMMENDATIONS: Try fish and chips at Poppies, afternoon tea at Fortnum & Mason, Sunday roast at a traditional pub. Don't miss bangers and mash, sticky toffee pudding.

PRACTICAL INFO: Budget £80-120/day for mid-range travel. Contactless payment widely accepted. Tipping 10-15% in restaurants if service charge not included.`
  };

  const cityKey = city.toLowerCase();
  if (guides[cityKey]) {
    return guides[cityKey];
  }

  // Generic detailed fallback
  return `DESTINATION OVERVIEW: ${city} offers unique experiences combining local culture, history, and modern attractions. This vibrant destination provides memorable moments for ${travelerType} travelers.

KEY INFORMATION: Research local currency, language, and transportation options before arrival. Check weather patterns for your travel dates and pack accordingly.

MUST-SEE ATTRACTIONS: Explore the historic city center, visit main cultural sites, discover local markets, enjoy scenic viewpoints, and experience authentic neighborhoods.

DAY-BY-DAY ITINERARY:
Day 1: Morning - City center orientation walk. Afternoon - Main attractions visit. Evening - Local restaurant dinner.
Day 2: Morning - Cultural sites exploration. Afternoon - Local market visit. Evening - Traditional entertainment.
${duration > 2 ? 'Day 3: Morning - Day trip to nearby attraction. Afternoon - Scenic area visit. Evening - Local nightlife experience.' : ''}

LOCAL TIPS: Learn basic local greetings. Ask locals for hidden gem recommendations. Respect local customs and dress codes.

FOOD RECOMMENDATIONS: Try signature local dishes at recommended restaurants. Visit local markets for authentic flavors. Don't miss regional specialties.

PRACTICAL INFO: Budget varies by destination. Pack comfortable walking shoes. Research tipping customs and cultural etiquette before arrival.`;
}

module.exports = {
  generateTravelTips: generateDetailedTravelGuide,
  generateDetailedTravelGuide
};