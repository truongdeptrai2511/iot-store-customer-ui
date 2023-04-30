import { useState, useEffect, useRef } from "react";
import SingleProduct from "../components/SingleProduct";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

const Products = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);

  const [catPath, setCatPath] = useState("all categories");

  const para = useRef(null);

  const categories = [
    "smartphone",
    "laptop",
    "smartwatch",
    "earbuds",
    "Keyboard",
    "graphics card",
  ];

  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    try {
      setIsLoading(true);
      setIsLoading(false);
      dispatch({ type: 'GET_PRODUCTS' });
    } catch (err) {
      setIsLoading(false);
      setErr(err.message);
    }
  }, []);

  if (isLoading)
    return (
      <p className="h-screen flex flex-col justify-center items-center text-2xl">
        Loading...
      </p>
    );
  if (err)
    return (
      <p className="h-screen flex flex-col justify-center items-center text-2xl">
        <span>{err}</span>
        <Link to="/product" className="text-lg text-gray-500 font-semibold">
          &larr;Refresh page
        </Link>
      </p>
    );

  return (
    <div className="container mx-auto pb-20">
      <h2 className="text-center text-3xl py-10">All Products</h2>
      <div className="flex justify-between gap-10">
        <div className="w-[20%] bg-gray-50 flex flex-col gap-3 px-3 pt-2">
          <h3
            className="select-none cursor-pointer flex justify-between"
            onClick={() => {
              setCatPath("all categories");
            }}
          >
            <span className="font-semibold">All Categories</span>
            <span>{`(${products.length})`}</span>
          </h3>
          {categories.map((cat, i) => (
            <p
              ref={para}
              className="select-none cursor-pointer capitalize font-semibold"
              key={i}
              onClick={() => {
                const filters = products.filter(
                  (product) => product.category === cat
                );
                setCatPath(categories[i]);
              }}
            >
              <span>{cat}</span>
            </p>
          ))}
        </div>
        <div>
          <p className="text-gray-500 pb-4">
            {<Link to="/">Home </Link>}/
            <span className="text-sky-400 px-1">{catPath}</span>
          </p>
          <div className="grid grid-cols-3 gap-10 ">
            {products &&
              products
                .map((product) => {
                  return <SingleProduct
                    key={product.Id}
                    product={product}
                  />;
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
