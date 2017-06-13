const colors = require('colors/safe');

const HOSTNAME = process.env.HOSTNAME || 'localhost';
const PORT = process.env.PORT || 3000;

console.log('\n');
console.log(colors.bold.white(`=== UI running at ${HOSTNAME}:${PORT} ===`));
console.log('\n');
