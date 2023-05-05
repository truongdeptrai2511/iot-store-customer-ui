import React, { useEffect } from 'react';
import { formatCurrency } from '../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';

const Order = ({ order }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  useEffect(() => {
    dispatch({ type: 'GET_PRODUCTS' });
  }, [dispatch]);

  const handleRemoveClick = (productId) => {
    dispatch({ type: 'DELETE_ORDER_ITEM', payload: { orderId: order[0].Order.Id, productId } });
  };

  if (order.length === 0) {
    return <div>No orders found</div>;
  }

  const firstOrderId = order[0];
  const productCounts = firstOrderId.ProductOrders.reduce((acc, { ProductId, Count, Price }) => {
    if (acc[ProductId]) {
      acc[ProductId] += Count;
    } else {
      acc[ProductId] = Count;
    }
    return acc;
  }, {});
  
  const orderTotal = firstOrderId.ProductOrders.reduce((acc, { Count, Price }) => acc + Count * Price, 0);

  return (
    <div className="w-full md:w-2/3 bg-white rounded-md shadow" key={firstOrderId.Order.Id}>
      <h2 className="text-xl font-bold text-gray-800 px-6 py-4">Order Details:</h2>
      <ul className="divide-y divide-gray-200">
        {Object.entries(productCounts).map(([productId, count]) => {
          const productIndex = products.findIndex((product) => product.Id === parseInt(productId));
          const product = products[productIndex];
          if (!product) {
            return <li key={productId}>Loading...</li>;
          }
          return (
            <li key={productId} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex justify-content items-center">
                <div className="flex items-center">
                  <div className="font-semibold text-lg">{product.ProductName}</div>
                  <div className="text-gray-500 ml-2">({productId})</div>
                </div>
                <div className="flex items-center">
                  <div className="mr-2">x {count}</div>
                  <div className="font-semibold">{formatCurrency(product.Price)}</div>
                </div>
              </div>
              <button className="text-red-600 hover:text-red-800 float-right" onClick={() => handleRemoveClick(productId)}>
                Remove
              </button>
            </li>
          );
        })}
        <li className="px-6 py-4 font-semibold text-right">Order Total: {formatCurrency(orderTotal)}</li>
      </ul>
    </div>
  );
};

export default Order;
