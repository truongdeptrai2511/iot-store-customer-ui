// src/components/FeatureProducts.js

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import SingleProduct from './SingleProduct';

const FeatureProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  useEffect(() => {
    dispatch({ type: 'GET_PRODUCTS' });
  }, []);
  return (
    <section className="container mx-auto">
      <h2 className="text-4xl py-10 text-center font-medium text-gray-700">
        Feature Products
      </h2>
      <div className="grid grid-cols-3 gap-10 w-[80%] mx-auto pb-20">
        {products &&
          products
            .filter((product) => product.Id % 9 === 0)
            .map((product) => {
              return <SingleProduct
                key={product.Id}
                product={product}
              />;
            })}
      </div>
    </section>
  );
};

export default FeatureProducts;
