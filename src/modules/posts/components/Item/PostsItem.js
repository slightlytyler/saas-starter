import MultiLineText from 'common/components/MultiLineText';
import update from 'immutability-helper';
import { findIndex } from 'lodash/fp';
import { Paper, RaisedButton } from 'material-ui';
import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { Box } from 'react-layout-components';
import * as mutations from '../../mutations';

const PostsItem = ({ body, onDelete }) => (
  <Paper style={{ marginTop: '16px', padding: '16px' }}>
    <MultiLineText>{body}</MultiLineText>
    <Box style={{ marginTop: '16px' }}>
      <RaisedButton label="Edit" style={{ marginRight: '8px' }} />
      <RaisedButton label="Delete" onTouchTap={onDelete} />
    </Box>
  </Paper>
);

PostsItem.propTypes = {
  body: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const container = graphql(mutations.DeletePost, {
  props: ({ mutate, ownProps }) => ({
    onDelete: () => mutate({
      optimisticResponse: {
        __typename: 'Mutation',
        deletePost: {
          __typename: 'Post',
          id: ownProps.id,
        },
      },
      updateQueries: {
        GlobalFeed: (prev, { mutationResult }) => {
          const deletedPost = mutationResult.data.deletePost;
          const index = findIndex(el => el.id === deletedPost.id, prev.allPosts);
          return update(prev, {
            allPosts: {
              $splice: [[index, 1]],
            },
          });
        },
      },
      variables: { id: ownProps.id },
    }),
  }),
});

export default container(PostsItem);
