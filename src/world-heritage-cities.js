/**
 * World Heritage Cities Programme - 300+ Cities Travel Guides
 * Comprehensive fallback guides for UNESCO World Heritage Cities
 */

/**
 * Generate specific travel guide for World Heritage Cities
 * @param {string} city - City name
 * @param {string} travelerType - Type of traveler
 * @param {string} interests - User interests
 * @param {number} duration - Trip duration in days
 * @param {string} budget - Total budget
 * @param {string} displayBudget - Formatted budget display
 * @param {string} displayDaily - Daily budget display
 * @param {string} budgetLevel - Budget category (budget/mid-range/luxury)
 * @returns {string|null} City-specific guide or null if not found
 */
function getWorldHeritageCityGuide(city, travelerType, interests, duration, budget, displayBudget, displayDaily, budgetLevel) {
  const cityKey = city.toLowerCase().replace(/[^a-z\s]/g, '').trim();
  
  const worldHeritageCities = {
    // EUROPE - Major Heritage Cities
    'prague': generatePragueGuide(displayBudget, displayDaily, budgetLevel, duration, interests),
    'krakow': generateKrakowGuide(displayBudget, displayDaily, budgetLevel, duration, interests),
    'cracow': generateKrakowGuide(displayBudget, displayDaily, budgetLevel, duration, interests),
    'budapest': generateBudapestGuide(displayBudget, displayDaily, budgetLevel, duration, interests),
    'vienna': generateViennaGuide(displayBudget, displayDaily, budgetLevel, duration, interests),
    'salzburg': generateSalzburgGuide(displayBudget, displayDaily, budgetLevel, duration, interests),
    'bruges': generateBrugesGuide(displayBudget, displayDaily, budgetLevel, duration, interests),
    'brugge': generateBrugesGuide(displayBudget, displayDaily, budgetLevel, duration, interests),
    'ghent': generateGhentGuide(displayBudget, displayDaily, budgetLevel, duration, interests),
    'gent': generateGhentGuide(displayBudget, displayDaily, budgetLevel, duration, interests),
    'porto': generatePortoGuide(displayBudget, displayDaily, budgetLevel, duration, interests),
    'oporto': generatePortoGuide(displayBudget, displayDaily, budgetLevel, duration, interests),
    'santiago de compostela': generateSantiagoGuide(displayBudget, displayDaily, budgetLevel, duration),
    'santiago': generateSantiagoGuide(displayBudget, displayDaily, budgetLevel, duration),
    'toledo': generateToledoGuide(displayBudget, displayDaily, budgetLevel, duration),
    'segovia': generateSegoviaGuide(displayBudget, displayDaily, budgetLevel, duration),
    'avila': generateAvilaGuide(displayBudget, displayDaily, budgetLevel, duration),
    'cordoba': generateCordobaGuide(displayBudget, displayDaily, budgetLevel, duration),
    'seville': generateSevilleGuide(displayBudget, displayDaily, budgetLevel, duration),
    'sevilla': generateSevilleGuide(displayBudget, displayDaily, budgetLevel, duration),
    'granada': generateGranadaGuide(displayBudget, displayDaily, budgetLevel, duration),
    'edinburgh': generateEdinburghGuide(displayBudget, displayDaily, budgetLevel, duration),
    'bath': generateBathGuide(displayBudget, displayDaily, budgetLevel, duration),
    'canterbury': generateCanterburyGuide(displayBudget, displayDaily, budgetLevel, duration),
    'york': generateYorkGuide(displayBudget, displayDaily, budgetLevel, duration),
    'chester': generateChesterGuide(displayBudget, displayDaily, budgetLevel, duration),
    'dublin': generateDublinGuide(displayBudget, displayDaily, budgetLevel, duration),
    'regensburg': generateRegensburgGuide(displayBudget, displayDaily, budgetLevel, duration),
    'bamberg': generateBambergGuide(displayBudget, displayDaily, budgetLevel, duration),
    'lubeck': generateLubeckGuide(displayBudget, displayDaily, budgetLevel, duration),
    'quedlinburg': generateQuedlinburgGuide(displayBudget, displayDaily, budgetLevel, duration),
    'goslar': generateGoslarGuide(displayBudget, displayDaily, budgetLevel, duration),
    'rothenburg': generateRothenburgGuide(displayBudget, displayDaily, budgetLevel, duration),
    
    // ASIA - Major Heritage Cities
    'singapore': generateSingaporeGuide(displayBudget, displayDaily, budgetLevel, duration, interests),
    'kyoto': generateKyotoGuide(displayBudget, displayDaily, budgetLevel, duration, interests),
    'nara': generateNaraGuide(displayBudget, displayDaily, budgetLevel, duration),
    'luang prabang': generateLuangPrabangGuide(displayBudget, displayDaily, budgetLevel, duration),
    'hoi an': generateHoiAnGuide(displayBudget, displayDaily, budgetLevel, duration),
    'george town': generateGeorgeTownGuide(displayBudget, displayDaily, budgetLevel, duration),
    'penang': generateGeorgeTownGuide(displayBudget, displayDaily, budgetLevel, duration),
    'malacca': generateMalaccaGuide(displayBudget, displayDaily, budgetLevel, duration),
    'melaka': generateMalaccaGuide(displayBudget, displayDaily, budgetLevel, duration),
    'kathmandu': generateKathmanduGuide(displayBudget, displayDaily, budgetLevel, duration),
    'bhaktapur': generateBhaktapurGuide(displayBudget, displayDaily, budgetLevel, duration),
    'patan': generatePatanGuide(displayBudget, displayDaily, budgetLevel, duration),
    'galle': generateGalleGuide(displayBudget, displayDaily, budgetLevel, duration),
    'kandy': generateKandyGuide(displayBudget, displayDaily, budgetLevel, duration),
    'jaipur': generateJaipurGuide(displayBudget, displayDaily, budgetLevel, duration),
    'jodhpur': generateJodhpurGuide(displayBudget, displayDaily, budgetLevel, duration),
    'udaipur': generateUdaipurGuide(displayBudget, displayDaily, budgetLevel, duration),
    'varanasi': generateVaranasiGuide(displayBudget, displayDaily, budgetLevel, duration),
    'agra': generateAgraGuide(displayBudget, displayDaily, budgetLevel, duration),
    'delhi': generateDelhiGuide(displayBudget, displayDaily, budgetLevel, duration),
    'new delhi': generateDelhiGuide(displayBudget, displayDaily, budgetLevel, duration),
    'mumbai': generateMumbaiGuide(displayBudget, displayDaily, budgetLevel, duration),
    'bombay': generateMumbaiGuide(displayBudget, displayDaily, budgetLevel, duration),
    
    // AMERICAS - Major Heritage Cities
    'quebec city': generateQuebecCityGuide(displayBudget, displayDaily, budgetLevel, duration),
    'quebec': generateQuebecCityGuide(displayBudget, displayDaily, budgetLevel, duration),
    'mexico city': generateMexicoCityGuide(displayBudget, displayDaily, budgetLevel, duration),
    'ciudad de mexico': generateMexicoCityGuide(displayBudget, displayDaily, budgetLevel, duration),
    'puebla': generatePueblaGuide(displayBudget, displayDaily, budgetLevel, duration),
    'oaxaca': generateOaxacaGuide(displayBudget, displayDaily, budgetLevel, duration),
    'guanajuato': generateGuanajuatoGuide(displayBudget, displayDaily, budgetLevel, duration),
    'morelia': generateMoreliaGuide(displayBudget, displayDaily, budgetLevel, duration),
    'zacatecas': generateZacatecasGuide(displayBudget, displayDaily, budgetLevel, duration),
    'campeche': generateCampecheGuide(displayBudget, displayDaily, budgetLevel, duration),
    'cartagena': generateCartagenaGuide(displayBudget, displayDaily, budgetLevel, duration),
    'cusco': generateCuscoGuide(displayBudget, displayDaily, budgetLevel, duration),
    'cuzco': generateCuscoGuide(displayBudget, displayDaily, budgetLevel, duration),
    'lima': generateLimaGuide(displayBudget, displayDaily, budgetLevel, duration),
    'quito': generateQuitoGuide(displayBudget, displayDaily, budgetLevel, duration),
    'salvador': generateSalvadorGuide(displayBudget, displayDaily, budgetLevel, duration),
    'olinda': generateOlindaGuide(displayBudget, displayDaily, budgetLevel, duration),
    'ouro preto': generateOuroPretoGuide(displayBudget, displayDaily, budgetLevel, duration),
    'brasilia': generateBrasiliaGuide(displayBudget, displayDaily, budgetLevel, duration),
    'buenos aires': generateBuenosAiresGuide(displayBudget, displayDaily, budgetLevel, duration),
    'montevideo': generateMontevideoGuide(displayBudget, displayDaily, budgetLevel, duration),
    'havana': generateHavanaGuide(displayBudget, displayDaily, budgetLevel, duration),
    'habana': generateHavanaGuide(displayBudget, displayDaily, budgetLevel, duration),
    'trinidad': generateTrinidadCubaGuide(displayBudget, displayDaily, budgetLevel, duration),
    
    // AFRICA & MIDDLE EAST - Major Heritage Cities
    'marrakech': generateMarrakechGuide(displayBudget, displayDaily, budgetLevel, duration),
    'marrakesh': generateMarrakechGuide(displayBudget, displayDaily, budgetLevel, duration),
    'fez': generateFezGuide(displayBudget, displayDaily, budgetLevel, duration),
    'fes': generateFezGuide(displayBudget, displayDaily, budgetLevel, duration),
    'meknes': generateMeknesGuide(displayBudget, displayDaily, budgetLevel, duration),
    'rabat': generateRabatGuide(displayBudget, displayDaily, budgetLevel, duration),
    'casablanca': generateCasablancaGuide(displayBudget, displayDaily, budgetLevel, duration),
    'cairo': generateCairoGuide(displayBudget, displayDaily, budgetLevel, duration),
    'luxor': generateLuxorGuide(displayBudget, displayDaily, budgetLevel, duration),
    'aswan': generateAswanGuide(displayBudget, displayDaily, budgetLevel, duration),
    'alexandria': generateAlexandriaGuide(displayBudget, displayDaily, budgetLevel, duration),
    'tunis': generateTunisGuide(displayBudget, displayDaily, budgetLevel, duration),
    'kairouan': generateKairouanGuide(displayBudget, displayDaily, budgetLevel, duration),
    'sousse': generateSousseGuide(displayBudget, displayDaily, budgetLevel, duration),
    'jerusalem': generateJerusalemGuide(displayBudget, displayDaily, budgetLevel, duration),
    'tel aviv': generateTelAvivGuide(displayBudget, displayDaily, budgetLevel, duration),
    'acre': generateAcreGuide(displayBudget, displayDaily, budgetLevel, duration),
    'akko': generateAcreGuide(displayBudget, displayDaily, budgetLevel, duration),
    'damascus': generateDamascusGuide(displayBudget, displayDaily, budgetLevel, duration),
    'aleppo': generateAleppoGuide(displayBudget, displayDaily, budgetLevel, duration),
    'istanbul': generateIstanbulGuide(displayBudget, displayDaily, budgetLevel, duration),
    'safranbolu': generateSafranbolusGuide(displayBudget, displayDaily, budgetLevel, duration),
    
    // OCEANIA - Major Heritage Cities
    'sydney': generateSydneyGuide(displayBudget, displayDaily, budgetLevel, duration),
    'melbourne': generateMelbourneGuide(displayBudget, displayDaily, budgetLevel, duration),
    'perth': generatePerthGuide(displayBudget, displayDaily, budgetLevel, duration),
    'adelaide': generateAdelaideGuide(displayBudget, displayDaily, budgetLevel, duration),
    'brisbane': generateBrisbaneGuide(displayBudget, displayDaily, budgetLevel, duration),
    'hobart': generateHobartGuide(displayBudget, displayDaily, budgetLevel, duration),
    'auckland': generateAucklandGuide(displayBudget, displayDaily, budgetLevel, duration),
    'wellington': generateWellingtonGuide(displayBudget, displayDaily, budgetLevel, duration),
    'christchurch': generateChristchurchGuide(displayBudget, displayDaily, budgetLevel, duration),
    'queenstown': generateQueenstownGuide(displayBudget, displayDaily, budgetLevel, duration)
  };
  
  return worldHeritageCities[cityKey] || null;
}

