import withActions from 'common/containers/withActions';
import { compose } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { mapProps, withState } from 'recompose';
import Form from './AuthResetPasswordForm';
import Layout from '../Layout';
import * as actions from '../../actions';

const AuthResetPassword = ({ loading, onSubmit }) => (
  <Layout title="Reset Password">
    <Form loading={loading} onSubmit={onSubmit} />
  </Layout>
);

AuthResetPassword.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const container = compose(
  withActions({ onSubmit: actions.resetPassword }),
  withState('loading', 'setLoading', false),
  mapProps(props => ({
    loading: props.loading,
    onSubmit: data => {
      props.setLoading(true);
      props.onSubmit(data, () => props.setLoading(false));
    },
  })),
);

export default container(AuthResetPassword);
