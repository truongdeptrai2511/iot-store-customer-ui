import React, { useEffect } from 'react';
import { formatCurrency } from '../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie, setCookie } from '../utils/helpers';
import Cookies from 'js-cookie';

const Order = ({ order, onRemove }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  console.log(order)
  useEffect(() => {
    dispatch({ type: 'GET_PRODUCTS' });
  }, [dispatch]);

  const handleRemoveClick = (Id, OrderId) => {
    onRemove(Id, OrderId)
    const currentOrders = JSON.parse(getCookie('orders')) || [];
    const updateOrder = currentOrders.filter((order) => order.productId !== Id);
    setCookie('orders', JSON.stringify(updateOrder));
    const value = Cookies.get(Id);
    if (value) {
      Cookies.set(Id, Number(value) - 1, { expires: 30 });
    }
  };

  if (order.length === 0) {
    return <div>No orders found</div>;
  }
  const productCounts = order.ProductOrders.reduce((acc, { ProductId, Count, Price }) => {
    if (acc[ProductId]) {
      acc[ProductId] += Count;
    } else {
      acc[ProductId] = Count;
    }
    return acc;
  }, {});
  const orderTotal = order.ProductOrders.reduce((acc, { Count, Price }) => acc + Count * Price, 0);

  return (
    <div className="w-full md:w-3/4 bg-white rounded-md shadow" key={order.Order.Id}>
      <h2 className="text-xl font-bold text-gray-800 px-6 py-4">Order Details:</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Object.entries(productCounts).map(([productId, count]) => {
          const productIndex = products.findIndex((product) => product.Id === parseInt(productId));
          const product = products[productIndex];
          if (!product) {
            return <li key={productId}>Loading...</li>;
          }
          return (
            <li key={productId} className="product-item bg-gray-50 rounded-md shadow-md p-4 hover:bg-gray-100 transition duration-300" style={{ display: "flex", flexDirection: "column" }}>
              <div className="product-image" style={{ height: "60%" }}>
                <img src={product.ImgName} alt={product.ProductName} />
              </div>
              <div className="product-details" style={{ height: "40%" }}>
                <h3 className="font-bold text-lg mb-2">{product.ProductName}</h3>
                <p className="text-gray-600 mb-4 text-red-600">{formatCurrency(product.Price)}</p>
                <span>{count}</span>
              </div>
              <div className="product-ft" style={{ textAlign: "center", marginTop: "auto", height: "10%" }}>
                {order.ProductOrders.length > 0 &&
                  <button className="text-red-600 hover:text-red-800" onClick={() => handleRemoveClick(product.Id, order.Order.Id)}>
                    Remove
                  </button>
                }

              </div>
            </li>
          );
        })}
      </ul>
      <div className="px-6 py-4 font-semibold text-right">Order Total: {formatCurrency(orderTotal)}</div>
    </div>

//TODO
  );
};

export default Order;