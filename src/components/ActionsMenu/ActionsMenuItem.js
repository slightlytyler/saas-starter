import { capitalize, compose } from 'lodash/fp';
import { MenuItem } from 'material-ui';
import { mapProps, toClass } from 'recompose';

const container = compose(
  toClass,
  mapProps(({ action, id, label, onTouchTap, ...props }) => ({
    ...props,
    onTouchTap: (...args) => {
      action();
      return onTouchTap(...args);
    },
    primaryText: label || capitalize(id),
  })),
);

export default container(MenuItem);
