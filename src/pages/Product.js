import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import SingleProduct from "../components/SingleProduct";

const Products = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [catPath, setCatPath] = useState("All categories");
  const dispatch = useDispatch();
  const category = useSelector(state => state.category.category);
  const products = useSelector(state => state.product.products);
  const para = useRef(null);
  const [currentProducts, setCurrentProducts] = useState(products);

  useEffect(() => {
    try {
      dispatch({ type: 'GET_CATEGORY' });
      dispatch({ type: 'GET_PRODUCTS' });
      setIsLoading(false);
    } catch (err) {
      setErr(err.message);
      setIsLoading(false);
    }
  }, []);

  const handleCategoryClick = (cat) => {
    if (cat.CategoryName === "All categories") {
      setCatPath("All categories");
      setCurrentProducts(products);
    } else {
      const filters = products.filter(product => product.CategoryId === cat.Id);
      setCatPath(cat.CategoryName);
      setCurrentProducts(filters);
    }
  }
  const resetCategoryFilter = () => {
    setCurrentProducts(products);
    setCatPath("All categories");
  };

  if (isLoading) {
    return (
      <p className="h-screen flex flex-col justify-center items-center text-2xl">
        Loading...
      </p>
    );
  }

  if (err) {
    return (
      <p className="h-screen flex flex-col justify-center items-center text-2xl">
        <span>{err}</span>
        <Link to="/product" className="text-lg text-gray-500 font-semibold">
          &larr;Refresh page
        </Link>
      </p>
    );
  }

  return (
    <div className="container mx-auto pb-20">
      <h2 className="text-center text-3xl py-10">All Products</h2>
      <div className="flex justify-between gap-10">
        <div className="w-[20%] bg-gray-50 flex flex-col gap-3 px-3 pt-2">
          <h3
            className="select-none cursor-pointer flex justify-between"
            onClick={resetCategoryFilter}
          >
            <span className="font-semibold" >All Categories</span>
            <span>{`(${category.length})`}</span>
          </h3>
          {category.map(cat => (
            <p
              className="select-none cursor-pointer capitalize font-semibold"
              key={cat.Id}
              onClick={() => handleCategoryClick(cat)}
            >
              <span>{cat.CategoryName}</span>
            </p>
          ))}
        </div>
        <div>
          <p className="text-gray-500 pb-4">
            <Link to="/">Home </Link>/
            <span className="text-sky-400 px-1">{catPath}</span>
          </p>
          <div className="grid grid-cols-3 gap-10 ">
            {currentProducts.map(product => (
              <SingleProduct key={product.Id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
