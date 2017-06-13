import http from 'http';
import colors from 'colors/safe';
import app from './app';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4000;
const server = http.createServer(app);
let currentApp = app;

server.listen(80, () => {
  console.log('\n');
  console.log(colors.bold.white(`=== Gateway running at ${HOST}:${PORT} ===`));
  console.log('\n');
});

if (module.hot) {
  module.hot.accept('./app', () => {
    server.removeListener('request', currentApp);
    server.on('request', app);
    currentApp = app;
  });
}
