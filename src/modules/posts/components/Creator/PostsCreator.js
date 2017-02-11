import Form from 'common/components/Form';
import update from 'immutability-helper';
import { Paper } from 'material-ui';
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
      <Form.SubmitButton label="Share" />
    </Form>
  </Paper>
);

PostsCreator.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const container = graphql(mutations.CreatePost, {
  props: ({ mutate }) => ({
    onSubmit: data => mutate({
      optimisticResponse: {
        __typename: 'Mutation',
        createPost: {
          __typename: 'Post',
          id: generateId(),
          ...data,
          author: null,
          createdAt: '2017-02-11T22:49:36.000Z',
        },
      },
      updateQueries: {
        GlobalFeed: (prev, { mutationResult }) => update(prev, {
          allPosts: {
            $unshift: [mutationResult.data.createPost],
          },
        }),
      },
      variables: data,
    }),
  }),
});

export default container(PostsCreator);
