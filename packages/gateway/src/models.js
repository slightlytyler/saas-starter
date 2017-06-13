import PostgresConnector from 'core/PostgresConnector';
import PostModel from 'features/post/model';

const postgresConnector = new PostgresConnector({
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
});

const models = {
  post: new PostModel(postgresConnector),
};

export default models;
