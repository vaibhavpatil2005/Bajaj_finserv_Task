const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

const USER_CONFIG = {
  full_name: "vaibhav", 
  birth_date: "21-01-2005", 
  email: "vaibhapatil843541@gmail.com", 
  roll_number: "22BCG10166" 
};


function isNumber(str) {
  return !isNaN(str) && !isNaN(parseFloat(str));
}


function isAlphabet(str) {
  return /^[a-zA-Z]+$/.test(str);
}

function hasSpecialCharacters(str) {
  return /[^a-zA-Z0-9]/.test(str);
}

function processConcatString(alphabets) {
  const allChars = [];
  alphabets.forEach(item => {
    for (let char of item) {
      if (/[a-zA-Z]/.test(char)) {
        allChars.push(char);
      }
    }
  });
  
  allChars.reverse();
  
  return allChars.map((char, index) => {
    return index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
  }).join('');
}

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid input: 'data' must be an array"
      });
    }

    const oddNumbers = [];
    const evenNumbers = [];
    const alphabets = [];
    const specialCharacters = [];
    let sum = 0;

    data.forEach(item => {
      const itemStr = String(item);
      
      if (isNumber(itemStr)) {
        const num = parseInt(itemStr);
        sum += num;
        
        if (num % 2 === 0) {
          evenNumbers.push(itemStr);
        } else {
          oddNumbers.push(itemStr);
        }
      } else if (isAlphabet(itemStr)) {
        alphabets.push(itemStr.toUpperCase());
      } else if (hasSpecialCharacters(itemStr)) {
        specialCharacters.push(itemStr);
      }
    });

    const concatString = processConcatString(alphabets);

    const userId = `${USER_CONFIG.full_name}_${USER_CONFIG.birth_date}`;

    const response = {
      is_success: true,
      user_id: userId,
      email: USER_CONFIG.email,
      roll_number: USER_CONFIG.roll_number,
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialCharacters,
      sum: sum.toString(),
      concat_string: concatString
    };

    res.status(200).json(response);

  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({
      is_success: false,
      error: "Internal server error"
    });
  }
});

app.get('/bfhl', (req, res) => {
  res.status(200).json({
    operation_code: 1
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'API is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'BFHL REST API',
    endpoints: {
      'POST /bfhl': 'Main API endpoint',
      'GET /bfhl': 'Get operation code',
      'GET /health': 'Health check'
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    is_success: false,
    error: 'Something went wrong!'
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    is_success: false,
    error: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 BFHL API Server running on port ${PORT}`);
  console.log(`📍 Main endpoint: POST /bfhl`);
  console.log(`🔍 Health check: GET /health`);
});

module.exports = app;