import Form, { PasswordField } from 'components/Form';
import withActions from 'containers/withActions';
import { login } from 'modules/auth/actions';
import React, { PropTypes } from 'react';
import yup from 'yup';
import Layout from '../Layout';

const schema = yup.object({
  username: yup.string().required('is required'),
  password: yup.string().required('is required'),
});

const AuthLogin = ({ onSubmit }) => (
  <Layout
    alternateMessages={[
      {
        pathname: 'reset-password',
        prompt: 'Forgot your password?',
      },
    ]}
    title="Login"
  >
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
      <Form.SubmitButton fullWidth label="Login" />
    </Form>
  </Layout>
);

AuthLogin.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default withActions({ onSubmit: login })(AuthLogin);
