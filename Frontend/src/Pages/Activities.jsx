import React, { useEffect, useRef, useState } from "react";
import "../Styles/Activities.css";

// Your existing imports
import football from "../assets/activity/footballClub.jpg";
import basketball from "../assets/activity/basketball.jpeg";
import drama from "../assets/activity/annualSchoolDrama.jpg";
import scRobo from "../assets/activity/sc&robo.jpg";
import music from "../assets/activity/musicEnsemble.jpg";
import debate from "../assets/activity/schoolDebate.jpg";

// --- DATA FOR VIDEO CARDS ---
const videoData = [
  {
    id: 1,
    title: "Annual Sports Day",
    thumbnail:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: 2,
    title: "Football Finals 2024",
    thumbnail:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1000&auto=format&fit=crop",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    id: 3,
    title: "Championship Awards",
    thumbnail:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
];

// --- SUB-COMPONENT FOR VIDEO CARD ---
const VideoCard = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="video-card" onClick={() => setIsPlaying(true)}>
      {!isPlaying ? (
        <>
          <img src={data.thumbnail} alt={data.title} className="thumbnail" />
          <div className="card-overlay"></div>
          <div className="play-btn"></div>
          <h3 className="card-title">{data.title}</h3>
        </>
      ) : (
        <video className="video-stream" src={data.videoUrl} controls autoPlay />
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

  const textapply = (
    <>
      Participant in activities is a cornerstone of the EduConnect Hub
      experience. <br />
      Explore our programmes and discover how you can get involved today.
    </>
  );

  const textapply1 = (
    <>
      At EduConnect Hub, we believe in nurturing well-rounded individuals.
      Explore a rich <br /> array of extracurricular, sports, cultural, and
      academic activities designed to <br />
      foster passion, talent, and growth beyond the classroom.
    </>
  );

  return (
    <>
      <div id="act-main-page" ref={pageRef}>
        {/* 1st box */}
        <section id="act-section1" className="reveal-on-scroll">
          <h1 className="act-h1">Discover Our Vibrant Student Life</h1>
          <p className="act-description">{textapply1} </p>
        </section>

        {/* 2nd box */}
        <h1 className="act-h1">Our Diverse Activities</h1>
        <section id="act-section2" className="reveal-on-scroll">
          <div id="act-sec2-box1">
            <button
              type="button"
              className={`act-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              type="button"
              className={`act-btn ${filter === "sports" ? "active" : ""}`}
              onClick={() => setFilter("sports")}
            >
              Sports
            </button>
            <button
              type="button"
              className={`act-btn ${filter === "culture" ? "active" : ""}`}
              onClick={() => setFilter("culture")}
            >
              Culture
            </button>
            <button
              type="button"
              className={`act-btn ${filter === "academic" ? "active" : ""}`}
              onClick={() => setFilter("academic")}
            >
              Academic club
            </button>
          </div>
          <div id="act-sec2-box2" className="campus-section">
            <div className="campus-grid">
              <div
                className={`campus-card reveal-on-scroll ${
                  filter === "all" || filter === "sports" ? "" : "hide"
                }`}
                data-category="sports"
              >
                <img src={football} alt="Football Club" />
                <h3>Football Club</h3>
                <p>Develop teamwork and athletic skill on the field.</p>
              </div>

              <div
                className={`campus-card reveal-on-scroll ${
                  filter === "all" || filter === "sports" ? "" : "hidden"
                }`}
                data-category="sports"
              >
                <img src={basketball} alt="Basketball" />
                <h3>Basketball Team</h3>
                <p>Join the team, train hard and compete for victory.</p>
              </div>

              <div
                className={`campus-card reveal-on-scroll ${
                  filter === "all" || filter === "culture" ? "" : "hidden"
                }`}
                data-category="culture"
              >
                <img src={drama} alt="Annual Drama Production" />
                <h3>Annual Drama Production</h3>
                <p>Showcase your acting and stage management talents.</p>
              </div>

              <div
                className={`campus-card reveal-on-scroll ${
                  filter === "all" || filter === "academic" ? "" : "hidden"
                }`}
                data-category="academic"
              >
                <img src={scRobo} alt="Science & Robotics" />
                <h3>Science & Robotics</h3>
                <p>
                  Explore STEM fields with hands-on projects and competitions.
                </p>
              </div>

              <div
                className={`campus-card reveal-on-scroll ${
                  filter === "all" || filter === "culture" ? "" : "hidden"
                }`}
                data-category="culture"
              >
                <img src={music} alt="Music Ensemble" />
                <h3>Music Ensemble</h3>
                <p>
                  Harmonize with fellow musicians and perform at school events.
                </p>
              </div>

              <div
                className={`campus-card reveal-on-scroll ${
                  filter === "all" || filter === "academic" ? "" : "hidden"
                }`}
                data-category="academic"
              >
                <img src={debate} alt="Debate Club" />
                <h3>Debate Club</h3>
                <p>
                  Sharpen your public speaking and critical thinking skills.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3rd box: VIDEO CARDS */}
        <section id="act-section3" className="reveal-on-scroll">
          <h1 className="act-h1">Recent Highlights</h1>
          <div className="cards-container">
            {videoData.map((card) => (
              <VideoCard key={card.id} data={card} />
            ))}
          </div>
        </section>

        {/* 4th box */}
        <section id="act-section4" className="reveal-on-scroll">
          <h1 className="act-h1">Ready to join the Fun?</h1>
          <p className="act-description">{textapply}</p>
          <button type="button" className="act-btn">
            Apply For Admission
          </button>
        </section>
      </div>
    </>
  );
}

export default Activities;
