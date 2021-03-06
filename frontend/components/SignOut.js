import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../components/User';

const  SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signOut {
      message
    }
  }
`;
const SignOut = () => (
  <Mutation
    mutation={SIGN_OUT_MUTATION}
    refetchQueries={[{query: CURRENT_USER_QUERY}]}>
  {(signOut) => (<button onClick={signOut}>Sign Out</button>)}
  </Mutation>
)

export default SignOut;
