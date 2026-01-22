import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Home.css";
import { Plus } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faHandPointRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
// Events data -
const upcomingEvents = [
  {
    id: 1,
    title: "Academic Events",
    description:
      "Competitions, workshops and knowledge-based activities to boost academic excellence.",
    date: "Feb 10, 2025",
    time: "10:00 AM - 3:00 PM",
    image: "/Image/Academic Events.jpg",
  },
  {
    id: 2,
    title: "Cultural Events",
    description:
      "A celebration of traditions, dance, music and creativity from diverse cultures.",
    date: "March 05, 2025",
    time: "4:00 PM - 8:00 PM",
    image: "/Image/Cultural Events.jpg",
  },
  {
    id: 3,
    title: "Sports Events",
    description:
      "Engaging athletics, games, and competitive sports to build confidence and team spirit.",
    date: "April 22, 2025",
    time: "8:00 AM - 5:00 PM",
    image: "/Image/Sports Events.jpg",
  },
  {
    id: 4,
    title: "Skill & Personality Development Events",
    description:
      "Workshops and activities focused on communication, leadership, creativity, and personal growth.",
    date: "May 18, 2025",
    time: "9:30 AM - 2:30 PM",
    image: "/Image/Skill & Personality Development Events.jpg",
  },
  {
    id: 5,
    title: "Community & Social Events",
    description:
      "Events that encourage social bonding, community contribution and group spirit.",
    date: "June 10, 2025",
    time: "3:00 PM - 6:00 PM",
    image: "/Image/Community & Social Events.jpg",
  },
  {
    id: 6,
    title: "Student Life & Fun Events",
    description:
      "Enjoyable and memorable events including fairs, DJ night, picnics and carnival experiences!",
    date: "August 25, 2025",
    time: "5:00 PM - 9:00 PM",
    image: "/Image/Student Life & Fun Events.jpg",
  },
];

const announcements = [
  {
    id: 1,
    title: "New Digital Learning Platform Launched",
    date: "February 28, 2024",
    description:
      "We are excited to announce the launch of our new comprehensive digital learning platform, enhancing online resources for all students.",
  },
  {
    id: 2,
    title: "Parent-Teacher Conference Schedule",
    date: "February 20, 2024",
    description:
      "The schedule for the upcoming parent-teacher conferences has been released. Please check your emails for booking slots.",
  },
  {
    id: 3,
    title: "Admissions Open for Academic Year 2025-2026",
    date: "February 15, 2024",
    description:
      "Applications for the next academic year are now open. Visit our admissions page for detailed information and guidelines.",
  },
];

// Activities data
const activities = [
  {
    id: 1,
    title: "Robotics Club Wins State Championship",
    date: "March 05, 2024",
    description:
      "Our Robotics Club showcased exceptional skill and teamwork, securing the top position in the annual state championship!",
  },
  {
    id: 2,
    title: "Debate Team Qualifies for Nationals",
    date: "February 25, 2024",
    description:
      "The EduConnect Hub Debate Team has successfully qualified for the National Debate Tournament, a testament to their dedication.",
  },
  {
    id: 3,
    title: "Annual Photography Exhibition Highlights",
    date: "February 18, 2024",
    description:
      "Explore the creative works from our photography club in their annual exhibition, celebrating diverse perspectives and talents.",
  },
];

const galleryImages = [
  {
    id: 1,
    src: "/Image/sports.jpg",
    alt: "Sports Events",
  },
  {
    id: 2,
    src: "/Image/cultural.jpg",
    alt: "Cultural Events",
  },
  {
    id: 3,
    src: "/Image/academic.jpeg",
    alt: "Academic Events",
  },
  {
    id: 4,
    src: "/Image/fun.jpg",
    alt: "Student Life & Fun Events",
  },
  {
    id: 5,
    src: "/Image/social.jpg",
    alt: "Community & Social Events",
  },
  {
    id: 6,
    src: "/Image/skills.jpg",
    alt: "Skill & Personality Development Events",
  },
];

