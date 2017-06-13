import bodyParser from 'body-parser';
import express from 'express';
import {graphiqlExpress, graphqlExpress} from 'graphql-server-express';
import schema from './schema';

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  }),
);

export default app;
