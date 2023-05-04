import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Order from "../components/Order";

const Cart = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.getOrder.getOrder);
  console.log(orders)
  useEffect(() => {
    dispatch({ type: 'GET_ORDER_LIST' });
  }, []);
  // Sort the list of orders by timestamp and get the most recent order
  const mostRecentOrder = orders?.sort((a, b) => {
    const aDate = new Date(a?.CreatedAt);
    const bDate = new Date(b?.CreatedAt);
    return aDate - bDate;
  }, null);
  console.log(mostRecentOrder)
  return (
    <div className="flex flex-col items-center justify-center h-full w-12/12 gap-8">
      <h1 className="text-3xl font-bold text-gray-800">
        Your Orders
      </h1>
      <div className="flex flex-wrap justify-center gap-10 w-screen">
        {mostRecentOrder && (
          <Order key={mostRecentOrder.Id} order={mostRecentOrder}>
          </Order>
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
