const colors = require('colors/safe');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

console.log('\n');
console.log(colors.bold.white(`=== UI running at ${HOST}:${PORT} ===`));
console.log('\n');
