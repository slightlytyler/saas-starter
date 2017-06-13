import {createResolver} from 'apollo-resolvers';
import {createError, isInstance} from 'apollo-errors';

const UnknownError = createError('UnknownError', {
  message: 'An unknown error has occurred!  Please try again later.',
});

const baseResolver = createResolver(
  null,
  (_, __, ___, error) => (isInstance(error) ? error : new UnknownError()),
);

export default baseResolver;
