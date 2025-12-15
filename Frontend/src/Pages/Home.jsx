import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Home.css";
import hero from "../assets/heropage.png";
// const heroImage = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80"

const eventImages = {
  scienceFair:
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&q=80",
  sportsDay:
    "https://images.unsplash.com/photo-1700914297011-60e0e8d12c0b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  musicConcert:
    "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80",
};

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
    src: "/Image/Sports Events.jpg",
    alt: "Sports Events",
  },
  {
    id: 2,
    src: "/Image/Cultural Events.jpg",
    alt: "Cultural Events",
  },
  {
    id: 3,
    src: "/Image/Academic Events.jpg",
    alt: "Academic Events",
  },
  {
    id: 4,
    src: "/Image/Student Life & Fun Events.jpg",
    alt: "Student Life & Fun Events",
  },
  {
    id: 5,
    src: "/Image/Community & Social Events.jpg",
    alt: "Community & Social Events",
  },
  {
    id: 6,
    src: "/Image/Skill & Personality Development Events.jpg",
    alt: "Skill & Personality Development Events",
  },
];

function Home() {
  const [imagesPerSlide, setImagesPerSlide] = useState(3);

  const [currentSlide, setCurrentSlide] = useState(0);
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
      (prev) => (prev + 1) % Math.ceil(galleryImages.length / imagesPerSlide)
    );
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.ceil(galleryImages.length / imagesPerSlide)) %
        Math.ceil(galleryImages.length / imagesPerSlide)
    );
  };

  return (
    <>
      <div className="home-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
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
            <p className="hero-description">
              At EduConnect Hub, we are dedicated to providing a holistic
              education that fosters academic excellence, critical thinking, and
              personal growth. Discover a vibrant community where every student
              thrives.
            </p>
            <div className="hero-buttons">
              <Link to="/admission" className="btn btn-primary">
                Apply Now
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
          <div className="hero-image-container">
            <img src={hero} alt="Students learning" className="hero-image" />
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="py-20 bg-[#f6f7f8]">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">
              Our <span className="text-black-600">Vision & Mission</span>
            </h2>
            <p className="text-gray-500 mt-2">
              Guiding principles that shape our future.
            </p>
          </div>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
            {/* Vision Card */}
            <div className="bg-white px-8 py-10 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center justify-center">
                <div className="bg-blue-100 text-blue-600 p-5 rounded-full shadow-md flex items-center justify-center">
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="3" />
                  </svg> */}
                  <i className="fa-regular fa-eye text-blue-500 text-2xl"></i>
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
              <div className="text-center mt-6">
                <Link
                  to="/about"
                  className="text-blue-600 font-semibold hover:text-blue-700 transition"
                >
                  Explore Programs →
                </Link>
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-white px-8 py-10 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center justify-center">
                <div className="bg-green-100 text-green-600 p-5 rounded-full shadow-md">
                  <i className="fa-regular fa-square-check text-2xl text-green-400 px-1"></i>
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
                  className="text-green-600 font-semibold hover:text-green-700 transition"
                >
                  Learn About Our Values →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-16 bg-[#f6f7f8]">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">
              Our Achievements
            </h2>
            <p className="text-gray-500 mt-2">
              Celebrating milestones and fostering excellence.
            </p>

            {/* Divider Line */}
            <div className="w-24 h-1 mx-auto mt-4 bg-indigo-500 rounded-full"></div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6 md:px-16">
            {/* Item */}
            <div className="group flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200">
              <div className="text-indigo-600 mb-3 group-hover:scale-110 transition-transform ">
                <i className="fa-solid fa-trophy text-blue-500 text-4xl"></i>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">15+</h3>
              <p className="text-gray-500 mt-1">National Awards</p>
            </div>

            {/* Item */}
            <div className="group flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200">
              <div className="text-indigo-600 mb-3 group-hover:scale-110 transition-transform">

                <i className="fa-solid fa-people-group text-4xl text-blue-500"></i>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">2000+</h3>
              <p className="text-gray-500 mt-1">Students Enrolled</p>
            </div>

            {/* Item */}
            <div className="group flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200">
              <div className="text-indigo-600 mb-3 group-hover:scale-110 transition-transform">
                
                 <i className="fa-solid fa-graduation-cap text-4xl text-blue-500"></i>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">98%</h3>
              <p className="text-gray-500 mt-1">Graduation Rate</p>
            </div>

            {/* Item */}
            <div className="group flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200">
              <div className="text-indigo-600 mb-3 group-hover:scale-110 transition-transform">
               
                <i className="fa-solid fa-globe text-4xl text-blue-500"></i>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">50+</h3>
              <p className="text-gray-500 mt-1">Community Projects</p>
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section
          className="py-16 bg-white shadow-lg rounded-2xl mb-5"
          id="events"
        >
          <div className="max-w-7xl mx-auto px-6 text-center">
            {/* Section Heading */}
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Upcoming Events
            </h2>
            <p className="text-gray-600 mb-12 text-lg">
              Stay informed about what's happening at our school.
            </p>

            {/* Event Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 flex flex-col"
                >
                  {/* Event Image */}
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-56 object-cover"
                    />

                    {/* Date Badge */}
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xl text-white px-4 py-2 rounded-lg shadow-md">
                      <p className="font-semibold">{event.date}</p>
                      <span className="text-sm">{event.time}</span>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-6 text-left flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {event.title}
                    </h3>

                    <p className="text-gray-600 mb-5 leading-relaxed">
                      {event.description}
                    </p>

                    <Link
                      to="/activities"
                      className="inline-block w-full text-center py-3 px-6 rounded-lg border border-blue-600 text-blue-600 font-semibold transition-all duration-300
      hover:bg-blue-600 hover:text-white mt-auto"
                    >
                      Explore more
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Photo Gallery Section */}
        <section className="py-20 px-6 bg-[#f6f7f8]">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black-600">Gallery</h2>
            <p className="text-gray-500">
              A glimpse into our vibrant school life.
            </p>
          </div>
          <div className="relative max-w-5xl mx-auto flex items-center gap-6">
            {/* Prev Button */}
            <button
              onClick={prevSlide}
              className="absolute left-[-50px] p-3 bg-white shadow-lg rounded-full hover:bg-blue-600 hover:text-white transition"
            >
              ❮
            </button>

            {/* Slides */}
            <div className="overflow-hidden w-full">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({
                  length: Math.ceil(galleryImages.length / 2),
                }).map((_, index) => (
                  <div
                    key={index}
                    className="flex justify-center gap-6 w-full px-4"
                  >
                    {galleryImages
                      .slice(
                        index * imagesPerSlide,
                        index * imagesPerSlide + imagesPerSlide
                      )
                      .map((img, idx) => (
                        <div
                          key={img.id}
                          className={`relative w-[350px] h-[220px] rounded-xl overflow-hidden transition-all duration-500 
                    
                    ${idx === 1 ? "scale-100 shadow-xl" : ""}
                    hover:scale-[1.05]`}
                        >
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="absolute right-[-50px] p-3 bg-white shadow-lg rounded-full hover:bg-blue-600 hover:text-white transition"
            >
              ❯
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: Math.ceil(galleryImages.length / 3) }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all 
            ${currentSlide === index ? "bg-blue-600 w-6" : "bg-gray-300 w-2"}`}
                ></button>
              )
            )}
          </div>
        </section>

        {/* Latest Updates Section */}
        <section className="py-16 bg-[#f6f7f8]">
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
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-semibold text-blue-600 mb-6">
                {" "}
                Announcements
              </h3>
              <div className="space-y-6">
                {announcements.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl transition-all duration-300 hover:bg-blue-50 hover:shadow-md"
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
                className="mt-6 inline-flex items-center text-blue-600 font-medium hover:underline"
              >
                Contact Us for Info →
              </Link>
            </div>

            {/* Activities Column */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-semibold text-green-600 mb-6">
                {" "}
                Activities
              </h3>
              <div className="space-y-6">
                {activities.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl transition-all duration-300 hover:bg-green-50 hover:shadow-md"
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
                className="mt-6 inline-flex items-center text-green-600 font-medium hover:underline"
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
                className="cursor-pointer bg-blue-200 flex flex-col items-center justify-center rounded-xl py-8 hover:shadow-lg transition duration-300 hover:scale-105"
              >
                <i className="fa-solid fa-graduation-cap text-blue-600 text-4xl mb-3"></i>
                <h3 className="font-semibold text-lg">Our Courses</h3>
              </Link>

              {/* Card 2 */}
              <Link
                to="/activities"
                className="cursor-pointer bg-blue-200 flex flex-col items-center justify-center rounded-xl py-8 hover:shadow-lg transition duration-300 hover:scale-105"
              >
                <i className="fa-solid fa-basketball text-blue-600 text-4xl mb-3"></i>
                <h3 className="font-semibold text-lg">Student Activities</h3>
              </Link>

              {/* Card 3 */}
              <Link
                to="/admission"
                className="cursor-pointer bg-blue-200 flex flex-col items-center justify-center rounded-xl py-8 hover:shadow-lg transition duration-300 hover:scale-105"
              >
                <i className="fa-solid fa-file-lines text-blue-600 text-4xl mb-3"></i>
                <h3 className="font-semibold text-lg">Admission Form</h3>
              </Link>

              {/* Card 4 */}
              <Link
                to="/contact"
                className="cursor-pointer bg-blue-200 flex flex-col items-center justify-center rounded-xl py-8 hover:shadow-lg transition duration-300 hover:scale-105"
              >
                <i className="fa-solid fa-envelope text-blue-600 text-4xl mb-3"></i>
                <h3 className="font-semibold text-lg">Get In Touch</h3>
              </Link>
            </div>
          </div>
        </section>

        {/* Admission Quick Link / CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Join Our School?</h2>
            <p>Take the first step towards a brighter future for your child.</p>
            <Link to="/admission" className="cta-btn">
              Start Application
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
