import {createError} from 'apollo-errors';
import baseResolver from 'core/baseResolver';

const AuthenticationRequiredError = createError('AuthenticationRequiredError', {
  message: 'You must be logged in to do this',
});

export const isAuthenticatedResolver = baseResolver.createResolver(
  (_, __, {user}) => {
    if (!user) throw new AuthenticationRequiredError();
  },
);

const selfResolver = isAuthenticatedResolver.createResolver((_, __, ___) =>
  ctx.models.user.findObject(ctx.auth.userId),
);

const authenticateResolver = isAuthenticatedResolver.createResolver(
  (_, vars, ctx) => ctx.models.auth.authenticate(vars),
);

const deauthenticateResolver = isAuthenticatedResolver.createResolver(
  (_, __, ctx) => ctx.models.auth.deauthenticate(),
);

const resolvers = {
  Query: {
    self: selfResolver,
  },
  Mutation: {
    authenticate: authenticateResolver,
    deauthenticate: deauthenticateResolver,
  },
};

export default resolvers;
