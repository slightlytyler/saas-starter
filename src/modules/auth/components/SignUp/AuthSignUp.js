import withActions from 'common/containers/withActions';
import { compose } from 'lodash/fp';
import { signUp } from 'modules/auth/actions';
import React, { PropTypes } from 'react';
import { mapProps, withState } from 'recompose';
import Form from './AuthSignUpForm';
import Layout from '../Layout';

const AuthSignUp = ({ loading, onSubmit }) => (
  <Layout title="SignUp">
    <Form loading={loading} onSubmit={onSubmit} />
  </Layout>
);

AuthSignUp.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const container = compose(
  mapProps(props => ({
    token: props.match.params.token,
  })),
  withState('loading', 'setLoading', false),
  withActions(props => ({
    onSubmit: data => signUp({ ...data, token: props.token }),
  })),
);

export default container(AuthSignUp);
