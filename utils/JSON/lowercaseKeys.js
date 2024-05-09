const fs = require('fs');

// Note: use it in the terminal like this:
// node lowercaseJSONKeys.js path/to/your/json/file.json

// Function to recursively convert keys to lowercase
function convertKeysToLowerCase(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => convertKeysToLowerCase(item));
  }

  return Object.keys(obj).reduce((acc, key) => {
    const lowerCaseKey = key.toLowerCase();
    acc[lowerCaseKey] = convertKeysToLowerCase(obj[key]);
    return acc;
  }, {});
}

// Function to write modified JSON to file
function writeJsonToFile(jsonFilePath, jsonData) {
  fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
}

// Get command-line arguments
const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error('Usage: node lowercaseJSONKeys.js <jsonFilePath>');
  process.exit(1);
}

const jsonFilePath = args[0];

// Read the JSON file
try {
  const jsonData = fs.readFileSync(jsonFilePath, 'utf8');

  // Parse the JSON data
  const jsonObject = JSON.parse(jsonData);

  // Convert keys to lowercase
  const modifiedJsonObject = convertKeysToLowerCase(jsonObject);

  // Write modified JSON back to the file
  writeJsonToFile(jsonFilePath, modifiedJsonObject);

  console.log('JSON file keys converted to lowercase successfully.');
} catch (error) {
  console.error('Error processing JSON file:', error);
}
