import { createError, isInstance } from 'apollo-errors';
import { createResolver } from 'apollo-resolvers';

const UnknownError = createError('UnknownError', {
  message: 'An unknown error has occurred!  Please try again later.',
});

const baseResolver = createResolver(
  null,
  (_, __, ___, error) => (isInstance(error) ? error : new UnknownError()),
);

export default baseResolver;
