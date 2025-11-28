import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/Home.css'
import hero from "../assets/heropage.png"

// Placeholder image - tu baad mein actual school image daal dena
// const heroImage = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80"

function Home() {
  return (
    <>
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Inspiring Futures,<br />
            Empowering Minds:<br />
            <span className="highlight">Welcome to EduConnect Hub</span>
          </h1>
          <p className="hero-description">
            At EduConnect Hub, we are dedicated to providing a holistic 
            education that fosters academic excellence, critical thinking, 
            and personal growth. Discover a vibrant community where 
            every student thrives.
          </p>
          <div className="hero-buttons">
            <Link to="/admission" className="btn btn-primary">Apply Now</Link>
            <Link to="/about" className="btn btn-secondary">Learn More</Link>
          </div>
        </div>
        <div className="hero-image-container">
          <img src={hero} alt="Students learning" className="hero-image" />
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="vision-mission-section">
        <div className="section-header">
          <h2 className="section-title">Our Vision & Mission</h2>
          <p className="section-subtitle">Guiding principles that shape our future.</p>
        </div>
        
        <div className="cards-container">
          <div className="info-card">
            <div className="card-icon vision-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
            <h3 className="card-title">Our Vision</h3>
            <p className="card-description">
              To cultivate a learning environment where innovation meets tradition, 
              empowering students to become compassionate leaders and lifelong 
              learners who contribute positively to a global society.
            </p>
            <Link to="/about" className="card-link">
              Explore Programs <span>→</span>
            </Link>
          </div>

          <div className="info-card mission-card">
            <div className="card-icon mission-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            </div>
            <h3 className="card-title">Our Mission</h3>
            <p className="card-description">
              EduConnect Hub is committed to delivering a comprehensive 
              educational experience through rigorous academics, diverse 
              extracurriculars, and personalized support, preparing students for 
              success in an ever-evolving world.
            </p>
            <Link to="/about" className="card-link">
              Learn About Our Values <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements-section">
        <div className="section-header">
          <h2 className="section-title">Our Achievements</h2>
          <p className="section-subtitle">Celebrating milestones and fostering excellence.</p>
        </div>

        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                <path d="M4 22h16"/>
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
              </svg>
            </div>
            <h3 className="stat-number">15+</h3>
            <p className="stat-label">National Awards</p>
          </div>

          <div className="stat-item">
            <div className="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3 className="stat-number">2000+</h3>
            <p className="stat-label">Students Enrolled</p>
          </div>

          <div className="stat-item">
            <div className="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <h3 className="stat-number">98%</h3>
            <p className="stat-label">Graduation Rate</p>
          </div>

          <div className="stat-item">
            <div className="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <h3 className="stat-number">50+</h3>
            <p className="stat-label">Community Projects</p>
          </div>
        </div>
      </section>

      {/* Quick Links / CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Join Our Community?</h2>
          <p>Take the first step towards a brighter future for your child.</p>
          <Link to="/admission" className="btn btn-primary btn-large">
            Start Application
          </Link>
        </div>
      </section>
    </div>
    
    </>
  )
}

export default Home