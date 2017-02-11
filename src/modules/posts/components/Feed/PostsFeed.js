import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { Box } from 'react-layout-components';
import Creator from '../Creator';
import List from '../List';
import * as queries from '../../queries';

const PostsFeed = ({ posts }) => (
  <Box alignItems="center" column fit>
    <Box column style={{ width: '45em' }}>
      <Creator />
      <List posts={posts} />
    </Box>
  </Box>
);

PostsFeed.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
};

PostsFeed.defaultProps = {
  posts: undefined,
};

const container = graphql(queries.GlobalFeed, {
  props: ({ data }) => ({
    posts: data.allPosts,
  }),
});


export default container(PostsFeed);
