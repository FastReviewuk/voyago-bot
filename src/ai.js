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
  
  // Calculate daily budget and budget level
  const budgetAmount = budget && budget !== 'undefined' ? parseInt(budget.replace(/[^0-9]/g, '')) : 1000;
  const dailyBudget = Math.round(budgetAmount / duration);
  const budgetLevel = dailyBudget < 50 ? 'budget' : dailyBudget < 100 ? 'mid-range' : 'luxury';
  
  const prompt = `You are a local expert travel guide who has lived in ${city} for years. Create a comprehensive, specific travel guide for a ${travelerType} traveler interested in ${interests}, staying for ${duration} days with a ${budgetLevel} budget (${budget} total, €${dailyBudget} per day).

CRITICAL: Be extremely specific about ${city}. Include real places, actual restaurant names, specific neighborhoods, exact prices, and local insider knowledge.

Structure your response EXACTLY like this:

DESTINATION OVERVIEW: Write 2-3 sentences about what makes ${city} unique and special. Mention specific landmarks or characteristics.

KEY INFORMATION: Currency, language, best months to visit, main transportation (with specific costs), key cultural tips for ${city}.

BUDGET BREAKDOWN (${budget} total, ~€${dailyBudget}/day):
• Accommodation: Specific price ranges and neighborhood recommendations for ${budgetLevel} travelers
• Food: Actual meal costs and where to eat in ${city}
• Transport: Exact daily transport costs and best options
• Activities: Real attraction prices and ${budgetLevel}-appropriate experiences

MUST-SEE ATTRACTIONS: List 5 specific attractions in ${city} with:
- Exact names and locations
- Real entry prices (or "free")
- Why each is special
- ${budgetLevel} tips for each

DAY-BY-DAY ITINERARY: Create a detailed ${duration}-day plan with:
- Specific morning, afternoon, evening activities
- Real neighborhood names and locations
- Actual restaurants and cafes to visit
- Walking routes and transport connections
- ${budgetLevel}-appropriate choices throughout

LOCAL TIPS: 3 insider secrets that only locals know about ${city}:
- Hidden gems tourists miss
- Money-saving tricks specific to ${city}
- Cultural etiquette and local customs

FOOD RECOMMENDATIONS: Must-try dishes specific to ${city} and region:
- Name 5 local specialties
- Recommend specific restaurants/markets with price ranges
- Street food options and where to find them

PRACTICAL INFO: ${city}-specific practical advice:
- Best apps for ${city}
- Tipping customs
- Safety considerations
- Shopping areas and markets
- Free activities and experiences

Keep everything specific to ${city}. No generic advice. Use real names, places, and prices. Write in a friendly, knowledgeable tone as if you're a local friend giving advice.`;

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
      
      // Validate that the response is specific and not generic
      if (aiResponse.includes(city) && aiResponse.length > 500 && !aiResponse.includes('Research free attractions')) {
        return aiResponse;
      } else {
        console.log('AI response too generic, using enhanced fallback');
        throw new Error('AI response too generic');
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
            content: 'You are a knowledgeable local travel expert who provides specific, detailed, and practical travel advice with real names, places, and prices. Never give generic responses.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1500,
        temperature: 0.3,
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
  
  const guides = {
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

  // Enhanced generic fallback with more specific structure
  return `DESTINATION OVERVIEW: ${city} is a fascinating destination that offers unique experiences for ${travelerType} travelers interested in ${interests}. This city provides excellent value for money with diverse attractions and authentic local culture.

KEY INFORMATION: Research the best time to visit ${city} based on weather and local events. Check visa requirements, local currency, and basic language phrases. Look into city transport passes and tourist cards for savings.

BUDGET BREAKDOWN (${displayBudget} total, ~${displayDaily} per day):
• Accommodation: ${budgetLevel === 'budget' ? 'Hostels, budget hotels, guesthouses in residential areas' : budgetLevel === 'mid-range' ? 'Mid-range hotels, boutique properties, central locations' : 'Luxury hotels, premium locations, full-service amenities'}
• Food: ${budgetLevel === 'budget' ? 'Local markets, street food, casual restaurants, self-catering' : budgetLevel === 'mid-range' ? 'Mix of local restaurants, cafés, some fine dining experiences' : 'Fine dining, premium restaurants, exclusive culinary experiences'}
• Transport: ${budgetLevel === 'budget' ? 'Public transport passes, walking, bike rentals' : budgetLevel === 'mid-range' ? 'Public transport plus occasional taxis' : 'Private transfers, taxis, premium transport options'}
• Activities: ${budgetLevel === 'budget' ? 'Free attractions, walking tours, public spaces, some paid museums' : budgetLevel === 'mid-range' ? 'Mix of free and paid attractions, guided tours' : 'Premium tours, exclusive experiences, private guides'}

MUST-SEE ATTRACTIONS: Research ${city}'s top 5 attractions including historical sites, museums, cultural landmarks, and natural areas. Look for free days at museums, city viewpoints, and walking areas. Check opening hours and advance booking requirements.

DAY-BY-DAY ITINERARY: Plan your ${duration} days in ${city} by grouping attractions by area to minimize transport time. Balance must-see sights with spontaneous exploration. Include rest time and meal breaks. Consider day trips if staying longer.

LOCAL TIPS: Connect with locals through free walking tours, language exchange meetups, or local markets. Ask for recommendations at your accommodation. Download offline maps and translation apps. Research local customs and etiquette.

FOOD RECOMMENDATIONS: Try ${city}'s signature dishes and local specialties. Visit local markets for fresh ingredients and authentic experiences. Ask locals for their favorite neighborhood restaurants away from tourist areas.

PRACTICAL INFO: Download useful apps for ${city} including transport, maps, and restaurant recommendations. Research tipping customs, safety considerations, and emergency contacts. Check if attractions offer student or group discounts.`;
}

module.exports = {
  generateTravelTips: generateDetailedTravelGuide,
  generateDetailedTravelGuide
};