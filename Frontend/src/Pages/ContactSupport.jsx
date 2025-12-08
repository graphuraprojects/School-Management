import React from "react";
import "../Styles/ContactSupport.css";

function ContactSupport() {
  return (
    <>
      <div className="contact-page">
        {/* Title */}
        <div className="title-section">
          <h1 className="font-bold px-1">Contact Support</h1>
          <p className="px-1 font-semibold">
            We're here to help with admissions, academics, or general support.
          </p>
        </div>

        {/* Main Section */}
        <div className="content-section">
          {/* Form */}
          <div className="contact-form card flex flex-col items-center">
            <h2 className="font-semibold">Send us a Message</h2>

            <form
              action="https://formspree.io/f/xpwvlywl"
              method="POST"
              className="flex flex-col gap-4 w-full"
            >
              <input type="text" name="name" placeholder="Your Name" required />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                required
              ></textarea>

              <button type="submit" className="btn-primary-one">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="contact-info card">
            <h2>Reach Us Directly</h2>

            <p>📍 123 School Lane, Education City, ED 12345</p>
            <p>📞 +91 7378021327</p>
            <p>✉️ info@educonnecthub.edu</p>

            <a href="tel:+917378021327">
              <button className="btn-primary-one">📞 Call Us</button>
            </a>

            <a
              className="link-button"
              href="https://wa.me/917378021327"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn-whatsapp-unified" type="button">
                💬 WhatsApp Us
              </button>
            </a>
          </div>
        </div>

        {/* Map Section */}
        <div className="map-section">
          <h2>Our Location</h2>

          {/* Google Maps Embed */}
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.123456789!2d72.571362!3d23.022505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAxJzIxLjAiTiA3MsKwMzQnMTYuOSJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="School Location"
            ></iframe>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section" id="faq-section">
          <h2>Frequently Asked Questions</h2>

          <details className="faq-box">
            <summary>
              What are the admission requirements for new students?
            </summary>
            <p>
              For new admissions, parents must submit the student’s previous
              academic records, birth certificate, address proof, and
              passport-size photographs. A brief interaction or entrance
              assessment may also be conducted to understand the student’s
              skills and learning level. Once documents are verified, the
              admissions team will share the confirmation and next steps
              regarding fee payment and onboarding.
            </p>
          </details>

          <details className="faq-box">
            <summary>How can I track my child's application status?</summary>
            <p>
              After submitting the application form, parents receive a unique
              Application ID. Using this ID, you can log in to our online
              admission portal and view live updates about verification,
              document approval, and admission confirmation. Notifications are
              also sent through email and SMS whenever the status changes,
              ensuring you are always informed.
            </p>
          </details>

          <details className="faq-box">
            <summary>What extracurricular activities are available?</summary>
            <p>
              Our school provides a wide range of extracurricular activities
              designed to encourage creativity, physical fitness, and personal
              growth. Students can participate in sports, music, dance, visual
              arts, robotics, coding clubs, yoga, drama, debate, public
              speaking, school band, and several academic clubs. These programs
              help students develop new skills and explore their interests
              beyond academics.
            </p>
          </details>

          <details className="faq-box">
            <summary>Where can I purchase school merchandise?</summary>
            <p>
              Parents can buy official school merchandise—such as uniforms,
              notebooks, school bags, ID card accessories, and
              sportswear—directly from our on-campus school store. Additionally,
              selected items are available on our online shop, making it easy to
              order from home and have the products delivered or collected at
              school.
            </p>
          </details>

          <details className="faq-box">
            <summary>What is the school's policy on student safety?</summary>
            <p>
              Student safety is our top priority. The school campus is equipped
              with 24×7 CCTV surveillance, trained security staff, controlled
              visitor entry, and emergency medical support. Regular safety
              drills are conducted to prepare students for emergencies, and all
              school buses are GPS-enabled with verified drivers and attendants.
              Our policies ensure a safe, secure, and supportive environment for
              every child.
            </p>
          </details>
        </div>
      </div>
    </>
  );
}

export default ContactSupport;
