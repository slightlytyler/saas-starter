import MultiLineText from 'common/components/MultiLineText';
import React, { PropTypes } from 'react';

const PostsItem = ({ body }) => (
  <div>
    <MultiLineText>{body}</MultiLineText>
  </div>
);

PostsItem.propTypes = {
  body: PropTypes.string.isRequired,
};

export default PostsItem;
