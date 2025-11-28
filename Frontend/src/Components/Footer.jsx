import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className='footer-container'>
      <div className='footer-content'>
        {/* Brand Section */}
        <div className='footer-brand'>
          <div className='footer-logo'>
            <span className='footer-logo-icon'>🎓</span>
            <span className='footer-logo-text'>EduConnect Hub</span>
          </div>
          <p className='footer-description'>
            EduConnect Hub is dedicated to fostering academic excellence and holistic development.
          </p>
          <div className='social-icons'>
            <a href="#" className='social-icon' aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="#" className='social-icon' aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
              </svg>
            </a>
            <a href="#" className='social-icon' aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="#" className='social-icon' aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className='footer-section'>
          <h3 className='footer-heading'>Quick Links</h3>
          <ul className='footer-links'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/activities">Activities</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div className='footer-section'>
          <h3 className='footer-heading'>Resources</h3>
          <ul className='footer-links'>
            <li><Link to="/admission">Admission</Link></li>
            <li><Link to="/products">Merchandise</Link></li>
            <li><Link to="/contact">Support</Link></li>
            <li><Link to="/contact">FAQs</Link></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className='footer-section'>
          <h3 className='footer-heading'>Contact Us</h3>
          <div className='contact-info'>
            <p>123 School Lane, Education City, ED 12345</p>
            <p>Phone: +1 (123) 456-7890</p>
            <p>Email: info@educonnecthub.edu</p>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className='footer-bottom'>
        <p>© 2025 EduConnect Hub. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer