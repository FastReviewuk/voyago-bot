const axios = require('axios');
const { getWorldHeritageCityGuide } = require('./world-heritage-cities');

/**
 * Get specific guidance based on user interests
 * @param {string} interests - User interests (Culture, Food, Nature, Beach, Nightlife)
 * @returns {string} Specific guidance for the AI
 */
function getInterestGuidance(interests) {
  const interestsList = interests.toLowerCase();
  let guidance = [];
  
  if (interestsList.includes('culture')) {
    guidance.push('- CULTURE: Focus on museums, historical sites, art galleries, architectural landmarks, cultural districts, traditional performances, religious sites, and local heritage experiences');
  }
  
  if (interestsList.includes('food')) {
    guidance.push('- FOOD: Emphasize local cuisine, food markets, cooking classes, food tours, traditional restaurants, street food, local specialties, wine/beer tastings, and culinary experiences');
  }
  
  if (interestsList.includes('nature')) {
    guidance.push('- NATURE: Prioritize parks, gardens, hiking trails, natural landmarks, outdoor activities, scenic viewpoints, wildlife experiences, and eco-tourism');
  }
  
  if (interestsList.includes('beach')) {
    guidance.push('- BEACH: Focus on coastal areas, beach activities, water sports, seaside restaurants, beach clubs, coastal walks, and marine experiences');
  }
  
  if (interestsList.includes('nightlife')) {
    guidance.push('- NIGHTLIFE: Emphasize bars, clubs, live music venues, entertainment districts, evening activities, rooftop bars, local nightlife culture, and after-dark experiences');
  }
  
  return guidance.length > 0 ? guidance.join('\n') : '- Provide a balanced mix of attractions and experiences';
}

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
  
  // Calculate budget and currency
  const budgetAmount = budget && budget !== 'undefined' ? parseInt(budget.replace(/[^0-9]/g, '')) : 1000;
  const dailyBudget = Math.round(budgetAmount / duration);
  const currency = budget && budget.includes('£') ? 'GBP' : budget && budget.includes('$') ? 'USD' : 'EUR';
  const currencySymbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '€';
  
  const prompt = `You are a smart, concise travel assistant. Create a compact but essential tourist guide for ${city}, tailored to a trip of ${duration} days and a total budget of ${budgetAmount} ${currency} (including accommodation, food, transport, and attractions).

CRITICAL REQUIREMENTS:
- You MUST tailor ALL recommendations to the traveler's interests: ${interests}
- You MUST include specific attraction names, restaurant names, and neighborhood names for ${city}
- You MUST include realistic price estimates for ${city}
- You MUST provide a detailed day-by-day itinerary with specific activities focused on ${interests}
- You MUST mention local food specialties specific to ${city}
- DO NOT give generic advice - everything must be specific to ${city} AND aligned with ${interests}

INTEREST-FOCUSED CUSTOMIZATION:
${getInterestGuidance(interests)}

Your output must include:

OVERVIEW: A brief overview of ${city} (2–3 sentences highlighting vibe, culture, and must-know tips specific to this city, emphasizing aspects relevant to ${interests}).

DAY-BY-DAY ITINERARY: For each of the ${duration} days, provide:
Morning: Specific attraction/activity with name, estimated cost, and time needed (prioritize ${interests})
Afternoon: Specific attraction/activity with name, estimated cost, and time needed (prioritize ${interests})
Evening: Specific restaurant/area recommendation with name and price range (consider ${interests})
Include practical notes (opening hours, booking requirements, transport between locations)

BUDGET BREAKDOWN: Realistic daily costs for ${city}:
- Accommodation: Specific price ranges for ${city}
- Meals: Actual meal costs in ${city} with restaurant examples
- Local transport: Exact transport costs and pass options for ${city}
- Attractions: Real entrance fees for major ${city} attractions

MONEY-SAVING TIPS: At least 3 specific tips for saving money in ${city} (free attractions, cheap eats, transport hacks, etc.)

LOCAL FOOD: List 5 must-try dishes/drinks specific to ${city} with where to find them and approximate costs

LOCAL SECRET: One off-the-beaten-path recommendation specific to ${city} that fits the budget

Keep language clear and actionable. Prioritize realism and specific information over generic advice. This is for a ${travelerType} traveler interested in ${interests}.

REMEMBER: Every recommendation must be specific to ${city} - no generic "research attractions" or "ask locals" advice!`;


  try {
    // Try primary AI model first
    let response = await tryAIModel('mistralai/mistral-7b-instruct:free', prompt);
    
    // If primary fails, try alternative models
    if (!response) {
      console.log('Primary AI model failed, trying alternatives...');
      response = await tryAIModel('meta-llama/llama-3.2-3b-instruct:free', prompt) ||
                 await tryAIModel('microsoft/phi-3-mini-128k-instruct:free', prompt) ||
                 await tryAIModel('google/gemma-2-9b-it:free', prompt);
    }
    
    if (response) {
      const aiResponse = response.trim();
      
      // Enhanced validation for specific content
      const hasSpecificContent = aiResponse.includes(city) && 
                                 aiResponse.length > 400 && 
                                 (aiResponse.includes('Day 1') || aiResponse.includes('Morning') || aiResponse.includes('day-by-day')) &&
                                 !aiResponse.includes('Research') && 
                                 !aiResponse.includes('ask locals') &&
                                 (aiResponse.match(/€\d+|£\d+|\$\d+|¥\d+|฿\d+/g) || []).length >= 3; // At least 3 price mentions
      
      if (hasSpecificContent) {
        console.log('AI generated specific guide for', city);
        return aiResponse;
      } else {
        console.log('AI response not specific enough for', city, '- using enhanced fallback');
        throw new Error('AI response not specific enough');
      }
    } else {
      throw new Error('All AI models failed');
    }
  } catch (error) {
    console.error('AI guide generation failed:', error.message);
    
    // Use enhanced fallback with specific city information
    return getDetailedFallbackGuide(city, travelerType, interests, duration, budget);
  }
}

/**
 * Try a specific AI model for travel guide generation
 * @param {string} model - AI model to try
 * @param {string} prompt - The prompt to send
 * @returns {Promise<string|null>} AI response or null if failed
 */
async function tryAIModel(model, prompt) {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: model,
        messages: [
          {
            role: 'system',
            content: 'You are a smart, concise travel assistant who provides practical, actionable travel advice. Focus on essential information, realistic budgets, and specific recommendations. Avoid generic responses and prioritize local insights.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1200, // Adjusted for more concise responses
        temperature: 0.4, // Slightly higher for more natural language
        top_p: 0.9
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://voyago-bot.com',
          'X-Title': 'Voyago Travel Bot'
        },
        timeout: 15000
      }
    );

    if (response.data?.choices?.[0]?.message?.content) {
      return response.data.choices[0].message.content;
    }
    return null;
  } catch (error) {
    console.error(`AI model ${model} failed:`, error.message);
    return null;
  }
}

/**
 * Enhanced fallback travel guide with specific city information
 * @param {string} city - Destination city
 * @param {string} travelerType - Type of traveler
 * @param {string} interests - User interests
 * @param {number} duration - Trip duration in days
 * @param {string} budget - Total trip budget
 * @returns {string} Detailed city-specific travel guide
 */
function getDetailedFallbackGuide(city, travelerType, interests, duration, budget) {
  // Handle budget calculations
  const budgetAmount = budget && budget !== 'undefined' ? parseInt(budget.replace(/[^0-9]/g, '')) : 1000;
  const dailyBudget = Math.round(budgetAmount / duration);
  const budgetLevel = dailyBudget < 50 ? 'budget' : dailyBudget < 100 ? 'mid-range' : 'luxury';
  
  const displayBudget = budget && budget !== 'undefined' ? budget : '€1000 (estimated)';
  const displayDaily = budget && budget !== 'undefined' ? `€${dailyBudget}` : '€140';
  
  // First, try World Heritage Cities system
  const worldHeritageGuide = getWorldHeritageCityGuide(
    city, travelerType, interests, duration, budget, 
    displayBudget, displayDaily, budgetLevel
  );
  
  if (worldHeritageGuide) {
    console.log(`Using World Heritage guide for ${city} tailored to ${interests}`);
    return worldHeritageGuide;
  }
  
  // Fallback to existing specific guides
  const guides = {
    'singapore': `OVERVIEW: Singapore is a vibrant city-state blending futuristic architecture with rich cultural heritage, world-class street food, and tropical gardens. This ultra-modern metropolis offers efficient transport, diverse neighborhoods, and experiences from luxury shopping to authentic hawker centers.

DAY-BY-DAY ITINERARY:
Day 1: Morning - Gardens by the Bay (€20, 2-3 hours) including Supertree Grove and Cloud Forest. Afternoon - Marina Bay Sands SkyPark (€20) and Merlion Park (free). Evening - Dinner at Lau Pa Sat hawker center (€8-15 per meal).
Day 2: Morning - Singapore Botanic Gardens (free, 2 hours) and National Orchid Garden (€4). Afternoon - Chinatown Heritage Centre (€10) and Buddha Tooth Relic Temple (free). Evening - Chinatown street food tour (€15-25).
Day 3: Morning - Sentosa Island via cable car (€25 return) - Universal Studios (€60) or beaches (free). Afternoon - S.E.A. Aquarium (€30) or Siloso Beach. Evening - Clarke Quay riverside dining (€20-40).
${duration > 3 ? `Day 4: Morning - Little India district walking tour (free) and Sri Veeramakaliamman Temple. Afternoon - Kampong Glam and Sultan Mosque (free), Arab Street shopping. Evening - Haji Lane bars and cafes (€15-30).` : ''}
${duration > 4 ? `Day 5: Morning - Singapore Zoo (€25) or River Safari (€30). Afternoon - Orchard Road shopping district. Evening - Night Safari (€35) - world's first nocturnal zoo.` : ''}

BUDGET BREAKDOWN (${displayBudget} total, ~${displayDaily}/day):
${budgetLevel === 'budget' ? 
  '• Accommodation: €25-45/night (hostels in Chinatown, Little India)\n• Food: €15-25/day (hawker centers, food courts)\n• Transport: €8/day (MRT day pass)\n• Activities: €15-30/day (mix of free and paid attractions)' :
  budgetLevel === 'mid-range' ?
  '• Accommodation: €60-120/night (boutique hotels, central areas)\n• Food: €30-50/day (restaurants, cafes, some hawker food)\n• Transport: €8/day (MRT pass)\n• Activities: €30-50/day (major attractions, tours)' :
  '• Accommodation: €150-400/night (luxury hotels, Marina Bay area)\n• Food: €60-120/day (fine dining, rooftop restaurants)\n• Transport: €20-40/day (taxis, private transfers)\n• Activities: €50-100/day (premium experiences, private tours)'
}

MONEY-SAVING TIPS: Use MRT (subway) instead of taxis - efficient and cheap. Eat at hawker centers for authentic food at local prices. Many attractions offer combo tickets. Visit during Great Singapore Sale (June-July) for shopping discounts.

LOCAL FOOD: Hainanese Chicken Rice (€3-5 at hawker centers), Laksa (€4-6), Char Kway Teow (€3-5), Singapore Sling at Raffles Hotel (€25) or local bars (€8-12), Kaya Toast breakfast (€2-4). Best hawker centers: Maxwell Food Centre, Newton Food Centre, Lau Pa Sat.

LOCAL SECRET: Visit Tiong Bahru neighborhood for hipster cafes, indie bookstores, and art deco architecture - a local favorite away from tourist crowds. Free heritage trail available.

PRACTICAL INFO: No tipping required. Tap water is safe. Download GrabTaxi app. Dress modestly for temples. Chewing gum is banned. Most signs in English. Very safe city with low crime rates.`,

    'tokyo': `OVERVIEW: Tokyo seamlessly blends ancient traditions with cutting-edge technology, offering everything from serene temples to neon-lit districts. This megacity provides incredible food culture, efficient transport, and unique experiences from traditional ryokans to robot restaurants.

DAY-BY-DAY ITINERARY:
Day 1: Morning - Senso-ji Temple in Asakusa (free) and Nakamise shopping street. Afternoon - Tokyo Skytree (€15-25) or free observation deck at Tokyo Metropolitan Building. Evening - Shibuya Crossing and dinner in Shibuya (€15-30).
Day 2: Morning - Tsukiji Outer Market food tour (€20-30) and sushi breakfast. Afternoon - Imperial Palace East Gardens (free) and Ginza district. Evening - Traditional izakaya in Shinjuku Golden Gai (€25-40).
Day 3: Morning - Meiji Shrine (free) and Harajuku district. Afternoon - Takeshita Street shopping and Omotesando Hills. Evening - Roppongi nightlife district (€20-50).
${duration > 3 ? `Day 4: Morning - Day trip to Nikko (€25 train) - Toshogu Shrine and nature. Afternoon - Lake Chuzenji area. Evening - Return to Tokyo, ramen dinner (€8-12).` : ''}
${duration > 4 ? `Day 5: Morning - Ueno Park and museums (€5-10 each). Afternoon - Akihabara electronics district. Evening - Karaoke in Shibuya (€15-25 per hour).` : ''}

BUDGET BREAKDOWN (${displayBudget} total, ~¥${Math.round(dailyBudget * 110)}/day):
${budgetLevel === 'budget' ? 
  '• Accommodation: ¥3000-6000/night (capsule hotels, hostels)\n• Food: ¥2000-3500/day (convenience stores, ramen, bento)\n• Transport: ¥800/day (day pass)\n• Activities: ¥1000-2000/day (temples free, some museums)' :
  budgetLevel === 'mid-range' ?
  '• Accommodation: ¥8000-15000/night (business hotels, ryokans)\n• Food: ¥4000-7000/day (restaurants, sushi, izakaya)\n• Transport: ¥800/day (JR pass)\n• Activities: ¥2000-4000/day (attractions, experiences)' :
  '• Accommodation: ¥20000-50000/night (luxury hotels, high-end ryokans)\n• Food: ¥8000-15000/day (fine dining, kaiseki, premium sushi)\n• Transport: ¥2000-4000/day (taxis, private transfers)\n• Activities: ¥5000-10000/day (premium experiences, private guides)'
}

MONEY-SAVING TIPS: Buy JR Pass for unlimited train travel. Eat at convenience stores (surprisingly good food). Many temples and parks are free. Happy hour at department store restaurant floors (11th-14th floors typically).

LOCAL FOOD: Ramen (¥800-1200), Sushi at Tsukiji (¥2000-5000), Tempura (¥1500-3000), Wagyu beef (¥5000+), Matcha and wagashi sweets (¥500-800). Try: Ichiran Ramen, Sushi Dai, Tempura Daikokuya.

LOCAL SECRET: Visit Omoide Yokocho (Memory Lane) in Shinjuku for tiny yakitori stalls and authentic atmosphere. Open late, very local experience.

PRACTICAL INFO: Download Google Translate with camera feature. Bow slightly when greeting. Remove shoes in temples/homes. Cash-based society - withdraw from 7-Eleven ATMs. Extremely safe city.`,

    'bangkok': `OVERVIEW: Bangkok pulses with energy, offering ornate temples, bustling markets, incredible street food, and vibrant nightlife. This chaotic yet charming capital provides authentic Thai culture, affordable luxury, and experiences from floating markets to rooftop bars.

DAY-BY-DAY ITINERARY:
Day 1: Morning - Grand Palace and Wat Phra Kaew (€12, 3 hours). Afternoon - Wat Pho temple with reclining Buddha (€3) and traditional massage (€8-15). Evening - Khao San Road street food and bars (€10-20).
Day 2: Morning - Floating market tour - Damnoen Saduak (€25 including transport). Afternoon - Return to city, Wat Arun temple (€2). Evening - Chao Phraya river dinner cruise (€15-30).
Day 3: Morning - Chatuchak Weekend Market (free entry, shopping budget varies). Afternoon - Jim Thompson House (€4) and shopping at MBK Center. Evening - Rooftop bar at Lebua or cheaper alternatives (€8-25 per drink).
${duration > 3 ? `Day 4: Morning - Day trip to Ayutthaya ancient capital (€20 including train). Afternoon - Temple ruins exploration. Evening - Return to Bangkok, street food tour in Chinatown (€10-15).` : ''}
${duration > 4 ? `Day 5: Morning - Lumpini Park (free) and nearby temples. Afternoon - Siam Square shopping district. Evening - Traditional Thai massage and spa (€15-30).` : ''}

BUDGET BREAKDOWN (${displayBudget} total, ~฿${Math.round(dailyBudget * 33)}/day):
${budgetLevel === 'budget' ? 
  '• Accommodation: ฿400-800/night (hostels, guesthouses)\n• Food: ฿300-600/day (street food, local restaurants)\n• Transport: ฿150/day (BTS/MRT day pass)\n• Activities: ฿200-500/day (temples, markets)' :
  budgetLevel === 'mid-range' ?
  '• Accommodation: ฿1200-2500/night (boutique hotels, central areas)\n• Food: ฿600-1200/day (restaurants, some street food)\n• Transport: ฿150/day (public transport)\n• Activities: ฿500-1000/day (tours, attractions, massages)' :
  '• Accommodation: ฿3000-8000/night (luxury hotels, river views)\n• Food: ฿1500-3000/day (fine dining, hotel restaurants)\n• Transport: ฿500-1000/day (taxis, private transfers)\n• Activities: ฿1000-2500/day (premium spas, private tours)'
}

MONEY-SAVING TIPS: Eat street food for authentic and cheap meals. Use BTS/MRT instead of taxis during rush hour. Many temples are free or very cheap. Bargain at markets but not in malls.

LOCAL FOOD: Pad Thai (฿40-80), Tom Yum soup (฿60-120), Mango sticky rice (฿60-100), Som tam salad (฿40-80), Thai iced tea (฿20-40). Best areas: Chinatown for street food, Thonglor for trendy restaurants.

LOCAL SECRET: Visit Talad Rot Fai night market (Train Market) for vintage finds, local food, and live music - popular with young Thais, less touristy than Chatuchak.

PRACTICAL INFO: Download Grab app for transport. Dress modestly for temples (cover shoulders/knees). Bargain at markets. Tap water not recommended - buy bottled. Very friendly locals, "wai" greeting appreciated.`,

    'verona': `DESTINATION OVERVIEW: Verona, the city of Romeo and Juliet, enchants visitors with its perfectly preserved Roman amphitheater, medieval streets, and romantic atmosphere. This UNESCO World Heritage site offers an intimate Italian experience with world-class opera, excellent Veneto wines, and authentic local cuisine away from Venice's crowds.

KEY INFORMATION: Best visited April-June and September-October. Currency: Euro (EUR). Language: Italian (limited English). Verona Card: €20/24h, €25/48h includes public transport and museums. Train station 15 minutes walk to city center.

BUDGET BREAKDOWN (${displayBudget} total, ~${displayDaily}/day):
${budgetLevel === 'budget' ? 
  '• Accommodation: €35-55/night (B&Bs near Porta Nuova, hostels)\n• Food: €20-30/day (osterie, pizzerias, aperitivo)\n• Transport: €5/day (walking city + occasional bus)\n• Activities: €10-20/day (Arena, churches, free piazzas)' :
  budgetLevel === 'mid-range' ?
  '• Accommodation: €70-120/night (boutique hotels in historic center)\n• Food: €35-55/day (traditional restaurants, wine bars)\n• Transport: €5/day (mostly walking)\n• Activities: €20-35/day (Arena opera, museums, wine tours)' :
  '• Accommodation: €150-300/night (luxury hotels, historic palazzos)\n• Food: €60-100/day (fine dining, Michelin restaurants)\n• Transport: €15-25/day (taxis, private transfers)\n• Activities: €40-80/day (premium opera seats, private tours, wine experiences)'
}

MUST-SEE ATTRACTIONS: Arena di Verona (€10, opera tickets €25-200), Juliet's House and Balcony (€6), Castelvecchio Museum (€6), Piazza delle Erbe (free), San Zeno Maggiore Basilica (€3), Torre dei Lamberti (€8 for elevator views).

DAY-BY-DAY ITINERARY:
Day 1: Morning - Piazza Bra and Arena exterior (free), climb Torre dei Lamberti for city views. Afternoon - Juliet's House, Via Mazzini shopping street, Piazza delle Erbe market. Evening - ${budgetLevel === 'budget' ? 'Aperitivo at Caffè Filippini (€8-12)' : 'Dinner at Osteria del Bugiardo with local wines'}.
Day 2: Morning - Castelvecchio Museum and medieval bridge. Afternoon - San Zeno Maggiore (Mantegna masterpiece), Giardino Giusti Renaissance gardens (€7). Evening - ${budgetLevel === 'budget' ? 'Pizza at Gusta Pizza (€8-12)' : 'Traditional dinner at Il Desco or Antica Bottega del Vino'}.
${duration > 2 ? `Day 3: ${budgetLevel === 'budget' ? 'Free walking tour of Roman Theater area, Sant\'Anastasia church' : 'Day trip to Valpolicella wine region (€40-80) or Lake Garda (30 min by bus)'}.` : ''}
${duration > 3 ? `Day 4: Explore Soave wine region or visit Sirmione on Lake Garda. Evening opera at Arena (book in advance).` : ''}

LOCAL TIPS: Buy fresh produce at Piazza delle Erbe morning market for picnics. Many churches are free with incredible art. Happy hour aperitivo (6-8 PM) includes free snacks with drinks. Avoid restaurants on Piazza delle Erbe - tourist traps.

FOOD RECOMMENDATIONS: Risotto all'Amarone (€14-18), Pastissada de caval (horse stew - traditional), Pandoro (Christmas cake from Verona), Soave and Valpolicella wines. Try: Osteria Sottoriva (€25-35 meals), Trattoria al Pompiere (€20-30), Gelateria Savoia for best gelato.

PRACTICAL INFO: Download Verona Card app for discounts. Most attractions close Mondays. Opera season July-September (book months ahead). Free WiFi in main piazzas. Tipping 10% appreciated but not required. Best shopping on Via Mazzini and Via Cappello.`,

    'florence': `DESTINATION OVERVIEW: Florence, the cradle of the Renaissance, dazzles with world-class art, stunning architecture, and culinary excellence. Home to Michelangelo's David, Brunelleschi's Dome, and the Uffizi Gallery, this compact city offers an unparalleled concentration of artistic masterpieces.

KEY INFORMATION: Best visited April-June and September-October. Currency: Euro (EUR). Language: Italian (English in tourist areas). Firenze Card: €85/72h includes major museums and public transport. Historic center is walkable.

BUDGET BREAKDOWN (${displayBudget} total, ~${displayDaily}/day):
${budgetLevel === 'budget' ? 
  '• Accommodation: €25-45/night (hostels, budget hotels near Santa Maria Novella)\n• Food: €15-25/day (trattorias, street food, markets)\n• Transport: €5/day (walking + occasional bus)\n• Activities: €15-25/day (some museums, many free churches)' :
  budgetLevel === 'mid-range' ?
  '• Accommodation: €60-110/night (boutique hotels, historic center)\n• Food: €30-50/day (restaurants, wine bars, cooking classes)\n• Transport: €5/day (mostly walking)\n• Activities: €25-40/day (major museums, guided tours)' :
  '• Accommodation: €150-350/night (luxury hotels, historic palazzos)\n• Food: €60-120/day (fine dining, Michelin restaurants)\n• Transport: €20-35/day (taxis, private transfers)\n• Activities: €50-100/day (private tours, exclusive experiences)'
}

MUST-SEE ATTRACTIONS: Uffizi Gallery (€20, book ahead), Accademia Gallery - Michelangelo's David (€12), Duomo and Dome climb (€18), Palazzo Pitti (€16), Ponte Vecchio (free), Santa Croce Basilica (€8).

DAY-BY-DAY ITINERARY:
Day 1: Morning - Duomo complex, climb the Dome for city views. Afternoon - Uffizi Gallery (pre-booked), Ponte Vecchio. Evening - ${budgetLevel === 'budget' ? 'Aperitivo at Volume bar (€8-12)' : 'Dinner in Oltrarno district at Il Santo Bevitore'}.
Day 2: Morning - Accademia Gallery (David), San Lorenzo Market. Afternoon - Palazzo Pitti and Boboli Gardens. Evening - ${budgetLevel === 'budget' ? 'Pizza at Gusta Pizza (€6-10)' : 'Traditional Florentine steak at Trattoria Sostanza'}.
${duration > 2 ? `Day 3: ${budgetLevel === 'budget' ? 'Free Santa Croce, Santa Maria Novella, sunset at Piazzale Michelangelo' : 'Day trip to Chianti wine region or Siena (€35-60)'}.` : ''}

LOCAL TIPS: Book Uffizi and Accademia online weeks ahead. Many churches are free with incredible art. Aperitivo includes free snacks. Avoid restaurants near Duomo - overpriced tourist traps.

FOOD RECOMMENDATIONS: Bistecca alla Fiorentina (€40-60 for 2), Ribollita soup, Lampredotto sandwich (€4), Cantucci cookies with Vin Santo. Try: Mercato Centrale food hall, All'Antico Vinaio (famous sandwiches), Vivoli gelato.

PRACTICAL INFO: Firenze Card worth it if visiting 3+ major museums. Most museums closed Mondays. Free WiFi in main piazzas. Dress modestly for churches. Best leather shopping at San Lorenzo Market.`,

    'venice': `DESTINATION OVERVIEW: Venice, the floating city, captivates with its unique canals, Byzantine architecture, and timeless romance. Built on 118 islands connected by bridges, this UNESCO site offers an otherworldly experience of palazzos, gondolas, and artistic treasures.

KEY INFORMATION: Best visited April-June and September-November. Currency: Euro (EUR). Language: Italian (English in tourist areas). Vaporetto day pass: €20. Venice Card: €30-40 includes transport and some museums.

BUDGET BREAKDOWN (${displayBudget} total, ~${displayDaily}/day):
${budgetLevel === 'budget' ? 
  '• Accommodation: €40-70/night (mainland Mestre, budget hotels)\n• Food: €20-35/day (bacari, pizza al taglio, markets)\n• Transport: €20/day (vaporetto pass)\n• Activities: €10-20/day (churches, free piazzas, walking)' :
  budgetLevel === 'mid-range' ?
  '• Accommodation: €80-150/night (3-star hotels, B&Bs on islands)\n• Food: €40-65/day (restaurants, cicchetti tours)\n• Transport: €20/day (vaporetto pass)\n• Activities: €25-40/day (Doge\'s Palace, museums, gondola)' :
  '• Accommodation: €200-500/night (luxury hotels, canal views)\n• Food: €80-150/day (fine dining, canal-side restaurants)\n• Transport: €30-50/day (water taxis, private boats)\n• Activities: €60-120/day (private gondola, exclusive tours)'
}

MUST-SEE ATTRACTIONS: St. Mark's Basilica (free, €5 for Pala d'Oro), Doge's Palace (€25), Rialto Bridge (free), Murano and Burano islands (vaporetto included), Ca' Rezzonico (€10), Bridge of Sighs (free view).

DAY-BY-DAY ITINERARY:
Day 1: Morning - St. Mark's Square and Basilica, Campanile tower (€8). Afternoon - Doge's Palace, Bridge of Sighs. Evening - ${budgetLevel === 'budget' ? 'Cicchetti crawl in Cannaregio (€15-20)' : 'Dinner at Osteria alle Testiere'}.
Day 2: Morning - Rialto Market and Bridge. Afternoon - Murano (glass) and Burano (colorful houses) islands by vaporetto. Evening - ${budgetLevel === 'budget' ? 'Pizza at Antico Forno (€8-12)' : 'Canal-side dinner at Antiche Carampane'}.
${duration > 2 ? `Day 3: ${budgetLevel === 'budget' ? 'Free exploration of Castello and Dorsoduro districts, Peggy Guggenheim Collection' : 'Gondola ride (€80-100), Ca\' Rezzonico palace, sunset at Accademia Bridge'}.` : ''}

LOCAL TIPS: Avoid St. Mark's Square restaurants - extremely overpriced. Buy groceries at Coop or Conad. High tide (acqua alta) floods some areas - check forecasts. Free water from public fountains.

FOOD RECOMMENDATIONS: Cicchetti (Venetian tapas), Risotto al nero di seppia, Fegato alla veneziana, Spritz aperitif (€3-5). Try: Cantina Do Spade (oldest bacaro), All'Arco (famous cicchetti), Caffè Florian (historic but expensive).

PRACTICAL INFO: Venice is expensive - budget carefully. Vaporetto pass essential for transport. Most shops close Sunday afternoons. Dress code for St. Mark's Basilica. Book restaurants in advance.`,

    'milan': `DESTINATION OVERVIEW: Milan, Italy's fashion and design capital, blends Gothic architecture with modern innovation. Home to La Scala opera house, the stunning Duomo cathedral, and world-class shopping, Milan offers sophisticated urban experiences and excellent cuisine.

KEY INFORMATION: Best visited April-June and September-November. Currency: Euro (EUR). Language: Italian (English widely spoken). Metro day pass: €4.50. Fashion weeks in February/March and September/October.

BUDGET BREAKDOWN (${displayBudget} total, ~${displayDaily}/day):
${budgetLevel === 'budget' ? 
  '• Accommodation: €30-55/night (hostels, budget hotels near Centrale)\n• Food: €18-28/day (aperitivo, pizzerias, lunch menus)\n• Transport: €4.50/day (metro/tram pass)\n• Activities: €8-18/day (Duomo, free churches, parks)' :
  budgetLevel === 'mid-range' ?
  '• Accommodation: €70-130/night (boutique hotels, design hotels)\n• Food: €35-55/day (restaurants, wine bars, markets)\n• Transport: €4.50/day (metro pass)\n• Activities: €20-35/day (La Scala, museums, shopping)' :
  '• Accommodation: €150-400/night (luxury hotels, fashion district)\n• Food: €70-120/day (Michelin restaurants, rooftop dining)\n• Transport: €20-40/day (taxis, private transfers)\n• Activities: €50-100/day (private shopping tours, exclusive experiences)'
}

MUST-SEE ATTRACTIONS: Duomo Cathedral and rooftop (€15), La Scala Opera House and Museum (€9), Castello Sforzesco (€5), Navigli canals (free), Brera district (free), Quadrilatero della Moda (free window shopping).

DAY-BY-DAY ITINERARY:
Day 1: Morning - Duomo Cathedral and rooftop terraces for city views. Afternoon - Galleria Vittorio Emanuele II shopping, La Scala opera house. Evening - ${budgetLevel === 'budget' ? 'Aperitivo in Brera district (€8-15)' : 'Dinner at Trattoria Milanese'}.
Day 2: Morning - Castello Sforzesco and Parco Sempione. Afternoon - Brera art district, Pinacoteca di Brera gallery (€10). Evening - ${budgetLevel === 'budget' ? 'Pizza at Spontini (€6-10)' : 'Navigli canal district for dinner and nightlife'}.
${duration > 2 ? `Day 3: ${budgetLevel === 'budget' ? 'Free Porta Ticinese district, Basilica di Sant\'Ambrogio, Isola neighborhood' : 'Day trip to Lake Como (€10 train) or luxury shopping in Quadrilatero'}.` : ''}

LOCAL TIPS: Aperitivo (6-8 PM) includes free buffet with drinks. Many museums free on first Sunday of month. Avoid restaurants in Duomo area - overpriced. Use ATM app for public transport.

FOOD RECOMMENDATIONS: Risotto alla milanese, Cotoletta alla milanese, Panettone, Negroni Sbagliato. Try: Peck Italian Bar (gourmet), Luini (famous panzerotti), Marchesi pastry shop, Navigli area for nightlife.

PRACTICAL INFO: Fashion capital - dress well. Most shops closed Sunday mornings. Tipping 10% appreciated. Free WiFi in main areas. Best shopping during sales (January and July).`,

    'naples': `DESTINATION OVERVIEW: Naples, the birthplace of pizza, pulses with authentic Italian energy, incredible street food, and proximity to Pompeii and the Amalfi Coast. This gritty, passionate city offers unfiltered southern Italian culture with world-class archaeology and cuisine.

KEY INFORMATION: Best visited April-June and September-November. Currency: Euro (EUR). Language: Italian (limited English). Metro day pass: €3.50. Campania ArteCard: €12-34 includes transport and museums.

BUDGET BREAKDOWN (${displayBudget} total, ~${displayDaily}/day):
${budgetLevel === 'budget' ? 
  '• Accommodation: €20-40/night (hostels, B&Bs in Spanish Quarter)\n• Food: €12-20/day (pizzerias, street food, markets)\n• Transport: €3.50/day (metro/bus pass)\n• Activities: €8-15/day (churches, free neighborhoods)' :
  budgetLevel === 'mid-range' ?
  '• Accommodation: €50-85/night (boutique hotels, historic center)\n• Food: €25-40/day (restaurants, seafood, wine)\n• Transport: €3.50/day (metro pass)\n• Activities: €15-30/day (museums, Pompeii day trip)' :
  '• Accommodation: €120-250/night (luxury hotels, waterfront)\n• Food: €50-90/day (fine dining, Michelin restaurants)\n• Transport: €15-30/day (taxis, private transfers)\n• Activities: €40-80/day (private Pompeii tours, boat trips)'
}

MUST-SEE ATTRACTIONS: Naples Cathedral and San Gennaro Chapel (free), Underground Naples (€10), Castel dell'Ovo (free), Spaccanapoli street (free), National Archaeological Museum (€15), Pompeii day trip (€15 + €13 train).

DAY-BY-DAY ITINERARY:
Day 1: Morning - Historic center walking tour, Spaccanapoli street. Afternoon - Naples Cathedral, Underground Naples tour. Evening - ${budgetLevel === 'budget' ? 'Pizza at Da Michele or Sorbillo (€4-8)' : 'Seafood dinner in Santa Lucia district'}.
Day 2: Morning - National Archaeological Museum (Pompeii artifacts). Afternoon - Castel dell'Ovo, waterfront walk. Evening - ${budgetLevel === 'budget' ? 'Street food tour in Spanish Quarter (€10-15)' : 'Traditional dinner at Palazzo Petrucci'}.
${duration > 2 ? `Day 3: ${budgetLevel === 'budget' ? 'Day trip to Pompeii by Circumvesuviana train (€13 return)' : 'Private Pompeii and Vesuvius tour (€60-100) or Capri day trip'}.` : ''}

LOCAL TIPS: Naples invented pizza - try Margherita at historic pizzerias. Spanish Quarter is safe during day but avoid at night. Bargain at markets. Free churches have incredible Baroque art.

FOOD RECOMMENDATIONS: Pizza Margherita (€4-6), Sfogliatelle pastry, Limoncello, Espresso (€1 standing). Try: Pizzeria da Michele (since 1870), Sorbillo, Caffè Gambrinus, Mercato di Porta Nolana for fresh seafood.

PRACTICAL INFO: City can feel chaotic but is generally safe in tourist areas. Keep belongings secure. Tipping not expected but appreciated. Many shops close 1-4 PM. Best base for Amalfi Coast and Pompeii.`,

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

  // Enhanced generic fallback with actionable structure
  const interestsList = interests ? interests.toLowerCase() : '';
  let interestFocus = '';
  
  if (interestsList.includes('culture')) {
    interestFocus = 'Focus on museums, historical sites, cultural districts, and local heritage experiences.';
  } else if (interestsList.includes('food')) {
    interestFocus = 'Emphasize local cuisine, food markets, traditional restaurants, and culinary experiences.';
  } else if (interestsList.includes('nightlife')) {
    interestFocus = 'Prioritize entertainment districts, bars, live music venues, and evening activities.';
  } else if (interestsList.includes('nature')) {
    interestFocus = 'Focus on parks, gardens, outdoor activities, and natural landmarks.';
  } else if (interestsList.includes('beach')) {
    interestFocus = 'Emphasize coastal areas, beach activities, and seaside experiences.';
  } else {
    interestFocus = 'Provide a balanced mix of cultural, culinary, and recreational experiences.';
  }

  return `OVERVIEW: ${city} offers diverse experiences for ${travelerType} travelers interested in ${interests}. This destination combines cultural attractions, local cuisine, and authentic experiences within your ${displayBudget} budget. ${interestFocus}

DAY-BY-DAY ITINERARY: 
Day 1: Morning - Explore ${city}'s ${interestsList.includes('culture') ? 'main cultural sites and museums' : interestsList.includes('food') ? 'local food markets and culinary districts' : interestsList.includes('nightlife') ? 'city center and entertainment areas' : interestsList.includes('nature') ? 'main parks and natural areas' : interestsList.includes('beach') ? 'coastal areas and beaches' : 'historic center and main landmarks'}. Afternoon - Visit ${interestsList.includes('culture') ? 'art galleries and cultural districts' : interestsList.includes('food') ? 'traditional restaurants and food experiences' : interestsList.includes('nightlife') ? 'trendy neighborhoods and bars' : interestsList.includes('nature') ? 'botanical gardens or scenic viewpoints' : interestsList.includes('beach') ? 'beach clubs and coastal walks' : 'local markets and neighborhoods'}. Evening - Experience ${interestsList.includes('culture') ? 'traditional performances or cultural shows' : interestsList.includes('food') ? 'local cuisine at highly-rated restaurants' : interestsList.includes('nightlife') ? 'local nightlife and entertainment venues' : interestsList.includes('nature') ? 'sunset views and outdoor dining' : interestsList.includes('beach') ? 'beachside dining and sunset views' : 'local dining and evening atmosphere'}.
Day 2: Morning - ${interestsList.includes('culture') ? 'Visit main museums and historical sites' : interestsList.includes('food') ? 'Take a food tour or cooking class' : interestsList.includes('nightlife') ? 'Explore daytime markets and prepare for evening' : interestsList.includes('nature') ? 'Outdoor activities and nature experiences' : interestsList.includes('beach') ? 'Beach activities and water sports' : 'Explore different neighborhoods'}. Afternoon - ${interestsList.includes('culture') ? 'Explore heritage districts and monuments' : interestsList.includes('food') ? 'Visit specialty food shops and markets' : interestsList.includes('nightlife') ? 'Discover rooftop bars and lounges' : interestsList.includes('nature') ? 'Hiking trails or nature reserves' : interestsList.includes('beach') ? 'Coastal exploration and beach relaxation' : 'Shopping and local experiences'}. Evening - ${interestsList.includes('culture') ? 'Attend cultural events or festivals' : interestsList.includes('food') ? 'Fine dining or street food experiences' : interestsList.includes('nightlife') ? 'Club hopping and live music venues' : interestsList.includes('nature') ? 'Outdoor evening activities' : interestsList.includes('beach') ? 'Beach bars and coastal nightlife' : 'Local entertainment and dining'}.
${duration > 2 ? `Day 3: Morning - ${interestsList.includes('culture') ? 'Cultural workshops or guided heritage tours' : interestsList.includes('food') ? 'Market visits and food tastings' : interestsList.includes('nightlife') ? 'Recovery day with cafés and light activities' : interestsList.includes('nature') ? 'Day trips to natural attractions' : interestsList.includes('beach') ? 'Island hopping or coastal excursions' : 'Day trips or deeper city exploration'}. Afternoon - ${interestsList.includes('culture') ? 'Artisan workshops and cultural centers' : interestsList.includes('food') ? 'Cooking experiences and wine tastings' : interestsList.includes('nightlife') ? 'Prepare for final night celebrations' : interestsList.includes('nature') ? 'Eco-tourism and wildlife experiences' : interestsList.includes('beach') ? 'Beach sports and seaside activities' : 'Local experiences and shopping'}. Evening - ${interestsList.includes('culture') ? 'Traditional ceremonies or cultural immersion' : interestsList.includes('food') ? 'Farewell dinner at signature restaurant' : interestsList.includes('nightlife') ? 'Epic final night out experience' : interestsList.includes('nature') ? 'Stargazing or nature night tours' : interestsList.includes('beach') ? 'Beach bonfire or seaside farewell' : 'Memorable final evening experience'}.` : ''}
${duration > 3 ? `Day 4: ${interestsList.includes('culture') ? 'Day trip to nearby cultural sites or UNESCO locations' : interestsList.includes('food') ? 'Regional food tour or wine country visit' : interestsList.includes('nightlife') ? 'Explore neighboring cities\' nightlife scenes' : interestsList.includes('nature') ? 'Multi-day nature expedition or national parks' : interestsList.includes('beach') ? 'Extended coastal exploration or island adventures' : 'Extended exploration of surrounding areas'}.` : ''}

BUDGET BREAKDOWN (${displayBudget} total, ~${displayDaily} per day):
• Accommodation: ${budgetLevel === 'budget' ? 'Hostels, guesthouses, budget hotels (€25-50/night)' : budgetLevel === 'mid-range' ? 'Mid-range hotels, boutique properties (€60-120/night)' : 'Luxury hotels, premium locations (€150-300/night)'}
• Food: ${budgetLevel === 'budget' ? interestsList.includes('food') ? 'Street food, local markets, food tours (€20-35/day)' : 'Street food, local markets, casual dining (€15-30/day)' : budgetLevel === 'mid-range' ? interestsList.includes('food') ? 'Food tours, cooking classes, restaurant dining (€40-70/day)' : 'Mix of local restaurants and some fine dining (€30-60/day)' : interestsList.includes('food') ? 'Fine dining, premium culinary experiences (€80-150/day)' : 'Fine dining, premium restaurants (€60-120/day)'}
• Transport: ${budgetLevel === 'budget' ? 'Public transport, walking (€5-15/day)' : budgetLevel === 'mid-range' ? 'Public transport plus occasional taxis (€10-25/day)' : 'Taxis, private transfers (€20-50/day)'}
• Activities: ${budgetLevel === 'budget' ? interestsList.includes('culture') ? 'Museums, cultural sites, free events (€15-30/day)' : interestsList.includes('nightlife') ? 'Bars, clubs, entertainment (€20-40/day)' : interestsList.includes('nature') ? 'Parks, hiking, outdoor activities (€10-25/day)' : 'Free attractions, some museums (€10-25/day)' : budgetLevel === 'mid-range' ? interestsList.includes('culture') ? 'Museums, tours, cultural experiences (€25-50/day)' : interestsList.includes('nightlife') ? 'Premium bars, clubs, shows (€35-70/day)' : interestsList.includes('nature') ? 'Guided tours, outdoor experiences (€20-40/day)' : 'Mix of free and paid attractions (€20-40/day)' : interestsList.includes('culture') ? 'Private tours, exclusive cultural experiences (€50-100/day)' : interestsList.includes('nightlife') ? 'VIP experiences, premium venues (€70-150/day)' : interestsList.includes('nature') ? 'Private guides, luxury outdoor experiences (€60-120/day)' : 'Premium tours, exclusive experiences (€40-80/day)'}

MONEY-SAVING TIPS: ${interestsList.includes('food') ? `Look for food markets and street vendors for authentic and affordable meals. Many cities have food tour discounts for groups.` : interestsList.includes('culture') ? `Many museums offer free days or student discounts. Look for cultural festivals and free events.` : interestsList.includes('nightlife') ? `Happy hours and early evening specials can save money. Pre-drinking at accommodations is common.` : interestsList.includes('nature') ? `Many natural attractions are free. Pack snacks and water for outdoor activities.` : `Look for free walking tours and city tourist cards for attraction discounts.`} Use public transport instead of taxis when possible.

LOCAL FOOD: Research ${city}'s signature dishes and specialties${interestsList.includes('food') ? '. Focus on food markets, cooking classes, and food tours for authentic culinary experiences. Ask locals for their favorite hidden food gems.' : '. Visit local markets for fresh ingredients and street food. Ask your accommodation for restaurant recommendations away from tourist areas.'}

LOCAL SECRET: ${interestsList.includes('culture') ? `Explore residential cultural districts for authentic local art scenes and community events away from tourist areas.` : interestsList.includes('food') ? `Ask locals about family-run restaurants and hidden food markets that tourists rarely discover.` : interestsList.includes('nightlife') ? `Local nightlife often starts later than tourist areas - follow where young locals go for authentic experiences.` : interestsList.includes('nature') ? `Early morning visits to natural areas offer the best wildlife viewing and fewer crowds.` : `Explore residential neighborhoods for authentic local life, hidden cafes, and better prices.`} Check local event listings for festivals or cultural events during your visit.

PRACTICAL INFO: Download offline maps and translation apps for ${city}. Research local customs, tipping practices, and basic phrases. ${interestsList.includes('culture') ? 'Check opening hours for museums and cultural sites, and book popular attractions in advance.' : interestsList.includes('food') ? 'Research food safety practices and dietary restrictions. Many food tours can accommodate special diets.' : interestsList.includes('nightlife') ? 'Research local nightlife customs, dress codes, and safety considerations for late-night activities.' : interestsList.includes('nature') ? 'Check weather conditions and pack appropriate gear for outdoor activities.' : 'Check opening hours for major attractions and book popular sites in advance.'}`;
}

module.exports = {
  generateTravelTips: generateDetailedTravelGuide,
  generateDetailedTravelGuide
};