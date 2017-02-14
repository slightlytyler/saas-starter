import BranchRoute from 'common/components/BranchRoute';
import { compose, get } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { setPropTypes, withProps } from 'recompose';
import withCurrentUser from '../../containers/withCurrentUser';

const OwnedRoute = ({ isOwned, ...props }) => (
  <BranchRoute {...props} condition={isOwned} />
);

OwnedRoute.propTypes = {
  isOwned: PropTypes.bool.isRequired,
};

const container = compose(
  setPropTypes({
    userId: PropTypes.string.isRequired,
  }),
  withCurrentUser,
  withProps(props => ({
    isOwned: get('currentUser.id', props) === props.userId,
  })),
);

export default container(OwnedRoute);
