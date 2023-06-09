
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleProduct from "./SingleProduct";
const BestSelling = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  useEffect(() => {
    dispatch({ type: 'GET_PRODUCTS' });
  }, []);
  return (
    <section className="container mx-auto">
      <h2 className="text-4xl py-10 text-center font-medium text-gray-700">
        Best Selling Products
      </h2>
      <div className="grid grid-cols-3 gap-10 w-[80%] mx-auto pb-20">
        {products &&
          products
            .filter((product) => product.Id % 4 === 0 && product.Id > 17)
            .map((product) => {
              return <SingleProduct key={product.Id} product={product} />;
            })}
      </div>
    </section>
  );
};

export default BestSelling;
