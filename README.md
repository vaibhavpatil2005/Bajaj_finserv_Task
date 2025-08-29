# BFHL REST API

A REST API built according to VIT Full Stack Question Paper specifications.

## Features

- **POST /bfhl**: Main endpoint that processes an array and returns categorized data
- **GET /bfhl**: Returns operation code
- **GET /health**: Health check endpoint
- Error handling and input validation
- CORS enabled for cross-origin requests

## API Specification

### POST /bfhl

**Request Body:**
```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

**Response:**
```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

## Response Fields

1. **is_success**: Boolean indicating operation status
2. **user_id**: Format `{full_name_ddmmyyyy}`
3. **email**: User's email address
4. **roll_number**: College roll number
5. **odd_numbers**: Array of odd numbers as strings
6. **even_numbers**: Array of even numbers as strings
7. **alphabets**: Array of alphabetic strings in uppercase
8. **special_characters**: Array of special characters
9. **sum**: Sum of all numbers as string
10. **concat_string**: Alphabets concatenated in reverse order with alternating caps

## Configuration

Update the `USER_CONFIG` object in `server.js` with your details:

```javascript
const USER_CONFIG = {
  full_name: "your_name", // lowercase with underscores
  birth_date: "ddmmyyyy", // your birth date
  email: "your@email.com",
  roll_number: "YOUR123"
};
```

## Local Development

```bash
npm install
npm run dev
```

## Deployment

This API is configured for Vercel deployment with the included `vercel.json` file.

## Testing

Test the API with curl:

```bash
curl -X POST https://your-api-url/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": ["a","1","334","4","R","$"]}'
```