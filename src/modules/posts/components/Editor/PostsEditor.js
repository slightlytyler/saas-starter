import Form from 'common/components/Form';
import { propType } from 'graphql-anywhere';
import React, { PropTypes } from 'react';
import yup from 'yup';
import * as fragments from '../../fragments';

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
  defaultValue: propType(fragments.PostObject).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default PostsEditor;
