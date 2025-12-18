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
        {/* <section id="first-container" className="reveal-on-scroll">
          <h1 className="container-heading">Our Foundation</h1>
          <div id="heading-desc">
            <p>{textp}</p>
          </div>
          <Link to="/admission" className="btns">Apply</Link>
        </section> */}
        <section id="banner-container" className="rounded-2xl overflow-hidden relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh]">
      {/* Background Image */}
      <img
        src="https://res.cloudinary.com/drq2a0262/image/upload/v1765967740/Gemini_Generated_Image_youyjiyouyjiyouy_ixh47o.png"
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="text-center max-w-3xl">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl! font-bold leading-tight">
            Our Foundation
          </h1>

          <p className="mt-4 text-gray-200 text-sm sm:text-base md:text-xl">
           {textp}
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <Link to="/admission" className="btns text-white font-semibold bg-blue-500 px-5 py-2 rounded-3xl hover:scale-105 hover:bg-blue-900 shadow-xl transition-transform duration-200">Apply</Link>
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
              <h3  className="font-bold">Our Values</h3>
              <p>
                Integrity, Respect, Excellence, Collaboration, and Innovation
                guide every action and decision.
              </p>
            </div>
          </div>
        </section>

        {/* 4th-box */}
        <section className="principal-message reveal-on-scroll">
          <h2>A Message from Our Principal</h2>

          <div className="message-card">
            <div className="principal-img">
              <img src={profile} alt="Principal" />
            </div>

            <div className="message-text">
              <p className="quote">
                I warmly welcome you to our school website. Our vision is to
                create a supportive and inspiring environment where students
                grow academically, socially, and emotionally. We are committed
                to excellence in education and dedicated to preparing students
                for a successful future.
                <br />
                <br />
                Thank you for your constant support and trust.
                <br />
                <br />
              </p>

              <h4 className="name">Dr. María Cruz</h4>
              <p className="designation">Principal, EduConnect Hub</p>
            </div>
          </div>
        </section>

        {/* 5th-box */}
        <section className="campus-section reveal-on-scroll">
          <h2 className="campus-heading">Our Modern Campus Facilities</h2>

          <div className="campus-grid">
            <div className="campus-card reveal-on-scroll">
              <img src={advSchool} alt="Advanced Classroom" />
              <h3 className="font-bold">Advanced Classrooms</h3>
              <p>
                Equipped with cutting-edge technology to facilitate interactive
                and engaging learning experiences.
              </p>
            </div>

            <div className="campus-card reveal-on-scroll">
              <img src={exLibrary} alt="Extensive Library" />
              <h3 className="font-bold">Extensive Library</h3>
              <p>
                A rich collection of resources and a serene environment
                conducive to deep learning and research.
              </p>
            </div>

            <div className="campus-card reveal-on-scroll">
              <img src={scienceLib} alt="Science Laboratories" />
              <h3 className="font-bold">Science Laboratories</h3>
              <p>
                Dedicated labs for physics, chemistry, and biology, fostering
                hands-on scientific discovery.
              </p>
            </div>

            <div className="campus-card reveal-on-scroll">
              <img src={compLabs} alt="Computer Labs" />
              <h3 className="font-bold">Computer Labs</h3>
              <p>
                Equipped with high-performance computers and software for
                programming, design, and digital literacy.
              </p>
            </div>

            <div className="campus-card reveal-on-scroll">
              <img src={schlFaci} alt="Sports Facilities" />
              <h3 className="font-bold">Sports Facilities</h3>
              <p>
                Indoor and outdoor courts, fields, and a gym to support a wide
                range of athletic activities.
              </p>
            </div>

            <div className="campus-card reveal-on-scroll">
              <img src={artandmusic} alt="Art & Music Studios" />
              <h3 className="font-bold">Art & Music Studios</h3>
              <p>
                Creative spaces designed to inspire artistic expression and
                musical talent.
              </p>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default AboutSchool;
