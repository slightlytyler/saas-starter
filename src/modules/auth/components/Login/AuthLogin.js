import withActions from 'common/containers/withActions';
import { compose } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { mapProps, withState } from 'recompose';
import Form from './AuthLoginForm';
import Layout from '../Layout';
import * as actions from '../../actions';

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
      loading={loading}
      onChange={onChange}
      onSubmit={onSubmit}
      value={value}
    />
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
  withActions({ onSubmit: actions.login }),
  withState('loading', 'setLoading', false),
  withState('value', 'setValue', null),
  mapProps(props => ({
    loading: props.loading,
    onChange: model => props.setValue(model),
    onSubmit: () => {
      props.setLoading(true);
      props.onSubmit(
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
