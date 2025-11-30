import React, { useState } from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom'
import graphuraLogo from '../assets/graphuraLogo.png'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
    <header className='header-container'>
      <NavLink to="/" className='logo' onClick={closeMenu}>
        <img src={graphuraLogo} alt="Graphura Logo" />
      </NavLink>

      {/* Hamburger Menu Button */}
      <button 
        className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        <span className='hamburger-line'></span>
        <span className='hamburger-line'></span>
        <span className='hamburger-line'></span>
      </button>

      <nav className={`navbar ${isMenuOpen ? 'nav-open' : ''}`}>
        <NavLink to="/" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>Home</NavLink>
        <NavLink to="/about" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>About</NavLink>
        <NavLink to="/courses" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>Courses</NavLink>
        <NavLink to="/activities" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>Activities</NavLink>
        <NavLink to="/admission" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>Admission</NavLink>
        <NavLink to="/products" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>Store</NavLink>
        <NavLink to="/contact" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>Contact</NavLink>
      </nav>

      {/* <div className='user-profile'>
        <img 
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=student" 
          alt="User Profile" 
          className='profile-avatar'
        />
      </div> */}
    </header>
    </>
  )
}

export default Header