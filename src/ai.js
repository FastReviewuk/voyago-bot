const axios = require('axios');

/**
 * Generate detailed travel guide using OpenRouter AI
 * @param {string} city - Destination city
 * @param {string} travelerType - Type of traveler (Solo/Couple/Family/Friends)
 * @param {string} interests - User interests (Culture, Food, Nature, etc.)
 * @param {string} checkIn - Check-in date (YYYY-MM-DD)
 * @param {string} checkOut - Check-out date (YYYY-MM-DD)
 * @param {string} budget - Total trip budget
 * @returns {Promise<string>} AI-generated detailed travel guide
 */
async function generateDetailedTravelGuide(city, travelerType, interests, checkIn, checkOut, budget) {
  // Calculate trip duration
  const startDate = new Date(checkIn);
  const endDate = new Date(checkOut);
  const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  
  // Calculate daily budget
  const dailyBudget = budget ? ` (approximately ${budget} total, ${Math.round(parseInt(budget.replace(/[^0-9]/g, '')) / duration)} per day)` : '';
  
  const prompt = `You are an expert travel guide for ${city}. Create a comprehensive travel guide for a ${travelerType} traveler interested in ${interests}, staying for ${duration} days (${checkIn} to ${checkOut}) with a budget of ${budget}${dailyBudget}.

IMPORTANT: Tailor ALL recommendations to fit the ${budget} budget. Suggest budget-appropriate accommodations, restaurants, and activities.

Include:
1. DESTINATION OVERVIEW: Brief introduction to ${city} (2-3 sentences)
2. KEY INFORMATION: Best time to visit, local currency, language, transportation tips
3. BUDGET BREAKDOWN: Realistic daily spending for accommodation, food, transport, activities based on ${budget}
4. MUST-SEE ATTRACTIONS: Top 5 attractions with entry costs and budget tips
5. DAY-BY-DAY ITINERARY: Detailed ${duration}-day itinerary with budget-friendly options for morning, afternoon, evening
6. LOCAL TIPS: 3 insider tips for saving money and experiencing ${city} like a local
7. FOOD RECOMMENDATIONS: Must-try local dishes at budget-appropriate restaurants
8. PRACTICAL INFO: Money-saving tips, free activities, best value experiences

Keep it practical, budget-conscious, and under 800 words. Use clear sections but no markdown formatting.`;

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
    return getDetailedFallbackGuide(city, travelerType, interests, duration, budget);
  }
}

/**
 * Detailed fallback travel guide when AI is unavailable
 * @param {string} city - Destination city
 * @param {string} travelerType - Type of traveler
 * @param {string} interests - User interests
 * @param {number} duration - Trip duration in days
 * @param {string} budget - Total trip budget
 * @returns {string} Detailed fallback travel guide
 */
