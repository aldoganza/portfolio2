import React, { useEffect, useRef, useState } from 'react';
import './Blog.css';

const Blog = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0]
  });
  const sectionRef = useRef(null);

  useEffect(() => {
    // Load posts from local storage
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Initialize with sample posts
      const samplePosts = [
        {
          id: 1,
          title: 'Getting Started with React Hooks',
          content: 'React Hooks have revolutionized the way we write React components. In this post, I explore the most commonly used hooks like useState, useEffect, and custom hooks. Hooks allow us to use state and other React features without writing a class component, making our code more readable and maintainable.',
          date: '2024-10-15',
          readTime: '5 min read'
        },
        {
          id: 2,
          title: 'Building Responsive UIs with CSS Grid',
          content: 'CSS Grid is a powerful layout system that makes creating responsive designs easier than ever. This post covers the fundamentals of Grid, including grid-template-columns, grid-gap, and responsive techniques. Learn how to create complex layouts with minimal code and maximum flexibility.',
          date: '2024-10-10',
          readTime: '7 min read'
        },
        {
          id: 3,
          title: 'Flutter: Cross-Platform Development Made Easy',
          content: 'Flutter has emerged as a leading framework for cross-platform mobile development. With a single codebase, you can build beautiful native apps for iOS and Android. This post discusses Flutter\'s widget-based architecture, hot reload feature, and why it\'s becoming the go-to choice for mobile developers.',
          date: '2024-10-05',
          readTime: '6 min read'
        }
      ];
      setPosts(samplePosts);
      localStorage.setItem('blogPosts', JSON.stringify(samplePosts));
    }

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

  const savePosts = (newPosts) => {
    localStorage.setItem('blogPosts', JSON.stringify(newPosts));
    setPosts(newPosts);
  };

  const handleCreatePost = () => {
    if (formData.title && formData.content) {
      const newPost = {
        id: Date.now(),
        title: formData.title,
        content: formData.content,
        date: formData.date,
        readTime: `${Math.ceil(formData.content.split(' ').length / 200)} min read`
      };
      const updatedPosts = [newPost, ...posts];
      savePosts(updatedPosts);
      setFormData({ title: '', content: '', date: new Date().toISOString().split('T')[0] });
      setIsCreating(false);
    }
  };

  const handleDeletePost = (id) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    savePosts(updatedPosts);
    setShowModal(false);
    setSelectedPost(null);
  };

  const openPost = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  return (
    <section id="blog" className="blog-section" ref={sectionRef}>
      <div className="container">
        <h2 className={`section-title ${isVisible ? 'slide-up' : ''}`}>
          Blog & Articles
        </h2>

        <div className={`blog-header ${isVisible ? 'visible' : ''}`}>
          <p className="blog-subtitle">
            Sharing my thoughts, experiences, and learnings in software development
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => setIsCreating(!isCreating)}
          >
            {isCreating ? 'Cancel' : '+ New Post'}
          </button>
        </div>

        {isCreating && (
          <div className="create-post-form">
            <input
              type="text"
              placeholder="Post Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="form-input"
            />
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="form-input"
            />
            <textarea
              placeholder="Write your post content here..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="form-textarea"
              rows="6"
            />
            <button className="btn btn-primary" onClick={handleCreatePost}>
              Publish Post
            </button>
          </div>
        )}

        <div className={`blog-grid ${isVisible ? 'visible' : ''}`}>
          {posts.map((post, index) => (
            <article 
              key={post.id} 
              className="blog-card"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openPost(post)}
            >
              <div className="blog-date">
                <span className="date-icon">📅</span>
                {new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <h3 className="blog-title">{post.title}</h3>
              <p className="blog-excerpt">
                {post.content.substring(0, 150)}...
              </p>
              <div className="blog-footer">
                <span className="read-time">⏱️ {post.readTime}</span>
                <span className="read-more">Read More →</span>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="no-posts">
            <p>No blog posts yet. Create your first post!</p>
          </div>
        )}
      </div>

      {/* Blog Post Modal */}
      {showModal && selectedPost && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              ✕
            </button>
            <div className="modal-header">
              <h2>{selectedPost.title}</h2>
              <div className="modal-meta">
                <span>📅 {new Date(selectedPost.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
                <span>⏱️ {selectedPost.readTime}</span>
              </div>
            </div>
            <div className="modal-body">
              <p>{selectedPost.content}</p>
            </div>
            <div className="modal-actions">
              <button 
                className="btn btn-outline"
                onClick={() => handleDeletePost(selectedPost.id)}
              >
                Delete Post
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blog;
