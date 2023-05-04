import React, { useEffect, useState } from 'react';
import { formatCurrency } from '../utils/helpers';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Order = ({ order }) => {
  const dispatch = useDispatch();
  const [productsMap, setProductsMap] = useState({});
  const products = useSelector((state) => state.product.products);
  const { ProductOrders } = order;
  console.log(products);
  useEffect(() => {
    dispatch({ type: 'GET_PRODUCTS', payload: products });
  }, [dispatch]);

  useEffect(() => {
    if (products) {
      const map = products.reduce((acc, product) => {
        acc[product._id] = product;
        return acc;
      }, {});
      setProductsMap(map);
      console.log(map);
    }
  }, [products]);

  const handleRemoveClick = (productId) => {
    dispatch({ type: 'DELETE_ORDER', payload: { productId } });
    // Remove the deleted product from the local state
    setProductsMap((prevState) => {
      const newState = { ...prevState };
      delete newState[productId];
      return newState;
    });
  };

  const ordersByOrderId = ProductOrders?.reduce((acc, { OrderId, ProductId, Count, Price }) => {
    acc[OrderId] = acc[OrderId] || [];
    acc[OrderId].push({ ProductId, Count, Price });
    return acc;
  }, {}) || {};

  const ordersToDisplay = Object.keys(ordersByOrderId).map((orderId) => {
    const orders = ordersByOrderId[orderId];
    const orderTotal = orders.reduce((acc, { Count, Price }) => acc + Count * Price, 0);

    return (
      <div className="w-full md:w-2/3 bg-white rounded-md shadow" key={orderId}>
        <h2 className="text-xl font-bold text-gray-800 px-6 py-4">Order Details: </h2>
        <ul className="divide-y divide-gray-200">
          {orders.map(({ Id, Count, Price }) => {
            const product = productsMap[Id];
            if (!product) {
              return null; // or you can display a loading state or an error message
            }
            console.log(product);
            return (
              <li key={Id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex justify-content items-center">
                  <div className="flex items-center">
                    <div className="font-semibold text-lg">{product.ProductName}</div>
                    <div className="text-gray-500 ml-2">({Id})</div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2">x {Count}</div>
                    <div className="font-semibold">{formatCurrency(Price)}</div>
                  </div>
                </div>
                <button className="text-red-600 hover:text-red-800 float-right" onClick={() => handleRemoveClick(Id)}>
                  Remove
                </button>
              </li>
            );
          })}
          <li className="px-6 py-4 font-semibold text-right">Order Total: {formatCurrency(orderTotal)}</li>
        </ul>
      </div>
    );
  });

  return <div>{ordersToDisplay}</div>;
};

export default Order;
