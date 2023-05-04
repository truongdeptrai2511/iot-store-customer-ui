import React, { useEffect } from 'react';
import { formatCurrency } from '../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';

const Order = ({ order }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  useEffect(() => {
    dispatch({ type: 'GET_PRODUCTS' });
  }, [dispatch]);

  const handleRemoveClick = (id) => {
    dispatch({ type: 'DELETE_ORDER', payload: { id } });
  };
  if (order.length > 0) {
    const firstOrderId = order[0];
    console.log("First order ID:", firstOrderId);
    return (
      <div className="w-full md:w-2/3 bg-white rounded-md shadow" key={order?.Order?.Id}>
        <h2 className="text-xl font-bold text-gray-800 px-6 py-4">Order Details:</h2>
        <ul className="divide-y divide-gray-200">
          {firstOrderId.ProductOrders && firstOrderId.ProductOrders.map(({ ProductId, Count, Price }) => {
            const product = products[ProductId];
            if (!product) {
              return <li>Loading...</li>;
            }
            return (
              <li key={ProductId} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex justify-content items-center">
                  <div className="flex items-center">
                    <div className="font-semibold text-lg">{product.ProductName}</div>
                    <div className="text-gray-500 ml-2">({ProductId})</div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2">x {Count}</div>
                    <div className="font-semibold">{formatCurrency(Price)}</div>
                  </div>
                </div>
                <button className="text-red-600 hover:text-red-800 float-right" onClick={() => handleRemoveClick(ProductId)}>
                  Remove
                </button>
              </li>
            );
          })}
          <li className="px-6 py-4 font-semibold text-right">Order Total: {
            formatCurrency(firstOrderId?.Order?.OrderTotal)}</li>
        </ul>
      </div>
    );
  } else {
    console.log("No orders found");
  }


};

export default Order;
