import bodyParser from 'body-parser';
import express from 'express';
import {graphiqlExpress, graphqlExpress} from 'graphql-server-express';
import morgan from 'morgan';
import uuid from 'node-uuid';
import models from './models';
import schema from './schema';

const app = express();
const tagRequest = (req, _, next) => {
  req.ref = uuid.v4();
  next();
};

app.use(
  '/graphql',
  tagRequest,
  bodyParser.json(),
  graphqlExpress({
    context: {
      models,
      user: {id: 'user1', email: 'slightlytyler@gmail.com', token: 'abc123'},
    },
    schema,
  }),
  morgan(':ref :method :url :response-time'),
);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  }),
);

export default app;
