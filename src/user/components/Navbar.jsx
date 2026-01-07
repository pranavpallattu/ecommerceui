// src/admin/components/Navbar.jsx
import { Search, ShoppingCart, Heart, User, LogIn, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useLocation, useSearchParams } from "react-router-dom";
import useUserWishlistStore from "../../utils/stores/WishlistStore";


const Navbar = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const{wishlistProducts}=useUserWishlistStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmedSearch = searchText.trim();
      const isOnShopPage = location.pathname === "/shop";

      if (isOnShopPage) {
        // Update params in place, preserving others
        setSearchParams((prev) => {
          if (trimmedSearch) {
            prev.set("search", trimmedSearch);
          } else {
            prev.delete("search");
          }
          prev.set("page", "1"); // Reset page for new search
          return prev;
        });
      } else if (trimmedSearch) {
        // Navigate to shop if not already there
        navigate(`/shop?search=${trimmedSearch}&page=1`);
      }
      // If not on shop and search is empty, do nothing (no need to navigate)
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText, location.pathname, navigate, setSearchParams]);


  return (
    <div className="navbar bg-white border-b border-gray-200 px-4 py-3">
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <Menu size={24} className="text-gray-700" />
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-white rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/" className="text-gray-700 hover:bg-gray-100">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="text-gray-700 hover:bg-gray-100">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-700 hover:bg-gray-100">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-700 hover:bg-gray-100">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="btn btn-ghost text-2xl font-bold text-blue-600">
          oneBazaar
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1">
          <li>
            <Link
              to="/"
              className="btn btn-ghost text-gray-700 hover:bg-gray-100"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/shop"
              className="btn btn-ghost text-gray-700 hover:bg-gray-100"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="btn btn-ghost text-gray-700 hover:bg-gray-100"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="btn btn-ghost text-gray-700 hover:bg-gray-100"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:block">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={20}
            />
            <input
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              placeholder="Search products..."
              className="input input-bordered pl-10 w-72 rounded-full border-gray-300 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Mobile Search */}
        <button className="btn btn-ghost btn-circle md:hidden">
          <Search size={22} className="text-gray-700" />
        </button>

        {/* Icons */}
        <div className="flex items-center gap-2">
         
           <Link to="/wishlist" className="btn btn-ghost btn-circle relative">
            <Heart size={22} className="text-gray-700" />
            <span className="absolute -top-1 -right-1 badge badge-primary badge-xs">
              {wishlistProducts?.length}
            </span>
          </Link>

          <Link to="/cart" className="btn btn-ghost btn-circle relative">
            <ShoppingCart size={22} className="text-gray-700" />
            <span className="absolute -top-1 -right-1 badge badge-primary badge-xs">
              3
            </span>
          </Link>

          <Link to="/profile" className="btn btn-ghost btn-circle">
            <User size={22} className="text-gray-700" />
          </Link>

          <Link
            to="/auth"
            className="btn btn-ghost hidden md:flex items-center gap-2"
          >
            <LogIn size={20} className="text-gray-700" />
            <span className="text-gray-700 font-medium">Login</span>
          </Link>

          {/* Mobile Login */}
          <Link to="/auth" className="btn btn-ghost btn-circle md:hidden">
            <LogIn size={22} className="text-gray-700" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
