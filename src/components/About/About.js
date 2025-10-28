import React, { useEffect, useRef, useState } from 'react';
import './About.css';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const technologies = [
    { name: 'React', icon: '⚛️' },
    { name: 'Python', icon: '🐍' },
    { name: 'Express', icon: '🚀' },
    { name: 'Dart', icon: '🎯' },
    { name: 'Flutter', icon: '📱' },
    { name: 'Vue', icon: '💚' },
    { name: 'Godot', icon: '🎮' },
    { name: 'GDScript', icon: '📜' }
  ];

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="container">
        <h2 className={`section-title ${isVisible ? 'slide-up' : ''}`}>
          About Me
        </h2>

        <div className={`about-content ${isVisible ? 'visible' : ''}`}>
          <div className="about-text">
            <div className="about-intro">
              <h3>Hello! I'm Aldo Ganza</h3>
              <p>
                A passionate <span className="highlight">Full Stack Developer</span> with 
                a love for creating elegant solutions to complex problems. I thrive on 
                turning ideas into reality through clean, efficient code.
              </p>
            </div>

            <div className="about-description">
              <p>
                My journey in software development has equipped me with a diverse skill set 
                across multiple technologies and frameworks. I'm constantly learning and 
                adapting to new technologies to stay at the forefront of web and mobile development.
              </p>
              <p>
                Whether it's building responsive web applications with <strong>React</strong> and 
                <strong> Vue</strong>, developing robust backends with <strong>Python</strong> and 
                <strong> Express</strong>, creating beautiful mobile apps with <strong>Flutter</strong>, 
                or even crafting games with <strong>Godot</strong> and <strong>GDScript</strong>, 
                I bring dedication and creativity to every project.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to 
                open-source projects, or sharing my knowledge through blog posts and tutorials.
              </p>
            </div>
          </div>

          <div className="about-technologies">
            <h3>Technologies I Work With</h3>
            <div className="tech-grid">
              {technologies.map((tech, index) => (
                <div 
                  key={tech.name} 
                  className="tech-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="tech-icon">{tech.icon}</span>
                  <span className="tech-name">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
