// @flow

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import {graphiqlExpress, graphqlExpress} from 'graphql-server-express';
import models from './models';
import schema from './schema';

const app = express();

function foo(x: ?number): string {
  if (x) {
    return x;
  }
  return 'default string';
}

app.use(
  '/graphql',
  cors(),
  bodyParser.json(),
  graphqlExpress({
    context: {
      models,
      user: {id: 'user1', email: 'slightlytyler@gmail.com', token: 'abc123'},
    },
    schema,
  }),
);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  }),
);

export default app;
