import React from 'react';
import { Box } from 'react-layout-components';
import Creator from '../Creator';
import List from '../List';

const PostsFeed = () => (
  <Box column style={{ width: '30em' }}>
    <Creator />
    <List />
  </Box>
);

export default PostsFeed;