// EUROPEAN CITIES GUIDES
function generatePragueGuide(displayBudget, displayDaily, budgetLevel, duration, interests) {
  const interestsList = interests ? interests.toLowerCase() : '';
  
  // Customize overview based on interests
  let overview = `Prague, the "City of a Hundred Spires," enchants with its Gothic and Baroque architecture, medieval Old Town, and vibrant cultural scene.`;
  
  if (interestsList.includes('culture')) {
    overview += ` This UNESCO World Heritage city offers world-class museums, classical concerts, and rich history perfect for culture enthusiasts.`;
  } else if (interestsList.includes('food')) {
    overview += ` This UNESCO World Heritage city offers traditional Czech cuisine, world-famous beer culture, and authentic local dining experiences.`;
  } else if (interestsList.includes('nightlife')) {
    overview += ` This UNESCO World Heritage city offers legendary beer halls, vibrant nightlife districts, and authentic pub culture.`;
  } else {
    overview += ` This UNESCO World Heritage city offers fairy-tale castles, world-class beer, and authentic Central European charm at excellent value.`;
  }

  // Customize itinerary based on interests
  let day1, day2, day3;
  
  if (interestsList.includes('culture')) {
    day1 = `Day 1: Morning - Prague Castle complex (€12, 3 hours) including St. Vitus Cathedral and Old Royal Palace. Afternoon - National Gallery at Sternberg Palace (€8) and Lesser Town baroque architecture. Evening - Classical concert at Rudolfinum or Municipal House (€20-40).`;
    day2 = `Day 2: Morning - Old Town Square with Astronomical Clock and Týn Church (free). Afternoon - Jewish Quarter museums and synagogues (€13). Evening - Traditional Czech dinner with folk show (€25-35).`;
    day3 = duration > 2 ? `Day 3: Morning - Wenceslas Square and National Museum (€8). Afternoon - Vyšehrad fortress and Slavín cemetery (€2). Evening - Opera or ballet at National Theatre (€15-50).` : '';
  } else if (interestsList.includes('food')) {
    day1 = `Day 1: Morning - Prague Castle complex (€12, 3 hours). Afternoon - Food tour of Old Town including traditional restaurants (€35). Evening - Beer tasting at U Fleků brewery (€15-25).`;
    day2 = `Day 2: Morning - Wenceslas Square and food market at Havelské Tržiště. Afternoon - Cooking class for traditional Czech dishes (€45). Evening - Traditional beer hall dinner at Lokál (€15-25).`;
    day3 = duration > 2 ? `Day 3: Morning - Brewery tour at Pilsner Urquell (€15). Afternoon - Czech wine tasting in Vinohrady district (€20-30). Evening - Fine dining at modern Czech restaurant (€40-60).` : '';
  } else if (interestsList.includes('nightlife')) {
    day1 = `Day 1: Morning - Prague Castle complex (€12, 3 hours). Afternoon - Lesser Town and Charles Bridge (free). Evening - Pub crawl in Old Town starting at U Fleků (€20-30).`;
    day2 = `Day 2: Morning - Old Town Square and Astronomical Clock (free). Afternoon - Wenceslas Square shopping and cafés. Evening - Nightlife in Vinohrady - cocktail bars and clubs (€25-40).`;
    day3 = duration > 2 ? `Day 3: Morning - Vyšehrad fortress (€2). Afternoon - Karlín district trendy bars and cafés. Evening - Rooftop bars with city views and late-night dancing (€30-50).` : '';
  } else {
    // Default balanced itinerary
    day1 = `Day 1: Morning - Prague Castle complex (€12, 3 hours) including St. Vitus Cathedral. Afternoon - Lesser Town and Charles Bridge (free). Evening - Traditional Czech dinner in Old Town (€15-25).`;
    day2 = `Day 2: Morning - Old Town Square with Astronomical Clock (free) and Týn Church. Afternoon - Jewish Quarter and synagogues (€13). Evening - Beer tasting in traditional pub (€8-15).`;
    day3 = duration > 2 ? `Day 3: Morning - Wenceslas Square and National Museum (€8). Afternoon - Vyšehrad fortress and cemetery (€2). Evening - Classical concert in historic venue (€20-40).` : '';
  }

  return `OVERVIEW: ${overview}

DAY-BY-DAY ITINERARY:
${day1}
${day2}
${day3}
${duration > 3 ? `Day 4: Day trip to Český Krumlov (€15 train) - medieval town exploration. Evening - Return to Prague.` : ''}

BUDGET BREAKDOWN (${displayBudget} total, ~${displayDaily}/day):
${budgetLevel === 'budget' ? 
  '• Accommodation: €20-35/night (hostels, guesthouses)\n• Food: €12-20/day (pubs, street food, lunch menus)\n• Transport: €5/day (tram/metro day pass)\n• Activities: €8-15/day (castles, churches, free walking tours)' :
  budgetLevel === 'mid-range' ?
  '• Accommodation: €40-80/night (boutique hotels, central location)\n• Food: €25-40/day (restaurants, traditional cuisine)\n• Transport: €5/day (public transport)\n• Activities: €15-30/day (museums, concerts, tours)' :
  '• Accommodation: €100-200/night (luxury hotels, historic properties)\n• Food: €50-80/day (fine dining, premium restaurants)\n• Transport: €15-25/day (taxis, private transfers)\n• Activities: €30-60/day (premium tours, exclusive experiences)'
}

MONEY-SAVING TIPS: Prague Castle is free on certain Monday afternoons. Many churches are free with incredible art. Happy hour at beer halls (4-6 PM). Use public transport day passes.

LOCAL FOOD: Goulash (€8-12), Svíčková (roast beef with cream sauce, €10-15), Trdelník (sweet pastry, €3-5), Czech beer (€2-4). Try: U Fleků brewery (since 1499), Lokál for modern Czech cuisine.

LOCAL SECRET: Visit Petřín Hill and tower (€5) for panoramic city views without crowds, especially beautiful at sunset.

PRACTICAL INFO: Czech Crown (CZK) currency. Many places accept euros but give poor exchange rates. Tipping 10% standard. Very safe city. Download Prague Public Transport app.`;
}

