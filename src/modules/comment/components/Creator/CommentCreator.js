import update from 'immutability-helper';
import { compose, get } from 'lodash/fp';
import { TextField } from 'material-ui';
import CurrentUserAvatar from 'modules/auth/components/CurrentUserAvatar';
import withCurrentUser from 'modules/auth/containers/withCurrentUser';
import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { Box } from 'react-layout-components';
import { withState } from 'recompose';
import generateId from 'shortid';
import * as mutations from '../../mutations';

const CommentCreator = props => (
  <Box alignItems="center">
    <CurrentUserAvatar size={30} style={{ marginRight: '16px' }} />
    <TextField
      fullWidth
      id={generateId()}
      onChange={compose(props.setValue, get('target.value'))}
      onKeyPress={e => {
        if (e.which === 13 && props.value) {
          props.onSubmit(props.value);
          props.setValue('');
        }
      }}
      value={props.value}
    />
  </Box>
);

CommentCreator.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const container = compose(
  withCurrentUser,
  graphql(mutations.CreateComment, {
    props: ({ mutate, ownProps }) => ({
      onSubmit: body => mutate({
        optimisticResponse: {
          __typename: 'Mutation',
          createComment: {
            __typename: 'Comment',
            id: generateId(),
            author: ownProps.currentUser,
            body,
            createdAt: new Date().toISOString(),
          },
        },
        updateQueries: {
          CommentsOnPost: (prev, { mutationResult, queryVariables }) => {
            if (queryVariables.postId !== ownProps.postId) return null;
            return update(prev, {
              allComments: { $push: [mutationResult.data.createComment] },
            });
          },
        },
        variables: {
          authorId: ownProps.currentUser.id,
          body,
          parentPostId: ownProps.postId,
        },
      }),
    }),
  }),
  withState('value', 'setValue', ''),
);

export default container(CommentCreator);