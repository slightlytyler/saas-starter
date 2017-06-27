import React from 'react';

const githubClientId = 'ee05e559ad7bc05d8998';

const navigateToGithub = () => {
  location.href = `https://github.com/login/oauth/authorize?client_id=${githubClientId}`;
};

const AuthButton = () =>
  <button onTouchTap={navigateToGithub}>Login with Github</button>;

export default AuthButton;
