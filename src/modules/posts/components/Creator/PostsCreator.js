import Form from 'common/components/Form';
import update from 'immutability-helper';
import { compose } from 'lodash/fp';
import { Paper } from 'material-ui';
import withCurrentUser from 'modules/auth/containers/withCurrentUser';
import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import generateId from 'shortid';
import yup from 'yup';
import * as mutations from '../../mutations';

const schema = yup.object({
  body: yup.string().required('A post cannot be empty.'),
});

const PostsCreator = ({ onSubmit }) => (
  <Paper style={{ padding: '16px' }}>
    <Form onSubmit={onSubmit} schema={schema}>
      <Form.Field
        floatingLabelText={null}
        fullWidth
        hintText="What's on your mind?"
        multiLine
        name="body"
      />
      <Form.SubmitButton label="Post It" />
    </Form>
  </Paper>
);

PostsCreator.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const container = compose(
  withCurrentUser,
  graphql(mutations.CreatePost, {
    props: ({ mutate, ownProps }) => ({
      onSubmit: data => mutate({
        optimisticResponse: {
          __typename: 'Mutation',
          createPost: {
            __typename: 'Post',
            id: generateId(),
            ...data,
            author: ownProps.currentUser,
            createdAt: new Date().toISOString(),
          },
        },
        updateQueries: {
          GlobalFeed: (prev, { mutationResult }) => update(prev, {
            allPosts: {
              $unshift: [mutationResult.data.createPost],
            },
          }),
        },
        variables: {
          ...data,
          authorId: ownProps.currentUser.id,
        },
      }),
    }),
  }),
);

export default container(PostsCreator);
