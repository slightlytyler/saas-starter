import React from 'react';
import {renderToString as render} from 'react-dom/server';
import app from './app';

const server = ({clientStats, serverStats}) => (req, res) => {
  const context = {};
  const markup = app(render);
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
          <script src="/client.js"></script>
        </body>
      </html>
    `,
    );
    res.end();
  }
};

export default server;
