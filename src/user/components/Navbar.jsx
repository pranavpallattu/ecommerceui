// src/admin/components/Navbar.jsx
import { Search, ShoppingCart, Heart, User, LogIn, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { LayoutDashboard, MapPin, Wallet, LogOut, Package } from "lucide-react";

import { useLocation, useSearchParams } from "react-router-dom";
import useUserWishlistStore from "../../utils/stores/WishlistStore";
import useCartStore from "../../utils/stores/CartStore";
import useAuthStore from "../../utils/stores/userAuthStore";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const { wishlistProducts, fetchWishlistProducts } = useUserWishlistStore();
  const { cartProducts, fetchCartProducts } = useCartStore();
  const { user, logout, checkAuth } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  useEffect(() => {
    checkAuth();
    fetchCartProducts();
    fetchWishlistProducts();
    const timer = setTimeout(() => {
      const trimmedSearch = searchText.trim();
      const isOnShopPage = location.pathname === "/shop";

      if (isOnShopPage) {
        setSearchParams((prev) => {
          if (trimmedSearch) {
            prev.set("search", trimmedSearch);
          } else {
            prev.delete("search");
          }
          prev.set("page", "1");
          return prev;
        });
      } else if (trimmedSearch) {
        navigate(`/shop?search=${trimmedSearch}&page=1`);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText, location.pathname, navigate, setSearchParams]);

  return (
    <div className="navbar bg-white border-b border-gray-200 px-2 sm:px-4 py-3 z-50 relative">
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
        <Link to="/" className="btn btn-ghost text-xl sm:text-2xl font-bold text-blue-600 px-2 sm:px-4">
          oneBazaar
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1">
          <li>
            <Link to="/" className="btn btn-ghost text-gray-700 hover:bg-gray-100">
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" className="btn btn-ghost text-gray-700 hover:bg-gray-100">
              Shop
            </Link>
          </li>
          <li>
            <Link to="/about" className="btn btn-ghost text-gray-700 hover:bg-gray-100">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="btn btn-ghost text-gray-700 hover:bg-gray-100">
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end flex items-center gap-1 sm:gap-2 md:gap-3">
        {/* Desktop Search */}
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
              className="input input-bordered pl-10 w-48 lg:w-72 rounded-full border-gray-300 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Mobile Search Button */}
        <button 
          className="btn btn-ghost btn-circle md:hidden"
          onClick={() => setShowMobileSearch(!showMobileSearch)}
        >
          {showMobileSearch ? (
            <X size={22} className="text-gray-700" />
          ) : (
            <Search size={22} className="text-gray-700" />
          )}
        </button>

        {/* Icons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Wishlist - Hidden on smallest screens when not logged in */}
          <Link 
            to="/wishlist" 
            className={`btn btn-ghost btn-circle relative w-10 h-10 min-h-10 sm:w-11 sm:h-11 sm:min-h-11 `}
          >
            <Heart size={20} className="text-gray-700 sm:w-[22px] sm:h-[22px]" />
            {user && wishlistProducts?.length > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] sm:min-w-[18px] sm:h-[18px] flex items-center justify-center text-[10px] sm:text-[11px] font-bold text-white bg-blue-600 rounded-full">
                {wishlistProducts.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link 
            to="/cart" 
            className="btn btn-ghost btn-circle relative w-10 h-10 min-h-10 sm:w-11 sm:h-11 sm:min-h-11"
          >
            <ShoppingCart size={20} className="text-gray-700 sm:w-[22px] sm:h-[22px]" />
            {user && cartProducts?.totalItems > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] sm:min-w-[18px] sm:h-[18px] flex items-center justify-center text-[10px] sm:text-[11px] font-bold text-white bg-blue-600 rounded-full">
                {cartProducts.totalItems}
              </span>
            )}
          </Link>

          {/* User Menu */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle w-10 h-10 min-h-10 sm:w-11 sm:h-11 sm:min-h-11">
              <User size={20} className="text-gray-700 sm:w-[22px] sm:h-[22px]" />
            </label>

            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-3"
            >
              <li>
                <Link to="/profile" className="flex items-center gap-2">
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
              </li>

              <li>
                <Link to="/orders" className="flex items-center gap-2">
                  <Package size={18} />
                  Orders
                </Link>
              </li>

              <li>
                <Link to="/address" className="flex items-center gap-2">
                  <MapPin size={18} />
                  Address
                </Link>
              </li>

              <li>
                <Link to="/wallet" className="flex items-center gap-2">
                  <Wallet size={18} />
                  Wallet
                </Link>
              </li>

              {user && (
                <li className="border-t mt-1">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Login Button */}
          {!user && (
            <>
              {/* Desktop Login */}
              <Link
                to="/auth"
                className="btn btn-ghost hidden md:flex items-center gap-2"
              >
                <LogIn size={20} className="text-gray-700" />
                <span className="text-gray-700 font-medium">Login</span>
              </Link>

              {/* Mobile Login Icon */}
              <Link 
                to="/auth" 
                className="btn btn-ghost btn-circle md:hidden w-10 h-10 min-h-10 sm:w-11 sm:h-11 sm:min-h-11"
              >
                <LogIn size={20} className="text-gray-700 sm:w-[22px] sm:h-[22px]" />
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Search Bar (Toggleable) */}
{showMobileSearch && (
  <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 p-3 md:hidden shadow-md">
    <div className="relative w-full">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        size={20}
      />
      <input
        onChange={(e) => setSearchText(e.target.value)}
        type="text"
        placeholder="Search products..."
        className="input input-bordered pl-10 w-full max-w-none rounded-full border-gray-300 focus:border-blue-500 focus:outline-none"
        autoFocus
      />
    </div>
  </div>
)}

    </div>
  );
};

export default Navbar;