import React, { useState } from "react";
import "../Styles/ContactSupport.css";
import { ChevronDown } from 'lucide-react';
function ContactSupport() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      q: "What are the admission requirements for new students?",
      a: "For new admissions, parents must submit the student’s previous academic records, birth certificate, address proof, and passport-size photographs...",
    },
    {
      q: "How can I track my child's application status?",
      a: "After submitting the application form, parents receive a unique Application ID...",
    },
    {
      q: "What extracurricular activities are available?",
      a: "Our school provides a wide range of extracurricular activities...",
    },
    {
      q: "Where can I purchase school merchandise?",
      a: "Parents can buy official school merchandise from our on-campus store...",
    },
    {
      q: "What is the school's policy on student safety?",
      a: "Student safety is our top priority. The campus is equipped with 24×7 CCTV...",
    },
  ];

  return (
    <>
      <div className="contact-page animate-fade-up">
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

            <p>
              📍 Graphura India Private Limited, near RSF, Pataudi, Gurgaon,
              Haryana 122503
            </p>
            <p>📞 +91 7378021327</p>
            <p>✉️ support@graphura.in</p>

            <a href="tel:+917378021327">
              <button className="btn-primary-one bg-[linear-gradient(180deg,#0c3031_0%,#0f3730_0%,#1a472d_100%)]! hover:bg-[#53a110]!">
                Call Us
              </button>
            </a>

            <a
              className="link-button"
              href="https://wa.me/917378021327"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="btn-whatsapp-unified bg-[#6fd513]! hover:bg-[#53a110]!"
                type="button"
              >
                WhatsApp Us
              </button>
            </a>
          </div>
        </div>

        {/* Map Section */}
        <div className="map-section">
          <h2 className="text-2xl font-bold">Our Location</h2>

          {/* Google Maps Embed */}
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7426.631568001874!2d76.778214!3d28.325526!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d41000fe8670d%3A0x7b0a08f0043a22af!2sGraphura%20India%20Private%20Limited!5e1!3m2!1sen!2sin!4v1765267552892!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section" id="faq-section">
          <h2>Frequently Asked Questions</h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`group bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                  activeIndex === index
                    ? "border-[#6fd513] shadow-xl shadow-green-100"
                    : "border-slate-200 hover:border-green-50 hover:shadow-lg"
                }`}
              >
                <button
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? null : index)
                  }
                  className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6fd513] focus-visible:ring-offset-2"
                  aria-expanded={activeIndex === index}
                >
                  <span
                    className={`text-lg font-semibold transition-colors duration-300 ${
                      activeIndex === index
                        ? "text-[#6fd513 ]"
                        : "text-slate-800 group-hover:text-[#6fd513]"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 w-6 h-6 transition-all duration-300 ${
                      activeIndex === index
                        ? "rotate-180 text-[#6fd513]"
                        : "text-slate-400 group-hover:text-[#6fd513]"
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    activeIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6">
                    <div className="pt-2 pl-4 border-l-4 border-[#6fd513] bg-gradient-to-r from-green-50 to-transparent rounded-r-lg p-4">
                      <p className="text-slate-700 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactSupport;
