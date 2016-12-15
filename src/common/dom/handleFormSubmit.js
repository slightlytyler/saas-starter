import { compose } from 'lodash/fp';
import getFormValue from './getFormValue';

export default action => e => {
  e.preventDefault();
  return compose(action, getFormValue)(e.target);
};