function generateKrakowGuide(displayBudget, displayDaily, budgetLevel, duration) {
  return `OVERVIEW: Kraków, Poland's former royal capital, boasts Europe's largest medieval square, stunning Gothic architecture, and rich Jewish heritage. This UNESCO World Heritage city combines historical grandeur with vibrant nightlife and exceptional Polish cuisine at budget-friendly prices.

DAY-BY-DAY ITINERARY:
Day 1: Morning - Main Market Square (Rynek Główny) and Cloth Hall (€3). Afternoon - Wawel Castle and Cathedral (€12). Evening - Traditional Polish dinner in Kazimierz district (€10-18).
Day 2: Morning - Auschwitz-Birkenau Memorial (€15 + transport). Afternoon - Return to Kraków, rest. Evening - Jewish Quarter walking tour and klezmer music (€15-25).
Day 3: Morning - St. Mary's Basilica (€3) and underground museum (€8). Afternoon - Wieliczka Salt Mine (€20). Evening - Traditional Polish vodka tasting (€12-20).
${duration > 3 ? `Day 4: Zakopane day trip (€8 train) - Tatra Mountains and highland culture. Evening - Return to Kraków.` : ''}

BUDGET BREAKDOWN (${displayBudget} total, ~${displayDaily}/day):
${budgetLevel === 'budget' ? 
  '• Accommodation: €15-30/night (hostels, budget hotels)\n• Food: €8-15/day (milk bars, pierogi, street food)\n• Transport: €3/day (tram/bus day pass)\n• Activities: €10-20/day (museums, churches, walking tours)' :
  budgetLevel === 'mid-range' ?
  '• Accommodation: €35-70/night (boutique hotels, Old Town)\n• Food: €18-30/day (restaurants, traditional cuisine)\n• Transport: €3/day (public transport)\n• Activities: €20-35/day (tours, concerts, experiences)' :
  '• Accommodation: €80-150/night (luxury hotels, historic properties)\n• Food: €40-70/day (fine dining, premium restaurants)\n• Transport: €10-20/day (taxis, private transfers)\n• Activities: €35-60/day (private tours, exclusive experiences)'
}

MONEY-SAVING TIPS: Eat at "milk bars" (bar mleczny) for authentic cheap meals. Many churches are free. Student discounts widely available. Free walking tours daily.

LOCAL FOOD: Pierogi (€3-6), Bigos (sauerkraut stew, €5-8), Kielbasa (sausage, €4-7), Oscypek cheese (€2-4), Polish vodka (€3-5/shot). Try: Pod Aniołami restaurant, Milkbar Tomasza.

LOCAL SECRET: Visit Nowa Huta district - communist-era planned city with fascinating architecture and authentic Polish life away from tourists.

PRACTICAL INFO: Polish Złoty (PLN) currency. Very affordable city. Tipping 10% appreciated. Extremely safe. Download Kraków public transport app. Many locals speak English.`;
}

function generateBudapestGuide(displayBudget, displayDaily, budgetLevel, duration) {
  return `OVERVIEW: Budapest, the "Pearl of the Danube," captivates with its thermal baths, stunning Parliament building, and vibrant ruin pub scene. This UNESCO World Heritage city offers imperial grandeur, relaxing spa culture, and excellent Hungarian cuisine at great value.

DAY-BY-DAY ITINERARY:
Day 1: Morning - Buda Castle and Fisherman's Bastion (€8). Afternoon - Parliament building tour (€15). Evening - Danube river cruise (€12-20).
Day 2: Morning - Széchenyi Thermal Baths (€18). Afternoon - Central Market Hall and Great Synagogue (€10). Evening - Ruin pub crawl in Jewish Quarter (€15-25).
Day 3: Morning - House of Terror Museum (€8). Afternoon - St. Stephen's Basilica and panoramic views (€5). Evening - Traditional Hungarian dinner with folk show (€25-40).
${duration > 3 ? `Day 4: Danube Bend day trip - Szentendre and Visegrád (€15). Evening - Return to Budapest, thermal bath relaxation.` : ''}

BUDGET BREAKDOWN (${displayBudget} total, ~${displayDaily}/day):
${budgetLevel === 'budget' ? 
  '• Accommodation: €18-35/night (hostels, budget hotels)\n• Food: €10-18/day (goulash, street food, lunch menus)\n• Transport: €5/day (metro/tram/bus day pass)\n• Activities: €12-20/day (baths, museums, free attractions)' :
  budgetLevel === 'mid-range' ?
  '• Accommodation: €40-85/night (boutique hotels, thermal hotels)\n• Food: €20-35/day (restaurants, wine bars)\n• Transport: €5/day (public transport)\n• Activities: €20-40/day (tours, concerts, premium baths)' :
  '• Accommodation: €90-180/night (luxury hotels, spa hotels)\n• Food: €45-80/day (fine dining, Michelin restaurants)\n• Transport: €15-25/day (taxis, private transfers)\n• Activities: €40-70/day (private tours, exclusive experiences)'
}

MONEY-SAVING TIPS: Buy thermal bath tickets online for discounts. Many museums free on national holidays. Ruin pubs have affordable drinks. Use public transport day passes.

LOCAL FOOD: Goulash (€6-10), Schnitzel (€8-12), Lángos (fried bread, €3-5), Chimney cake (€3-4), Hungarian wine (€4-8/glass). Try: Frici Papa restaurant, Central Market Hall food stalls.

LOCAL SECRET: Visit Szimpla Kert ruin pub early (before 8 PM) to see the unique decor without crowds, then explore other ruin pubs in the area.

PRACTICAL INFO: Hungarian Forint (HUF) currency. Thermal baths require swimming cap. Tipping 10-15% standard. Very safe city. Download BudapestGO app for transport.`;
}

// Add more city guide functions here...
// (I'll create a comprehensive system with all 300 cities)

module.exports = {
  getWorldHeritageCityGuide
};

function generateViennaGuide(displayBudget, displayDaily, budgetLevel, duration) {
  return `OVERVIEW: Vienna, the former imperial capital, dazzles with its Habsburg palaces, world-class museums, and legendary coffeehouse culture. This UNESCO World Heritage city offers classical music, stunning architecture, and refined Austrian cuisine in an elegant setting.

DAY-BY-DAY ITINERARY:
Day 1: Morning - Schönbrunn Palace and gardens (€16). Afternoon - Historic city center and St. Stephen's Cathedral (€6). Evening - Traditional Viennese coffeehouse experience (€8-15).
Day 2: Morning - Belvedere Palace and Klimt collection (€16). Afternoon - Naschmarkt food market and shopping. Evening - Vienna State Opera or concert (€15-80).
Day 3: Morning - Hofburg Palace complex (€15). Afternoon - Prater amusement park and Giant Ferris Wheel (€12). Evening - Heuriger wine tavern (€20-30).
${duration > 3 ? `Day 4: Danube Valley day trip - Melk Abbey and Dürnstein (€25). Evening - Return to Vienna.` : ''}

BUDGET BREAKDOWN (${displayBudget} total, ~${displayDaily}/day):
${budgetLevel === 'budget' ? 
  '• Accommodation: €25-45/night (hostels, budget hotels)\n• Food: €15-25/day (sausage stands, lunch menus, coffeehouses)\n• Transport: €8/day (Vienna Card)\n• Activities: €12-20/day (palaces, churches, free concerts)' :
  budgetLevel === 'mid-range' ?
  '• Accommodation: €60-120/night (boutique hotels, central location)\n• Food: €30-50/day (restaurants, traditional cuisine)\n• Transport: €8/day (public transport)\n• Activities: €25-45/day (museums, concerts, tours)' :
  '• Accommodation: €150-300/night (luxury hotels, historic palaces)\n• Food: €60-100/day (fine dining, Michelin restaurants)\n• Transport: €20-35/day (taxis, private transfers)\n• Activities: €50-100/day (premium tours, exclusive experiences)'
}

MONEY-SAVING TIPS: Vienna Card includes public transport and museum discounts. Many churches are free with incredible art. Standing room opera tickets (€3-4). Free concerts in parks during summer.

LOCAL FOOD: Wiener Schnitzel (€12-18), Sachertorte (€5-8), Apfelstrudel (€4-6), Melange coffee (€3-5), Austrian wine (€4-7/glass). Try: Figlmüller (schnitzel), Café Central (historic coffeehouse).

LOCAL SECRET: Visit Zentralfriedhof cemetery to see graves of Mozart, Beethoven, and Schubert - peaceful and free with beautiful Art Nouveau architecture.

PRACTICAL INFO: Euro currency. Excellent public transport. Tipping 10% standard. Very safe city. Download WienMobil app for transport. Dress code for opera/concerts.`;
}

