import { map } from 'lodash/fp';
import React, { PropTypes } from 'react';
import Item from '../Item';

const PostsList = ({ posts }) => (
  <div>
    {map(
      post => <Item key={post.id} post={post} />,
      posts,
    )}
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
};

PostsList.defaultProps = {
  posts: undefined,
};

export default PostsList;
