import baseResolver from 'core/baseResolver';
import { isAuthenticatedResolver } from 'features/auth/resolvers';

const findPostListResolver = baseResolver.createResolver((_, vars, ctx) =>
	ctx.models.post.findList(vars),
);

const findPostObjectResolver = baseResolver.createResolver((_, vars, ctx) =>
	ctx.models.post.findObject(vars),
);

const createPostObjectResolver = isAuthenticatedResolver.createResolver((_, vars, ctx) =>
	ctx.models.post.createObject(vars),
);

const deletePostObjectResolver = isAuthenticatedResolver.createResolver((_, vars, ctx) =>
	ctx.models.post.deleteObject(vars),
);

const updatePostObjectResolver = isAuthenticatedResolver.createResolver((_, vars, ctx) =>
	ctx.models.post.updateObject(vars),
);

const resolvers = {
	Query: {
		posts: findPostListResolver,
		post: findPostObjectResolver,
	},
	Mutation: {
		createPost: createPostObjectResolver,
		deletePost: deletePostObjectResolver,
		updatePost: updatePostObjectResolver,
	},
};

export default resolvers;
