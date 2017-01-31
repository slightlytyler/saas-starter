import Form, { PasswordField } from 'common/components/Form';
import React, { PropTypes } from 'react';
import yup from 'yup';

const schema = yup.object({
  username: yup.string().required('is required'),
  password: yup.string().required('is required'),
});

const AuthLoginForm = ({ loading, ...props }) => (
  <Form {...props} schema={schema}>
    <Form.Field
      floatingLabelText="Username"
      fullWidth
      name="username"
    />
    <Form.Field
      floatingLabelText="Password"
      fullWidth
      name="password"
      type={PasswordField}
    />
    <Form.SubmitButton
      fullWidth
      label="Login"
      loading={loading}
    />
  </Form>
);

AuthLoginForm.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default AuthLoginForm;
