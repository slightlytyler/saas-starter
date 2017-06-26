import baseResolver from 'core/baseResolver';

const findUserObjectResolver = baseResolver.createResolver((_, vars, ctx) =>
  ctx.models.user.findObject(vars),
);

const resolvers = {
  Query: {
    user: findUserObjectResolver,
  },
};

export default resolvers;
