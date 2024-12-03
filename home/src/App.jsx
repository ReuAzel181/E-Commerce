import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import "remixicon/fonts/remixicon.css";

import "./index.scss";

import Footer from "./Footer";
import Header from "./Header";
import HomeContent from "./HomeContent";

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="container-main">
      <Header />
      <div className="my-10">
        {/* Pass the handleProductClick function as a prop */}
        <HomeContent onProductClick={handleProductClick} />
      </div>
      <Footer />
    </div>
  );
};

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
