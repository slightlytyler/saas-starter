import Form from 'common/components/Form';
import validatePasswordsMatch from 'common/validations/passwordsMatch';
import React, { PropTypes } from 'react';
import yup from 'yup';

const schema = yup.object({
  password: yup.string().required('is required'),
  passwordConfirmation: yup.string()
    .test('passwords-match', 'passwords do not match', validatePasswordsMatch)
    .required('is required'),
});

const AuthResetPassword = ({ loading, ...props }) => (
  <Form {...props} schema={schema}>
    <Form.Field
      autoFocus
      floatingLabelText="Password"
      fullWidth
      name="password"
      type="password"
    />
    <Form.Field
      floatingLabelText="Confirm Password"
      fullWidth
      name="passwordConfirmation"
      type="password"
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
