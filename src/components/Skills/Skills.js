import React, { useEffect, useRef, useState } from 'react';
import './Skills.css';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const skillsData = [
    { name: 'React', level: 80, category: 'Frontend' },
    { name: 'Vue.js', level: 65, category: 'Frontend' },
    { name: 'JavaScript/ES6+', level: 75, category: 'Frontend' },
    { name: 'HTML & CSS', level: 90, category: 'Frontend' },
    { name: 'Python', level: 55, category: 'Backend' },
    { name: 'Express.js', level: 80, category: 'Backend' },
    { name: 'Node.js', level: 75, category: 'Backend' },
    { name: 'REST APIs', level: 70, category: 'Backend' },
    { name: 'Flutter', level: 60, category: 'Mobile' },
    { name: 'Dart', level: 60, category: 'Mobile' },
    { name: 'Godot Engine', level: 65, category: 'Game Dev' },
    { name: 'GDScript', level: 55, category: 'Game Dev' }
  ];

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

  const categories = ['Frontend', 'Backend', 'Mobile', 'Game Dev'];

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="container">
        <h2 className={`section-title ${isVisible ? 'slide-up' : ''}`}>
          Skills & Expertise
        </h2>

        <div className={`skills-content ${isVisible ? 'visible' : ''}`}>
          {categories.map((category, catIndex) => (
            <div 
              key={category} 
              className="skills-category"
              style={{ animationDelay: `${catIndex * 0.1}s` }}
            >
              <h3 className="category-title">{category}</h3>
              <div className="skills-list">
                {skillsData
                  .filter(skill => skill.category === category)
                  .map((skill, index) => (
                    <div 
                      key={skill.name} 
                      className="skill-item"
                      style={{ animationDelay: `${(catIndex * 0.1) + (index * 0.05)}s` }}
                    >
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-percentage">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <div 
                          className={`skill-progress ${isVisible ? 'animate' : ''}`}
                          style={{ 
                            '--skill-level': `${skill.level}%`,
                            animationDelay: `${(catIndex * 0.1) + (index * 0.05)}s`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className={`skills-summary ${isVisible ? 'visible' : ''}`}>
          <div className="summary-card">
            <div className="summary-icon">🎯</div>
            <h4>Problem Solver</h4>
            <p>Analytical thinking and creative solutions</p>
          </div>
          <div className="summary-card">
            <div className="summary-icon">🚀</div>
            <h4>Fast Learner</h4>
            <p>Quick to adapt to new technologies</p>
          </div>
          <div className="summary-card">
            <div className="summary-icon">👥</div>
            <h4>Team Player</h4>
            <p>Collaborative and communicative</p>
          </div>
          <div className="summary-card">
            <div className="summary-icon">💡</div>
            <h4>Innovative</h4>
            <p>Always seeking better approaches</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
