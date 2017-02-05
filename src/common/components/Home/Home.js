import gql from 'graphql-tag';
import LoginButton from 'modules/auth/components/LoginButton';
import LogoutButton from 'modules/auth/components/LogoutButton';
import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';

const Home = ({ data }) => {
  if (data.loading) return <div>Loading...</div>;
  if (data.user) {
    return (
      <div>
        <header>Home</header>
        <LogoutButton />
      </div>
    );
  }
  return (
    <div>
      <header>Home</header>
      <LoginButton />
    </div>
  );
};

Home.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object,
  }).isRequired,
};

const userQuery = gql`
  query {
    user {
      id,
      name
    }
  }
`;

const container = graphql(userQuery, { options: { forceFetch: true } });

export default container(Home);
