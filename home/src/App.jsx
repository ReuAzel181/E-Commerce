import React from "react";
import ReactDOM from "react-dom/client";

import "./index.scss";

import Footer from "./Footer";
import Header from "./Header";
import HomeContent from "./HomeContent";

const App = () => (
  <div className="container-main">
    <Header />
      <div className="my-10">
        <HomeContent />
      </div>
    <Footer />
  </div>
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)