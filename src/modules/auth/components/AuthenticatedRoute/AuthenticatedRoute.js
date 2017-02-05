import gql from 'graphql-tag';
import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { Route, Redirect } from 'react-router-dom';

const AuthenticatedRoute = ({ data, render, ...rest }) => {
  console.log(data);
  return (
    <Route
      {...rest}
      render={props => (data.user ? render(props) : <Redirect to="/auth/login" />)}
    />
  );
};

AuthenticatedRoute.propTypes = {
  data: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
  render: PropTypes.func.isRequired,
};

const userQuery = gql`
  query {
    user {
      id
    }
  }
`;

const container = graphql(userQuery, { options: { forceFetch: true } });

export default container(AuthenticatedRoute);
