import React from 'react';
import '../styles.css';

const Banner = ({ appName, token }) => {
  if (token) {
    return null;
  }
  return (
    <div className="banner">
      <div className="container">
        <h1 className="logo-font" className="banner-appname">
          {appName.toLowerCase()}
        </h1>
        <p className="banner-heading">A daily equities and crypto scanner tool for professional traders and investors.</p>
      </div>
    </div>
  );
};

export default Banner;
