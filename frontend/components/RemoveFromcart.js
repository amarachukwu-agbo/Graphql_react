import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

export const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const Button = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    cursor: pointer;
    color: ${props => props.theme.red}
  }
`;

export default class RemoveFromcart extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  }

  update = (cache, { data: { removeFromCart }}) => {
    const { me } = cache.readQuery({ query: CURRENT_USER_QUERY });
    const neededItems = me.cart.filter(item => item.id !== removeFromCart.id );
    cache.writeQuery(
      {
        query: CURRENT_USER_QUERY,
        data: {
          me: {
            ...me,
            cart: neededItems
          }
        }
    });
  }
  render() {
    const { id } = this.props;
    return (
      <Mutation
        mutation={REMOVE_FROM_CART_MUTATION}
        variables={{id}}
        update={this.update}
        optimisticResponse={{
          __typename: 'Mutation',
          removeFromCart: {
            __typename: 'CartItem',
            id: this.props.id
          }
        }}
        >
        {(removeFromCart, { loading }) => (
          <Button
            title="Delete Item"
            disabled={loading}
            onClick={() => removeFromCart().catch(err => alert(err.message))}
            >
            &times;
          </Button>

        )}
      </Mutation>
    )
  }
}
