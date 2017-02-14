import React from 'react';
import AuthenticatedRoute from '../AuthenticatedRoute';
import LoginButton from '../LoginButton';
import LogoutButton from '../LogoutButton';

const AuthenticationButton = () => (
  <AuthenticatedRoute
    renderLeft={() => <LogoutButton />}
    renderRight={() => <LoginButton />}
  />
);

export default AuthenticationButton;
