import Form, { PasswordField } from 'common/components/Form';
import React, { PropTypes } from 'react';
import yup from 'yup';

function validatePassword() {
  return this.parent.password === this.parent.passwordConfirmation;
}

const schema = yup.object({
  username: yup.string().required('is required'),
  password: yup.string().required('is required'),
  passwordConfirmation: yup.string()
    .required('is required')
    .test('passwords-match', 'passwords do not match', validatePassword),
});

const AuthSignUpForm = ({ loading, ...props }) => (
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
    <Form.Field
      floatingLabelText="Confirm Password"
      fullWidth
      name="passwordConfirmation"
      type={PasswordField}
    />
    <Form.SubmitButton
      fullWidth
      label="Sign Up"
      loading={loading}
    />
  </Form>
);

AuthSignUpForm.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default AuthSignUpForm;
