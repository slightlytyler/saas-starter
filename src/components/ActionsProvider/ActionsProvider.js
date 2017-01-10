import connect from 'common/redux/connect';
import { compose, mapValues } from 'lodash/fp';
import { PropTypes } from 'react';

const ActionProvider = ({ actions, children }) => children({ actions });

ActionProvider.propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  creators: PropTypes.object.isRequired,
};

const container = connect(
  null,
  (dispatch, { creators }) => () => mapValues(creator => compose(dispatch, creator), creators),
);

export { ActionProvider as Component, container };
export default container(ActionProvider);
