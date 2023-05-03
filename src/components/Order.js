import React from 'react';
import { formatCurrency } from '../utils/helpers';
import { useDispatch } from 'react-redux';

const Order = ({ order }) => {
  const dispatch = useDispatch();
  const { ProductOrders } = order;
  const handleRemoveClick = (productId) => {
    const currentOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const updatedOrders = currentOrders.filter((order) => order.productId !== productId);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    dispatch({ type: 'GET_ORDER', payload: updatedOrders });
  };

  // Tạo đối tượng mới với key là OrderId và value là một mảng các sản phẩm tương ứng
  const ordersByOrderId = ProductOrders.reduce((acc, { OrderId, ProductId, Count, Price }) => {
    if (!acc[OrderId]) {
      acc[OrderId] = [];
    }
    acc[OrderId].push({ ProductId, Count, Price });
    return acc;
  }, {});

  // Lấy danh sách các giá trị từ đối tượng ordersByOrderId và hiển thị chúng
  const ordersToDisplay = Object.values(ordersByOrderId).map((orders) => {
    const recentOrders = Object.values(ordersByOrderId)[0];
    const orderTotal = recentOrders.reduce((acc, { Count, Price }) => acc + Count * Price, 0);
  
    return (
      <div className="w-full md:w-1/3 bg-white rounded-md shadow" key={orders[0].ProductId}>
        <h2 className="text-xl font-bold text-gray-800 px-6 py-4">Order Details: <button className="text-red-600 hover:text-red-800 float-right" onClick={() => handleRemoveClick(orders[0].ProductId)}>Remove</button></h2>
        <ul className="divide-y divide-gray-200">
          {orders.map(({ ProductId, Count, Price }) => (
            <li key={ProductId} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex justify-content items-center">
                <div className="flex items-center">
                  <div className="font-semibold text-lg">{localStorage.getItem(ProductId)}</div>
                  <div className="text-gray-500 ml-2">({ProductId})</div>
                </div>
                <div className="flex items-center">
                  <div className="mr-2">x {Count}</div>
                  <div className="font-semibold">{formatCurrency(Price)}</div>
                </div>
              </div>
            </li>
          ))}
          <li className="px-6 py-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="font-semibold text-lg">Total:</div>
              <div className="font-semibold">{formatCurrency(orderTotal)}</div>
            </div>
          </li>
        </ul>
      </div>
    );
  });

  return ordersToDisplay[0] || null;
};

export default Order;
