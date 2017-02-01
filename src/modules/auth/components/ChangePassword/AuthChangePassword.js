import withActions from 'common/containers/withActions';
import { compose } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { mapProps, withState } from 'recompose';
import Form from './AuthChangePasswordForm';
import Layout from '../Layout';
import * as actions from '../../actions';

const AuthChangePassword = ({ loading, onSubmit }) => (
  <Layout title="Change Password">
    <Form loading={loading} onSubmit={onSubmit} />
  </Layout>
);

AuthChangePassword.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const container = compose(
  withActions({ onSubmit: actions.changePassword }),
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

export default container(AuthChangePassword);
