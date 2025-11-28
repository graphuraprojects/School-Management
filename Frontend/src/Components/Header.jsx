import React from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom'
import graphuraLogo from '../assets/graphuraLogo.png'

function Header() {
  return (
    <header className='header-container'>
      <div className='logo'>
        {/* <span className='logo-icon'>🎓</span> */}
        <img src={graphuraLogo} alt="Graphura Logo" />
      </div>

      <nav className='navbar'>
        <NavLink to="/" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
        <NavLink to="/about" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>
        <NavLink to="/courses" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Courses</NavLink>
        <NavLink to="/activities" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Activities</NavLink>
        <NavLink to="/admission" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Admission Application</NavLink>
        <NavLink to="/products" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Store</NavLink>
        <NavLink to="/contact" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Contact & Support</NavLink>
      </nav>

      <div className='user-profile'>
        <img 
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=student" 
          alt="User Profile" 
          className='profile-avatar'
        />
      </div>
    </header>
  )
}

export default Header