import Form, { PasswordField } from 'common/components/Form';
import React, { PropTypes } from 'react';
import yup from 'yup';

function validatePassword() {
  return this.parent.password === this.parent.passwordConfirmation;
}

const schema = yup.object({
  password: yup.string().required('is required'),
  passwordConfirmation: yup.string()
    .required('is required')
    .test('passwords-match', 'passwords do not match', validatePassword),
});

const AuthResetPassword = ({ loading, ...props }) => (
  <Form {...props} schema={schema}>
    <Form.Field
      autoFocus
      floatingLabelText="Password"
      fullWidth
      name="password"
      type={PasswordField}
    />
    <Form.Field
      floatingLabelText="Confirm Password"
      fullWidth
      name="passwordConfirmation"
      type={PasswordField}
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
