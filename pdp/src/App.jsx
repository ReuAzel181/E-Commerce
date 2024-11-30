import React from "react";
import ReactDOM from "react-dom/client";


import "./index.scss";
import SafeComponent from "./SafeComponent";

import Footer from "home/Footer";
import Header from "home/Header";
import HomeContent from "home/HomeContent";


const App = () => (
  <div className="container-main">
    <SafeComponent>
      <Header/>
    </SafeComponent>
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