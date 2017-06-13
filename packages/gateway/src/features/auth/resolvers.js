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
