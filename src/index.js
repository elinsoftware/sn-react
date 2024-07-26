import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import App from "./App";
import "@fontsource/roboto";

// define ServiceNow authentication schema for REST calls
// set up axios defaults
if (process.env.NODE_ENV === "development") {
  // use username and password defined in a config file
  // for local development
  const username = process.env.REACT_APP_USER;
  const password = process.env.REACT_APP_PASSWORD;
  axios.defaults.auth = {
    username,
    password,
  };
} else {
  // use a session token for production build
  axios.defaults.headers["X-userToken"] = window.servicenowUserToken;
}
axios.defaults.headers.put["Content-Type"] = "application/json";

// Access the global variable
const myProp = window.myProp;
ReactDOM.render(<App myProp={myProp} />, document.getElementById("root"));
