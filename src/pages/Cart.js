import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Order from "../components/Order";


const Cart = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.getOrder.getOrder) || [];
  const [latestOrder, setLatestOrder] = useState(null);
  useEffect(() => {
    dispatch({ type: "GET_ORDER_LIST" });
  }, []);
  useEffect(() => {
    dispatch({ type: "GET_ORDER_LIST" });
  }, [dispatch]);
  const sortOrdersByTimestamp = (orders) => {
    if (!orders || orders.length === 0) {
      return [];
    }
    
    const currentDate = new Date().setHours(0, 0, 0, 0);
    const filteredOrders = orders.filter((order) => {
      const orderDate = new Date(order.Order.CreatedAt).setHours(0, 0, 0, 0);
      return orderDate === currentDate;
    });
    
    return filteredOrders.sort((a, b) => {
      const aTimestamp = new Date(a?.Order.CreatedAt).getTime();
      const bTimestamp = new Date(b?.Order.CreatedAt).getTime();
      return bTimestamp - aTimestamp;
    });
  };
  const getLatestOrder = (orders) => {
    const sortedOrders = sortOrdersByTimestamp(orders);
    const latestOrder = sortedOrders?.[0];
    return latestOrder;
  };

  useEffect(() => {
    setLatestOrder(getLatestOrder(orders));
  }, [orders]);

  const handleRemoveOrder = (Id, OrderId) => {
    dispatch({ type: "DELETE_ORDER_ITEM", payload: { Id, OrderId } });
    // Xóa sản phẩm khỏi giỏ hàng
    // Cập nhật lại latestOrder
    const updatedOrder = latestOrder.ProductOrders.filter(
      (product) => product.ProductId !== Id
    );
    setLatestOrder((prevOrder) => ({
      ...prevOrder,
      ProductOrders: updatedOrder,
    }));
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-full w-12/12 gap-8">
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