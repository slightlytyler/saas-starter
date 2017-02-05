import withActions from 'common/containers/withActions';
import { RaisedButton } from 'material-ui';
import React, { PropTypes } from 'react';
import * as actions from '../../actions';

const LogoutButton = ({ logout }) => (
  <RaisedButton label="Logout" onTouchTap={logout} />
);

LogoutButton.propTypes = {
  logout: PropTypes.func.isRequired,
};

const container = withActions({ logout: actions.logout });

export default container(LogoutButton);
