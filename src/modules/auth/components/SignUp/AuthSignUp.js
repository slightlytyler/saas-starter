import withActions from 'common/containers/withActions';
import { compose } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { mapProps, withState } from 'recompose';
import Form from './AuthSignUpForm';
import Layout from '../Layout';
import * as actions from '../../actions';

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
  withActions({ onSubmit: actions.signUp }),
  withState('loading', 'setLoading', false),
  mapProps(props => ({
    loading: props.loading,
    onSubmit: data => {
      props.setLoading(true);
      props.onSubmit(
        { ...data, token: props.match.params.token },
        () => props.setLoading(false),
      );
    },
  })),
);

export default container(AuthSignUp);
