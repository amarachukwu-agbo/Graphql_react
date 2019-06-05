import React, { Component } from 'react';
import gql from 'graphql-tag';
import StripeCheckout from 'react-stripe-checkout';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Query, Mutation } from 'react-apollo';
import CartStyles from './styles/CartStyles';
import SickButton from './styles/SickButton';
import CloseButton from './styles/CloseButton';
import Supreme from './styles/Supreme';
import User, { CURRENT_USER_QUERY } from './User';
import CartItem from './CartItem';
import calculateTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';

export const LOCAL_STATE_QUERY = gql`
  query LOCAL_STATE_QUERY {
    cartOpen @client
  }
`;

export const TOGGLE_CART_MUTATION = gql`
  mutation TOGGLE_CART_MUTATION {
    toggleCart @client
  }
`;

export const CREATE_ORDER = gql`
  mutation CREATE_ORDER($token: String!) {
    createOrder(token: $token) {
      id
      items {
        image
        description
        title
      }
      total
      charge
    }
  }
`;

const totalItems = (cart) => {
  return cart.reduce((tally, item) => tally + item.quantity, 0)
}
class Cart extends Component {
  onToken = async (token, createOrder) => {
    NProgress.start();
    const order = await createOrder({
      variables: {
        token: token.id
      }
    }).catch(error => alert(`Error: ${error}`));
    Router.push({
      pathname: '/order',
      query: { id: order.data.createOrder.id }
    });
  }
  render() {
    return (
      <User>
        {({ data } ) => {
          const { me } = data;
          if (!me) return null;
          return(
            <Mutation mutation={TOGGLE_CART_MUTATION}>
              {(toggleCart) => (
              <Query query={LOCAL_STATE_QUERY}>
                {({ data }) => (
                  <CartStyles open={data.cartOpen}>
                    <header>
                      <CloseButton title="close" onClick={toggleCart}>&times;</CloseButton>
                      <Supreme>{me.name}'s Cart</Supreme>
                      <p>You have {me.cart.length} item{me.cart.length === 1 ? '': 's'} in your cart</p>
                    </header>
                    <ul>
                      { me.cart.map(item => <CartItem key={item.id} cartItem={item}/>) }
                    </ul>
                    <footer>
                      {
                        me.cart.length ? (
                          <>
                            <p>{formatMoney(calculateTotalPrice(me.cart))}</p>
                            <Mutation mutation={CREATE_ORDER} refetchQueries={[{query: CURRENT_USER_QUERY }]}>
                              {(createOrder) => (
                                <StripeCheckout
                                  name="Sick Fits"
                                  description={`Order of ${totalItems(me.cart)} items`}
                                  token={(stripeToken) => this.onToken(stripeToken, createOrder)}
                                  stripeKey="pk_test_4ApAJihRk5yShkglGcJ0ZSXV00oEwKYLu4"
                                  amount={calculateTotalPrice(me.cart)}
                                  image={me.cart.length && me.cart[0].item && me.cart[0].item.image}
                                  currency="USD"
                                >
                                  <SickButton>Checkout</SickButton>
                                </StripeCheckout>
                              )}
                            </Mutation>
                          </>
                        ) : ''
                      }
                    </footer>
                  </CartStyles>
                )}
              </Query>
              )}
            </Mutation>
          )
        }}
      </User>
    );

  }
};

export default Cart;