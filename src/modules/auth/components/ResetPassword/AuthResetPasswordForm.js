import Form from 'common/components/Form';
import React, { PropTypes } from 'react';
import yup from 'yup';

const schema = yup.object({
  username: yup.string().required('is required'),
});

const AuthResetPassword = ({ loading, ...props }) => (
  <Form {...props} schema={schema}>
    <Form.Field
      autoFocus
      floatingLabelText="Username"
      fullWidth
      name="username"
    />
    <Form.SubmitButton
      fullWidth
      label="Reset Password"
      loading={loading}
    />
  </Form>
);

AuthResetPassword.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default AuthResetPassword;
