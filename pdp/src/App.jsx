import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";

import "remixicon/fonts/remixicon.css";

import "./index.scss";
import SafeComponent from "./SafeComponent";
import PDPContent from "./PDPContent"
import Footer from "home/Footer";
import Header from "home/Header";

const App = () => (
  <Router>
    <div className="container-main">
      <Header />
      <div className="my-10">
        <Routes>
          <Route path="/product/:id" element={<PDPContent />} />
        </Routes>
      </div>
      <Footer />
    </div>
  </Router>
);

const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)