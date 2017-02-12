import Form from 'common/components/Form';
import React, { PropTypes } from 'react';
import yup from 'yup';

const schema = yup.object({
  body: yup.string().required('A post cannot be empty.'),
});

const PostsEditor = ({ defaultValue, onSubmit }) => (
  <Form defaultValue={defaultValue} onSubmit={onSubmit} schema={schema}>
    <Form.Field
      autoFocus
      floatingLabelText={null}
      fullWidth
      multiLine
      name="body"
    />
    <Form.SubmitButton label="Save Post" />
  </Form>
);

PostsEditor.propTypes = {
  defaultValue: PropTypes.shape({
    body: PropTypes.string.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default PostsEditor;
