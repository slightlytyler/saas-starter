const exec = require('child_process').exec;
const path = require('path');

const project = path.join(__dirname, 'dist');
const domain = process.env.CI_ENVIRONMENT_URL;

exec(`surge -p ${project} -d ${domain}`);
