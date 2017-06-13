import bodyParser from 'body-parser';
import express from 'express';
import {graphiqlExpress, graphqlExpress} from 'graphql-server-express';
import models from './models';
import schema from './schema';

const app = express();

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({context: {models}, schema}),
);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  }),
);

export default app;
