import BranchRoute from 'common/components/BranchRoute';
import { compose } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { withProps } from 'recompose';
import withCurrentUser from '../../containers/withCurrentUser';

const AuthenticatedRoute = ({ isAuthenticated, ...props }) => (
  <BranchRoute {...props} condition={isAuthenticated} />
);

AuthenticatedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const container = compose(
  withCurrentUser,
  withProps(props => ({
    isAuthenticated: Boolean(props.currentUser),
  })),
);

export default container(AuthenticatedRoute);
