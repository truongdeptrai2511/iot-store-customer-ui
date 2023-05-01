import React from 'react';

const Order = ({ order }) => {
  return (
    <div>
      <ul>
        {order.map(product => (
          <li key={product.Id}>
            <p>Product ID: {product.productId}</p>
            <p>Count: {product.count}</p>
            <p>Price: {product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Order;
