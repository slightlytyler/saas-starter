import Form, { PasswordField } from 'common/components/Form';
import withActions from 'common/containers/withActions';
import { signUp } from 'modules/auth/actions';
import React, { PropTypes } from 'react';
import yup from 'yup';
import Layout from '../Layout';

const schema = yup.object({
  username: yup.string().required('is required'),
  password: yup.string().required('is required'),
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
      <Form.SubmitButton label="SignUp" />
    </Form>
  </Layout>
);

AuthSignUp.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default withActions({ onSubmit: signUp })(AuthSignUp);
