import Model from 'core/Model';

const tmpUserObject = {
	id: 'user:1',
	email: 'user1@gmail.com',
	username: 'user1',
};

class AuthModel extends Model {
	constructor(...args) {
		super(...args);
		this.constructor.removeDefaultMethods();
	}

	static modelName = 'auth';

	static schema = {
		email: {
			type: 'string',
		},
		password: {
			type: 'string',
			required: true,
		},
		username: {
			type: 'string',
			required: true,
		},
	};

	// eslint-disable-next-line class-methods-use-this
	findSelf() {
		return Promise.resolve(tmpUserObject);
	}

	// eslint-disable-next-line class-methods-use-this
	authenticate() {
		return Promise.resolve(tmpUserObject);
	}

	// eslint-disable-next-line class-methods-use-this
	deauthenticate() {
		return Promise.resolve(true);
	}
}

export default AuthModel;
