import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCookie, setCookie } from "../utils/helpers";

const SingleProduct = ({ product }) => {
  const dispatch = useDispatch();
  if (!product) {
    return null; // or return a placeholder UI if you prefer
  }
  const handleOrderClick = () => {
    const order = {
      productId: product.Id,
      productName: product.ProductName,
      count: 1,
      price: product.Price,
    };
    const currentOrders = JSON.parse(getCookie('orders')) || []; // Lấy danh sách đơn hàng hiện tại từ cookie, hoặc trả về một mảng rỗng nếu không có dữ liệu nào trong cookie
    const updatedOrders = [...currentOrders, order]; // Thêm đơn hàng mới vào danh sách hiện tại
    setCookie('orders', JSON.stringify(updatedOrders), 30); // Lưu danh sách đơn hàng mới vào cookie trong 30 ngày
    dispatch({ type: 'GET_ORDER', payload: updatedOrders }); // Cập nhật state với danh sách đơn hàng mới
    console.log(updatedOrders);
    setCookie(product.Id, product.ProductName, 30);
  };
  
  return (
    
    <div className="single-product flex flex-col bg-gray-50 gap-3 shadow-md hover:shadow-xl hover:scale-105 duration-300 px-4 py-7 rounded-sm overflow-hidden">
      <div className="flex justify-center">
        <img
          className="w-72 h-48 object-contain hover:scale-110 duration-500"
          src={product.ImgName}
          alt={product.ProductName}
        />
      </div>
      <Link
        to={product.ProductName}
        state={product}
        className="hover:text-rose-500 duration-300 flex justify-between items-center"
      >
        <h2 className="text-stone-950 font-semibold text-xl capitalize">
          {product.ProductName}
        </h2>
      </Link>
      <p className="text-sm text-gray-600">
        Price: <span className="text-rose-500 font-semibold">{product.Price} $</span>
      </p>
      <div className="flex justify-between items-center">
        <Link
          to={product.ProductName}
          state={product}
          className="hover:text-rose-50 text-gray-900 duration-300 flex justify-between items-center"
        >
          <button className="text-sky-400 px-2 py-1 border border-sky-400 rounded-md hover:bg-sky-400 hover:text-sky-50 duration-300">
            More Info
          </button>
        </Link>
        <button
          onClick={handleOrderClick}
          className="bg-sky-400 text-sky-50 hover:bg-sky-50 hover:text-sky-400 duration-300 border border-sky-400 px-2 py-1 rounded-md"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;