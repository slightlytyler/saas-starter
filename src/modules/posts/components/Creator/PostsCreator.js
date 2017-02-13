import Form from 'common/components/Form';
import { Paper } from 'material-ui';
import React, { PropTypes } from 'react';
import yup from 'yup';

const schema = yup.object({
  body: yup.string().required('A post cannot be empty.'),
});

const PostsCreator = props => (
  <Paper style={{ padding: '16px' }}>
    <Form onSubmit={props.onCreatePost} schema={schema}>
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
  onCreatePost: PropTypes.func.isRequired,
};

export default PostsCreator;
