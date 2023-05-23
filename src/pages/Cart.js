import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Order from "../components/Order";

const Cart = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.getOrder.getOrder) || [];
  const [latestOrder, setLatestOrder] = useState(null);

  const sortOrdersByTimestamp = (orders) => {
    if (!orders || orders.length === 0) {
      return [];
    }
    console.log(orders)
    const currentDate = new Date().setHours(0, 0, 0, 0);
    const filteredOrders = orders.filter((order) => {
      const orderDate = new Date(order.Order?.CreatedAt).setHours(0, 0, 0, 0);
      return orderDate === currentDate;
    });
    console.log(filteredOrders)
    return filteredOrders.sort((a, b) => {
      const aTimestamp = new Date(a?.CreatedAt).getTime();
      const bTimestamp = new Date(b?.CreatedAt).getTime();
      return bTimestamp - aTimestamp;
    });
  };
  

  useEffect(() => {
    dispatch({ type: "GET_ORDER_LIST" });
  }, [dispatch]);

  useEffect(() => {
    const sortedOrders = sortOrdersByTimestamp(orders);
    console.log(sortedOrders)
    const latestOrder = sortedOrders?.[0];
    setLatestOrder(latestOrder);
  }, [orders]);

  const handleRemoveOrder = (Id, OrderId) => {
    dispatch({ type: "DELETE_ORDER_ITEM", payload: { Id, OrderId } });
  
    setLatestOrder((prevOrder) => {
      const updatedProductOrders = prevOrder.ProductOrders.filter(
        (product) => product.ProductId !== Id
      );
  
      return { ...prevOrder, ProductOrders: updatedProductOrders };
    });
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-8">
      <h1 className="text-3xl font-bold text-gray-800">Your Orders</h1>
      <div className="flex flex-wrap justify-center gap-10 w-screen">
        {latestOrder && (
          <Order key={latestOrder?.Id} order={latestOrder} onRemove={handleRemoveOrder} />
        )}
      </div>
      <Link
        to="/product"
        className="text-xl py-2 text-center hover:text-cyan-500 duration-300 select-none"
      >
        &larr; Continue Shopping
      </Link>
    </div>
  );
};

export default Cart;
