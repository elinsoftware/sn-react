import React from "react";
import { hot } from "react-hot-loader/root";
import { Header } from "./components/Header";
import "./App.css";

function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <h3>hi</h3>
      </div>
    </>
  );
}

export default hot(App);
