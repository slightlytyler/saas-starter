import withActions from 'containers/withActions';
import { compose } from 'lodash/fp';
import { registerToken } from 'modules/auth/actions';
import { selectIsAuthenticated } from 'modules/auth/selectors';
import React from 'react';
import { branch, lifecycle, renderComponent, withState } from 'recompose';

const withStorage = compose(
  withActions({ registerToken }),
  withState('loading', 'setLoading', true),
  lifecycle({
    async componentWillMount() {
      await this.props.store.loadStorage();
      if (selectIsAuthenticated(this.props.store.getState())) {
        this.props.registerToken();
      }
      this.props.setLoading(false);
    },
  }),
  branch(
    props => props.loading,
    renderComponent(() => <div>Loading...</div>),
  ),
);

export default withStorage;
