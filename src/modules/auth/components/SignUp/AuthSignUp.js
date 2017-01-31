import Form, { PasswordField } from 'common/components/Form';
import withActions from 'common/containers/withActions';
import { compose } from 'lodash/fp';
import { signUp } from 'modules/auth/actions';
import React, { PropTypes } from 'react';
import { mapProps } from 'recompose';
import yup from 'yup';
import Layout from '../Layout';

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

const AuthSignUp = ({ onSubmit }) => (
  <Layout title="SignUp">
    <Form onSubmit={onSubmit} schema={schema}>
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
      <Form.SubmitButton fullWidth label="Sign Up" />
    </Form>
  </Layout>
);

AuthSignUp.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const container = compose(
  mapProps(props => ({
    token: props.match.params.token,
  })),
  withActions(props => ({
    onSubmit: data => signUp({ ...data, token: props.token }),
  })),
);

export default container(AuthSignUp);
