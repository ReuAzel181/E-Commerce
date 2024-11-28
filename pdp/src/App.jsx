import React from "react";
import ReactDOM from "react-dom/client";

import "./index.scss";

import Footer from "home/Footer";
import Header from "home/Header";

const App = () => (
  <div className="text-3xl mx-auto max-w-6xl">
    <Header />
      <div className="my-10">
        PDP Page Content
      </div>
    <Footer />
  </div>
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)