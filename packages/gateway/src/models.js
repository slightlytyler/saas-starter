import PostgresConnector from 'core/PostgresConnector';
import AuthModel from 'features/auth/model';
import PostModel from 'features/post/model';
import UserModel from 'features/user/model';

const storeConnector = new PostgresConnector({
	client: 'pg',
	connection: {
		host: process.env.STORE_HOST,
		user: process.env.STORE_USER,
		password: process.env.STORE_PASSWORD,
		database: process.env.STORE_DATABASE,
	},
});

const models = {
	auth: new AuthModel(storeConnector),
	post: new PostModel(storeConnector),
	user: new UserModel(storeConnector),
};

export default models;
