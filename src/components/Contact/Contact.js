import React, { useEffect, useRef, useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission (no backend)
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(''), 3000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: '💻',
      url: 'https://github.com/aldoganza',
      color: '#333'
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      url: 'https://www.linkedin.com/in/ganza-ngirowonsanga-aldo-511630356/',
      color: '#0077b5'
    },
    {
      name: 'Twitter',
      icon: '🐦',
      url: 'https://x.com/ganza_aldo',
      color: '#1da1f2'
    },
    {
      name: 'Email',
      icon: '📧',
      url: 'mailto:aldongiruwonsanga@gmail.com',
      color: '#ea4335'
    }
  ];

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="container">
        <h2 className={`section-title ${isVisible ? 'slide-up' : ''}`}>
          Get In Touch
        </h2>

        <div className={`contact-content ${isVisible ? 'visible' : ''}`}>
          <div className="contact-info">
            <div className="info-header">
              <h3>Let's Work Together</h3>
              <p>
                I'm always open to discussing new projects, creative ideas, or 
                opportunities to be part of your vision. Feel free to reach out!
              </p>
            </div>

            <div className="contact-details">
              <div className="detail-item">
                <span className="detail-icon">📧</span>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:aldongiruwonsanga@gmail.com">aldongiruwonsanga@gmail.com</a>
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-icon">📍</span>
                <div>
                  <h4>Location</h4>
                  <p>Available for remote work worldwide</p>
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-icon">💬</span>
                <div>
                  <h4>Response Time</h4>
                  <p>Usually within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="social-links">
              <h4>Connect With Me</h4>
              <div className="social-grid">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="social-icon">{social.icon}</span>
                    <span className="social-name">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary submit-btn"
                disabled={formStatus === 'sending'}
              >
                {formStatus === 'sending' ? 'Sending...' : 
                 formStatus === 'success' ? '✓ Message Sent!' : 
                 'Send Message'}
              </button>

              {formStatus === 'success' && (
                <p className="success-message">
                  Thank you for your message! I'll get back to you soon.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Aldo Ganza. All rights reserved.</p>
          <p>Built with React & ❤️</p>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
