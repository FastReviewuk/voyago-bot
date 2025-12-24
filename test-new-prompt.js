// Test the new AI prompt format
const { generateDetailedTravelGuide } = require('./src/ai');

async function testNewPrompt() {
  console.log('🧪 Testing New AI Prompt Format\n');
  
  try {
    console.log('Testing Verona guide generation...');
    const guide = await generateDetailedTravelGuide(
      'Verona', 
      'Solo', 
      'Culture', 
      '2024-06-15', 
      '2024-06-22', 
      '€1200'
    );
    
    console.log('\n📖 Generated Guide:');
    console.log('='.repeat(50));
    console.log(guide);
    console.log('='.repeat(50));
    
    // Check if it contains key elements
    const hasOverview = guide.includes('overview') || guide.includes('Overview');
    const hasItinerary = guide.includes('Day 1') || guide.includes('day-by-day') || guide.includes('Morning');
    const hasBudget = guide.includes('budget') || guide.includes('Budget');
    const hasVerona = guide.includes('Verona');
    
    console.log('\n✅ Quality Check:');
    console.log(`- Contains overview: ${hasOverview ? '✅' : '❌'}`);
    console.log(`- Contains itinerary: ${hasItinerary ? '✅' : '❌'}`);
    console.log(`- Contains budget info: ${hasBudget ? '✅' : '❌'}`);
    console.log(`- Mentions Verona: ${hasVerona ? '✅' : '❌'}`);
    console.log(`- Length: ${guide.length} characters`);
    
    const score = [hasOverview, hasItinerary, hasBudget, hasVerona].filter(Boolean).length;
    console.log(`\n🎯 Overall Score: ${score}/4 ${score >= 3 ? '(Good!)' : '(Needs improvement)'}`);
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testNewPrompt();
}

module.exports = { testNewPrompt };