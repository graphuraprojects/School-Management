import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../Styles/Home.css'
import hero from "../assets/heropage.png"


// const heroImage = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80"


const eventImages = {
  scienceFair: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&q=80",
  sportsDay: "https://images.unsplash.com/photo-1700914297011-60e0e8d12c0b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  musicConcert: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80"
}

// Events data - 
const upcomingEvents = [
  {
    id: 1,
    title: "Annual Science Fair",
    description: "Showcasing innovative projects by our talented students. Join us to witness the future of science!",
    date: "March 15, 2025",
    time: "9:00 AM - 4:00 PM",
    image: eventImages.scienceFair
  },
  {
    id: 2,
    title: "Inter-School Sports Day",
    description: "A day of athletic competition and sportsmanship among various schools. Come support your teams!",
    date: "April 22, 2025",
    time: "8:00 AM - 5:00 PM",
    image: eventImages.sportsDay
  },
  {
    id: 3,
    title: "Spring Music Concert",
    description: "Evening filled with melodious performances by our school choir and orchestra. A celebration of talent!",
    date: "May 01, 2025",
    time: "7:00 PM - 9:30 PM",
    image: eventImages.musicConcert
  }
]

const announcements = [
  {
    id: 1,
    title: "New Digital Learning Platform Launched",
    date: "February 28, 2024",
    description: "We are excited to announce the launch of our new comprehensive digital learning platform, enhancing online resources for all students."
  },
  {
    id: 2,
    title: "Parent-Teacher Conference Schedule",
    date: "February 20, 2024",
    description: "The schedule for the upcoming parent-teacher conferences has been released. Please check your emails for booking slots."
  },
  {
    id: 3,
    title: "Admissions Open for Academic Year 2025-2026",
    date: "February 15, 2024",
    description: "Applications for the next academic year are now open. Visit our admissions page for detailed information and guidelines."
  }
]

// Activities data
const activities = [
  {
    id: 1,
    title: "Robotics Club Wins State Championship",
    date: "March 05, 2024",
    description: "Our Robotics Club showcased exceptional skill and teamwork, securing the top position in the annual state championship!"
  },
  {
    id: 2,
    title: "Debate Team Qualifies for Nationals",
    date: "February 25, 2024",
    description: "The EduConnect Hub Debate Team has successfully qualified for the National Debate Tournament, a testament to their dedication."
  },
  {
    id: 3,
    title: "Annual Photography Exhibition Highlights",
    date: "February 18, 2024",
    description: "Explore the creative works from our photography club in their annual exhibition, celebrating diverse perspectives and talents."
  }
]

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
    alt: "School Library"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80",
    alt: "Science Lab"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80",
    alt: "Classroom"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=80",
    alt: "Students Learning"
  }
]

function Home() {

    const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(galleryImages.length / 2))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(galleryImages.length / 2)) % Math.ceil(galleryImages.length / 2))
  }


  return (
    <>
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Inspiring Futures,<br />
            Empowering Minds:<br />
            <span className="highlight">Welcome To <br />
             Graphura EduConnect</span>
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
               Graphura is committed to delivering a comprehensive 
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

      {/* Upcoming Events Section */}
      <section className="events-section">
        <div className="section-header">
          <h2 className="section-title">Upcoming Events</h2>
          <p className="section-subtitle">Stay informed about what's happening at our school.</p>
        </div>

        <div className="events-container">
          {upcomingEvents.map((event) => (
            <div className="event-card" key={event.id}>
              <div className="event-image-wrapper">
                <img src={event.image} alt={event.title} className="event-image" />
                <div className="event-date-badge">
                  <span className="event-date">{event.date}</span>
                  <span className="event-time">{event.time}</span>
                </div>
              </div>
              <div className="event-content">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>
                <Link to="/activities" className="btn btn-outline">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      
      {/* Photo Gallery Section */}
      <section className="gallery-section">
        <div className="section-header">
          <h2 className="section-title">Our Photo Gallery</h2>
          <p className="section-subtitle">A glimpse into our vibrant school life.</p>
        </div>

        <div className="gallery-slider">
          <button className="gallery-nav gallery-prev" onClick={prevSlide}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          <div className="gallery-track">
            <div 
              className="gallery-slides" 
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(galleryImages.length / 2) }).map((_, slideIndex) => (
                <div className="gallery-slide" key={slideIndex}>
                  {galleryImages.slice(slideIndex * 2, slideIndex * 2 + 2).map((image) => (
                    <div className="gallery-item" key={image.id}>
                      <img src={image.src} alt={image.alt} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <button className="gallery-nav gallery-next" onClick={nextSlide}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>

        <div className="gallery-dots">
          {Array.from({ length: Math.ceil(galleryImages.length / 2) }).map((_, index) => (
            <button 
              key={index}
              className={`gallery-dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

       {/* Latest Updates Section */}
      <section className="updates-section">
        <div className="section-header">
          <h2 className="section-title">Latest Updates</h2>
          <p className="section-subtitle">Stay updated with our news and activities.</p>
        </div>

        <div className="updates-container">
          {/* Announcements Column */}
          <div className="updates-column">
            <h3 className="updates-column-title">Announcements</h3>
            
            <div className="updates-list">
              {announcements.map((item) => (
                <div className="update-item" key={item.id}>
                  <h4 className="update-title">{item.title}</h4>
                  <span className="update-date">{item.date}</span>
                  <p className="update-description">{item.description}</p>
                </div>
              ))}
            </div>

            <Link to="/contact" className="updates-link">
              Contact Us for Info <span>→</span>
            </Link>
          </div>

             {/* Activities Column */}
          <div className="updates-column">
            <h3 className="updates-column-title">Activities</h3>
            
            <div className="updates-list">
              {activities.map((item) => (
                <div className="update-item" key={item.id}>
                  <h4 className="update-title">{item.title}</h4>
                  <span className="update-date">{item.date}</span>
                  <p className="update-description">{item.description}</p>
                </div>
              ))}
            </div>

            <Link to="/activities" className="updates-link">
              Explore More Activities <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links / CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Join Our School?</h2>
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