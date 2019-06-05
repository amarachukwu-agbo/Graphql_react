import React from 'react';
import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';
import SignIn from '../components/SignIn';

const Auth = ({ children }) => {
  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ data , loading}) => {
        if (loading) return <p>Loading ...</p>
        if (data && !data.me) return <SignIn />
        return children;
      }}
    </Query>
  );
};

export default Auth;