import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import GetJwtToken from '../utils/JwtTokenClaim';

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
    }
  }, [isLogin])
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLogin(false);
    window.location.reload();
  };

  const payload = GetJwtToken();
  console.log(payload)
  const formatName = (name) => {
    return decodeURIComponent(escape(name));
  };
  return (
    <div className="shadow-lg backdrop-blur-lg py-5 text-gray-900 bg-gray-50">
      <nav className="flex items-center container mx-auto sticky-nav">
        <div className="block">
          <Link to="/" className="text-gray-700 italic text-7xl block">
            IoT
          </Link>
          {isLogin && (
            <span className="italic">
              Hi, {formatName(payload.fullName)}
            </span>
          )}
        </div>
        <ul className="list-none flex justify-center items-center ml-auto gap-5">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/product">Product</NavLink>
          </li>
          <li>
            <NavLink to="/booking">Booking</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li>
            {isLogin ? <Link to="/" onClick={handleLogout}
              style={{
                color: "black",
                backgroundColor: "white",
                textDecoration: "none"
              }}>
              Logout
            </Link> : <NavLink to="/login">Login</NavLink>}
          </li>
          <li>
            <NavLink to="/cart">
              <FaShoppingCart />
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
