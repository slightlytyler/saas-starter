import bodyParser from 'body-parser';
import express from 'express';
import {graphiqlExpress, graphqlExpress} from 'graphql-server-express';
import pg from 'pg';
import schema from './schema';

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  }),
);

const pool = new pg.Pool({
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  max: 10,
  idleTimeoutMillis: 30000,
});

pool.on('error', (err, client) => {
  console.error('idle client error', err.message, err.stack);
});

export default app;
