import React, { useEffect } from "react";
import "../Styles/AboutSchool.css";
import school from "../assets/AboutSchool/school.jpg";
import ourVision from "../assets/AboutSchool/ourVision.png";
import ourMission from "../assets/AboutSchool/ourMission.png";
import ourValues from "../assets/AboutSchool/ourValues.png";
import profile from "../assets/AboutSchool/profile.png";

// campus section image
import advSchool from "../assets/AboutSchool/advancedClassRoom.jpg";
import exLibrary from "../assets/AboutSchool/extensiveLibrary.jpg";
import scienceLib from "../assets/AboutSchool/scienceLaboratories.jpg";
import compLabs from "../assets/AboutSchool/computerLabs.jpg";
import schlFaci from "../assets/AboutSchool/schoolFacilities.png";
import artandmusic from "../assets/AboutSchool/artAndMusic.jpg";
import { Quote } from "lucide-react";

import { Link } from "react-router-dom";
function AboutSchool() {
  const textp = (
    <>
      Welcome to Graphura — a place where dreams are nurtured, talents are
      discovered, and every learner is empowered to achieve greatness. Join us
      as we continue our journey of transforming education with purpose, vision,
      and passion.
    </>
  );

  const text2 = (
    <>
      Graphura was founded in 1985 with a vision to create an educational
      institution that fosters critical thinking, creativity, and a strong sense
      of community. Starting from humble beginnings as a small preparatory
      school, we have grown into a leading academic center renowned for our
      innovative curriculum and dedication to student success. Our history is
      marked by continuous evolution, embracing new methodologies while
      preserving the timeless values of integrity and perseverance.
      <br />
      <br />
      Over the decades, we have celebrated countless achievements, from
      groundbreaking research by our faculty to stellar performances by our
      students in various fields. Our alumni network spans the globe, embodying
      the spirit of EduConnect Hub in every endeavor. We are proud of our past
      and excited for a future where we continue to inspire and empower
      generations of learners.
    </>
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section id="main-page">
        {/* 1st-box */}
        <section
          id="banner-container"
          className="overflow-hidden relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh]"
        >
          {/* Background Image */}
          <img
            src="https://res.cloudinary.com/drq2a0262/image/upload/v1765967740/Gemini_Generated_Image_youyjiyouyjiyouy_ixh47o.png"
            alt="Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Green Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(12, 48, 49, 0.85) 0%, rgba(15, 55, 48, 0.85) 50%, rgba(26, 71, 45, 0.85) 100%)",
            }}
          ></div>

          {/* Content */}
          <div className="relative animate-fade-up z-10 flex h-full items-center justify-center px-4">
            <div className="text-center max-w-3xl">
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl! font-bold leading-tight">
                Our Foundation
              </h1>

              <p className="mt-4 text-gray-200 text-sm sm:text-base md:text-xl">
                {textp}
              </p>

              <div className="mt-6 flex justify-center gap-4">
                <Link
                  to="/admission"
                  className="btns text-white font-semibold bg-[#6fd513] px-6 py-3 rounded-xl hover:bg-[#53a110] hover:-translate-y-0.5 active:scale-95 shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-file-pen"></i>
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 2nd-box */}
        <section id="second-container" className="reveal-on-scroll">
          <h1 className="container-heading">Our Enduring Legacy</h1>
          <div id="second-container1">
            <div id="rt-box">
              <h2>A Journey of Academic Excellence</h2>
              <div>{text2}</div>
            </div>
            <div id="lt-box">
              <img src={school} alt="about-image" />
            </div>
          </div>
        </section>

        {/* 3rd-box */}
        <section className="pillars-section reveal-on-scroll">
          <h2>Our Pillars of Excellence</h2>

          <div className="pillars-wrapper">
            <div className="pillar-card reveal-on-scroll">
              <img
                src={ourMission}
                alt="Mission Icon"
                className="pillar-icon"
              />
              <h3 className="font-bold">Our Mission</h3>
              <p>
                To provide a nurturing and stimulating environment that empowers
                students to achieve their full academic, personal and social
                potential.
              </p>
            </div>

            <div className="pillar-card reveal-on-scroll">
              <img src={ourVision} alt="Vision Icon" className="pillar-icon" />
              <h3 className="font-bold">Our Vision</h3>
              <p>
                To be a beacon of innovative education, fostering a community of
                lifelong learners and responsible citizens.
              </p>
            </div>

            <div className="pillar-card reveal-on-scroll">
              <img src={ourValues} alt="Values Icon" className="pillar-icon" />
              <h3 className="font-bold">Our Values</h3>
              <p>
                Integrity, Respect, Excellence, Collaboration, and Innovation
                guide every action and decision.
              </p>
            </div>
          </div>
        </section>

        {/* 4th-box */}
        <section className="principal-message reveal-on-scroll mb-6!">
          <div className="principal-message-wrapper">
            <div className="principal-content">
              <h2>What Our Principal Says</h2>
              <p className="testimonial-text bg-[#15544a] px-3 py-4 relative rounded-lg">
                <Quote size={48} strokeWidth={2.5} className="text-[#6fd513] absolute -top-7" />
                I warmly welcome you to our school website. Our vision is to
                create a supportive and inspiring environment where students
                grow academically, socially, and emotionally. We are committed
                to excellence in education and dedicated to preparing students
                for a successful future. Thank you for your constant support and
                trust.
              </p>
              <div className="testimonial-author">
                <h4 className="name">Dr. María Cruz</h4>
                <p className="designation">Principal, Graphura School</p>
              </div>
            </div>
            <div className="principal-image-section">
              <img
                src={profile}
                alt="Principal"
                className="principal-main-image"
              />
              <div className="decorative-books">
                <i className="fa-solid fa-book"></i>
                <i className="fa-solid fa-book"></i>
              </div>
            </div>
          </div>
        </section>

        {/* 5th-box */}
        <section className="campus-section reveal-on-scroll">
          <h2 className="campus-heading">Our Modern Campus Facilities</h2>

          <div className="campus-grid">
            <div className="campus-card reveal-on-scroll">
              <div className="campus-card-image-wrapper">
                <img src={advSchool} alt="Advanced Classroom" />
                <div className="campus-card-icon">
                  <i className="fa-solid fa-chalkboard-user"></i>
                </div>
              </div>
              <div className="campus-card-content">
                <h3 className="font-bold">Advanced Classrooms</h3>
                <p>
                  Equipped with cutting-edge technology to facilitate
                  interactive and engaging learning experiences.
                </p>
              </div>
            </div>

            <div className="campus-card reveal-on-scroll">
              <div className="campus-card-image-wrapper">
                <img src={exLibrary} alt="Extensive Library" />
                <div className="campus-card-icon">
                  <i className="fa-solid fa-book-open"></i>
                </div>
              </div>
              <div className="campus-card-content">
                <h3 className="font-bold">Extensive Library</h3>
                <p>
                  A rich collection of resources and a serene environment
                  conducive to deep learning and research.
                </p>
              </div>
            </div>

            <div className="campus-card reveal-on-scroll">
              <div className="campus-card-image-wrapper">
                <img src={scienceLib} alt="Science Laboratories" />
                <div className="campus-card-icon">
                  <i className="fa-solid fa-flask"></i>
                </div>
              </div>
              <div className="campus-card-content">
                <h3 className="font-bold">Science Laboratories</h3>
                <p>
                  Dedicated labs for physics, chemistry, and biology, fostering
                  hands-on scientific discovery.
                </p>
              </div>
            </div>

            <div className="campus-card reveal-on-scroll">
              <div className="campus-card-image-wrapper">
                <img src={compLabs} alt="Computer Labs" />
                <div className="campus-card-icon">
                  <i className="fa-solid fa-computer"></i>
                </div>
              </div>
              <div className="campus-card-content">
                <h3 className="font-bold">Computer Labs</h3>
                <p>
                  Equipped with high-performance computers and software for
                  programming, design, and digital literacy.
                </p>
              </div>
            </div>

            <div className="campus-card reveal-on-scroll">
              <div className="campus-card-image-wrapper">
                <img src={schlFaci} alt="Sports Facilities" />
                <div className="campus-card-icon">
                  <i className="fa-solid fa-dumbbell"></i>
                </div>
              </div>
              <div className="campus-card-content">
                <h3 className="font-bold">Sports Facilities</h3>
                <p>
                  Indoor and outdoor courts, fields, and a gym to support a wide
                  range of athletic activities.
                </p>
              </div>
            </div>

            <div className="campus-card reveal-on-scroll">
              <div className="campus-card-image-wrapper">
                <img src={artandmusic} alt="Art & Music Studios" />
                <div className="campus-card-icon">
                  <i className="fa-solid fa-palette"></i>
                </div>
              </div>
              <div className="campus-card-content">
                <h3 className="font-bold">Art & Music Studios</h3>
                <p>
                  Creative spaces designed to inspire artistic expression and
                  musical talent.
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default AboutSchool;
