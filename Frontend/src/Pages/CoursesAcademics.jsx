import React, { useState, useEffect } from "react";
import "../Styles/CoursesAcademics.css";

/* --------------  COURSE DATA -------------- */
const coursesData = [
  {
    id: 1,
    title: "Mathematics – Grade 6",
    description:
      "Fundamentals of numbers, fractions, decimals, geometry, and simple equations for Grade 6 learners.",
    duration: "1 Academic Year",
    faculty: "Mrs. Anjali Sharma",
    level: "Beginner",
    subject: "Mathematics",
    gradeLevel: "Middle School (6-8)",
    programType: "Standard Curriculum",
    image:
      "https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=1200&q=60",
    tags: ["Math", "Grade 6"],
  },
  {
    id: 2,
    title: "General Science – Grade 7",
    description:
      "Covers basic Physics, Chemistry, and Biology concepts with real-life examples and activities.",
    duration: "1 Academic Year",
    faculty: "Mr. Rohan Mehta",
    level: "Beginner",
    subject: "Science",
    gradeLevel: "Middle School (6-8)",
    programType: "Standard Curriculum",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=60",
    tags: ["Science", "Experiments"],
  },
  {
    id: 3,
    title: "English Grammar & Reading – Grade 8",
    description:
      "Improve writing, grammar, comprehension, and vocabulary through interactive reading sessions.",
    duration: "1 Academic Year",
    faculty: "Ms. Priya Kapoor",
    level: "Intermediate",
    subject: "Language Arts",
    gradeLevel: "Middle School (6-8)",
    programType: "Standard Curriculum",
    image:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=60",
    tags: ["English", "Grammar"],
  },
  {
    id: 4,
    title: "Social Studies – Grade 9",
    description:
      "Learn about Indian history, civics, geography, economics and global awareness topics.",
    duration: "1 Academic Year",
    faculty: "Mr. Akash Verma",
    level: "Intermediate",
    subject: "Social Studies",
    gradeLevel: "High School (9-12)",
    programType: "Standard Curriculum",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=60",
    tags: ["Social Studies"],
  },
  {
    id: 5,
    title: "Computer Basics & Coding – Grade 10",
    description:
      "Introduction to computers, typing skills, MS Office, and basic programming in HTML & Python.",
    duration: "1 Academic Year",
    faculty: "Ms. Neha Bhatia",
    level: "Beginner",
    subject: "Computer Science",
    gradeLevel: "High School (9-12)",
    programType: "Standard Curriculum",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=60",
    tags: ["Coding", "Basic Computers"],
  },
  {
    id: 6,
    title: "Physics – Class 11 (NCERT)",
    description:
      "Mechanics, laws of motion, waves, and thermodynamics taught using models & experiments.",
    duration: "1 Academic Year",
    faculty: "Dr. Sameer Rao",
    level: "Advanced",
    subject: "Science",
    gradeLevel: "High School (9-12)",
    programType: "Standard Curriculum",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=60",
    tags: ["Physics", "Class 11"],
  },
  {
    id: 7,
    title: "Chemistry – Class 12 (NCERT)",
    description:
      "Physical, Organic, and Inorganic Chemistry concepts with lab-based learning.",
    duration: "1 Academic Year",
    faculty: "Mrs. Shweta Kulkarni",
    level: "Advanced",
    subject: "Science",
    gradeLevel: "High School (9-12)",
    programType: "Standard Curriculum",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=60",
    tags: ["Chemistry", "Class 12"],
  },
  {
    id: 8,
    title: "Fine Arts & Drawing – School Program",
    description:
      "Creative drawing, painting, coloring, and craft activities for school students.",
    duration: "12 Weeks",
    faculty: "Ms. Alisha D’Souza",
    level: "Beginner",
    subject: "Arts & Music",
    gradeLevel: "Elementary (K-5)",
    programType: "Enrichment Program",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=60",
    tags: ["Arts", "Drawing"],
  },
];

/* --------------  FILTER OPTIONS -------------- */
const gradeLevels = [
  "Elementary (K-5)",
  "Middle School (6-8)",
  "High School (9-12)",
];
const subjects = [
  "Mathematics",
  "Science",
  "Language Arts",
  "Social Studies",
  "Computer Science",
  "Arts & Music",
];
const programTypes = [
  "Standard Curriculum",
  "Honors Program",
  "Enrichment Program",
  "Specialized Workshop",
];
const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

/* ==========================================================
   RE-USABLE MODAL COMPONENT
   ========================================================== */
function CourseModal({ course, onClose }) {
  // Lock body scroll and handle Escape key
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!course) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-panel"
        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
        role="dialog"
        aria-modal="true"
      >
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>

        <div className="modal-hero-image">
          <img src={course.image} alt={course.title} />
        </div>

        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-tags-list">
              {course.tags.map((tag, idx) => (
                <span key={idx} className="course-tag">
                  {tag}
                </span>
              ))}
            </div>
            <h2>{course.title}</h2>
          </div>

          <div className="modal-grid">
            <div className="modal-main-info">
              <h3>About this Course</h3>
              <p>{course.description}</p>
            </div>

            <div className="modal-sidebar-info">
              <div className="info-item">
                <span className="label">Grade Level</span>
                <span className="value">{course.gradeLevel}</span>
              </div>
              <div className="info-item">
                <span className="label">Subject</span>
                <span className="value">{course.subject}</span>
              </div>
              <div className="info-item">
                <span className="label">Program Type</span>
                <span className="value">{course.programType}</span>
              </div>
              <div className="info-item">
                <span className="label">Difficulty</span>
                <span className="value">{course.level}</span>
              </div>
              <div className="info-item">
                <span className="label">Duration</span>
                <span className="value">{course.duration}</span>
              </div>
              <div className="info-item">
                <span className="label">Faculty</span>
                <span className="value">{course.faculty}</span>
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button className="btn-enrol">
              <a href="/admission">Enrol Now</a>
            </button>
            <button className="btn-cancel" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================
   MAIN PAGE
   ========================================================== */
