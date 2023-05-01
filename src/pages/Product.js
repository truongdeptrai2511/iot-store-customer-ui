import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

const SingleProduct = lazy(() => import("../components/SingleProduct"));

const Products = () => {
  const dispatch = useDispatch();
  const category = useSelector(state => state.category.category);
  const products = useSelector(state => state.product.products);

  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [catPath, setCatPath] = useState("All categories");
  const [currentProducts, setCurrentProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(8);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  const para = useRef(null);

  useEffect(() => {
    if (endIndex >= currentProducts.length) {
      setHasMoreProducts(false);
    } else {
      setHasMoreProducts(true);
    }
  }, [startIndex, endIndex, currentProducts]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'GET_CATEGORY' });
        dispatch({ type: 'GET_PRODUCTS' });
        setIsLoading(false);
      } catch (err) {
        setErr(err.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentProducts(products);
  }, [products]);

  useEffect(() => {
    setCurrentProducts(
      products.filter(product =>
        product.ProductName.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue]);

  const handleCategoryClick = (cat) => {
    if (cat.CategoryName === "All categories") {
      setCatPath("All categories");
      setCurrentProducts(products);
    } else {
      const filters = products.filter(product => product.CategoryId === cat.Id);
      setCatPath(cat.CategoryName);
      setCurrentProducts(filters);
    }
    setStartIndex(0);
    setEndIndex(9);
  };

  const resetCategoryFilter = () => {
    setCurrentProducts(products);
    setCatPath("All categories");
    setStartIndex(0);
    setEndIndex(9);
  };

  const handleLoadMore = () => {
    setStartIndex(startIndex + 0);
    setEndIndex(endIndex + 8);
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
          ←Refresh page
        </Link>
      </p>
    );
  }

  return (
    <div className="container mx-auto pb-20">
      <input
        type="text"
        placeholder="Search product"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        style={{
          width: '17%',
          height: '35px',
          borderRadius: '5px',
          border: '0.5px solid #ccc',
          padding: '15px',
          marginBottom: '-20px',
          marginTop: '20px',
          fontSize: '16px',
          outline: 'none',
        }}
      />
      <h1 className="text-4xl font-bold mt-8 mb-4">Products</h1>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <p className="font-bold text-gray-600">{catPath}</p>
          {catPath !== "All categories" && (
            <button
              className="ml-4 text-gray-500"
              onClick={() => resetCategoryFilter()}
            >
              (clear filter)
            </button>
          )}
        </div>
        <div className="flex items-center">
          <p className="mr-4 text-gray-600">{currentProducts.length} products</p>
          <div className="relative">
            <select
              className="bg-gray-100 rounded-md py-2 px-4 font-medium text-gray-700"
              onChange={(e) => handleCategoryClick(JSON.parse(e.target.value))}
            >
              {category.map((cat) => (
                <option key={cat.Id} value={JSON.stringify(cat)}>
                  {cat.CategoryName}
                </option>
              ))}
            </select>
            <div className="absolute right-2 top-0 h-full w-8 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M15.293 7.293a1 1 0 0 0-1.414-1.414l-3 3a1 1 0 0 0 0 1.414l3 3a1 1 0 1 0 1.414-1.414L12.414 11H18a1 1 0 1 0 0-2h-5.586l2.293-2.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {currentProducts.slice(startIndex, endIndex).map((product) => (
          <Suspense key={product.Id} fallback={<p>Loading...</p>}>
            <SingleProduct product={product} />
          </Suspense>
        ))}
      </div>
      <div className="mx-auto text-center py-10">
        {hasMoreProducts && (
          <button onClick={handleLoadMore} className="mx-auto my-4 py-2 px-4 bg-gray-500 hover:bg-gray-800 text-white font-bold rounded">
            Load more
          </button>
        )}
        {!hasMoreProducts && (
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="mx-auto my-4 py-2 px-4 bg-gray-500 hover:bg-gray-700 text-gray-500 font-bold rounded" style={{ backgroundColor: 'transparent' }}>            <p className="mx-auto">Scroll to top</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default Products;