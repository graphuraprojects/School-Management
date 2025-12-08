import React, { useContext, useState } from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import graphuraLogo from '../assets/graphura.png';
import { CartContext } from '../CartFunction';

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);


  return (
    <header className="header-container">
      <NavLink to="/" className="logo" onClick={closeMenu}>
        <img src={graphuraLogo} alt="Graphura Logo" />
      </NavLink>

      {/* Hamburger */}
      <button
        className={`hamburger ${isMenuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      <nav className={`navbar ${isMenuOpen ? 'nav-open' : ''}` }>
        <NavLink to="/" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}>Home</NavLink>
        <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}>About</NavLink>
        <NavLink to="/admission" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}>Admission</NavLink>
        <NavLink to="/store" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}>Store</NavLink>
        <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}>Contact</NavLink>
        {user?.role === "admin" && (
          <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}>
            Dashboard
          </NavLink>
        )}
        <NavLink to="/cart" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""} md:hidden` }>Cart</NavLink>
      </nav>

      <div className='hidden md:flex gap-6'>
        <div><i className="fa-solid fa-user text-2xl"></i></div>
        <div className='relative'>
          <NavLink to="/cart"><i className="fa-solid fa-cart-shopping text-2xl"></i></NavLink>
          <span className='absolute bg-blue-500 rounded-full -top-2 -right-2 px-1.5 text-[10px] text-white'>{totalQuantity}</span>
        </div>
        </div>
    </header>
  );
}

export default Header;
