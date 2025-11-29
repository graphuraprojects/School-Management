import React from 'react';
import '../Styles/ContactSupport.css';

function ContactSupport() {
  return (
    <>
      <div className="contact-page">

        {/* Title */}
        <div className="title-section">
          <h1>Contact Support</h1>
          <p>We're here to help with admissions, academics, or general support.</p>
        </div>

        {/* Main Section */}
        <div className="content-section">

          {/* Form */}
          <div className="contact-form card">
            <h2>Send us a Message</h2>

            <form>
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Your Email" />
              <input type="text" placeholder="Subject" />
              <textarea placeholder="Your Message" rows="5"></textarea>

              <button className="btn-primary">Send Message</button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="contact-info card">
            <h2>Reach Us Directly</h2>

            <p>📍 123 School Lane, Education City, ED 12345</p>
            <p>📞 +91 8103868493</p>
            <p>✉️ info@educonnecthub.edu</p>

            <a href="tel:+918103868493">
              <button className="btn-primary">📞 Call Us</button>
            </a>

            <a
              href="https://wa.me/918103868493"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn-whatsapp">💬 WhatsApp Us</button>
            </a>

          </div>
        </div>

        {/* Map Section */}
        <div className="map-section">
          <h2>Our Location</h2>

          {/* Alignment Fix: Make Image Centered & Responsive */}
          <div className="map-container">
            <img src="src/assets/location.png" alt="map" />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>

          <details className="faq-box">
            <summary>What are the admission requirements for new students?</summary>
            <p>
              New students are required to submit their previous academic records, birth certificate, address proof, ID proof, and passport-size photographs.
              For selected grades, the school may conduct an entrance assessment or a short interaction session to understand the student’s abilities better.
              Complete admission guidelines are available through our admissions office.
            </p>
          </details>

          <details className="faq-box">
            <summary>How can I track my child's application status?</summary>
            <p>
              Once the application is submitted, parents receive a unique Application ID.
              This ID can be used to log in to the school portal, where the real-time status of the application is displayed.
              Important updates and notifications are also sent through SMS and email for your convenience.
            </p>
          </details>

          <details className="faq-box">
            <summary>What extracurricular activities are available?</summary>
            <p>
              We offer a diverse range of extracurricular activities designed to help students discover and develop their talents.
              These include sports, music, dance, art & craft, yoga, robotics, coding, drama, debate, and public speaking.
              Students are free to explore and join any club that matches their interests and passion.
            </p>
          </details>

          <details className="faq-box">
            <summary>Where can I purchase school merchandise?</summary>
            <p>
              Official school merchandise—including uniforms, stationery, bags, and accessories—can be purchased from our on-campus school store.
              A curated selection of products is also available on our online merchandise portal, making it easy to shop from home.
            </p>
          </details>

          <details className="faq-box">
            <summary>What is the school's policy on student safety?</summary>
            <p>
              Student safety is our highest priority.
              Our campus is equipped with CCTV surveillance, trained security personnel, controlled visitor entry, first-aid facilities, and regular emergency drills.
              We also maintain a well-monitored and verified transportation system to ensure safe travel for all students.
            </p>
          </details>

        </div>
      </div>
    </>
  );
}

export default ContactSupport;
