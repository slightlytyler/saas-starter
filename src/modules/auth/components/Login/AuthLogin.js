import Form from 'components/forms/Form';
import Field from 'components/forms/Field';
import PasswordField from 'components/forms/PasswordField';
import SubmitButton from 'components/forms/SubmitButton';
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
      <Field
        floatingLabelText="Username"
        fullWidth
        name="username"
      />
      <Field
        floatingLabelText="Password"
        fullWidth
        name="password"
        type={PasswordField}
      />
      <SubmitButton label="Login" />
    </Form>
  </Layout>
);

AuthLogin.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default withActions({ onSubmit: login })(AuthLogin);
