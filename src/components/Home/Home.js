import React, { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="home-section">
      <div className="home-container">
        <div className={`home-content ${isVisible ? 'visible' : ''}`}>
          <div className="home-image-wrapper">
            <div className="image-placeholder">
              <div className="avatar-circle">
                <span className="avatar-text">AG</span>
              </div>
            </div>
            <div className="image-decoration"></div>
          </div>

          <div className="home-text">
            <h1 className="home-greeting">
              Hi, I'm <span className="gradient-text">Aldo Ganza</span>
            </h1>
            <h2 className="home-title">Full Stack Developer</h2>
            <p className="home-description">
              I craft beautiful, functional, and user-friendly digital experiences.
              Passionate about building innovative solutions with modern technologies.
            </p>
            <div className="home-buttons">
              <button className="btn btn-primary" onClick={scrollToProjects}>
                View My Work
              </button>
              <button className="btn btn-outline" onClick={scrollToContact}>
                Get In Touch
              </button>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <p>Scroll Down</p>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
    </section>
  );
};

export default Home;