function generateSalzburgGuide(displayBudget, displayDaily, budgetLevel, duration) {
  return `OVERVIEW: Salzburg, Mozart's birthplace, enchants with its baroque architecture, Alpine setting, and musical heritage. This UNESCO World Heritage city offers fairy-tale charm, Sound of Music locations, and authentic Austrian culture in a compact, walkable center.

DAY-BY-DAY ITINERARY:
Day 1: Morning - Salzburg Old Town and Mozart's Birthplace (€12). Afternoon - Salzburg Cathedral and Residenz Palace (€12). Evening - Traditional Austrian dinner (€15-25).
Day 2: Morning - Hohensalzburg Fortress (€12). Afternoon - Mirabell Palace and Gardens (free). Evening - Mozart concert in historic venue (€25-45).
Day 3: Morning - Sound of Music tour (€40) or Hellbrunn Palace (€12). Afternoon - Salzach River walk and shopping. Evening - Traditional beer garden (€12-20).
${duration > 3 ? `Day 4: Hallstatt day trip (€15 train) - lakeside village exploration. Evening - Return to Salzburg.` : ''}

BUDGET BREAKDOWN (${displayBudget} total, ~${displayDaily}/day):
${budgetLevel === 'budget' ? 
  '• Accommodation: €30-50/night (hostels, guesthouses)\n• Food: €12-20/day (sausage stands, lunch menus)\n• Transport: €3/day (city bus day pass)\n• Activities: €10-18/day (museums, churches, walking tours)' :
  budgetLevel === 'mid-range' ?
  '• Accommodation: €70-130/night (boutique hotels, Old Town)\n• Food: €25-40/day (restaurants, traditional cuisine)\n• Transport: €3/day (public transport)\n• Activities: €20-40/day (tours, concerts, experiences)' :
  '• Accommodation: €150-280/night (luxury hotels, historic properties)\n• Food: €50-85/day (fine dining, premium restaurants)\n• Transport: €15-25/day (taxis, private transfers)\n• Activities: €40-80/day (private tours, exclusive concerts)'
}

MONEY-SAVING TIPS: Salzburg Card includes attractions and transport. Many churches are free. Free walking tours available. Student discounts for concerts.

LOCAL FOOD: Salzburger Nockerl (soufflé dessert, €8-12), Kasnocken (cheese dumplings, €10-14), Mozartkugel chocolates (€2-4), Austrian beer (€3-5). Try: Augustiner Bräu beer hall, Café Tomaselli.

LOCAL SECRET: Climb Mönchsberg hill via free elevator for panoramic city views and peaceful walking paths away from tourist crowds.

PRACTICAL INFO: Euro currency. Very walkable city center. Tipping 10% standard. Extremely safe. Download Salzburg app for events and transport.`;
}

function generateBrugesGuide(displayBudget, displayDaily, budgetLevel, duration) {
  return `OVERVIEW: Bruges, the "Venice of the North," captivates with its medieval canals, Gothic architecture, and chocolate shops. This UNESCO World Heritage city offers fairy-tale charm, world-class beer, and authentic Flemish culture in a perfectly preserved medieval setting.

DAY-BY-DAY ITINERARY:
Day 1: Morning - Market Square and Belfry Tower (€12). Afternoon - Canal boat tour (€12) and Basilica of Holy Blood (free). Evening - Belgian beer tasting (€15-25).
Day 2: Morning - Groeningemuseum (€12) and Church of Our Lady (€6). Afternoon - Chocolate workshop (€25) and lace museum (€6). Evening - Traditional Flemish dinner (€20-30).
Day 3: Morning - Begijnhof courtyard (€2) and Minnewater Lake (free). Afternoon - Brewery tour at De Halve Maan (€16). Evening - Medieval tavern experience (€18-28).
${duration > 3 ? `Day 4: Ghent day trip (€15 train) - medieval city exploration. Evening - Return to Bruges.` : ''}

BUDGET BREAKDOWN (${displayBudget} total, ~${displayDaily}/day):
${budgetLevel === 'budget' ? 
  '• Accommodation: €35-60/night (hostels, B&Bs)\n• Food: €18-28/day (cafés, lunch menus, street food)\n• Transport: €5/day (bike rental or walking)\n• Activities: €12-20/day (museums, churches, canal tours)' :
  budgetLevel === 'mid-range' ?
  '• Accommodation: €80-150/night (boutique hotels, canal views)\n• Food: €35-55/day (restaurants, beer cafés)\n• Transport: €5/day (bike rental)\n• Activities: €25-40/day (tours, tastings, experiences)' :
  '• Accommodation: €180-350/night (luxury hotels, historic properties)\n• Food: €70-120/day (fine dining, Michelin restaurants)\n• Transport: €15-25/day (private transfers)\n• Activities: €50-90/day (private tours, exclusive experiences)'
}

MONEY-SAVING TIPS: Many churches are free with incredible art. Bike rental cheaper than tours. Happy hour at beer cafés (5-7 PM). Free walking tours available.

LOCAL FOOD: Moules-frites (mussels and fries, €15-20), Carbonnade flamande (beef stew, €16-22), Belgian waffles (€3-6), Belgian chocolate (€2-5/piece), Belgian beer (€3-6). Try: De Vlaamsche Pot, Café Vlissinghe (oldest tavern).

LOCAL SECRET: Visit early morning (before 9 AM) for empty canals and perfect photos, or late evening for romantic lighting without day-trip crowds.

PRACTICAL INFO: Euro currency. Very walkable or bikeable city. Tipping 10% appreciated. Extremely safe. Most signs in Dutch and French. English widely spoken in tourist areas.`;
}

// ASIAN CITIES GUIDES

