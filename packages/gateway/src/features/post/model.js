import Model from 'core/Model';

class PostModel extends Model {
	static modelName = 'post';

	static schema = {
		id: {
			type: 'string',
			required: true,
			unique: true,
		},
		name: {
			type: 'string',
			required: true,
		},
	};
}

export default PostModel;
