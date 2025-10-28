import React, { useEffect, useRef, useState } from 'react';
import './Projects.css';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState('all');
  const sectionRef = useRef(null);

  const projectsData = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React frontend and Express backend, featuring user authentication, product management, and payment integration.',
      technologies: ['React', 'Express', 'MongoDB'],
      category: 'web',
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: '🛒'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application built with Vue.js and Firebase, allowing teams to organize and track their work efficiently.',
      technologies: ['Vue', 'Firebase', 'Vuex'],
      category: 'web',
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: '✅'
    },
    {
      id: 3,
      title: 'Weather Forecast App',
      description: 'A beautiful mobile weather application built with Flutter, providing real-time weather data and forecasts with an intuitive UI.',
      technologies: ['Flutter', 'Dart', 'API'],
      category: 'mobile',
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: '🌤️'
    },
    {
      id: 4,
      title: 'Portfolio Generator',
      description: 'An automated portfolio website generator using Python, allowing developers to create beautiful portfolios from JSON configuration.',
      technologies: ['Python', 'Flask', 'Jinja2'],
      category: 'web',
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: '🎨'
    },
    {
      id: 5,
      title: 'Fitness Tracker',
      description: 'A cross-platform fitness tracking app built with Flutter, featuring workout logging, progress tracking, and health statistics.',
      technologies: ['Flutter', 'Dart', 'SQLite'],
      category: 'mobile',
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: '💪'
    },
    {
      id: 6,
      title: '2D Platformer Game',
      description: 'An engaging 2D platformer game developed with Godot Engine and GDScript, featuring custom physics and level design.',
      technologies: ['Godot', 'GDScript'],
      category: 'game',
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: '🎮'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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

  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === filter);

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="container">
        <h2 className={`section-title ${isVisible ? 'slide-up' : ''}`}>
          My Projects
        </h2>

        <div className={`filter-buttons ${isVisible ? 'visible' : ''}`}>
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Projects
          </button>
          <button 
            className={`filter-btn ${filter === 'web' ? 'active' : ''}`}
            onClick={() => setFilter('web')}
          >
            Web
          </button>
          <button 
            className={`filter-btn ${filter === 'mobile' ? 'active' : ''}`}
            onClick={() => setFilter('mobile')}
          >
            Mobile
          </button>
          <button 
            className={`filter-btn ${filter === 'game' ? 'active' : ''}`}
            onClick={() => setFilter('game')}
          >
            Games
          </button>
        </div>

        <div className={`projects-grid ${isVisible ? 'visible' : ''}`}>
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className="project-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="project-image">
                <div className="project-emoji">{project.image}</div>
                <div className="project-overlay">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    GitHub
                  </a>
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
