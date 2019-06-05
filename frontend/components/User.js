import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      email
      name
      permissions
      orders
      cart {
        id
        quantity
        item {
          id
          price
          description
          image
          title
        }
      }
    }
  }

`;
const User = props => (
  <Query query={CURRENT_USER_QUERY}>
    {(payload) => {
      return props.children(payload)
    }}
  </Query>
);

User.propTypes = {
  children: PropTypes.func.isRequired
}

export default User;

