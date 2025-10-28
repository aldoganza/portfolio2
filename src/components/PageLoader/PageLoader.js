import React from 'react';
import './PageLoader.css';

const PageLoader = () => {
  return (
    <div className="page-loader">
      <div className="loader-content">
        <div className="loader-spinner"></div>
        <h2 className="loader-text">Aldo Ganza</h2>
        <p className="loader-subtext">Loading Portfolio...</p>
      </div>
    </div>
  );
};

export default PageLoader;
