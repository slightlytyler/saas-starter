import { compose, get, noop, omit } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { Route } from 'react-router-dom';
import { mapProps } from 'recompose';
import withCurrentUser from '../../containers/withCurrentUser';

const OwnedRoute = ({ isOwned, leftRender, rightRender, ...rest }) => (
  <Route {...rest} render={isOwned ? leftRender : rightRender} />
);

OwnedRoute.propTypes = {
  isOwned: PropTypes.bool.isRequired,
  leftRender: PropTypes.func,
  rightRender: PropTypes.func,
};

OwnedRoute.defaultProps = {
  leftRender: noop,
  rightRender: noop,
};

const container = compose(
  withCurrentUser,
  mapProps(props => ({
    ...omit('currentUser', props),
    isOwned: get('currentUser.id', props) === props.userId,
  })),
);

export default container(OwnedRoute);
