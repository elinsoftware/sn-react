import React from "react";
import { hot } from "react-hot-loader/root";
import './App.css'
import logo from './assets/logo.svg'
import img1 from './assets/img1.png'
import img2 from './assets/img2.png'
import img3 from './assets/img3.png'

function App() {

  return (
    <>
    <div className="app-container">
      <div className="heading">
        <div className="logo-container">
          <img src={logo} className="app-logo" alt="logo" />
        </div>
        <div className="heading-title">
          React boilerplate for ServiceNow applications
        </div>
      </div>
      <div className="text-block">
        <p>The boilerplate designed to build React applications specifically for ServiceNow deployment.</p>
        <p>Check <code>README.md</code> for detailed overview and step-by-step instructions.</p>
      </div>
    </div>
      <div className="footer">
        <div>built with love for ServiceNow community</div>
        <div><img src={img1} alt="image1"/></div>
        <div><img src={img2} alt="image2"/></div>
        <div><img src={img3} alt="image3"/></div>
      </div>
  </>
  );
}

export default hot(App);
