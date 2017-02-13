import spinnerWhile from 'common/containers/spinnerWhile';
import withCurrentUser from 'modules/auth/containers/withCurrentUser';
import { compose, get } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { Box } from 'react-layout-components';
import * as colors from 'styles/colors';
import Creator from '../Creator';
import List from '../List';
import * as queries from '../../queries';

const CommentRoot = props => (
  <Box column style={{ backgroundColor: colors.white4, padding: '16px' }}>
    {props.currentUser && <Creator postId={props.postId} />}
    <List comments={props.comments} />
  </Box>
);

CommentRoot.propTypes = {
  comments: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
  postId: PropTypes.string.isRequired,
};

CommentRoot.defaultProps = {
  currentUser: null,
};

const container = compose(
  withCurrentUser,
  graphql(queries.CommentsOnPost, {
    options: ({ postId }) => ({
      returnPartialData: true,
      variables: { postId },
    }),
    props: ({ data }) => ({
      comments: data.allComments,
      loading: data.loading,
    }),
  }),
  compose(spinnerWhile, get)('loading'),
);

export default container(CommentRoot);
