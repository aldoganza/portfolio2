import React, { useEffect, useRef, useState } from 'react';
import './Projects.css';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const projectsData = [
    {
      id: 1,
      title: 'AMOURA - Romance Stories Platform',
      description: 'A modern web platform for African romance writers and readers. Features bilingual content (English & Kinyarwanda), episode scheduling, writer levels, offline reading, and PWA support. Built with React, Vite, Firebase, and Tailwind CSS.',
      technologies: ['React', 'Vite', 'Firebase', 'Tailwind CSS'],
      category: 'web',
      github: 'https://github.com/aldoganza',
      demo: 'https://lovestories-6914f.web.app',
      image: '💕',
      status: 'live'
    },
    {
      id: 2,
      title: 'Portfolio Generator',
      description: 'An automated portfolio builder that generates beautiful, professional portfolios without writing any code. Simply fill out your information (skills, projects, experience) and the system automatically generates a fully responsive portfolio website ready to deploy.',
      technologies: ['Python', 'React', 'Flask', 'Templates'],
      category: 'web',
      github: 'https://github.com/aldoganza/Portfolio-Generator',
      demo: '#',
      image: '🎨',
      status: 'coming-soon'
    },
    {
      id: 3,
      title: 'ClassSocial',
      description: 'A social media platform designed for students to connect, collaborate, and share educational content. Features include real-time chat, study notes sharing, group creation for class discussions, and Instagram-style posts and stories. Built to enhance student collaboration and academic success.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
      category: 'web',
      github: 'https://github.com/aldoganza/class_social',
      demo: '#',
      image: '📚',
      status: 'coming-soon'
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

  const filteredProjects = projectsData;

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="container">
        <h2 className={`section-title ${isVisible ? 'slide-up' : ''}`}>
          My Projects
        </h2>

        {/* Filter buttons removed - showing single featured project */}

        <div className={`projects-grid ${isVisible ? 'visible' : ''}`}>
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className="project-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="project-image">
                <div className="project-emoji">{project.image}</div>
                {project.status === 'coming-soon' && (
                  <div className="coming-soon-badge">Coming Soon</div>
                )}
                <div className="project-overlay">
                  {project.status === 'live' ? (
                    <>
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
                    </>
                  ) : (
                    <>
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        GitHub
                      </a>
                      <span className="project-link disabled">Coming Soon</span>
                    </>
                  )}
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
