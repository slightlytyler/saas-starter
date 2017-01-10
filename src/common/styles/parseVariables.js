import { camelCase, compact, compose, reduce, split } from 'lodash/fp';

export default compose(
  reduce(
    (acc, color) => {
      const [key, value] = split(' = ', color);
      return { ...acc, [camelCase(key.substr(1))]: value };
    },
    {},
  ),
  compact,
  split('\n'),
);
