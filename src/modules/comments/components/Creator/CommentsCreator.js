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

const CommentsCreator = props => (
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

CommentsCreator.propTypes = {
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
          GlobalFeed: (prev, { mutationResult }) => update(prev, {
            allPosts: {
              0: {
                comments: {
                  $push: [mutationResult.data.createComment],
                },
              },
            },
          }),
        },
        variables: {
          authorId: ownProps.currentUser.id,
          body,
          parentPostId: ownProps.parentPostId,
        },
      }),
    }),
  }),
  withState('value', 'setValue', ''),
);

export default container(CommentsCreator);
