import React, { PropTypes } from 'react';
import { Route } from 'react-router-dom';

const BranchRoute = ({ condition, renderLeft, renderRight, ...props }) => (
  <Route {...props} render={condition ? renderLeft : renderRight} />
);

BranchRoute.propTypes = {
  condition: PropTypes.bool.isRequired,
  renderLeft: PropTypes.func,
  renderRight: PropTypes.func,
};

BranchRoute.defaultProps = {
  renderLeft: () => null,
  renderRight: () => null,
};

export default BranchRoute;
