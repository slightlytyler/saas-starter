import Model from 'core/Model';

class UserModel extends Model {
	static modelName = 'user';

	static schema = {
		id: {
			type: 'string',
			required: true,
			unique: true,
		},
		email: {
			type: 'string',
			required: true,
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
}

export default UserModel;
