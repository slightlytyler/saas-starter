import http from 'http';
import app from './app';

const HOSTNAME = process.env.HOSTNAME || 'localhost';
const PORT = process.env.PORT || 4000;
const server = http.createServer(app);
let currentApp = app;

server.listen(PORT, () => {
  console.log(`\nGateway running at ${HOSTNAME}:${PORT}\n`);
});

if (module.hot) {
  module.hot.accept('./app', () => {
    server.removeListener('request', currentApp);
    server.on('request', app);
    currentApp = app;
  });
}
