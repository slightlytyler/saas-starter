import Form, { PasswordField } from 'components/Form';
import withActions from 'containers/withActions';
import { compose } from 'lodash/fp';
import { login } from 'modules/auth/actions';
import React, { PropTypes } from 'react';
import { mapProps, withState } from 'recompose';
import yup from 'yup';
import Layout from '../Layout';

const schema = yup.object({
  username: yup.string().required('is required'),
  password: yup.string().required('is required'),
});

const AuthLogin = ({ loading, onChange, onSubmit, value }) => (
  <Layout
    alternateMessages={[
      {
        pathname: 'reset-password',
        prompt: 'Forgot your password?',
      },
    ]}
    title="Login"
  >
    <Form
      onChange={onChange}
      onSubmit={onSubmit}
      schema={schema}
      value={value}
    >
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
      <Form.SubmitButton
        fullWidth
        label="Login"
        loading={loading}
      />
    </Form>
  </Layout>
);

AuthLogin.propTypes = {
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.object,
};

AuthLogin.defaultProps = {
  value: null,
};

const container = compose(
  withActions({ login }),
  withState('loading', 'setLoading', false),
  withState('value', 'setValue', null),
  mapProps(props => ({
    loading: props.loading,
    onChange: model => props.setValue(model),
    onSubmit: () => {
      props.setLoading(true);
      props.login(
        props.value,
        () => {
          props.setLoading(false);
          props.setValue({ ...props.value, password: null });
        },
      );
    },
    value: props.value,
  })),
);

export default container(AuthLogin);
