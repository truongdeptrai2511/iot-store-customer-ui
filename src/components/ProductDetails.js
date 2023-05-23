import { Link, useLocation } from "react-router-dom";
import _ from 'lodash';
import { getCookie, setCookie } from "../utils/helpers";
import { useDispatch } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";
const ProductDetails = () => {
  const { state: product } = useLocation();
  const dispatch = useDispatch();
  console.log(product);
  if (!product) {
    return null;
  }

  const truncatedProductName = _.truncate(product.ProductName, { length: 30 });
  const truncatedDescription = product.Description.split('\n').map((line) =>
    _.truncate(line.trim(), { length: 100 })
  );

  const handleAddToCart = () => {
    console.log("Added");
    const order = {
      productId: product.Id,
      productName: product.ProductName,
      count: 1,
      price: product.Price,
    };
    console.log(order)
    const currentOrders = JSON.parse(getCookie('orders')) || []; // Lấy danh sách đơn hàng hiện tại từ cookie, hoặc trả về một mảng rỗng nếu không có dữ liệu nào trong cookie
    const updatedOrders = [...currentOrders, order]; // Thêm đơn hàng mới vào danh sách hiện tại
    setCookie('orders', JSON.stringify(updatedOrders), 30); // Lưu danh sách đơn hàng mới vào cookie trong 30 ngày
    dispatch({ type: 'GET_ORDER', payload: updatedOrders }); // Cập nhật state với danh sách đơn hàng mới
    setCookie(product.Id, product.ProductName, 30);
  };

  return (
    <section className="container mx-auto py-10">
      <div className="grid grid-cols-2 gap-10">
        <div className="flex items-center">
          <img src={product.ImgName} alt={product.ProductName} className="w-full max-w-sm" />
        </div>
        <div className="flex flex-col justify-center">
          <nav className="text-sm text-gray-500">
            <Link to="/" className="text-gray-500 hover:text-gray-700 transition duration-300">
              Home
            </Link>
            <span className="mx-2">&#8594;</span>
            <Link to="/product" className="text-gray-500 hover:text-gray-700 transition duration-300">
              Products
            </Link>
            <span className="mx-2">&#8594;</span>
            <span>{product.ProductName}</span>
          </nav>
          <h2 className="text-3xl font-bold mt-4">{truncatedProductName}</h2>
          <p className="text-gray-600 mt-2">${product.Price}</p>
          <div className="mt-6">
            <h1 className="text-xl font-semibold">Key features</h1>
            {truncatedDescription.map((line, index) => (
              <p key={index} className="text-gray-800 mt-2">{line}</p>
            ))}
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-gray-500 hover:bg-red-400 text-white py-2 px-4 mt-8 rounded-md transition duration-300 flex items-center justify-center"
          >
            <FiShoppingCart className="mr-2" />
            Add to cart
          </button>
        </div>
      </div>
      <Link
        to="/product"
        className="block text-center text-gray-500 hover:text-red-700 mt-8 duration-300"
      >
        &larr; Go back to products
      </Link>
    </section>
  );
};

export default ProductDetails;
