import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router';
import {flushChunkNames} from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import Root from './Root';

const renderServer = ({clientStats, outputPath}) => (req, res) => {
  const chunkNames = flushChunkNames();
  const context = {};
  const markup = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <Root />
    </StaticRouter>,
  );
  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    res.end();
  } else {
    const {js} = flushChunks(clientStats, {
      chunkNames,
      before: ['bootstrap'],
      after: ['main'],
    });
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
          ${js}
        </body>
      </html>
    `,
    );
    res.end();
  }
};

export default renderServer;
