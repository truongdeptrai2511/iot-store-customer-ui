import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Order from "../components/Order";
const Cart = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.getOrder.getOrder);
  useEffect(() => {
    dispatch({ type: 'GET_ORDER_LIST' });
  }, [])
  console.log(orders);
  return (
    <div className="h-[30rem] flex flex-col gap-5  items-center justify-center">

      <h1 className="text-center text-xl font-semibold text-gray-700">
        I am not implemented
      </h1>
      {orders.map(order => (
        <Order key={order.Id} order={order} />
      ))}
      <Link
        to="/product"
        className="text-xl py-1 text-center hover:text-cyan-500 duration-300 select-none"
      >
        &larr; Go to Product
      </Link>
    </div>
  );
};

export default Cart;
