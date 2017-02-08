import { map } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import Item from '../Item';
import { allPosts } from '../../queries';

const PostsList = ({ data }) => (
  <div>
    {map(
      record => <Item key={record.id} {...record} />,
      data.allPosts,
    )}
  </div>
);

PostsList.propTypes = {
  data: PropTypes.shape({
    allPosts: PropTypes.array,
  }).isRequired,
};

const container = graphql(allPosts);

export default container(PostsList);
