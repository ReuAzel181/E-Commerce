import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "remixicon/fonts/remixicon.css";
import "./index.scss";
import Footer from "home/Footer";
import Header from "home/Header";
import CartContent from "./CartContent";

const App = () => (

    <div className="container-main">
      <Header />
      <div className="my-10">
          <CartContent />
      </div>
      <Footer />
    </div>
);

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);