import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { format } from 'date-fns';
import gql from 'graphql-tag';
import Head from 'next/head';
import OrderStyles from './styles/OrderStyles';
import Error from '../components/ErrorMessage';
import formatMoney from '../lib/formatMoney';

export const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      total
      charge
      items {
        id
        quantity
        price
        title
        image
      }
    }
  }
`;


export default class Order extends Component {
  static propTypes = {
    orderId: PropTypes.string.isRequired
  }
  render() {
    const { orderId } = this.props;
    return (
      <Query query={SINGLE_ORDER_QUERY} variables={{id: orderId}}>
        {({ data: {order}, loading, error }) => {
          if (error) return <Error error ={error} />
          if (loading) return <p>Loading ....</p>
          return (
            <OrderStyles>
              <Head>
                <title>Sick Fits - Order {orderId}</title>
              </Head>
              <p>
                <span>Order ID: </span>
                <span>{ orderId }</span>
              </p>
              <p>
                <span>Charge: </span>
                <span>{ order.charge }</span>
              </p>
              <p>
                <span>Date: </span>
                <span>{ format(order.createdAt, 'MMMM d, YYYY h:mm a') }</span>
              </p>
              <p>
                <span>Order Total: </span>
                <span>{ formatMoney(order.total) }</span>
              </p>
              <p>
                <span>Item Count: </span>
                <span>{ order.items.length }</span>
              </p>
              <div className="items">
                {
                  order.items.map(item => (
                    <div className="order-item" key={item.id}>
                      <img src={item.image} alt={item.title}/>
                      <div className="item-details">
                        <h2>{item.title}</h2>
                        <p>Quantity: {item.quantity}</p>
                        <p>Each: {formatMoney(item.price)}</p>
                        <p>Subtotal: {formatMoney(item.quantity * item.price)}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </OrderStyles>
          )
        }}
      </Query>
    )
  }
}
