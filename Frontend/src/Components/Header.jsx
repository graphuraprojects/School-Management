import React, { useContext, useEffect, useRef, useState } from "react";
import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import graphuraLogo from "../assets/graphura.png";
import { CartContext } from "../CartFunction";

function Header() {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const iconRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const [userMenu, setUserMenu] = useState(false);
  const [checkUser, setCheckUser] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setCheckUser(Boolean(token));
    };

    checkToken(); 

    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      const menu = menuRef.current;
      const icon = iconRef.current;

      // If clicking menu box → do NOT close
      if (menu && menu.contains(e.target)) return;

      if (icon && icon.contains(e.target)) return;

      // If clicking anywhere else (icon or outside) → close
      setUserMenu(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCheckUser(false);
  };

  return (
    <div className="header-bg">
    <header className="header-container">
      <NavLink to="/" className="logo" onClick={closeMenu}>
        <img src={graphuraLogo} alt="Graphura Logo" />
      </NavLink>

      {/* Hamburger menu */}
      <button
        className={`hamburger ${isMenuOpen ? "active" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      <nav className={`navbar ${isMenuOpen ? "nav-open" : ""}`}>
        <NavLink
          to="/"
          onClick={closeMenu}
          className={({ isActive }) =>
            `nav-link ${isActive ? "active-link" : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          onClick={closeMenu}
          className={({ isActive }) =>
            `nav-link ${isActive ? "active-link" : ""}`
          }
        >
          About
        </NavLink>
        <NavLink
          to="/admission"
          onClick={closeMenu}
          className={({ isActive }) =>
            `nav-link ${isActive ? "active-link" : ""}`
          }
        >
          Admission
        </NavLink>
        <NavLink
          to="/store"
          onClick={closeMenu}
          className={({ isActive }) =>
            `nav-link ${isActive ? "active-link" : ""}`
          }
        >
          Store
        </NavLink>
        <NavLink
          to="/contact"
          onClick={closeMenu}
          className={({ isActive }) =>
            `nav-link ${isActive ? "active-link" : ""}`
          }
        >
          Contact
        </NavLink>
        {user?.role === "admin" && (
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-link" : ""}`
            }
          >
            Dashboard
          </NavLink>
        )}
        <NavLink
          to="/cart"
          onClick={closeMenu}
          className={({ isActive }) =>
            `nav-link ${isActive ? "active-link" : ""} hidden hiding` 
          }
        >
          Cart
        </NavLink>

        {!checkUser ? (
          // -------------------- NOT LOGGED IN --------------------
          <button
            onClick={() => navigate("/login")}
            className="nav-link hidden hiding"
          >
            Login
          </button>
        ) : (
          // -------------------- LOGGED IN --------------------
          <div className="flex-col hidden hiding ml-4">
            <span className="text-lg font-semibold">
              {JSON.parse(localStorage.getItem("user"))?.username}
            </span>
            <span className="text-sm text-gray-500">
              {JSON.parse(localStorage.getItem("user"))?.email}
            </span>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setCheckUser(false);
              }}
              className="text-white bg-red-500 p-1 rounded-md text-sm mt-1"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      <div className="hidden md:flex gap-6">
        <div className="relative" ref={menuRef}>
          {/* USER ICON */}
          <i
            className="fa-solid fa-user text-2xl cursor-pointer"
            onClick={() => setUserMenu(!userMenu)}
            ref={iconRef}
          ></i>

          {/* DROPDOWN CARD */}
          {userMenu && (
            <div
              ref={menuRef}
              className="absolute right-0  w-64 bg-white shadow-xl rounded-2xl p-5 z-50 border border-[#6fd513]"
            >
              {checkUser ? (
                <>
                  {/* USER INFO */}
                  <div className="mb-3">
                    <h2 className="font-bold text-xl text-[#23613d]">
                      {user?.username}
                    </h2>
                    <p className="text-sm text-[#6fd513]">
                      {user?.email}
                    </p>
                  </div>

                  <hr className="my-3" />

                  {/* MY PROFILE */}
                  <button
                    className="flex items-center gap-3 text-gray-700 hover:text-black w-full py-2"
                    onClick={() => {
                      setUserMenu(false);
                      navigate("/profile"); 
                    }}
                  >
                    <i className="fa-solid fa-user text-lg"></i>
                    <span className="font-medium cursor-pointer">
                      My Profile
                    </span>
                  </button>

                  {/* TRACK ORDER */}
                  <button
                    className="flex items-center gap-3 text-gray-700 hover:text-black w-full py-2"
                    onClick={() => {navigate("/track-order")
                      setUserMenu(false)
                    }}
                  >
                    <i className="fa-solid fa-truck-fast text-lg"></i>
                    <span className="font-medium cursor-pointer">
                      Track Order
                    </span>
                  </button>

                  {/* LOGOUT */}
                  <button
                    className="flex items-center gap-3 text-gray-700 hover:text-black w-full py-2"
                    onClick={() => {
                      setUserMenu(false);
                      handleLogout();
                      window.location.reload();
                    }}
                  >
                    <i className="fa-solid fa-right-from-bracket text-lg"></i>
                    <span className="font-medium cursor-pointer">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <h2 className="font-bold text-xl mb-1">Welcome</h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Login to access your account
                  </p>

                  {/* LOGIN BUTTON */}
                  <button
                    className="flex items-center gap-3 bg-[#6fd513] text-white px-4 py-2 rounded-lg w-full hover:bg-[#53a110] cursor-pointer"
                    onClick={() => {
                      navigate("/login");
                      setUserMenu(false);
                    }}
                  >
                    <i className="fa-solid fa-right-to-bracket text-lg"></i>
                    <span className="font-medium">Login</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        <div className="relative">
          <NavLink to="/cart">
            <i className="fa-solid fa-cart-shopping text-2xl"></i>
          </NavLink>
          <span className="absolute bg-[#6fd513] rounded-full -top-2 -right-2 px-1.5 text-[10px] text-white">
            {totalQuantity === 0 ? "" : totalQuantity}
          </span>
        </div>
      </div>
    </header>
    </div>
  );
}

export default Header;
