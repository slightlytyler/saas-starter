import PostgresConnector from 'core/PostgresConnector';
import AuthModel from 'features/auth/model';
import PostModel from 'features/post/model';
import UserModel from 'features/user/model';

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
  auth: new AuthModel(postgresConnector),
  post: new PostModel(postgresConnector),
  user: new UserModel(postgresConnector),
};

export default models;
