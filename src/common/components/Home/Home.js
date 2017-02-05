import AuthenticationButton from 'modules/auth/components/AuthenticationButton';
import PostsFeed from 'modules/posts/components/Feed';
import React from 'react';
import { Box } from 'react-layout-components';

const Home = () => (
  <div>
    <Box justifyContent="space-between">
      <div>Home</div>
      <AuthenticationButton />
    </Box>
    <PostsFeed />
  </div>
);

export default Home;