function Home() {
  const [imagesPerSlide, setImagesPerSlide] = useState(3);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeImage, setActiveImage] = useState(null);
  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth < 640) {
        setImagesPerSlide(2); // small screens
      } else {
        setImagesPerSlide(3); // bigger screens
      }
    };
    updateSlides();
    window.addEventListener("resize", updateSlides);

    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(
      (prev) => (prev + 1) % Math.ceil(galleryImages.length / imagesPerSlide),
    );
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.ceil(galleryImages.length / imagesPerSlide)) %
        Math.ceil(galleryImages.length / imagesPerSlide),
    );
  };

  const avatars = [
    "https://i.pravatar.cc/100?img=11",
    "https://i.pravatar.cc/100?img=22",
    "https://i.pravatar.cc/100?img=33",
    "https://i.pravatar.cc/100?img=44",
  ];

  const fadeLeft = {
    hidden: {
      opacity: 0,
      x: -120,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  const fadeRight = {
    hidden: {
      opacity: 0,
      x: 120,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <>
      <div className="home-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content animate-fade-up text-center! lg:text-start!">
            <p className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-br from-[#1a3d3d] via-[#0d2b2b] to-[#0a1a1a] border border-teal-500/40 rounded-3xl text-[#e0f2f1] text-sm font-semibold tracking-wide uppercase shadow-[0_0_20px_rgba(60,120,120,0.3),inset_0_1px_2px_rgba(255,255,255,0.1)] relative font-sans">
              <span className="w-2 h-2 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8),0_0_12px_rgba(74,222,128,0.4)] flex-shrink-0 animate-pulse"></span>
              GRAPHURA EDUCATION
            </p>
            <h1 className="hero-title">
              Inspiring Futures,
              <br />
              Empowering Minds
              <br />
              <span className="highlight">
                Welcome To <br />
                Graphura School
              </span>
            </h1>
            <p className="hero-description max-w-[500px]">
              At Graphura, we are dedicated to providing a holistic education
              that fosters academic excellence, critical thinking, and personal
              growth. Discover a vibrant community where every student thrives.
            </p>
            <div className="hero-buttons mt-1">
              <Link to="/admission" className="btn btn-primary">
                Apply Now
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
          <div className="relative rounded-[50%] p-2 border border-green-500">
            <div className="hero-image-container animate-fade-up shadow-lg shadow-green-500">
              <img
                src="https://res.cloudinary.com/drq2a0262/image/upload/f_webp/v1768115854/pexels-uraw-15396396_reinf0"
                alt="Students learning"
                className="hero-image"
              />
            </div>
            <FontAwesomeIcon
              icon={faGraduationCap}
              className="cap-float text-[#0f3c3d] text-8xl absolute top-0 -left-30"
            />
            <div
              className="hidden rotate-4 sm:block absolute rounded-2xl bg-gray-300 p-4 shadow-[0_20px_40px_rgba(0,0,0,0.25),0_8px_16px_rgba(0,0,0,0.15)] bottom-20 -left-18 float"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Title */}
              <p
                className="text-sm font-semibold mb-3 text-black"
                style={{ transform: "translateZ(20px)" }}
              >
                100+ Tutors
              </p>

              {/* Avatar Group */}
              <div
                className="flex items-center"
                style={{ transform: "translateZ(30px)" }}
              >
                {avatars.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt="avatar"
                    className={`w-9 h-9 rounded-full border-2 border-[#6fd513] object-cover shadow-md
        ${index !== 0 ? "-ml-3" : ""}`}
                  />
                ))}

                <button
                  className="-ml-3 w-9 h-9 rounded-full bg-[#6fd513] text-black
      flex items-center justify-center border-2 border-white  
      shadow-[0_6px_14px_rgba(0,179,164,0.6)]
      hover:scale-110 transition"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <div className="hidden rotate-20! absolute sm:flex items-center gap-2 rounded-2xl bg-gray-300 p-4 shadow-[0_20px_40px_rgba(0,0,0,0.25),0_8px_16px_rgba(0,0,0,0.15)] top-0 float right-0">
              <FontAwesomeIcon
                icon={faStar}
                className="text-yellow-400 bg-yellow-200 px-3 py-3.5 rounded-lg"
              />
              <div>
                <p className="text-sm text-gray-700">TOP RATED</p>
                <p>
                  <span className="font-bold">4.9/5</span>
                  <span className="text-gray-500"> Stars</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="py-15 bg-[#f6f7f8]">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">
              Our <span className="text-black-600">Vision & Mission</span>
            </h2>
            <p className="text-gray-500 mt-2">
              Guiding principles that shape our future.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
            {/* Vision Card */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group bg-white px-8 py-10 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
            >
              <div className="flex items-center justify-center">
                <div className="bg-[#28ef7b2c] p-5 rounded-full shadow-md flex items-center justify-center">
                  <i className="fa-regular fa-eye text-[#178645] text-2xl group-hover:rotate-360 duration-500 transition-transform"></i>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-center mt-6">
                Our Vision
              </h3>
              <p className="text-gray-600 mt-4 text-center leading-relaxed">
                To cultivate a learning environment where innovation meets
                tradition, empowering students to become compassionate leaders
                and lifelong learners who contribute positively to a global
                society.
              </p>
              <div className="text-center mt-6 mt-auto">
                <Link
                  to="/about"
                  className="text-[#178645] font-semibold hover:text-[#0c3031] transition"
                >
                  Explore Programs →
                </Link>
              </div>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group bg-white px-8 py-10 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center justify-center">
                <div className="bg-green-100 text-green-600 p-5 rounded-full shadow-md">
                  <i className="fa-regular fa-square-check text-2xl text-[#6fd513] px-1 group-hover:rotate-360 duration-500 transition-transform"></i>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-center mt-6">
                Our Mission
              </h3>
              <p className="text-gray-600 mt-4 text-center leading-relaxed">
                Graphura is committed to delivering a comprehensive educational
                experience through rigorous academics, diverse extracurriculars,
                and personalized support, preparing students for success in an
                ever-evolving world.
              </p>
              <div className="text-center mt-6">
                <Link
                  to="/about"
                  className="text-[#6fd513] font-semibold hover:text-[#53a110] transition"
                >
                  Learn About Our Values →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-12 bg-[#f6f7f8]">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800">
              Our Achievements
            </h2>
            <p className="text-gray-500 mt-2">
              Celebrating milestones and fostering excellence.
            </p>

            {/* Divider Line */}
            <div className="w-24 h-1 mx-auto mt-4 bg-[#6fd513] rounded-full"></div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6 md:px-16">
            {/* Item */}
            <div className="group flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200">
              <div className="text-indigo-600 mb-3 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-trophy text-[#6fd513] text-4xl group-hover:rotate-y-360 transition-transform duration-500"></i>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">15+</h3>
              <p className="text-gray-500 mt-1">National Awards</p>
            </div>

            {/* Item */}
            <div className="group flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200">
              <div className="text-indigo-600 mb-3 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-people-group text-4xl text-[#6fd513] group-hover:rotate-y-360 transition-transform duration-500"></i>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">2000+</h3>
              <p className="text-gray-500 mt-1">Students Enrolled</p>
            </div>

            {/* Item */}
            <div className="group flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200">
              <div className="text-indigo-600 mb-3 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-graduation-cap text-4xl text-[#6fd513] group-hover:rotate-y-360 transition-transform duration-500"></i>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">98%</h3>
              <p className="text-gray-500 mt-1">Graduation Rate</p>
            </div>

            {/* Item */}
            <div className="group flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200">
              <div className="text-indigo-600 mb-3 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-globe text-4xl text-[#6fd513] group-hover:rotate-y-360 transition-transform duration-500"></i>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">50+</h3>
              <p className="text-gray-500 mt-1">Community Projects</p>
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="py-12 bg-white shadow-lg mb-5" id="events">
          <div className="max-w-7xl mx-auto px-6 text-center">
            {/* Section Heading */}
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Upcoming Events
            </h2>
            <p className="text-gray-600 mb-12 text-lg">
              Stay informed about what's happening at our school.
            </p>

            {/* Event Cards Grid */}
            <Swiper
              modules={[Navigation, Autoplay]}
              centeredSlides={true}
              slidesPerView="auto"
              spaceBetween={40}
              initialSlide={1}
              grabCursor={true}
              navigation
              autoplay={{
                delay: 2000, 
                disableOnInteraction: false, 
              }}
              speed={800}
              className="pb-14 overflow-visible"
            >
              {[...upcomingEvents,...upcomingEvents].map((event) => (
                <SwiperSlide key={event.id} className="event-slide pb-10">
                  <div className="event-card bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
                    {/* Image */}
                    <div className="relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-52 object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col h-full">
                      <h3 className="text-lg font-semibold mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {event.description}
                      </p>

                      <Link
                        to="/activities"
                        className="mt-auto text-center py-2.5 rounded-lg border border-[#6fd513] text-[#6fd513] font-semibold hover:bg-[#6fd513] hover:text-white transition"
                      >
                        Explore more
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <style>{`
  /* Slide container */
  .event-slide {
    width: 360px;
    padding: 25px 0;
    transform: scale(0.8);
    opacity: 0.45;
    transition: transform 0.5s ease, opacity 0.5s ease;
  }
.swiper-button-prev,
.swiper-button-next {
  color: #1a472d; 
}

  /* Adjacent slides */
  .swiper-slide-prev.event-slide,
  .swiper-slide-next.event-slide {
    transform: scale(0.9);
    opacity: 0.75;
  }

  /* Center slide */
  .swiper-slide-active.event-slide {
    transform: scale(1.08);
    opacity: 1;
    z-index: 10;
  }

  /* Card size */
  .event-card {
    width: 100%;
    height: 420px;
  }
`}</style>
          </div>
        </section>

        {/* Photo Gallery Section */}
        <section className="py-16 px-6 bg-[#f6f7f8]">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black">Gallery</h2>
            <p className="text-gray-500">
              A glimpse into our vibrant school life.
            </p>
          </div>

          {/* Slider */}
          <Swiper
            modules={[Navigation, EffectCoverflow]}
            effect="coverflow"
            centeredSlides={true}
            grabCursor={true}
            navigation
            loop={true}
            slidesPerView={3}
            spaceBetween={50}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 180,
              modifier: 1.5,
              slideShadows: false,
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16"
          >
            {galleryImages.map((img) => (
              <SwiperSlide key={img.id}>
                <div
                  className="gallery-card cursor-pointer relative"
                  onClick={() => setActiveImage(img.src)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-center py-2 px-4">
                    {img.alt}
                  </span>
                  <div className="gallery-overlay" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {activeImage && (
            <div
              className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
              onClick={() => setActiveImage(null)}
            >
              <div className="relative max-w-5xl w-full px-4 pt-25 animate-zoomIn">
                <div>
                  <img
                    src={activeImage}
                    alt="Gallery Preview"
                    className="max-h-[80vh] object-contain rounded-xl shadow-2xl cursor-pointer mx-auto"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Styles */}
          <style>{`
    .gallery-card {
      height: 280px;
      border-radius: 18px;
      overflow: hidden;
      position: relative;
      transition: transform 0.4s ease;
    }
  

    /* Dark gradient overlay */
    .gallery-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to top,
        rgba(0,0,0,0.45),
        rgba(0,0,0,0)
      );
    }

    /* Side slides dimmed */
    .swiper-slide {
      opacity: 0.7;
      transition: opacity 0.4s ease;
    }

    /* Active slide */
    .swiper-slide-active {
      opacity: 1;
      z-index: 10;
    }
      

    /* Arrow color */
    .swiper-button-prev,
    .swiper-button-next {
      color: #1a472d;
      background-color: #fff;
      border-radius: 50%;
      padding: 10px;
    }
      .swiper-button-prev:hover{
        background-color: #6fd513;
      }
      .swiper-button-next:hover{
        background-color: #6fd513;
      }
  `}</style>
        </section>

        {/* Latest Updates Section */}
        <section className="py-12 bg-[#f6f7f8]">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Latest Updates
            </h2>
            <p className="text-gray-500 mt-2">
              Stay updated with our latest news and activities.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-6">
            {/* Announcements Column */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 flex flex-col">
              <h3 className="text-2xl font-semibold text-[#178645] mb-6">
                {" "}
                Announcements
              </h3>
              <div className="space-y-6">
                {announcements.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl transition-all duration-300 hover:bg-[#a6fcc9] hover:shadow-md"
                  >
                    <h4 className="text-lg font-semibold text-gray-800">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 mb-1">{item.date}</p>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/contact"
                className="mt-auto inline-flex items-center text-[#178645] font-medium hover:underline"
              >
                Contact Us for Info →
              </Link>
            </div>

            {/* Activities Column */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 flex flex-col">
              <h3 className="text-2xl font-semibold text-[#6fd513] mb-6">
                {" "}
                Activities
              </h3>
              <div className="space-y-6">
                {activities.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl transition-all duration-200 hover:bg-[#d1ffa8] hover:shadow-md"
                  >
                    <h4 className="text-lg font-semibold text-gray-800">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 mb-1">{item.date}</p>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>

              <Link
                to="/activities"
                className="mt-auto inline-flex items-center text-[#6fd513] font-medium hover:underline"
              >
                Explore More Activities →
              </Link>
            </div>
          </div>
        </section>

        {/* Quick link cards */}
        <section>
          <div className="w-full flex justify-center py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-[90%]">
              {/* Card 1 */}
              <Link
                to="/courses"
                className="group cursor-pointer bg-[#dcfcc1] flex flex-col items-center justify-center rounded-xl py-8 hover:shadow-lg transition duration-300 hover:scale-105"
              >
                <i className="fa-solid fa-graduation-cap text-[#6fd513] text-4xl mb-3 group-hover:rotate-y-360 transition-transform duration-500"></i>
                <h3 className="font-semibold text-lg">Our Courses</h3>
              </Link>

              {/* Card 2 */}
              <Link
                to="/activities"
                className="group cursor-pointer bg-[#dcfcc1] flex flex-col items-center justify-center rounded-xl py-8 hover:shadow-lg transition duration-300 hover:scale-105"
              >
                <i className="fa-solid fa-basketball text-[#6fd513] text-4xl mb-3 group-hover:rotate-y-360 transition-transform duration-500"></i>
                <h3 className="font-semibold text-lg">Student Activities</h3>
              </Link>

              {/* Card 3 */}
              <Link
                to="/admission"
                className="group cursor-pointer bg-[#dcfcc1] flex flex-col items-center justify-center rounded-xl py-8 hover:shadow-lg transition duration-300 hover:scale-105"
              >
                <i className="fa-solid fa-file-lines text-[#6fd513] text-4xl mb-3 group-hover:rotate-y-360 transition-transform duration-500"></i>
                <h3 className="font-semibold text-lg">Admission Form</h3>
              </Link>

              {/* Card 4 */}
              <Link
                to="/contact"
                className="group cursor-pointer bg-[#dcfcc1] flex flex-col items-center justify-center rounded-xl py-8 hover:shadow-lg transition duration-300 hover:scale-105"
              >
                <i className="fa-solid fa-envelope text-[#6fd513] text-4xl mb-3 group-hover:rotate-y-360 transition-transform duration-500"></i>
                <h3 className="font-semibold text-lg">Get In Touch</h3>
              </Link>
            </div>
          </div>
        </section>

        {/* Admission Quick Link / CTA Section */}
        <section className="cta-section relative px-3!">
          <div className="cta-content">
            <h2>Ready to Join Our School?</h2>
            <p>Take the first step towards a brighter future for your child.</p>
            <Link to="/admission" className="cta-btn relative">
              Start Application
              <FontAwesomeIcon
                icon={faHandPointRight}
                className="absolute text-[#6fd513] text-3xl -left-15"
              />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
