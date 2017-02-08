import Form from 'common/components/Form';
import update from 'immutability-helper';
import { compose } from 'lodash/fp';
import { Paper } from 'material-ui';
import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { Box } from 'react-layout-components';
import { mapProps } from 'recompose';
import yup from 'yup';
import { createPost } from '../../mutations';

const schema = yup.object({
  body: yup.string().required('A post cannot be empty.'),
});

const PostsCreator = ({ onSubmit }) => (
  <Paper>
    <Box style={{ padding: '16px' }}>
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
    </Box>
  </Paper>
);

PostsCreator.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const container = compose(
  graphql(createPost, { name: 'createPost' }),
  mapProps(props => ({
    onSubmit: data => props.createPost({
      updateQueries: {
        allPosts: (prev, { mutationResult }) => update(prev, {
          allPosts: {
            $unshift: [mutationResult.data.createPost],
          },
        }),
      },
      variables: data,
    }),
  })),
);

export default container(PostsCreator);
