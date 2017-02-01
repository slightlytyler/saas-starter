import Form from 'common/components/Form';
import validatePasswordsMatch from 'common/validations/passwordsMatch';
import React, { PropTypes } from 'react';
import yup from 'yup';

const schema = yup.object({
  username: yup.string().required('is required'),
  password: yup.string().required('is required'),
  passwordConfirmation: yup.string()
    .test('passwords-match', 'passwords do not match', validatePasswordsMatch)
    .required('is required'),
});

const AuthSignUpForm = ({ loading, ...props }) => (
  <Form {...props} schema={schema}>
    <Form.Field
      autoFocus
      floatingLabelText="Username"
      fullWidth
      name="username"
    />
    <Form.Field
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
      label="Sign Up"
      loading={loading}
    />
  </Form>
);

AuthSignUpForm.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default AuthSignUpForm;
