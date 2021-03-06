// @flow
import type { $Request, $Response } from 'express';
import { compose, replace } from 'lodash/fp';
import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
  renderToStringWithData,
} from 'react-apollo';
import { StaticRouter } from 'react-router-dom';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import Root from './Root';

const networkInterface = createNetworkInterface({
  uri: process.env.API_LOCAL_URL,
});
const client = new ApolloClient({
  networkInterface,
  ssrMode: true,
});
const stringifyWindowState = compose(replace(/</g, '\\u003c'), JSON.stringify);
const renderServer = ({ clientStats }: { clientStats: any }) => (
  req: $Request,
  res: $Response,
) => {
  const chunkNames = flushChunkNames();
  const routerContext = {};

  renderToStringWithData(
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={routerContext}>
        <Root />
      </StaticRouter>
    </ApolloProvider>,
  ).then(content => {
    if (routerContext.url) {
      res.writeHead(301, {
        Location: routerContext.url,
      });
      res.end();
    } else {
      const env = {
        API_URL: process.env.API_REMOTE_URL,
        APOLLO_STATE: client.getInitialState(),
      };
      const { js } = flushChunks(clientStats, {
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
            <div id="root">${content}</div>
            <script>window.env = ${stringifyWindowState(env)};</script>
            ${js.toString()}
          </body>
        </html>
      `,
      );
      res.end();
    }
  });
};

export default renderServer;
