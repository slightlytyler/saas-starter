import { RaisedButton } from 'material-ui';
import React from 'react';
import { withProps } from 'recompose';
import { clearToken } from '../../helpers';

const LogoutButton = props => (
  <RaisedButton label="Logout" {...props} />
);

const container = withProps({
  onTouchTap: () => {
    clearToken();
    location.reload();
  },
});

export default container(LogoutButton);
