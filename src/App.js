import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./logoo.png";
import { Sun, Moon } from "lucide-react";

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
      <section id="about" className="content-section grey-bg ">
        <h1>About Us</h1>
        <p>aa</p>
      </section>

      {/* --- Features Section --- */}
      <section id="features" className="content-section ">
        <h1>Our Features</h1>
      </section>

      {/* --- Contact Section --- */}
      <section id="contact" className="content-section grey-bg">
        <h1>Contact Us</h1>
      </section>
    </div>
  );
}

export default App;
