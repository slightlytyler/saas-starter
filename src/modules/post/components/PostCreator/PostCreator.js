import Form from 'common/components/Form';
import { Paper } from 'material-ui';
import React, { PropTypes } from 'react';
import yup from 'yup';

const schema = yup.object({
  body: yup.string().required('A post cannot be empty.'),
});

const PostCreator = props => (
  <Paper style={{ padding: '16px' }}>
    <Form onSubmit={props.onSubmit} schema={schema}>
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

PostCreator.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default PostCreator;
