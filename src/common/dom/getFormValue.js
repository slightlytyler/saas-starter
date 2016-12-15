import { compose, get, reduce } from 'lodash/fp';

export default compose(
  reduce(
    (acc, el) => (el.name ? { ...acc, [el.name]: el.value } : acc),
    {},
  ),
  get('elements'),
);
