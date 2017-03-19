console.log('Does it hang at the start?');
const exec = require('child_process').exec;
const path = require('path');

const rootPath =  path.join(__dirname, '..')
const project = path.join(rootPath, 'dist');
const domain = process.env.CI_ENVIRONMENT_URL;
const command = `surge -p ${project} -d ${domain}`

console.log(command);

console.log('Does it hang here?');

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`[DEPLOY ERROR]: ${error}`);
    return;
  }
  console.log('Inside the callback?');
  console.log(stdout);
  console.log(stderr);
});

console.log('What about here?');