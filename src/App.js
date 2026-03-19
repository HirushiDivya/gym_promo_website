import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./logoo.png";
import imgA from "./a.jpg";
import imgB from "./b.webp";
import imgC from "./c.webp";
import imgD from "./d.avif";
import imgE from "./about.webp";
import map from "./map.png";
import packages from "./packages.jpg";
import { Sun, Moon, Search } from "lucide-react";
import { Dumbbell, User, Users, ClipboardList } from "lucide-react";
import { Phone, Mail, MapPin } from "lucide-react";
import Swal from "sweetalert2";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  //contct
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendToWhatsApp = () => {
    let newErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation Logic
    if (!formData.name || !formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name = "Letters only, please";
    }

    if (!formData.email || !formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.message || !formData.message.trim()) {
      newErrors.message = "Message cannot be empty";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const phoneNumber = "94761758959";
      const messageText = `*Inquiry from Website*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Message:* ${formData.message}`;
      Swal.fire({
        title: "Success!",
        text: "Your inquiry is ready to be sent.",
        icon: "success",
        confirmButtonColor: "#f1b900",
        background: "#333",
        color: "#fff",
        timer: 2000,
        timerProgressBar: true,
        willClose: () => {
          window.open(
            `https://wa.me/${phoneNumber}?text=${messageText}`,
            "_blank",
          );
          setFormData({ name: "", email: "", message: "" });
        },
      });
    }
  };

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

      {/* --- secctions --- */}
      {/* --- Home Section --- */}
      <section id="home" className="hero-section">
        {/* Search Bar */}
        <div className="search-container">
          <span className="search-icon">
            <Search
              size={20}
              color={isDarkMode ? "#f1b900" : "#ffffff"} 
            />
          </span>
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
      <section id="about" className="content-section about-section">
        <div className="about-container">
          {/* Left Side */}
          <div
            className="about-image-card"
            style={{ backgroundImage: `url(${imgE})` }}
          >
            <div className="about-image-overlay">
              <h2>OUR MISSION</h2>
            </div>
          </div>

          {/* Right Side Text+Stats */}
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

      {/*--package section--*/}
      <section
        id="plan"
        className="pricing-section"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${packages})`,
        }}
      >
        <div className="pricing-header">
          <h2>Monthly Deals</h2>
          <p>Choose Your Package</p>
        </div>

        <div className="pricing-grid">
          {/* Basic  */}
          <div className="price-card">
            <h3>Starter Membership</h3>
            <ul>
              <li>✔ Fully equipment gym</li>
              <li>✔ Shower & Changing room facilities</li>
              <li>✔ Locker room facility</li>
              <li>✔ Shower facility</li>
              <li>✔ General gym floor access</li>
              <li>✔ Free Initial fitness assessment</li>
            </ul>
            <div className="price-tag">Rs. 4500</div>
          </div>

          {/* Pro  */}
          <div className="price-card highlighted">
            <h3>Active Pro Membership</h3>
            <ul>
              <li>✔ Everything in Basic</li>
              <li>✔ Group Fitness Classes (Yoga, Zumba, HIIT)</li>
              <li>✔ Personalized Workout Plan</li>
              <li>✔ Steam & Sauna Access</li>
              <li>✔ Free guest pass (monthly 1)</li>
            </ul>
            <div className="price-tag">Rs. 6000</div>
          </div>

          {/* Ultimate  */}
          <div className="price-card">
            <h3>Ultimate Membership</h3>
            <ul>
              <li>✔ Everything in Pro</li>
              <li>✔ Personal Trainer sessions (4 sessions per month)</li>
              <li>✔ Customized Nutrition & Diet Plan</li>
              <li>✔ Priority access to new equipment</li>
              <li>✔ Complimentary gym t-shirt/supplements discount</li>
            </ul>
            <div className="price-tag">Rs. 8000</div>
          </div>
        </div>

        <div className="pricing-dots">
          <span></span>
          <span className="active-dot"></span>
          <span></span>
        </div>
      </section>

      {/* --- Contact Section --- */}
      <section id="contact" className="contact-section">
        <h2 className="contact-title">Ready To Start Your Journey?</h2>

        <div className="contact-container">
          {/* Left Side Form */}
          <div className="contact-form">
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>

            <div className="input-group">
              <label>Message</label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              {errors.message && (
                <span className="error-text">{errors.message}</span>
              )}
            </div>
          </div>

          {/* Right Side Map, Info */}
          <div className="contact-info">
            <div className="map-placeholder">
              <img src={map} alt="Location Map" />
            </div>

            <div className="info-details">
              <div className="info-item">
                <Phone size={24} color="#000000" />
                <span>+94 345 9878</span>
              </div>
              <div className="info-item">
                <Mail size={24} color="#000000" />
                <span>Fitness@gmail.com</span>
              </div>
              <div className="info-item">
                <MapPin size={24} color="#000000" />
                <span>183 Gall Road, Kollupitiya</span>
              </div>
            </div>
          </div>
        </div>

        <button className="submit-btn" onClick={sendToWhatsApp}>
          Chat on WhatsApp
        </button>
      </section>
    </div>
  );
}

export default App;
