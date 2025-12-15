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
    title: "Farewell 2025",
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1661780479839-1261d89e3159?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        <section id="act-section2" className="">
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

              <div
                className={`campus-card reveal-on-scroll ${
                  filter === "all" || filter === "sports" ? "" : "hide"
                }`}
                data-category="sports"
              >
                <img src="https://images.unsplash.com/photo-1685541000562-a00dcf472343?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="cricket Club" />
                <h3>Cricket club</h3>
                <p>Develop teamwork and athletic skill on the field.</p>
              </div>
              <div
                className={`campus-card reveal-on-scroll ${
                  filter === "all" || filter === "culture" ? "" : "hidden"
                }`}
                data-category="culture"
              >
                <img src="https://plus.unsplash.com/premium_photo-1705844346816-fd486fe16153?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Visual Arts" />
                <h3>Visual Arts</h3>
                <p>
                  Explore creativity through colors, shapes, and imagination.
                </p>
              </div>
                <div
                className={`campus-card reveal-on-scroll ${
                  filter === "all" || filter === "academic" ? "" : "hidden"
                }`}
                data-category="academic"
              >
                <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D  " alt="Mathematics Club" />
                <h3>Mathematics Club</h3>
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
            <a href="/admission">Apply For Admission</a>
          </button>
        </section>
      </div>
    </>
  );
}

export default Activities;