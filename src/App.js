import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./logoo.png";
import imgA from "./a.jpg";
import imgB from "./b.webp";
import imgC from "./c.webp";
import imgD from "./d.avif";
import imgE from "./about.webp";
import { Sun, Moon } from "lucide-react";
import { Dumbbell, User, Users, ClipboardList } from "lucide-react";
function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "features", "plan", "contact"];

      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50;

      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`app-container ${isDarkMode ? "dark" : "light"}`}>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <img src={logo} alt="Fitness Logo" />
          </div>

          <ul className="nav-menu">
            <li
              className={`nav-item ${activeSection === "home" ? "active" : ""}`}
              onClick={() => scrollToSection("home")}
            >
              Home
            </li>
            <li
              className={`nav-item ${activeSection === "about" ? "active" : ""}`}
              onClick={() => scrollToSection("about")}
            >
              About
            </li>
            <li
              className={`nav-item ${activeSection === "features" ? "active" : ""}`}
              onClick={() => scrollToSection("features")}
            >
              Features
            </li>
            <li
              className={`nav-item ${activeSection === "plan" ? "active" : ""}`}
              onClick={() => scrollToSection("plan")}
            >
              Plan
            </li>
            <li
              className={`nav-item ${activeSection === "contact" ? "active" : ""}`}
              onClick={() => scrollToSection("contact")}
            >
              Contact
            </li>
          </ul>

          <div className="nav-actions">
            {/* Theme Button */}
            <div className="theme-toggle-simple" onClick={toggleTheme}>
              <div className="icon-wrapper">
                {isDarkMode ? (
                  <Sun size={24} color="#f1b900" fill="#f1b900" />
                ) : (
                  <Moon size={24} color="#f1b900" fill="#f1b900" />
                )}
              </div>
            </div>
            <button className="join-btn">JOIN NOW</button>
          </div>
        </div>
      </nav>

      {/* --- SECTIONS --- */}

      {/* --- Home Section --- */}
      <section id="home" className="hero-section">
        {/* Search Bar */}
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search workout plans, Trainers, Services...."
          />
        </div>
        <div className="hero-logo-container">
          <img src={logo} alt="Fitness Center Logo" />
        </div>

        {/* Text Content */}
        <div className="hero-text-content">
          <h1>
            UNLEASH THE BEAST WITHIN.
            <br />
            PREMIER FITNESS FOR ALL.
          </h1>
          <p>Expert training and premium gear to reach your peak.</p>
        </div>
      </section>

      {/* --- About Section --- */}
      <section id="about" className="content-section about-section grey-bg">
        <div className="about-container">
          {/* Left Side: Image with Overlay Text */}
          <div
            className="about-image-card"
            style={{ backgroundImage: `url(${imgE})` }}
          >
            <div className="about-image-overlay">
              <h2>OUR MISSION</h2>
            </div>
          </div>

          {/* Right Side: Text & Stats */}
          <div className="about-content">
            <p className="mission-description">
              Our mission is to build a high-performance community where elite
              fitness meets expert guidance. We are dedicated to providing a
              world-class environment equipped with state-of-the-art technology
              and professional coaching to empower every individual.
            </p>
            <p className="mission-description">
              Transform your lifestyle, and help you achieve the ultimate
              version of yourself through strength, discipline, and innovation.
            </p>

            {/* Stats Grid */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-border"></div>
                <div className="stat-info">
                  <h3>8 +</h3>
                  <p>Years Excellence</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-border"></div>
                <div className="stat-info">
                  <h3>500 +</h3>
                  <p>Active Members</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-border"></div>
                <div className="stat-info">
                  <h3>10 +</h3>
                  <p>Expert Trainers</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-border"></div>
                <div className="stat-info">
                  <h3>50 +</h3>
                  <p>Modern Machines</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section id="features" className="features-section">
        <h2 className="section-title">PREMIUM FACILITIES</h2>
        <div className="features-grid">
          {/* Feature 1 */}
          <div
            className="feature-card"
            style={{ backgroundImage: `url(${imgA})` }}
          >
            <div className="card-overlay">
              <div className="icon-circle">
                <Dumbbell size={32} color="#f1b900" />
              </div>
              <h3>State-of-the-Art Equipment</h3>
              <p>Train with the latest high-end fitness technology.</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div
            className="feature-card"
            style={{ backgroundImage: `url(${imgB})` }}
          >
            <div className="card-overlay">
              <div className="icon-circle">
                <User size={32} color="#f1b900" />
              </div>
              <h3>Personal Training</h3>
              <p>One-on-one coaching tailored to your body goals.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div
            className="feature-card"
            style={{ backgroundImage: `url(${imgC})` }}
          >
            <div className="card-overlay">
              <div className="icon-circle">
                <Users size={32} color="#f1b900" />
              </div>
              <h3>Group Classes</h3>
              <p>High-energy sessions to stay motivated with the community.</p>
            </div>
          </div>

          {/* Feature 4 */}
          <div
            className="feature-card"
            style={{ backgroundImage: `url(${imgD})` }}
          >
            <div className="card-overlay">
              <div className="icon-circle">
                <ClipboardList size={32} color="#f1b900" />
              </div>
              <h3>Nutrition & Wellness</h3>
              <p>
                Expert dietary plans for a complete lifestyle transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Contact Section --- */}
      <section id="contact" className="content-section grey-bg">
        <h1>Contact Us</h1>
      </section>
    </div>
  );
}

export default App;
