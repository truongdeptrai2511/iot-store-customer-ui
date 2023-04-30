import { Link, useLocation } from "react-router-dom";
import _ from 'lodash';

const ProductDetails = () => {
  const { state: product } = useLocation();

  console.log(product);
  return (
    <section className="flex flex-col gap-16 py-10 bg-gray-100">
      {product && (
        <div className="container mx-auto flex justify-around items-center w-[80%]">
          <div className="w-96 flex justify-end">
            <img src={product?.ImgName} alt={product?.ProductName} className="w-full select-none" />
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-gray-500">
              {"Home/"}
              {<Link to="/product">product</Link>}
              {`/${product?.ProductName}`}
            </p>
            <h2 className="text-4xl">{_.truncate(product?.ProductName, { length: 30 })}</h2>
            <span className="font-semibold">
              Price: <span className="text-2xl">{product?.Price} $</span>
            </span>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl">Key features</h1>
              {product?.Description.split('\n').map((line, index) => (
                <p key={index} className="text-gray-800">{_.truncate(line.trim(), { length: 100 })}</p>
              ))}
            </div>
            <h3 className="flex justify-content text-gray-700 text-lg">
              <span>Category: {product?.Category}</span>
            </h3>
            <button
              onClick={() => console.log("Added")}
              className="bg-sky-500 text-sky-50 px-2 py-1 mt-4 rounded-md transition duration-300 hover:bg-sky-600 hover:text-sky-50e"
              style={{ cursor: "pointer", width: "50%", padding: "10px" }}
            >
              Add to cart
            </button>
          </div>
        </div>
      )}
      <Link
        to="/product"
        className="text-xl py-1 text-center hover:text-cyan-500 duration-300 select-none"
      >
        &larr; Go to Product
      </Link>
    </section>
  );
};


export default ProductDetails;
