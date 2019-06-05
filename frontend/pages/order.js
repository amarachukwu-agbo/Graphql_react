import React from 'react';
import Order from '../components/Order';

const OrderPage= ({ query }) => {
  return (
    <div>
      <Order orderId={query.id} />
    </div>
  );
};

export default OrderPage;