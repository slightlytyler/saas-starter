import {compose} from 'lodash/fp';
import PropTypes from 'prop-types';
import React from 'react';
import {lifecycle, setDisplayName, setPropTypes} from 'recompose';

export const AuthHandler = () => <div>Logging you in now...</div>;

export const container = compose(
  setDisplayName('AuthHandler'),
  setPropTypes({
    code: PropTypes.string.isRequired,
  }),
  lifecycle({
    componentDidMount() {
      console.log(this.props.code);
    },
  }),
);

export default container(AuthHandler);
