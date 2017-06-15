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

export const selfResolver = isAuthenticatedResolver.createResolver(
  (_, __, ___) => ctx.models.user.findObject(ctx.auth.userId),
);

export const signInResolver = isAuthenticatedResolver.createResolver(
  (_, vars, ctx) => ctx.models.auth.signIn(vars),
);

export const signUpResolver = isAuthenticatedResolver.createResolver(
  (_, vars, ctx) => ctx.models.auth.signUp(vars),
);

export const signOutResolver = isAuthenticatedResolver.createResolver(
  (_, __, ctx) => ctx.models.auth.signOut(),
);

const resolvers = {
  Query: {
    self: selfResolver,
  },
  Mutation: {
    signIn: signInResolver,
    signUp: signUpResolver,
    signOut: signOutResolver,
  },
};

export default resolvers;
