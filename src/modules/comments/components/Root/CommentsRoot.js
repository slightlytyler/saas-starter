import colors from 'colors';
import spinnerWhile from 'common/containers/spinnerWhile';
import withCurrentUser from 'modules/auth/containers/withCurrentUser';
import { compose, get } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { Box } from 'react-layout-components';
import Creator from '../Creator';
import List from '../List';
import * as queries from '../../queries';

const CommentsRoot = props => (
  <Box column style={{ backgroundColor: colors.white4, padding: '16px' }}>
    {props.currentUser && <Creator postId={props.postId} />}
    <List comments={props.comments} />
  </Box>
);

CommentsRoot.propTypes = {
  comments: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
  postId: PropTypes.string.isRequired,
};

CommentsRoot.defaultProps = {
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

export default container(CommentsRoot);
