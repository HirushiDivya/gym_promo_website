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
import { Facebook, Twitter, Instagram, Music2 } from "lucide-react";

const servicesData = [
  {
    id: 1,
    title: "State-of-the-Art Equipment",
    desc: "Train with the latest high-end fitness technology.",
    icon: "Dumbbell",
  },
  {
    id: 2,
    title: "Personal Training",
    desc: "One-on-one coaching tailored to your body goals.",
    icon: "User",
  },
  {
    id: 3,
    title: "Group Classes",
    desc: "High-energy sessions to stay motivated.",
    icon: "Users",
  },
  {
    id: 4,
    title: "Nutrition & Wellness",
    desc: "Expert dietary plans for transformation.",
    icon: "ClipboardList",
  },
];

const plansData = [
  {
    id: 1,
    title: "Starter Membership",
    price: "4500",
    features: [
      "Fully equipment gym",
      "Locker room facility",
      "Shower facility",
    ],
  },
  {
    id: 2,
    title: "Active Pro Membership",
    price: "6000",
    features: [
      "Everything in Basic",
      "Group Fitness Classes",
      "Personalized Workout Plan",
    ],
  },
  {
    id: 3,
    title: "Ultimate Membership",
    price: "8000",
    features: [
      "Everything in Pro",
      "Personal Trainer sessions",
      "Customized Nutrition",
    ],
  },
];
function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  //search
  const sortedServices = [...servicesData].sort((a, b) => {
    const aMatch = a.title.toLowerCase().includes(searchTerm.toLowerCase());
    const bMatch = b.title.toLowerCase().includes(searchTerm.toLowerCase());
    return bMatch - aMatch; 
  });

  const sortedPlans = [...plansData].sort((a, b) => {
    const aMatch =
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.price.includes(searchTerm);
    const bMatch =
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.price.includes(searchTerm);
    return bMatch - aMatch;
  });

  // Filter logic
  const filteredServices = servicesData.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.desc.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredPlans = plansData.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.price.includes(searchTerm),
  );

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
            <Search size={20} color={isDarkMode ? "#f1b900" : "#ffffff"} />
          </span>
          <input
            type="text"
            placeholder="Search services or plans (e.g. Pro, Yoga, 4500)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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

      {/* --- Footer --- */}
      <footer
        style={{
          backgroundColor: "#000",
          color: "#fff",
          padding: "40px 20px 20px",
          fontFamily: "sans-serif",
          borderTop: "1px solid #333",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "40px",
          }}
        >
          {/* Quick Links */}
          <div>
            <h3
              style={{
                fontSize: "1.1rem",
                marginBottom: "20px",
                fontWeight: "bold",
              }}
            >
              Quick Links
            </h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                fontSize: "0.9rem",
                color: "#ccc",
                cursor: "pointer",
                lineHeight: "2",
              }}
            >
              <li onClick={() => scrollToSection("home")}>Home</li>
              <li onClick={() => scrollToSection("about")}>About Us</li>
              <li onClick={() => scrollToSection("features")}>
                Programs / Services
              </li>
              <li onClick={() => scrollToSection("plan")}>Pricing Plans</li>
              <li onClick={() => scrollToSection("contact")}>Contact</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3
              style={{
                fontSize: "1.1rem",
                marginBottom: "20px",
                fontWeight: "bold",
              }}
            >
              Support
            </h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                fontSize: "0.9rem",
                color: "#ccc",
                lineHeight: "2",
              }}
            >
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>FAQ</li>
              <li>Careers</li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h3
              style={{
                fontSize: "1.1rem",
                marginBottom: "20px",
                fontWeight: "bold",
              }}
            >
              Get in Touch
            </h3>
            <div
              style={{ fontSize: "0.9rem", color: "#ccc", lineHeight: "1.8" }}
            >
              <p>183 Gall Road, Kollupitiya</p>
              <p>+94 345 9876</p>
              <p>Fitness@gmail.com</p>
              <p>Mon - Fri: 5 AM - 10 PM</p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3
              style={{
                fontSize: "1.1rem",
                marginBottom: "20px",
                fontWeight: "bold",
              }}
            >
              Social Media
            </h3>
            <div style={{ display: "flex", gap: "15px" }}>
              {[
                { Icon: Facebook, fill: true },
                { Icon: Twitter, fill: true },
                { Icon: Instagram, fill: false },
                { Icon: Music2, fill: false },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#f1b900",
                    color: "#000",
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <item.Icon
                    size={18}
                    fill={item.fill ? "currentColor" : "none"}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            maxWidth: "1100px",
            margin: "40px auto 0",
            paddingTop: "20px",
            borderTop: "1px solid #333",
            display: "flex",
            justifyContent: "space-between",
            color: "#777",
            fontSize: "0.85rem",
          }}
        >
          <p>Fitness Support Center</p>
          <p>Copyright © 2026</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
