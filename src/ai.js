const axios = require('axios');

/**
 * Generate travel tips using OpenRouter AI
 * @param {string} city - Destination city
 * @param {string} travelerType - Type of traveler (Solo/Couple/Family/Friends)
 * @param {string} interests - User interests (Culture, Food, Nature, etc.)
 * @returns {Promise<string>} AI-generated travel tips
 */
async function generateTravelTips(city, travelerType, interests) {
  const prompt = `You're a local travel expert. Give a concise, practical list of top 3 things to do in ${city} for a ${travelerType} traveler who loves ${interests}. Include 1 authentic local tip. Max 110 words. No markdown, no numbers, no bullet points.`;

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
        max_tokens: 150,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://voyago-bot.com',
          'X-Title': 'Voyago Travel Bot'
        },
        timeout: 10000 // 10 second timeout
      }
    );

    if (response.data?.choices?.[0]?.message?.content) {
      return response.data.choices[0].message.content.trim();
    } else {
      throw new Error('Invalid AI response format');
    }
  } catch (error) {
    console.error('AI generation failed:', error.message);
    
    // Fallback content when AI fails
    return getFallbackTips(city, travelerType, interests);
  }
}

/**
 * Fallback travel tips when AI is unavailable
 * @param {string} city - Destination city
 * @param {string} travelerType - Type of traveler
 * @param {string} interests - User interests
 * @returns {string} Fallback travel tips
 */
function getFallbackTips(city, travelerType, interests) {
  const fallbacks = {
    'lisbon': `Explore the historic Alfama district with its narrow streets and fado music. Take Tram 28 for a scenic city tour. Visit Belém Tower and try the famous pastéis de nata at Pastéis de Belém. Local tip: Head to Miradouro da Senhora do Monte for the best sunset views over the city.`,
    
    'paris': `Visit the Louvre Museum early morning to avoid crowds. Stroll along the Seine and explore Île de la Cité. Experience authentic French cuisine in the Marais district. Local tip: Buy fresh bread from a local boulangerie and have a picnic in Luxembourg Gardens like Parisians do.`,
    
    'rome': `Explore the Colosseum and Roman Forum in the early morning. Wander through Trastevere for authentic Roman atmosphere. Visit Vatican City and St. Peter's Basilica. Local tip: Enjoy aperitivo hour (6-8 PM) at a local bar with complimentary snacks - it's a Roman tradition.`,
    
    'barcelona': `Walk through Park Güell and admire Gaudí's architecture. Explore the Gothic Quarter's medieval streets. Relax at Barceloneta Beach. Local tip: Experience the local tradition of "vermut" - vermouth with tapas on Sunday mornings in neighborhood bars.`,
    
    'amsterdam': `Cruise the historic canals and visit the Anne Frank House. Explore the vibrant Jordaan neighborhood. Rent a bike and cycle like a local. Local tip: Visit local "brown cafés" (traditional pubs) for authentic Dutch atmosphere and try bitterballen with a local beer.`
  };

  const cityKey = city.toLowerCase();
  if (fallbacks[cityKey]) {
    return fallbacks[cityKey];
  }

  // Generic fallback
  return `Discover the historic city center and main attractions. Try local cuisine at traditional restaurants. Explore neighborhoods where locals live and work. Local tip: Ask locals for their favorite hidden spots - they often know the best places that aren't in guidebooks.`;
}

module.exports = {
  generateTravelTips
};