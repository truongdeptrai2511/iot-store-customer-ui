import React from 'react';

const Order = ({ order }) => {
  const { ProductOrders, Order } = order;
  return (
    <div style={{ width: "30%", display: "flex" }}>
      <div className="flex flex-col overflow-x-auto w-full">
        <h2 className="font-bold text-2xl mb-2">Order Details:</h2>
        <div className="bg-white rounded-md shadow overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {ProductOrders.map(({ Id, ProductId, Count, Price }) => (
              <li key={Id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="font-semibold text-lg">{localStorage.getItem(ProductId)}</div>
                    <div className="text-gray-500 ml-2">({ProductId})</div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2">x {Count}</div>
                    <div className="font-semibold">${Price}</div>
                  </div>
                </div>
              </li>
            ))}
            <li className="px-6 py-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="font-semibold text-lg">Total:</div>
                <div className="font-semibold">${Order.OrderTotal.toFixed(2)}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Order;