function getDetailedFallbackGuide(city, travelerType, interests, duration, budget) {
  // Handle undefined budget
  const budgetAmount = budget && budget !== 'undefined' ? parseInt(budget.replace(/[^0-9]/g, '')) : 1000;
  const dailyBudget = Math.round(budgetAmount / duration);
  const budgetLevel = dailyBudget < 50 ? 'budget' : dailyBudget < 100 ? 'mid-range' : 'luxury';
  
  // If budget is undefined or invalid, use mid-range as default
  const displayBudget = budget && budget !== 'undefined' ? budget : '€1000 (estimated)';
  const displayDaily = budget && budget !== 'undefined' ? `€${dailyBudget}` : '€140';
  
  const guides = {
    'paris': `DESTINATION OVERVIEW: Paris, the City of Light, captivates visitors with its timeless elegance, world-class museums, and romantic atmosphere. From iconic landmarks to charming neighborhoods, Paris offers unforgettable experiences for every budget level.

KEY INFORMATION: Best visited April-June and September-October. Currency: Euro (EUR). Language: French (English widely spoken in tourist areas). Metro day pass: €7.50. Many museums offer free entry on first Sunday mornings.

BUDGET BREAKDOWN (${displayBudget} total, ~${displayDaily}/day):
${budgetLevel === 'budget' ? 
  '• Accommodation: €25-40/night (hostels, budget hotels)\n• Food: €15-25/day (bakeries, bistros, markets)\n• Transport: €7.50/day (metro pass)\n• Activities: €5-15/day (many free attractions)' :
  budgetLevel === 'mid-range' ?
  '• Accommodation: €60-100/night (3-star hotels, boutique)\n• Food: €30-50/day (bistros, cafés, restaurants)\n• Transport: €7.50/day (metro pass)\n• Activities: €15-30/day (museums, tours)' :
  '• Accommodation: €150-300/night (luxury hotels)\n• Food: €60-100/day (fine dining, Michelin restaurants)\n• Transport: €20-40/day (taxis, private transfers)\n• Activities: €30-60/day (premium tours, experiences)'
}

MUST-SEE ATTRACTIONS: Eiffel Tower (free to view, €29 to top), Louvre Museum (€17, free 1st Sunday), Notre-Dame exterior (free), Montmartre and Sacré-Cœur (free), Seine River walk (free).

DAY-BY-DAY ITINERARY:
Day 1: Morning - ${budgetLevel === 'budget' ? 'Free Eiffel Tower viewing from Trocadéro' : 'Eiffel Tower visit with elevator'}. Afternoon - ${budgetLevel === 'budget' ? 'Free Seine riverside walk' : 'Seine river cruise'}. Evening - ${budgetLevel === 'budget' ? 'Picnic dinner from local market' : 'Dinner in Saint-Germain bistro'}.
Day 2: Morning - ${budgetLevel === 'budget' ? 'Louvre courtyard (free) or free Sunday entry' : 'Full Louvre Museum visit'}. Afternoon - Tuileries Garden (free) and window shopping. Evening - Montmartre exploration and Sacré-Cœur (free).
${duration > 2 ? `Day 3: ${budgetLevel === 'budget' ? 'Versailles gardens (free on weekends) or Paris parks' : 'Full Versailles Palace and gardens day trip'}.` : ''}

LOCAL TIPS: ${budgetLevel === 'budget' ? 'Buy bread and cheese for picnics. Many churches and parks are free. Happy hour at wine bars 5-7 PM.' : 'Book restaurant reservations in advance. Museum passes save money for multiple visits. Explore covered passages for unique shopping.'}

FOOD RECOMMENDATIONS: ${budgetLevel === 'budget' ? 'Croissants from local boulangeries (€1-2), crêpes from street vendors (€3-5), lunch menus at bistros (€12-18)' : 'Du Pain et des Idées for pastries, L\'Ami Jean for bistro classics, Ladurée for macarons'}. Must-try: French onion soup, coq au vin, crème brûlée.

PRACTICAL INFO: ${budgetLevel === 'budget' ? 'Use Citymapper app for transport. Many attractions offer student/youth discounts. Tap water is free and safe.' : 'Consider Museum Pass for multiple visits. Tipping 5-10% appreciated. Book popular restaurants in advance.'}`,

    'rome': `DESTINATION OVERVIEW: Rome, the Eternal City, offers an incredible journey through history with ancient ruins, Renaissance art, and vibrant street life. Every budget can experience the magic of this timeless destination.

KEY INFORMATION: Best visited April-June and September-November. Currency: Euro (EUR). Language: Italian (some English in tourist areas). Metro day pass: €7. Many churches and piazzas are completely free.

BUDGET BREAKDOWN (${displayBudget} total, ~${displayDaily}/day):
${budgetLevel === 'budget' ? 
  '• Accommodation: €20-35/night (hostels, guesthouses)\n• Food: €12-20/day (pizza al taglio, trattorias)\n• Transport: €7/day (metro/bus pass)\n• Activities: €8-15/day (many free sites)' :
  budgetLevel === 'mid-range' ?
  '• Accommodation: €50-90/night (3-star hotels, B&Bs)\n• Food: €25-40/day (restaurants, wine bars)\n• Transport: €7/day (metro pass)\n• Activities: €15-25/day (museums, tours)' :
  '• Accommodation: €120-250/night (luxury hotels)\n• Food: €50-80/day (fine dining, rooftop restaurants)\n• Transport: €15-30/day (taxis)\n• Activities: €25-50/day (private tours, premium experiences)'
}

MUST-SEE ATTRACTIONS: Colosseum (€16, book online), Roman Forum (included with Colosseum), Vatican Museums (€17), St. Peter's Basilica (free), Trevi Fountain (free), Pantheon (free).

DAY-BY-DAY ITINERARY:
Day 1: Morning - ${budgetLevel === 'budget' ? 'Free Colosseum exterior and Roman Forum views' : 'Full Colosseum and Roman Forum tour'}. Afternoon - Palatine Hill. Evening - ${budgetLevel === 'budget' ? 'Trastevere free walking tour' : 'Traditional Trastevere dinner'}.
Day 2: Morning - ${budgetLevel === 'budget' ? 'St. Peter\'s Basilica (free) and square' : 'Vatican Museums and Sistine Chapel'}. Afternoon - Castel Sant\'Angelo area. Evening - ${budgetLevel === 'budget' ? 'Aperitivo at local bar' : 'Rooftop dinner with city views'}.
${duration > 2 ? `Day 3: ${budgetLevel === 'budget' ? 'Free Pantheon, Piazza Navona, and Trevi Fountain walking tour' : 'Capitoline Museums and comprehensive city center exploration'}.` : ''}

LOCAL TIPS: ${budgetLevel === 'budget' ? 'Eat pizza al taglio for cheap meals. Many churches are free with incredible art. Drink from public fountains (nasoni).' : 'Book skip-the-line tickets online. Romans dine after 8 PM. Dress modestly for churches.'}

FOOD RECOMMENDATIONS: ${budgetLevel === 'budget' ? 'Pizza al taglio at Pizzarium (€3-5), supplì from street vendors (€1.50), lunch menus at local trattorias (€10-15)' : 'Carbonara at Da Enzo, gelato at Giolitti, aperitivo in Campo de\' Fiori'}. Must-try: cacio e pepe, maritozzo, Roman-style artichokes.

PRACTICAL INFO: ${budgetLevel === 'budget' ? 'Roma Pass not worth it for budget travelers. Many sites offer EU student discounts. Avoid restaurants near major tourist sites.' : 'Consider Roma Pass for multiple attractions. Tipping not mandatory but 10% appreciated. Book popular restaurants in advance.'}`,

    'london': `DESTINATION OVERVIEW: London seamlessly blends royal heritage with modern innovation, offering world-class museums, historic landmarks, and diverse neighborhoods. The city caters to every budget with many free attractions and experiences.

KEY INFORMATION: Best visited May-September. Currency: British Pound (GBP). Language: English. Oyster Card daily cap: £7.70. Many world-class museums are completely free with suggested donations.

BUDGET BREAKDOWN (${displayBudget} total, ~£${Math.round(dailyBudget * 0.85)}/day):
${budgetLevel === 'budget' ? 
  '• Accommodation: £25-45/night (hostels, budget hotels)\n• Food: £15-25/day (pub meals, markets, chains)\n• Transport: £7.70/day (Oyster Card daily cap)\n• Activities: £5-15/day (many free museums and parks)' :
  budgetLevel === 'mid-range' ?
  '• Accommodation: £70-120/night (3-star hotels, boutique)\n• Food: £30-50/day (restaurants, gastropubs)\n• Transport: £7.70/day (Oyster Card)\n• Activities: £15-30/day (paid attractions, theater)' :
  '• Accommodation: £150-300/night (luxury hotels)\n• Food: £60-100/day (fine dining, afternoon tea)\n• Transport: £20-40/day (taxis, private transfers)\n• Activities: £40-80/day (premium tours, West End shows)'
}

MUST-SEE ATTRACTIONS: British Museum (free), Tate Modern (free), Tower of London (£29.90), Westminster Abbey (£25), London Eye (£27), Hyde Park and Speakers' Corner (free).

DAY-BY-DAY ITINERARY:
Day 1: Morning - ${budgetLevel === 'budget' ? 'Free British Museum highlights tour' : 'Full British Museum with audio guide'}. Afternoon - Covent Garden (free street performances). Evening - ${budgetLevel === 'budget' ? 'Traditional pub dinner' : 'West End theater show'}.
Day 2: Morning - ${budgetLevel === 'budget' ? 'Free Tate Modern and Millennium Bridge walk' : 'Tower of London and Crown Jewels'}. Afternoon - Borough Market food sampling. Evening - ${budgetLevel === 'budget' ? 'Thames riverside walk' : 'Thames dinner cruise'}.
${duration > 2 ? `Day 3: ${budgetLevel === 'budget' ? 'Free Hyde Park, Speakers\' Corner, and Buckingham Palace exterior' : 'Westminster Abbey, Parliament tour, and London Eye'}.` : ''}

LOCAL TIPS: ${budgetLevel === 'budget' ? 'Many museums are free but donations appreciated. Pub lunches offer great value. Use Boris Bikes for short trips (£2/day).' : 'Book theater tickets in advance or try day-of lottery. Afternoon tea at department stores is more affordable. Stand right on escalators.'}

FOOD RECOMMENDATIONS: ${budgetLevel === 'budget' ? 'Fish and chips at local pubs (£8-12), full English breakfast at cafés (£6-10), Sunday roast at Wetherspoons (£7-9)' : 'Fish and chips at Poppies, afternoon tea at Fortnum & Mason, Sunday roast at traditional gastropub'}. Must-try: bangers and mash, sticky toffee pudding, proper English breakfast.

PRACTICAL INFO: ${budgetLevel === 'budget' ? 'Contactless payment widely accepted. Tipping not mandatory but 10% appreciated for good service. Many pubs don\'t accept reservations.' : 'Museum shops often have unique souvenirs. Book popular restaurants well in advance. Consider theater and dining packages for better value.'}`
  };

  const cityKey = city.toLowerCase();
  if (guides[cityKey]) {
    return guides[cityKey];
  }

  // Generic budget-aware fallback
  return `DESTINATION OVERVIEW: ${city} offers diverse experiences for travelers with a ${displayBudget} budget. This destination provides excellent value with a mix of free and paid attractions suitable for ${travelerType} travelers.

BUDGET BREAKDOWN (${displayBudget} total, ~${displayDaily} per day):
• Accommodation: ${budgetLevel === 'budget' ? 'Budget hotels, hostels, guesthouses' : budgetLevel === 'mid-range' ? 'Mid-range hotels, boutique properties' : 'Luxury hotels, premium locations'}
• Food: ${budgetLevel === 'budget' ? 'Local eateries, street food, markets' : budgetLevel === 'mid-range' ? 'Restaurants, cafés, local specialties' : 'Fine dining, premium experiences'}
• Activities: ${budgetLevel === 'budget' ? 'Free attractions, walking tours, public spaces' : budgetLevel === 'mid-range' ? 'Mix of free and paid attractions' : 'Premium tours, exclusive experiences'}

MUST-SEE ATTRACTIONS: Research free attractions like public parks, historic districts, markets, and viewpoints. Many cities offer free museum days or reduced-price hours.

LOCAL TIPS: ${budgetLevel === 'budget' ? 'Look for free walking tours, happy hour specials, and local markets for affordable meals.' : 'Book attractions in advance for better prices. Consider city passes if visiting multiple paid sites.'} Ask locals for budget-friendly recommendations.

PRACTICAL INFO: ${budgetLevel === 'budget' ? 'Use public transportation, eat where locals eat, and take advantage of free activities.' : 'Balance splurge experiences with budget-friendly options to maximize your travel experience.'}`;
}

module.exports = {
  generateTravelTips: generateDetailedTravelGuide,
  generateDetailedTravelGuide
};