export default function CoursesAcademics() {
  /* --------------  FILTER STATE -------------- */
  const [filters, setFilters] = useState({
    gradeLevels: [],
    subjects: [],
    programTypes: [],
    difficultyLevels: [],
  });
  const [expandedSections, setExpandedSections] = useState({
    gradeLevel: true,
    subject: true,
    programType: true,
    difficultyLevel: true,
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  /* --------------  MODAL STATE -------------- */
  const [selectedCourse, setSelectedCourse] = useState(null);

  /* --------------  FILTER LOGIC -------------- */
  const toggleSection = (s) =>
    setExpandedSections((p) => ({ ...p, [s]: !p[s] }));
  const handleFilterChange = (cat, val) => {
    setFilters((p) => {
      const arr = p[cat];
      return {
        ...p,
        [cat]: arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val],
      };
    });
  };
  const clearAllFilters = () =>
    setFilters({
      gradeLevels: [],
      subjects: [],
      programTypes: [],
      difficultyLevels: [],
    });

  const activeFilterCount = Object.values(filters).reduce(
    (a, b) => a + b.length,
    0
  );

  const filteredCourses = coursesData.filter(
    (c) =>
      (filters.gradeLevels.length
        ? filters.gradeLevels.includes(c.gradeLevel)
        : true) &&
      (filters.subjects.length ? filters.subjects.includes(c.subject) : true) &&
      (filters.programTypes.length
        ? filters.programTypes.includes(c.programType)
        : true) &&
      (filters.difficultyLevels.length
        ? filters.difficultyLevels.includes(c.level)
        : true)
  );

  /* --------------  RENDER -------------- */
  return (
    <div className="courses-academics-page">
      {/* Hero */}
      <section className="courses-hero">
        <h1>Our Academic Programs</h1>
        <p>
          Discover engaging school-level courses designed for growing minds from
          Grades K–12.
        </p>
      </section>

      <div className="courses-content">
        {/* Mobile filter toggle */}
        <button
          className="mobile-filter-toggle"
          onClick={() => setIsFilterOpen((p) => !p)}
        >
          <span>⚙️ Filters</span>
          {activeFilterCount > 0 && (
            <span className="filter-badge">{activeFilterCount}</span>
          )}
        </button>

        {/* Filter Sidebar */}
        <aside className={`filter-sidebar ${isFilterOpen ? "open" : ""}`}>
          <h3 className="filter-title">Filter Courses</h3>
          {activeFilterCount > 0 && (
            <button className="clear-filters-btn" onClick={clearAllFilters}>
              Clear All ({activeFilterCount})
            </button>
          )}

          {/* Grade */}
          <div className="filter-section">
            <button
              className="filter-section-header"
              onClick={() => toggleSection("gradeLevel")}
            >
              Grade Level
            </button>
            {expandedSections.gradeLevel && (
              <div className="filter-options">
                {gradeLevels.map((l) => (
                  <label key={l} className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filters.gradeLevels.includes(l)}
                      onChange={() => handleFilterChange("gradeLevels", l)}
                    />
                    <span className="filter-label">{l}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Subject */}
          <div className="filter-section">
            <button
              className="filter-section-header"
              onClick={() => toggleSection("subject")}
            >
              Subject
            </button>
            {expandedSections.subject && (
              <div className="filter-options">
                {subjects.map((s) => (
                  <label key={s} className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filters.subjects.includes(s)}
                      onChange={() => handleFilterChange("subjects", s)}
                    />
                    <span className="filter-label">{s}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Program Type */}
          <div className="filter-section">
            <button
              className="filter-section-header"
              onClick={() => toggleSection("programType")}
            >
              Program Type
            </button>
            {expandedSections.programType && (
              <div className="filter-options">
                {programTypes.map((t) => (
                  <label key={t} className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filters.programTypes.includes(t)}
                      onChange={() => handleFilterChange("programTypes", t)}
                    />
                    <span className="filter-label">{t}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Difficulty */}
          <div className="filter-section">
            <button
              className="filter-section-header"
              onClick={() => toggleSection("difficultyLevel")}
            >
              Difficulty Level
            </button>
            {expandedSections.difficultyLevel && (
              <div className="filter-options">
                {difficultyLevels.map((l) => (
                  <label key={l} className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filters.difficultyLevels.includes(l)}
                      onChange={() => handleFilterChange("difficultyLevels", l)}
                    />
                    <span className="filter-label">{l}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Course Grid */}
        <main className="courses-grid-container">
          <div className="courses-grid">
            {filteredCourses.map((c) => (
              <div key={c.id} className="course-card">
                <div className="course-image">
                  <img src={c.image} alt={c.title} />
                </div>
                <div className="course-content">
                  <div className="course-tags">
                    {c.tags.map((t, i) => (
                      <span key={i} className="course-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="course-title">{c.title}</h3>
                  <p className="course-description">{c.description}</p>
                  <div className="course-meta">
                    <p>
                      <strong>Duration:</strong> {c.duration}
                    </p>
                    <p>
                      <strong>Faculty:</strong> {c.faculty}
                    </p>
                    <p>
                      <strong>Level:</strong> {c.level}
                    </p>
                  </div>
                  {/* Updated Button to Open Modal */}
                  <button
                    className="view-details-btn"
                    onClick={() => setSelectedCourse(c)}
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
            {filteredCourses.length === 0 && (
              <div className="no-results">
                <p>No courses found. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* RENDER MODAL CONDITIONALLY */}
      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
}
