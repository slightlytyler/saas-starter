import React from 'react';
import yup from 'yup';
import ActionsProvider from 'components/ActionsProvider';
import Form from 'components/forms/Form';
import Field from 'components/forms/Field';
import PasswordField from 'components/forms/PasswordField';
import SubmitButton from 'components/forms/SubmitButton';
import { login } from 'modules/auth/actions';
import Layout from '../Layout';

const schema = yup.object({
  username: yup.string().required('is required'),
  password: yup.string().required('is required'),
});

const AuthLogin = () => (
  <Layout
    alternateMessage={{
      prompt: 'Forgot your password?',
      transitionTo: 'reset-password',
    }}
    title="Login"
  >
    <ActionsProvider creators={{ login }}>
      {({ actions }) => (
        <Form
          fullWidth
          onSubmit={actions.login}
          schema={schema}
        >
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
      )}
    </ActionsProvider>
  </Layout>
);

export default AuthLogin;
