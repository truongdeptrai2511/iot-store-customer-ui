import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Order from "../components/Order";

const Cart = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.getOrder.getOrder);

  useEffect(() => {
    dispatch({ type: 'GET_ORDER_LIST' });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <h1 className="text-3xl font-bold text-gray-800">
        Your Orders
      </h1>
      <div className="flex flex-wrap justify-center gap-10 max-w-4xl">
        {orders?.map(order => (
          <Order key={order.Id} order={order}>
          </Order>
        ))}
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
