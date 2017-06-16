import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Root from './Root';

const app = express();
const renderApp = (req, res) => {
  const context = {};
  const markup = ReactDOMServer.renderToString(<Root />);
  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    res.end();
  } else {
    res.write(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>saas-starter</title>
          <meta charset="utf-8">
        </head>
        <body>
          <div id="root">${markup}</div>
          <script src="./bundle.js"></script>
        </body>
      </html>
    `,
    );
    res.end();
  }
};

app.use('*', renderApp);

export default app;
