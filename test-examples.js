// Test examples from the question paper
const testCases = [
  {
    name: "Example A",
    input: { data: ["a", "1", "334", "4", "R", "$"] },
    expected: {
      odd_numbers: ["1"],
      even_numbers: ["334", "4"],
      alphabets: ["A", "R"],
      special_characters: ["$"],
      sum: "339",
      concat_string: "Ra"
    }
  },
  {
    name: "Example B", 
    input: { data: ["2", "a", "y", "4", "&", "-", "*", "5", "92", "b"] },
    expected: {
      odd_numbers: ["5"],
      even_numbers: ["2", "4", "92"],
      alphabets: ["A", "Y", "B"],
      special_characters: ["&", "-", "*"],
      sum: "103",
      concat_string: "ByA"
    }
  },
  {
    name: "Example C",
    input: { data: ["A", "ABcD", "DOE"] },
    expected: {
      odd_numbers: [],
      even_numbers: [],
      alphabets: ["A", "ABCD", "DOE"],
      special_characters: [],
      sum: "0",
      concat_string: "EoDdCbAa"
    }
  }
];

// Function to test the API locally
async function testAPI() {
  const baseURL = 'http://localhost:3000';
  
  console.log('🧪 Testing BFHL API...\n');
  
  for (const testCase of testCases) {
    console.log(`Testing ${testCase.name}:`);
    console.log('Input:', JSON.stringify(testCase.input, null, 2));
    
    try {
      const response = await fetch(`${baseURL}/bfhl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testCase.input)
      });
      
      const result = await response.json();
      console.log('Output:', JSON.stringify(result, null, 2));
      
      // Basic validation
      const isValid = 
        result.is_success === true &&
        result.user_id &&
        result.email &&
        result.roll_number &&
        Array.isArray(result.odd_numbers) &&
        Array.isArray(result.even_numbers) &&
        Array.isArray(result.alphabets) &&
        Array.isArray(result.special_characters) &&
        typeof result.sum === 'string' &&
        typeof result.concat_string === 'string';
      
      console.log(`✅ Valid response: ${isValid}\n`);
      
    } catch (error) {
      console.error('❌ Test failed:', error.message);
    }
  }
}

// Export for use
module.exports = { testCases, testAPI };

// Run tests if this file is executed directly
if (require.main === module) {
  testAPI();
}