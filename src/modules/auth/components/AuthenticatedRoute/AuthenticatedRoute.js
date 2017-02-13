import { compose, omit } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { Route } from 'react-router-dom';
import { mapProps } from 'recompose';
import withCurrentUser from '../../containers/withCurrentUser';

const AuthenticatedRoute = ({ isAuthenticated, leftRender, rightRender, ...rest }) => (
  <Route {...rest} render={isAuthenticated ? leftRender : rightRender} />
);

AuthenticatedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  leftRender: PropTypes.func,
  rightRender: PropTypes.func,
};

AuthenticatedRoute.defaultProps = {
  leftRender: () => null,
  rightRender: () => null,
};


const container = compose(
  withCurrentUser,
  mapProps(props => ({
    ...omit('currentUser', props),
    isAuthenticated: Boolean(props.currentUser),
  })),
);

export default container(AuthenticatedRoute);
