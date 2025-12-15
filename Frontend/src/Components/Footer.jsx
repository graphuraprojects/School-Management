import React, { useEffect, useState } from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import graphuraLogo from "../assets/graphura.png";

function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showTop, setShowTop] = useState(false);

  /* ==========================================
     BACK TO TOP BUTTON VISIBILITY
  =========================================== */
  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ==========================================
     NEWSLETTER SUBMIT
  =========================================== */
  const handleSubscribe = (e) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      alert("Please enter a valid email address.");
      return;
    }
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  /* ==========================================
     NAVIGATION + SCROLL TO TOP
  =========================================== */
  const goToPage = (path) => {
    navigate(path);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 200);
  };

  /* ==========================================
     DIRECT SCROLL TO FAQ SECTION
  =========================================== */
  const goToFAQ = () => {
    navigate("/contact");

    let tries = 0;
    const interval = setInterval(() => {
      const section = document.getElementById("faq-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        clearInterval(interval);
      }
      if (++tries > 25) clearInterval(interval);
    }, 150);
  };

  /* ==========================================
     SCROLL TO TOP BUTTON ACTION
  =========================================== */
  const scrollToTopBtn = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* ================= WAVE SEPARATOR ================= */}
      {/* <div className="footer-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C150,100 350,0 600,0 C850,0 1050,100 1200,0 L1200,120 L0,120 Z" />
        </svg>
      </div> */}

      {/* ================= FOOTER MAIN ================= */}
      <footer className="footer-container">
        {/* ---------------- MAIN GRID ---------------- */}
        <div className="footer-content reveal">
          {/* BRAND + NEWSLETTER */}
          <div className="footer-brand">
            <div className="footer-logo-block">
              <div className="w-28 h-10 md:w-35 md:h-15">
              <img
                src={graphuraLogo}
                className="footer-logo-img"
                alt="Graphura"
              />
              </div>
              <p className="brand-sub brand-sub-big font-semibold mb-2">
                Fostering academic excellence & holistic development.
              </p>
            </div>

            {/* Newsletter */}
            <form className="newsletter" onSubmit={handleSubscribe}>
              <div className="newsletter-text">
                <strong>Join our Newsletter</strong>
                <span> - Get monthly tips, updates & campus news.</span>
              </div>

              
            </form>

            {/* Social Icons */}
            <div className="social-icons mt-4">
              <a
                href="https://www.facebook.com/share/19nKAMTopZ/"
                className="social-icon"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              <a
                href="https://share.google/w9KeZZ72v8KQxGpFn"
                className="social-icon"
                aria-label="Google"
                target="_blank"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M21.35 11.1H12v2.8h5.35A4.87 4.87 0 0 1 12 18.6 6.6 6.6 0 1 1 17.6 7.4l2-2A9.47 9.47 0 1 0 21.35 11.1z" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/graphura.in"
                className="social-icon"
                aria-label="Instagram"
                target="_blank"
              >
                <svg
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <circle cx="17.5" cy="6.5" r="1" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/company/graphura-india-private-limited/"
                className="social-icon"
                aria-label="LinkedIn"
                target="_blank"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="footer-section">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <span onClick={() => goToPage("/")}>Home</span>
              </li>
              <li>
                <span onClick={() => goToPage("/about")}>About Us</span>
              </li>
              <li>
                <span onClick={() => goToPage("/courses")}>Courses</span>
              </li>
              <li>
                <span onClick={() => goToPage("/activities")}>Activities</span>
              </li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div className="footer-section">
            <h3 className="footer-heading">Resources</h3>
            <ul className="footer-links">
              <li>
                <span onClick={() => goToPage("/admission")}>Admission</span>
              </li>
              <li>
                <span onClick={() => goToPage("/store")}>Merchandise</span>
              </li>
              <li>
                <span onClick={() => goToPage("/contact")}>Support</span>
              </li>
              <li>
                <span onClick={goToFAQ}>FAQs</span>
              </li>
            </ul>

            <div className="institutional">
              <h4 className="inst-heading">Opening Hours</h4>
              <p className="inst-hours">Mon–Fri: 9 AM – 6 PM</p>
              <p className="inst-hours">Sat: 10 AM – 2 PM</p>
              <a
                href="https://maps.app.goo.gl/6bezSVeb72PZisUY8"
                className="map-link"
                target="_blank"
              >
                View on map
              </a>
            </div>
          </div>

          {/* CONTACT SECTION */}
          <div className="footer-section">
            <h3 className="footer-heading">Contact Us</h3>

            <div className="contact-information flex flex-col gap-2">
              <p className="flex gap-4 items-center"><i className="fa-solid fa-location-dot text-blue-500"></i><span> Graphura India Private Limited, near RSF, Pataudi, Gurgaon, Haryana 122503</span></p>
              <p className="flex gap-4 items-center"><i className="fa-solid fa-phone text-blue-500"></i><span> +91 7378021327</span></p>
              <p className="flex gap-4 items-center"><i className="fa-regular fa-envelope text-blue-500"></i><a href="mailto:support@graphura.in"><span> support@graphura.in</span></a></p>
            </div>
          </div>
        </div>

        {/* ---------------- COPYRIGHT ---------------- */}
        <div className="legal">
          <p className="small font-semibold text-md">© 2025 Graphura India Private Limited. All Rights Reserved</p>
          {/* <p className="small">CIN: U12345MH2025PTC000000</p> */}
        </div>
      </footer>

      {/* ---------------- BACK TO TOP ---------------- */}
      <button
        className={`back-to-top ${showTop ? "visible" : ""}`}
        onClick={scrollToTopBtn}
      >
        ↑
      </button>
    </>
  );
}

export default Footer;
