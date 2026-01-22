import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// Import images
const football =
  "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2070&auto=format&fit=crop";
const basketball =
  "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop";
const drama =
  "https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=2071&auto=format&fit=crop";
const scRobo =
  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop";
const music =
  "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop";
const debate =
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070&auto=format&fit=crop";
const cricket =
  "https://images.unsplash.com/photo-1685541000562-a00dcf472343?q=80&w=2062&auto=format&fit=crop";
const visualArts =
  "https://plus.unsplash.com/premium_photo-1705844346816-fd486fe16153?q=80&w=2070&auto=format&fit=crop";
const mathematics =
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop";

const videoData = [
  {
    id: 1,
    title: "Farewell 2025",
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1661780479839-1261d89e3159?q=80&w=1740&auto=format&fit=crop",
    videoUrl:
      "https://res.cloudinary.com/dw4u4z3fr/video/upload/v1765731409/School_Farewell_Video_Generated_iyakgi.mp4",
  },
  {
    id: 2,
    title: "Interschool Football 2025",
    thumbnail:
      "https://res.cloudinary.com/dw4u4z3fr/image/upload/v1765731793/football_l6umle.jpg",
    videoUrl:
      "https://res.cloudinary.com/dw4u4z3fr/video/upload/v1765730722/Football_Match_Video_Generated_uhqalg.mp4",
  },
  {
    id: 3,
    title: "Annual Sports Day",
    thumbnail:
      "https://res.cloudinary.com/dw4u4z3fr/image/upload/v1765731693/annulSportDay_hiysc4.jpg",
    videoUrl:
      "https://res.cloudinary.com/dw4u4z3fr/video/upload/v1765731591/School_Sports_Day_Video_Creation_dxret0.mp4",
  },
];

const VideoCard = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group bg-gray-900"
      onClick={() => setIsPlaying(true)}
    >
      {!isPlaying ? (
        <>
          <img
            src={data.thumbnail}
            alt={data.title}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
              <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-green-600 border-b-[12px] border-b-transparent ml-1"></div>
            </div>
          </div>
          <h3 className="absolute bottom-6 left-6 right-6 text-white text-xl font-bold">
            {data.title}
          </h3>
        </>
      ) : (
        <video
          className="w-full h-64 object-cover"
          src={data.videoUrl}
          controls
          autoPlay
        />
      )}
    </div>
  );
};

function Activities() {
  const pageRef = useRef(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");

    elements.forEach((el) => {
      // RESET animation state when filter changes
      el.classList.remove("animate-fade-in-up");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [filter]); // 👈 THIS IS THE KEY

  const activities = [
    {
      img: football,
      title: "Football Club",
      desc: "Develop teamwork and athletic skill on the field.",
      category: "sports",
      icon: "⚽",
    },
    {
      img: basketball,
      title: "Basketball Team",
      desc: "Join the team, train hard and compete for victory.",
      category: "sports",
      icon: "🏀",
    },
    {
      img: drama,
      title: "Annual Drama Production",
      desc: "Showcase your acting and stage management talents.",
      category: "culture",
      icon: "🎭",
    },
    {
      img: scRobo,
      title: "Science & Robotics",
      desc: "Explore STEM fields with hands-on projects and competitions.",
      category: "academic",
      icon: "🤖",
    },
    {
      img: music,
      title: "Music Ensemble",
      desc: "Harmonize with fellow musicians and perform at school events.",
      category: "culture",
      icon: "🎵",
    },
    {
      img: debate,
      title: "Debate Club",
      desc: "Sharpen your public speaking and critical thinking skills.",
      category: "academic",
      icon: "💬",
    },
    {
      img: cricket,
      title: "Cricket Club",
      desc: "Master the art of cricket with expert coaching and teamwork.",
      category: "sports",
      icon: "🏏",
    },
    {
      img: visualArts,
      title: "Visual Arts",
      desc: "Explore creativity through colors, shapes, and imagination.",
      category: "culture",
      icon: "🎨",
    },
    {
      img: mathematics,
      title: "Mathematics Club",
      desc: "Challenge yourself with problem-solving and logic puzzles.",
      category: "academic",
      icon: "📐",
    },
  ];

  const filteredActivities =
    filter === "all"
      ? activities
      : activities.filter((a) => a.category === filter);

  const navigate = useNavigate();
  return (
    <div
      className="bg-gradient-to-b from-gray-50 to-white"
      ref={pageRef}
    >
      <style>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .reveal-on-scroll {
          opacity: 0;
        }
      `}</style>

      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-20 px-6 md:px-12 lg:px-20 reveal-on-scroll"
        style={{
          background:
            "linear-gradient(180deg, #0c3031 0%, #0f3730 50%, #1a472d 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mt-5">
            {/* Left: Text Content */}
            <div className="text-white space-y-6 z-10 relative">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Discover Our Vibrant Student Life
              </h1>
              <p className="text-lg md:text-xl text-green-100 leading-relaxed">
                At EduConnect Hub, we believe in nurturing well-rounded
                individuals. Explore a rich array of extracurricular, sports,
                cultural, and academic activities designed to foster passion,
                talent, and growth beyond the classroom.
              </p>
            </div>

            {/* Right: Image */}
            <div className="relative lg:block hidden">
              <div className="absolute -top-10 -right-10 w-96 h-96 bg-[#6fd513] rounded-full opacity-20 blur-3xl"></div>
              <img
                src="https://plus.unsplash.com/premium_photo-1661605523899-f97ec76e9e98?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2Nob29sJTIwc3BvcnRzfGVufDB8fDB8fHww"
                alt="School Sports"
                className="relative rounded-3xl shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4 reveal-on-scroll">
            Our Diverse Activities
          </h2>
          <p className="text-center text-gray-600 text-lg mb-12 reveal-on-scroll">
            Choose from a wide range of activities tailored to your interests
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16 reveal-on-scroll">
            {[
              { label: "All Activities", value: "all" },
              { label: "Sports", value: "sports" },
              { label: "Culture", value: "culture" },
              { label: "Academic", value: "academic" },
            ].map((btn) => (
              <button
                key={btn.value}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  filter === btn.value
                    ? "bg-[#6fd513] text-white shadow-lg"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-[#6fd513] hover:text-[#6fd513]"
                }`}
                onClick={() => setFilter(btn.value)}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Activity Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActivities.map((activity, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 reveal-on-scroll"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={activity.img}
                    alt={activity.title}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#6fd513] transition-colors">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {activity.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Highlights Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-gray-50 reveal-on-scroll">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
            Recent Highlights
          </h2>
          <p className="text-center text-gray-600 text-lg mb-12">
            Relive the exciting moments from our campus events
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoData.map((card) => (
              <VideoCard key={card.id} data={card} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 px-6 md:px-12 lg:px-20 reveal-on-scroll"
        style={{
          background:
            "linear-gradient(180deg, #0c3031 0%, #0f3730 50%, #1a472d 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Join the Fun?
          </h2>
          <p className="text-xl text-green-100 mb-10 leading-relaxed">
            Participation in activities is a cornerstone of the EduConnect Hub
            experience. Explore our programmes and discover how you can get
            involved today.
          </p>
          <button
            onClick={() => navigate("/admission")}
            className="px-10 py-5 bg-white text-[#6fd513] font-bold rounded-full hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-2xl text-lg"
          >
            Apply For Admission
          </button>
        </div>
      </section>
    </div>
  );
}

export default Activities;
