import React from "react";
import { hot } from "react-hot-loader/root";
import { Header } from "./components/Header.js";
import { Cards } from "./components/Cards.js";
import { Footer } from "./components/Footer.js";
import "./App.css";

function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <Cards />
        <Footer />
      </div>
    </>
  );
}

export default hot(App);
