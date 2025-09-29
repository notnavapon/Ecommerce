import * as React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/authSlice";
import { useState } from "react";


import Cart from "./Cart";
import { useEffect } from "react";

function NavBar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [openCart, setOpenCart] = useState(false);

  const handleCart = (value) =>{
    setOpenCart(value)
  }


  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(()=>{

  })
  return (
    <>
    <div className="navbar bg-primary text-primary-content shadow-md px-6">
      {/* Left: Brand */}
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-2xl font-bold" to="/">
          SHOP
        </Link>
      </div>

      {/* Right: Actions */}
      <div className="flex-none flex items-center gap-3">
        {/* Cart */}
        <div className="dropdown dropdown-end " onClick={()=>setOpenCart(true)}>
          <div tabIndex={0} className="btn btn-ghost btn-circle" >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item bg-secondary text-white">
                8
              </span>
            </div>
          </div>
        </div>
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src={
                    user.profilePic ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow-lg"
            >
              <li>
                <Link
                  to="/profile"
                  className="flex justify-between items-center w-full px-2 py-1"
                >
                  Profile
                  <span className="badge badge-secondary">New</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/setting"
                  className="flex justify-between items-center w-full px-2 py-1"
                >
                  Settings
                </Link>
              </li>
              <li>
                <button
                  className="flex justify-between items-center w-full px-2 py-1"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="dropdown dropdown-hover">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 btn-ghost rounded-md"
            >
              Member
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box p-2 shadow-lg w-48"
            >
              <li>
                <Link
                  to="/login"
                  className="flex justify-between items-center w-full px-2 py-1"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="flex justify-between items-center w-full px-2 py-1"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
    
    <Cart value={openCart} onChange={handleCart}/>
    </>
  );
}
export default NavBar;