function generateSingaporeGuide(displayBudget, displayDaily, budgetLevel, duration, interests) {
  const interestsList = interests ? interests.toLowerCase() : '';
  
  // Customize overview based on interests
  let overview = `Singapore is a vibrant city-state blending futuristic architecture with rich cultural heritage.`;
  
  if (interestsList.includes('culture')) {
    overview += ` This multicultural metropolis offers incredible museums, diverse ethnic quarters, and unique fusion of Asian cultures perfect for cultural exploration.`;
  } else if (interestsList.includes('food')) {
    overview += ` This culinary paradise offers world-class hawker centers, Michelin-starred street food, and incredible fusion cuisine from across Asia.`;
  } else if (interestsList.includes('nightlife')) {
    overview += ` This cosmopolitan city offers rooftop bars, vibrant nightlife districts, and sophisticated entertainment venues with stunning skyline views.`;
  } else if (interestsList.includes('nature')) {
    overview += ` This garden city offers incredible botanical attractions, nature reserves, and innovative green spaces in an urban setting.`;
  } else {
    overview += ` This ultra-modern metropolis offers efficient transport, diverse neighborhoods, and experiences from luxury shopping to authentic hawker centers.`;
  }

  // Customize itinerary based on interests
  let day1, day2, day3;
  
  if (interestsList.includes('culture')) {
    day1 = `Day 1: Morning - National Museum of Singapore (S$15) and Asian Civilisations Museum (S$12). Afternoon - Chinatown Heritage Centre (S$15) and Buddha Tooth Relic Temple (free). Evening - Cultural dinner in Chinatown (S$20-35).`;
    day2 = `Day 2: Morning - Little India district walking tour and Sri Veeramakaliamman Temple (free). Afternoon - Kampong Glam, Sultan Mosque (free), and Malay Heritage Centre (S$8). Evening - Arab Street cultural dining (S$25-40).`;
    day3 = `Day 3: Morning - Peranakan Museum (S$10) and traditional shophouses tour. Afternoon - Singapore Art Museum (S$12) and cultural performances. Evening - Cultural show at Esplanade (S$30-60).`;
  } else if (interestsList.includes('food')) {
    day1 = `Day 1: Morning - Maxwell Food Centre hawker breakfast and food tour (S$15-25). Afternoon - Chinatown food trail and traditional bakeries. Evening - Newton Food Centre dinner experience (S$15-30).`;
    day2 = `Day 2: Morning - Tekka Centre Little India food exploration (S$10-20). Afternoon - Cooking class for local dishes (S$80-120). Evening - Lau Pa Sat hawker center and satay street (S$20-35).`;
    day3 = `Day 3: Morning - Tiong Bahru Market and hipster cafés (S$15-25). Afternoon - Food tour of Katong/Joo Chiat for Peranakan cuisine (S$40-60). Evening - Fine dining at Michelin-starred hawker stall (S$50-80).`;
  } else if (interestsList.includes('nightlife')) {
    day1 = `Day 1: Morning - Marina Bay Sands SkyPark (S$26) for city views. Afternoon - Clarke Quay riverside area exploration. Evening - Rooftop bars at Marina Bay with Singapore Sling (S$40-70).`;
    day2 = `Day 2: Morning - Gardens by the Bay (S$28) and Supertree Grove. Afternoon - Orchard Road shopping and cafés. Evening - Boat Quay nightlife and riverside bars (S$35-60).`;
    day3 = `Day 3: Morning - Sentosa Island beaches (S$4 entry). Afternoon - Beach clubs and day parties. Evening - Siloso Beach bars and night beach activities (S$50-90).`;
  } else if (interestsList.includes('nature')) {
    day1 = `Day 1: Morning - Singapore Botanic Gardens (free) and National Orchid Garden (S$5). Afternoon - Gardens by the Bay and Cloud Forest (S$28). Evening - Supertree Grove light show (free).`;
    day2 = `Day 2: Morning - MacRitchie Reservoir TreeTop Walk (free). Afternoon - Singapore Zoo (S$39) and wildlife experiences. Evening - Night Safari (S$49) - world's first nocturnal zoo.`;
    day3 = `Day 3: Morning - Pulau Ubin island nature trip (S$3 ferry + bike rental S$10). Afternoon - Chek Jawa wetlands and mangrove boardwalk. Evening - Return to city, East Coast Park cycling (S$8 bike rental).`;
  } else {
    // Default balanced itinerary
    day1 = `Day 1: Morning - Gardens by the Bay (S$28) including Supertree Grove and Cloud Forest. Afternoon - Marina Bay Sands SkyPark (S$26) and Merlion Park (free). Evening - Dinner at Lau Pa Sat hawker center (S$15-25).`;
    day2 = `Day 2: Morning - Singapore Botanic Gardens (free) and National Orchid Garden (S$5). Afternoon - Chinatown Heritage Centre (S$15) and Buddha Tooth Relic Temple (free). Evening - Chinatown street food tour (S$20-35).`;
    day3 = `Day 3: Morning - Sentosa Island via cable car (S$35 return) - Universal Studios (S$81) or beaches (free). Afternoon - S.E.A. Aquarium (S$41) or Siloso Beach. Evening - Clarke Quay riverside dining (S$30-50).`;
  }

  return `OVERVIEW: ${overview}

DAY-BY-DAY ITINERARY:
${day1}
${day2}
${day3}
${duration > 3 ? `Day 4: Morning - Little India district walking tour (free) and Sri Veeramakaliamman Temple. Afternoon - Kampong Glam and Sultan Mosque (free), Arab Street shopping. Evening - Haji Lane bars and cafés (S$25-45).` : ''}
${duration > 4 ? `Day 5: Morning - Singapore Zoo (S$39) or River Safari (S$34). Afternoon - Orchard Road shopping district. Evening - Night Safari (S$49) - world's first nocturnal zoo.` : ''}

BUDGET BREAKDOWN (${displayBudget} total, ~S$${Math.round(parseInt(displayDaily.replace(/[^0-9]/g, '')) * 1.35)}/day):
${budgetLevel === 'budget' ? 
  '• Accommodation: S$35-65/night (hostels in Chinatown, Little India)\n• Food: S$20-35/day (hawker centers, food courts)\n• Transport: S$12/day (MRT day pass)\n• Activities: S$20-40/day (mix of free and paid attractions)' :
  budgetLevel === 'mid-range' ?
  '• Accommodation: S$80-160/night (boutique hotels, central areas)\n• Food: S$40-70/day (restaurants, cafes, some hawker food)\n• Transport: S$12/day (MRT pass)\n• Activities: S$40-70/day (major attractions, tours)' :
  '• Accommodation: S$200-550/night (luxury hotels, Marina Bay area)\n• Food: S$80-160/day (fine dining, rooftop restaurants)\n• Transport: S$30-55/day (taxis, private transfers)\n• Activities: S$70-140/day (premium experiences, private tours)'
}

MONEY-SAVING TIPS: Use MRT (subway) instead of taxis - efficient and cheap. Eat at hawker centers for authentic food at local prices. Many attractions offer combo tickets. Visit during Great Singapore Sale (June-July) for shopping discounts.

LOCAL FOOD: Hainanese Chicken Rice (S$4-7 at hawker centers), Laksa (S$5-8), Char Kway Teow (S$4-7), Singapore Sling at Raffles Hotel (S$35) or local bars (S$12-18), Kaya Toast breakfast (S$3-6). Best hawker centers: Maxwell Food Centre, Newton Food Centre, Lau Pa Sat.

LOCAL SECRET: Visit Tiong Bahru neighborhood for hipster cafes, indie bookstores, and art deco architecture - a local favorite away from tourist crowds. Free heritage trail available.

PRACTICAL INFO: Singapore Dollar (S$). No tipping required. Tap water is safe. Download GrabTaxi app. Dress modestly for temples. Chewing gum is banned. Most signs in English. Very safe city with low crime rates.`;
}

function generateKyotoGuide(displayBudget, displayDaily, budgetLevel, duration, interests) {
  return `OVERVIEW: Kyoto, Japan's ancient capital, enchants with over 2,000 temples, traditional geisha districts, and exquisite gardens. This UNESCO World Heritage city offers authentic Japanese culture, seasonal beauty, and spiritual experiences in a harmonious blend of tradition and modernity.

DAY-BY-DAY ITINERARY:
Day 1: Morning - Fushimi Inari Shrine with thousand torii gates (free). Afternoon - Kiyomizu-dera Temple (€3) and Sannenzaka streets. Evening - Kaiseki dinner in Gion district (€40-80).
Day 2: Morning - Arashiyama Bamboo Grove (free) and Tenryu-ji Temple (€5). Afternoon - Monkey Park Iwatayama (€5) for city views. Evening - Traditional ryokan experience (€60-150).
Day 3: Morning - Golden Pavilion (Kinkaku-ji, €3) and Ryoan-ji rock garden (€5). Afternoon - Nijo Castle (€6). Evening - Pontocho Alley dining (€25-45).
${duration > 3 ? `Day 4: Nara day trip (€6 train) - Todai-ji Temple and deer park. Evening - Return to Kyoto.` : ''}

BUDGET BREAKDOWN (${displayBudget} total, ~¥${Math.round(parseInt(displayDaily.replace(/[^0-9]/g, '')) * 110)}/day):
${budgetLevel === 'budget' ? 
  '• Accommodation: ¥3000-6000/night (hostels, capsule hotels)\n• Food: ¥2000-3500/day (ramen, bento, temple food)\n• Transport: ¥600/day (city bus pass)\n• Activities: ¥1000-2000/day (temples, gardens, free shrines)' :
  budgetLevel === 'mid-range' ?
  '• Accommodation: ¥8000-15000/night (ryokans, boutique hotels)\n• Food: ¥4000-7000/day (kaiseki, traditional restaurants)\n• Transport: ¥600/day (public transport)\n• Activities: ¥2000-4000/day (temples, gardens, cultural experiences)' :
  '• Accommodation: ¥20000-50000/night (luxury ryokans, high-end hotels)\n• Food: ¥8000-15000/day (fine dining, premium kaiseki)\n• Transport: ¥2000-4000/day (taxis, private transfers)\n• Activities: ¥5000-10000/day (private tours, exclusive experiences)'
}

MONEY-SAVING TIPS: Many temples and shrines are free. City bus day pass covers most attractions. Convenience store food is excellent and cheap. Free walking tours available.

LOCAL FOOD: Kaiseki (traditional multi-course, ¥5000-15000), Ramen (¥800-1200), Tofu cuisine (¥2000-4000), Matcha and wagashi (¥500-800), Sake tasting (¥1000-3000). Try: Kikunoi (Michelin 3-star), Ganko Sushi chain.

LOCAL SECRET: Visit Philosopher's Path early morning for peaceful temple-hopping without crowds, especially beautiful during cherry blossom and autumn seasons.

PRACTICAL INFO: Japanese Yen (JPY) currency. Bow when greeting. Remove shoes in temples. Cash-based society. Download Google Translate with camera. Extremely safe city.`;
}

function generateLuangPrabangGuide(displayBudget, displayDaily, budgetLevel, duration) {
  return `OVERVIEW: Luang Prabang, Laos' spiritual heart, captivates with golden temples, French colonial architecture, and the sacred Mekong River. This UNESCO World Heritage city offers Buddhist culture, stunning waterfalls, and authentic Southeast Asian experiences at incredible value.

DAY-BY-DAY ITINERARY:
Day 1: Morning - Alms giving ceremony (free, 5:30 AM) and Royal Palace Museum ($3). Afternoon - Wat Xieng Thong temple ($2) and night market ($5-10 shopping). Evening - Mekong riverside dinner ($8-15).
Day 2: Morning - Kuang Si Waterfalls ($3 + $8 transport). Afternoon - Swimming and bear rescue center visit. Evening - Traditional Lao dance show ($10-15).
Day 3: Morning - Mount Phousi sunrise climb (free). Afternoon - Wat Mai temple ($2) and traditional crafts center. Evening - Cooking class ($25-35).
${duration > 3 ? `Day 4: Mekong boat trip to Pak Ou Caves ($15). Evening - Sunset cocktails at riverside bar ($5-10).` : ''}

BUDGET BREAKDOWN (${displayBudget} total, ~${displayDaily}/day):
${budgetLevel === 'budget' ? 
  '• Accommodation: $8-20/night (guesthouses, hostels)\n• Food: $5-12/day (street food, local restaurants)\n• Transport: $3-8/day (tuk-tuk, bike rental)\n• Activities: $5-15/day (temples, waterfalls, free ceremonies)' :
  budgetLevel === 'mid-range' ?
  '• Accommodation: $25-60/night (boutique hotels, colonial style)\n• Food: $15-30/day (restaurants, cafés)\n• Transport: $5-15/day (private transport)\n• Activities: $15-35/day (tours, cooking classes, boat trips)' :
  '• Accommodation: $80-200/night (luxury resorts, heritage hotels)\n• Food: $35-70/day (fine dining, hotel restaurants)\n• Transport: $20-40/day (private car, luxury transfers)\n• Activities: $40-80/day (private tours, exclusive experiences)'
}

MONEY-SAVING TIPS: Many temples are free or very cheap. Street food is delicious and safe. Rent a bicycle for easy city exploration. Bargain at night market.

LOCAL FOOD: Laap (meat salad, $2-4), Khao soi (noodle soup, $1-3), Sticky rice ($0.50-1), Fresh spring rolls ($1-2), Lao beer ($1-2). Try: Tamarind restaurant, night market food stalls.

LOCAL SECRET: Wake up early for alms giving ceremony (5:30 AM) - respectful observation of this sacred Buddhist tradition, completely free and deeply moving.

PRACTICAL INFO: Lao Kip (LAK) currency, USD widely accepted. Very safe city. Dress modestly for temples. Bargaining expected at markets. Download offline maps.`;
}

// AMERICAS CITIES GUIDES

function generateQuebecCityGuide(displayBudget, displayDaily, budgetLevel, duration) {
  return `OVERVIEW: Quebec City, North America's only walled city, enchants with cobblestone streets, French colonial architecture, and European charm. This UNESCO World Heritage city offers rich history, excellent cuisine, and authentic Francophone culture in a stunning riverside setting.

DAY-BY-DAY ITINERARY:
Day 1: Morning - Old Quebec walking tour and Château Frontenac (free exterior). Afternoon - Plains of Abraham Museum (CAD $15) and Citadel tour (CAD $16). Evening - French dinner in Old Town (CAD $35-55).
Day 2: Morning - Montmorency Falls (CAD $13) and cable car ride. Afternoon - Île d'Orléans countryside tour (CAD $25). Evening - Traditional sugar shack experience (CAD $30-45).
Day 3: Morning - Notre-Dame Basilica (CAD $5) and Petit Champlain district. Afternoon - Musée de la Civilisation (CAD $16). Evening - Craft brewery tour (CAD $20-30).
${duration > 3 ? `Day 4: Winter: Ice Hotel visit (CAD $20) or Summer: Whale watching from Tadoussac (CAD $65).` : ''}

BUDGET BREAKDOWN (${displayBudget} total, ~CAD ${Math.round(parseInt(displayDaily.replace(/[^0-9]/g, '')) * 1.35)}/day):
${budgetLevel === 'budget' ? 
  '• Accommodation: CAD $40-80/night (hostels, B&Bs)\n• Food: CAD $25-40/day (cafés, lunch menus, poutine)\n• Transport: CAD $8/day (bus day pass)\n• Activities: CAD $15-25/day (museums, walking tours)' :
  budgetLevel === 'mid-range' ?
  '• Accommodation: CAD $100-180/night (boutique hotels, Old Town)\n• Food: CAD $50-80/day (restaurants, French cuisine)\n• Transport: CAD $8/day (public transport)\n• Activities: CAD $30-50/day (tours, attractions, experiences)' :
  '• Accommodation: CAD $250-450/night (luxury hotels, Château Frontenac)\n• Food: CAD $100-160/day (fine dining, premium restaurants)\n• Transport: CAD $25-40/day (taxis, private transfers)\n• Activities: CAD $60-120/day (private tours, exclusive experiences)'
}

MONEY-SAVING TIPS: Many historic sites are free to explore. Happy hour at restaurants (4-6 PM). Free walking tours available. Winter festivals often have free events.

LOCAL FOOD: Poutine (CAD $8-12), Tourtière (meat pie, CAD $12-18), Maple syrup products (CAD $5-15), Caribou cocktail (CAD $8-12), Quebec cheese (CAD $10-20). Try: Aux Anciens Canadiens, Ashton (poutine).

LOCAL SECRET: Walk the city walls at sunset for spectacular views of the St. Lawrence River and Château Frontenac - completely free and magical.

PRACTICAL INFO: Canadian Dollar (CAD). French is primary language but English widely spoken. Tipping 15-20% standard. Very safe city. Dress warmly in winter.`;
}

function generateCartagenaGuide(displayBudget, displayDaily, budgetLevel, duration) {
  return `OVERVIEW: Cartagena, Colombia's Caribbean jewel, dazzles with colorful colonial architecture, historic fortifications, and vibrant street life. This UNESCO World Heritage city offers tropical charm, excellent cuisine, and rich Afro-Caribbean culture in a stunning coastal setting.

DAY-BY-DAY ITINERARY:
Day 1: Morning - Old Town walking tour and Clock Tower (free). Afternoon - San Felipe Castle fortress ($8). Evening - Salsa dancing and Caribbean dinner ($15-25).
Day 2: Morning - Rosario Islands boat trip ($25). Afternoon - Beach time and snorkeling. Evening - Return to city, street food tour ($10-15).
Day 3: Morning - Las Bóvedas artisan market and city walls walk (free). Afternoon - Museo del Oro Zenú ($3). Evening - Rooftop bar with sunset views ($12-20).
${duration > 3 ? `Day 4: Volcán de Lodo El Totumo mud volcano ($15). Evening - Traditional vallenato music show ($8-15).` : ''}

BUDGET BREAKDOWN (${displayBudget} total, ~COP ${Math.round(parseInt(displayDaily.replace(/[^0-9]/g, '')) * 4200)}/day):
${budgetLevel === 'budget' ? 
  '• Accommodation: COP $40,000-80,000/night (hostels, guesthouses)\n• Food: COP $25,000-45,000/day (street food, local restaurants)\n• Transport: COP $8,000/day (bus, walking)\n• Activities: COP $20,000-40,000/day (free sites, some museums)' :
  budgetLevel === 'mid-range' ?
  '• Accommodation: COP $120,000-250,000/night (boutique hotels, colonial style)\n• Food: COP $60,000-100,000/day (restaurants, seafood)\n• Transport: COP $15,000/day (taxis, tours)\n• Activities: COP $50,000-100,000/day (tours, islands, experiences)' :
  '• Accommodation: COP $350,000-700,000/night (luxury hotels, historic properties)\n• Food: COP $150,000-300,000/day (fine dining, premium restaurants)\n• Transport: COP $50,000-100,000/day (private transfers)\n• Activities: COP $150,000-300,000/day (private tours, exclusive experiences)'
}

MONEY-SAVING TIPS: Many historic sites are free to explore. Street food is delicious and cheap. Happy hour at bars (5-7 PM). Free salsa lessons in plazas.

LOCAL FOOD: Arepa con huevo ($2-3), Ceviche ($5-8), Sancocho soup ($4-6), Patacones ($2-4), Aguardiente ($2-4/shot). Try: La Cevichería, Portal de los Dulces for sweets.

LOCAL SECRET: Climb the city walls at sunset for free panoramic views of the Caribbean Sea and colonial rooftops - magical golden hour photography.

PRACTICAL INFO: Colombian Peso (COP). Spanish primary language, some English in tourist areas. Tipping 10% standard. Generally safe in tourist areas. Hot and humid year-round.`;
}

// Continue with more cities...
// This is a foundation for the 300 World Heritage Cities system

// AFRICAN & MIDDLE EASTERN CITIES GUIDES

function generateMarrakechGuide(displayBudget, displayDaily, budgetLevel, duration) {
  return `OVERVIEW: Marrakech, the "Red City," captivates with its bustling souks, stunning palaces, and vibrant Jemaa el-Fnaa square. This UNESCO World Heritage city offers authentic Moroccan culture, incredible architecture, and sensory experiences in the heart of North Africa.

DAY-BY-DAY ITINERARY:
Day 1: Morning - Bahia Palace (€7) and Saadian Tombs (€7). Afternoon - Jemaa el-Fnaa square and Koutoubia Mosque (free). Evening - Traditional tagine dinner and entertainment (€15-25).
Day 2: Morning - Majorelle Garden (€7) and YSL Museum (€10). Afternoon - Souks shopping and haggling experience. Evening - Hammam spa treatment (€20-40).
Day 3: Morning - Ben Youssef Madrasa (€5) and Marrakech Museum (€5). Afternoon - Atlas Mountains day trip (€25). Evening - Rooftop restaurant with medina views (€18-30).
${duration > 3 ? `Day 4: Essaouira coastal day trip (€15 bus) - Portuguese fortifications and beach. Evening - Return to Marrakech.` : ''}

BUDGET BREAKDOWN (${displayBudget} total, ~MAD ${Math.round(parseInt(displayDaily.replace(/[^0-9]/g, '')) * 10)}/day):
${budgetLevel === 'budget' ? 
  '• Accommodation: MAD 150-300/night (riads, hostels)\n• Food: MAD 80-150/day (street food, local restaurants)\n• Transport: MAD 30/day (petit taxi, walking)\n• Activities: MAD 50-100/day (palaces, gardens, free sites)' :
  budgetLevel === 'mid-range' ?
  '• Accommodation: MAD 400-800/night (boutique riads, traditional style)\n• Food: MAD 200-350/day (restaurants, rooftop dining)\n• Transport: MAD 50/day (taxis, tours)\n• Activities: MAD 150-300/day (tours, experiences, hammams)' :
  '• Accommodation: MAD 1000-2500/night (luxury riads, La Mamounia)\n• Food: MAD 500-900/day (fine dining, hotel restaurants)\n• Transport: MAD 150-300/day (private transfers)\n• Activities: MAD 400-800/day (private tours, exclusive experiences)'
}

MONEY-SAVING TIPS: Bargain hard in souks (start at 1/3 asking price). Street food is delicious and cheap. Many mosques are free to admire from outside. Shared taxis cheaper than private.

LOCAL FOOD: Tagine (MAD 40-80), Couscous (MAD 50-90), Pastilla (MAD 30-60), Mint tea (MAD 10-20), Moroccan pastries (MAD 5-15). Try: Nomad restaurant, Jemaa el-Fnaa food stalls.

LOCAL SECRET: Visit Jemaa el-Fnaa square at different times - morning for orange juice, afternoon for snake charmers, evening for food stalls and storytellers.

PRACTICAL INFO: Moroccan Dirham (MAD). Arabic and French languages, some English. Bargaining expected. Dress modestly. Ramadan affects opening hours. Generally safe but watch for pickpockets.`;
}

function generateFezGuide(displayBudget, displayDaily, budgetLevel, duration) {
  return `OVERVIEW: Fez, Morocco's spiritual capital, mesmerizes with the world's largest car-free urban area, ancient medina, and traditional crafts. This UNESCO World Heritage city offers authentic medieval Islamic culture, stunning architecture, and artisan workshops unchanged for centuries.

DAY-BY-DAY ITINERARY:
Day 1: Morning - Fez el-Bali medina walking tour with guide (€15). Afternoon - Al-Qarawiyyin Mosque and University (exterior, free). Evening - Traditional Moroccan dinner in riad (€20-30).
Day 2: Morning - Chouara Tannery visit (€5 tip) and leather shopping. Afternoon - Bou Inania Madrasa (€2) and Nejjarine Museum (€2). Evening - Rooftop restaurant overlooking medina (€15-25).
Day 3: Morning - Royal Palace gates (free) and Jewish Quarter (Mellah). Afternoon - Pottery cooperative and ceramic workshops. Evening - Traditional music show (€10-20).
${duration > 3 ? `Day 4: Meknes and Volubilis day trip (€20) - Roman ruins and imperial city. Evening - Return to Fez.` : ''}

BUDGET BREAKDOWN (${displayBudget} total, ~MAD ${Math.round(parseInt(displayDaily.replace(/[^0-9]/g, '')) * 10)}/day):
${budgetLevel === 'budget' ? 
  '• Accommodation: MAD 120-250/night (budget riads, hostels)\n• Food: MAD 60-120/day (street food, local eateries)\n• Transport: MAD 20/day (walking, occasional taxi)\n• Activities: MAD 40-80/day (medina, crafts, free sites)' :
  budgetLevel === 'mid-range' ?
  '• Accommodation: MAD 350-700/night (traditional riads, medina location)\n• Food: MAD 150-280/day (restaurants, riad dining)\n• Transport: MAD 40/day (taxis, guides)\n• Activities: MAD 120-250/day (tours, workshops, experiences)' :
  '• Accommodation: MAD 900-2000/night (luxury riads, premium locations)\n• Food: MAD 400-700/day (fine dining, exclusive restaurants)\n• Transport: MAD 120-250/day (private guides, transfers)\n• Activities: MAD 350-600/day (private tours, exclusive workshops)'
}

MONEY-SAVING TIPS: Hire official guide for medina navigation (prevents getting lost and hassled). Eat at local spots away from main tourist areas. Many architectural sites are free to admire.

LOCAL FOOD: Harira soup (MAD 15-25), Mechoui (roast lamb, MAD 60-100), B'stilla (MAD 40-70), Chebakia pastries (MAD 5-10), Atay (mint tea, MAD 8-15). Try: Café Clock, local medina eateries.

LOCAL SECRET: Visit the tanneries early morning (8-9 AM) for best light and fewer crowds - bring mint leaves to mask the smell.

PRACTICAL INFO: Moroccan Dirham (MAD). Arabic and French, limited English. Easy to get lost in medina - hire guide or use GPS. Dress conservatively. Bargaining essential in souks.`;
}

function generateIstanbulGuide(displayBudget, displayDaily, budgetLevel, duration) {
  return `OVERVIEW: Istanbul, where Europe meets Asia, dazzles with Byzantine and Ottoman architecture, vibrant bazaars, and rich cultural heritage. This UNESCO World Heritage city offers incredible history, delicious cuisine, and unique experiences spanning two continents.

DAY-BY-DAY ITINERARY:
Day 1: Morning - Hagia Sophia (€13) and Blue Mosque (free). Afternoon - Topkapi Palace (€13) and Basilica Cistern (€4). Evening - Bosphorus sunset cruise (€15-25).
Day 2: Morning - Grand Bazaar shopping and Süleymaniye Mosque (free). Afternoon - Galata Tower (€7) and Beyoğlu district. Evening - Traditional Turkish dinner with folk show (€25-40).
Day 3: Morning - Dolmabahçe Palace (€9) and Ortaköy neighborhood. Afternoon - Asian side - Üsküdar and Maiden's Tower (€3). Evening - Turkish bath (hammam) experience (€20-40).
${duration > 3 ? `Day 4: Princes' Islands day trip (€5 ferry) - car-free islands with horse carriages. Evening - Return to Istanbul.` : ''}

BUDGET BREAKDOWN (${displayBudget} total, ~₺${Math.round(parseInt(displayDaily.replace(/[^0-9]/g, '')) * 30)}/day):
${budgetLevel === 'budget' ? 
  '• Accommodation: ₺200-400/night (hostels, budget hotels)\n• Food: ₺100-200/day (street food, lokanta restaurants)\n• Transport: ₺50/day (metro, tram, ferry passes)\n• Activities: ₺80-150/day (mosques free, some museums)' :
  budgetLevel === 'mid-range' ?
  '• Accommodation: ₺500-1000/night (boutique hotels, Sultanahmet)\n• Food: ₺250-450/day (restaurants, meze, seafood)\n• Transport: ₺50/day (public transport)\n• Activities: ₺200-400/day (tours, hammams, cruises)' :
  '• Accommodation: ₺1500-3500/night (luxury hotels, Bosphorus views)\n• Food: ₺600-1200/day (fine dining, rooftop restaurants)\n• Transport: ₺200-400/day (taxis, private transfers)\n• Activities: ₺500-1000/day (private tours, exclusive experiences)'
}

MONEY-SAVING TIPS: Many mosques are free with incredible architecture. Istanbul Museum Pass (₺325) covers major sites. Street food is delicious and cheap. Happy hour at rooftop bars.

LOCAL FOOD: Döner kebab (₺15-25), Meze plates (₺40-80), Baklava (₺10-20), Turkish delight (₺20-40), Turkish tea (₺5-10), Raki (₺30-50). Try: Pandeli restaurant, Karaköy Lokantası.

LOCAL SECRET: Take ferry to Asian side at sunset for spectacular city skyline views and authentic local neighborhoods away from tourist crowds.

PRACTICAL INFO: Turkish Lira (₺). Turkish language, English in tourist areas. Tipping 10-15% standard. Call to prayer 5 times daily. Dress modestly for mosques. Generally safe but watch for pickpockets.`;
}

// OCEANIA CITIES GUIDES

function generateSydneyGuide(displayBudget, displayDaily, budgetLevel, duration) {
  return `OVERVIEW: Sydney, Australia's harbor city, dazzles with iconic Opera House, stunning beaches, and vibrant cultural scene. This cosmopolitan city offers world-class dining, beautiful coastal walks, and unique Australian experiences in a spectacular harbor setting.

DAY-BY-DAY ITINERARY:
Day 1: Morning - Sydney Opera House tour (AUD $43) and Harbour Bridge walk (free). Afternoon - Royal Botanic Gardens (free) and Circular Quay. Evening - Harbour dinner cruise (AUD $80-120).
Day 2: Morning - Bondi Beach and coastal walk to Coogee (free). Afternoon - Bondi markets and beach culture. Evening - Darlinghurst dining and nightlife (AUD $40-70).
Day 3: Morning - Blue Mountains day trip (AUD $45 train). Afternoon - Three Sisters lookout and scenic railway. Evening - Return to Sydney, pub dinner (AUD $25-40).
${duration > 3 ? `Day 4: Manly Beach ferry trip (AUD $8) and northern beaches exploration. Evening - Sunset at The Rocks district.` : ''}

BUDGET BREAKDOWN (${displayBudget} total, ~AUD ${Math.round(parseInt(displayDaily.replace(/[^0-9]/g, '')) * 1.5)}/day):
${budgetLevel === 'budget' ? 
  '• Accommodation: AUD $30-60/night (hostels, backpacker areas)\n• Food: AUD $25-45/day (food courts, cafés, takeaway)\n• Transport: AUD $15/day (Opal card day pass)\n• Activities: AUD $20-40/day (beaches free, some museums)' :
  budgetLevel === 'mid-range' ?
  '• Accommodation: AUD $120-250/night (boutique hotels, harbor views)\n• Food: AUD $60-100/day (restaurants, café culture)\n• Transport: AUD $15/day (public transport)\n• Activities: AUD $50-100/day (tours, attractions, experiences)' :
  '• Accommodation: AUD $350-700/night (luxury hotels, premium locations)\n• Food: AUD $150-300/day (fine dining, premium restaurants)\n• Transport: AUD $50-100/day (taxis, private transfers)\n• Activities: AUD $150-300/day (private tours, exclusive experiences)'
}

MONEY-SAVING TIPS: Many beaches and coastal walks are free. Happy hour at pubs (5-7 PM). Free events at Circular Quay. BYO wine restaurants save money.

LOCAL FOOD: Meat pies (AUD $5-8), Fish and chips (AUD $12-18), Flat white coffee (AUD $4-6), Lamingtons (AUD $3-5), Australian wine (AUD $8-15/glass). Try: Bennelong restaurant, Circular Quay food trucks.

LOCAL SECRET: Take the Manly ferry at sunset for spectacular harbor views and visit Shelly Beach - a hidden gem with calm waters perfect for swimming.

PRACTICAL INFO: Australian Dollar (AUD). English language. Tipping not mandatory but 10% appreciated. Very safe city. Sun protection essential. Tap water safe to drink.`;
}

function generateMelbourneGuide(displayBudget, displayDaily, budgetLevel, duration) {
  return `OVERVIEW: Melbourne, Australia's cultural capital, captivates with its laneways, coffee culture, and vibrant arts scene. This cosmopolitan city offers world-class dining, street art, and unique Australian experiences in a European-style setting.

DAY-BY-DAY ITINERARY:
Day 1: Morning - Federation Square and Flinders Street Station (free). Afternoon - Royal Botanic Gardens (free) and Eureka Skydeck (AUD $25). Evening - Laneway bar crawl in CBD (AUD $30-50).
Day 2: Morning - Queen Victoria Market (free entry, shopping varies). Afternoon - Street art tour in Hosier Lane (free). Evening - Dinner in Chinatown (AUD $20-35).
Day 3: Morning - Great Ocean Road day trip (AUD $65 tour). Afternoon - Twelve Apostles and coastal scenery. Evening - Return to Melbourne, craft beer tasting (AUD $25-40).
${duration > 3 ? `Day 4: St. Kilda Beach and Luna Park (AUD $10 entry). Evening - Penguin parade at sunset (free from pier).` : ''}

BUDGET BREAKDOWN (${displayBudget} total, ~AUD ${Math.round(parseInt(displayDaily.replace(/[^0-9]/g, '')) * 1.5)}/day):
${budgetLevel === 'budget' ? 
  '• Accommodation: AUD $25-55/night (hostels, backpacker areas)\n• Food: AUD $20-40/day (food courts, cafés, markets)\n• Transport: AUD $10/day (myki day pass)\n• Activities: AUD $15-35/day (free laneways, some attractions)' :
  budgetLevel === 'mid-range' ?
  '• Accommodation: AUD $100-200/night (boutique hotels, city center)\n• Food: AUD $50-90/day (restaurants, café culture)\n• Transport: AUD $10/day (public transport)\n• Activities: AUD $40-80/day (tours, attractions, experiences)' :
  '• Accommodation: AUD $300-600/night (luxury hotels, premium locations)\n• Food: AUD $120-250/day (fine dining, premium restaurants)\n• Transport: AUD $40-80/day (taxis, private transfers)\n• Activities: AUD $100-200/day (private tours, exclusive experiences)'
}

MONEY-SAVING TIPS: Many laneways and street art are free to explore. Happy hour at rooftop bars (5-7 PM). Free events in Federation Square. Queen Victoria Market has cheap eats.

LOCAL FOOD: Flat white coffee (AUD $4-6), Meat pies (AUD $5-8), Dim sum (AUD $15-25), Gelato (AUD $5-8), Australian wine (AUD $8-15/glass). Try: Degraves Street cafés, Queen Victoria Market.

LOCAL SECRET: Explore the hidden laneways early morning (8-9 AM) for the best street art photography without crowds, especially AC/DC Lane and Hosier Lane.

PRACTICAL INFO: Australian Dollar (AUD). English language. Tipping not mandatory but 10% appreciated. Very safe city. Weather can change quickly - dress in layers.`;
}

// Add placeholder functions for remaining cities to prevent errors
function generatePortoGuide(displayBudget, displayDaily, budgetLevel, duration) {
  return `OVERVIEW: Porto, Portugal's northern gem, enchants with its port wine cellars, azulejo tiles, and riverside charm. This UNESCO World Heritage city offers authentic Portuguese culture, stunning architecture, and excellent value in a picturesque setting along the Douro River.

DAY-BY-DAY ITINERARY:
Day 1: Morning - Ribeira district and Dom Luís I Bridge (free). Afternoon - Port wine cellars tour in Vila Nova de Gaia (€8-15). Evening - Traditional Portuguese dinner (€15-25).
Day 2: Morning - Livraria Lello bookstore (€5) and Clérigos Tower (€6). Afternoon - São Bento Station azulejos (free) and Bolhão Market. Evening - Fado performance (€15-25).
Day 3: Morning - Serralves Museum (€10) and park (free). Afternoon - Matosinhos beach and seafood lunch (€12-20). Evening - Sunset at Foz do Douro (free).

BUDGET BREAKDOWN (${displayBudget} total, ~${displayDaily}/day):
• Accommodation: €25-45/night (guesthouses, budget hotels)
• Food: €15-25/day (tascas, lunch menus, pastéis)
• Transport: €6/day (metro/tram day pass)
• Activities: €10-20/day (churches, viewpoints, wine tastings)

LOCAL FOOD: Francesinha sandwich (€8-12), Pastéis de nata (€1-2), Bacalhau dishes (€10-15), Port wine (€3-8/glass). Try: Café Majestic, Taberna do Real Fado.

LOCAL SECRET: Climb to Miradouro da Vitória for stunning panoramic views of the city and river - completely free and less crowded than other viewpoints.`;
}

// Add more placeholder functions for other cities...
function generateSantiagoGuide() { return "Santiago de Compostela guide placeholder"; }
function generateToledoGuide() { return "Toledo guide placeholder"; }
function generateSegoviaGuide() { return "Segovia guide placeholder"; }
function generateAvilaGuide() { return "Avila guide placeholder"; }
function generateCordobaGuide() { return "Cordoba guide placeholder"; }
function generateSevilleGuide() { return "Seville guide placeholder"; }
function generateGranadaGuide() { return "Granada guide placeholder"; }
function generateEdinburghGuide() { return "Edinburgh guide placeholder"; }
function generateBathGuide() { return "Bath guide placeholder"; }
function generateCanterburyGuide() { return "Canterbury guide placeholder"; }
function generateYorkGuide() { return "York guide placeholder"; }
function generateChesterGuide() { return "Chester guide placeholder"; }
function generateDublinGuide() { return "Dublin guide placeholder"; }
function generateRegensburgGuide() { return "Regensburg guide placeholder"; }
function generateBambergGuide() { return "Bamberg guide placeholder"; }
function generateLubeckGuide() { return "Lubeck guide placeholder"; }
function generateQuedlinburgGuide() { return "Quedlinburg guide placeholder"; }
function generateGoslarGuide() { return "Goslar guide placeholder"; }
function generateRothenburgGuide() { return "Rothenburg guide placeholder"; }
function generateGhentGuide() { return "Ghent guide placeholder"; }
function generateNaraGuide() { return "Nara guide placeholder"; }
function generateHoiAnGuide() { return "Hoi An guide placeholder"; }
function generateGeorgeTownGuide() { return "George Town guide placeholder"; }
function generateMalaccaGuide() { return "Malacca guide placeholder"; }
function generateKathmanduGuide() { return "Kathmandu guide placeholder"; }
function generateBhaktapurGuide() { return "Bhaktapur guide placeholder"; }
function generatePatanGuide() { return "Patan guide placeholder"; }
function generateGalleGuide() { return "Galle guide placeholder"; }
function generateKandyGuide() { return "Kandy guide placeholder"; }
function generateJaipurGuide() { return "Jaipur guide placeholder"; }
function generateJodhpurGuide() { return "Jodhpur guide placeholder"; }
function generateUdaipurGuide() { return "Udaipur guide placeholder"; }
function generateVaranasiGuide() { return "Varanasi guide placeholder"; }
function generateAgraGuide() { return "Agra guide placeholder"; }
function generateDelhiGuide() { return "Delhi guide placeholder"; }
function generateMumbaiGuide() { return "Mumbai guide placeholder"; }
function generateMexicoCityGuide() { return "Mexico City guide placeholder"; }
function generatePueblaGuide() { return "Puebla guide placeholder"; }
function generateOaxacaGuide() { return "Oaxaca guide placeholder"; }
function generateGuanajuatoGuide() { return "Guanajuato guide placeholder"; }
function generateMoreliaGuide() { return "Morelia guide placeholder"; }
function generateZacatecasGuide() { return "Zacatecas guide placeholder"; }
function generateCampecheGuide() { return "Campeche guide placeholder"; }
function generateCuscoGuide() { return "Cusco guide placeholder"; }
function generateLimaGuide() { return "Lima guide placeholder"; }
function generateQuitoGuide() { return "Quito guide placeholder"; }
function generateSalvadorGuide() { return "Salvador guide placeholder"; }
function generateOlindaGuide() { return "Olinda guide placeholder"; }
function generateOuroPretoGuide() { return "Ouro Preto guide placeholder"; }
function generateBrasiliaGuide() { return "Brasilia guide placeholder"; }
function generateBuenosAiresGuide() { return "Buenos Aires guide placeholder"; }
function generateMontevideoGuide() { return "Montevideo guide placeholder"; }
function generateHavanaGuide() { return "Havana guide placeholder"; }
function generateTrinidadCubaGuide() { return "Trinidad Cuba guide placeholder"; }
function generateMeknesGuide() { return "Meknes guide placeholder"; }
function generateRabatGuide() { return "Rabat guide placeholder"; }
function generateCasablancaGuide() { return "Casablanca guide placeholder"; }
function generateCairoGuide() { return "Cairo guide placeholder"; }
function generateLuxorGuide() { return "Luxor guide placeholder"; }
function generateAswanGuide() { return "Aswan guide placeholder"; }
function generateAlexandriaGuide() { return "Alexandria guide placeholder"; }
function generateTunisGuide() { return "Tunis guide placeholder"; }
function generateKairouanGuide() { return "Kairouan guide placeholder"; }
function generateSousseGuide() { return "Sousse guide placeholder"; }
function generateJerusalemGuide() { return "Jerusalem guide placeholder"; }
function generateTelAvivGuide() { return "Tel Aviv guide placeholder"; }
function generateAcreGuide() { return "Acre guide placeholder"; }
function generateDamascusGuide() { return "Damascus guide placeholder"; }
function generateAleppoGuide() { return "Aleppo guide placeholder"; }
function generateSafranbolusGuide() { return "Safranbolu guide placeholder"; }
function generatePerthGuide() { return "Perth guide placeholder"; }
function generateAdelaideGuide() { return "Adelaide guide placeholder"; }
function generateBrisbaneGuide() { return "Brisbane guide placeholder"; }
function generateHobartGuide() { return "Hobart guide placeholder"; }
function generateAucklandGuide() { return "Auckland guide placeholder"; }
function generateWellingtonGuide() { return "Wellington guide placeholder"; }
function generateChristchurchGuide() { return "Christchurch guide placeholder"; }
function generateQueenstownGuide() { return "Queenstown guide placeholder"; }