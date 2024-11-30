import React, { useState } from "react";
import HomeContent from "home/HomeContent"; 
import { currency } from "home/products"; 

export default function PDPContent() {
  const [selectedProduct, setSelectedProduct] = useState(null); 

  const handleProductClick = (product) => {
    setSelectedProduct(product); 
  };

  const handleBackClick = () => {
    setSelectedProduct(null);
  };

  if (selectedProduct) {
    return (
      <div className="product-details">
        <button onClick={handleBackClick} className="back-button">
          Back
        </button>
        <div className="product-detail-container">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="product-detail-image"
          />
          <h2>{selectedProduct.name}</h2>
          <p>{selectedProduct.description}</p>
          <p>Price: {currency.format(selectedProduct.price)}</p>
        </div>
      </div>
    );
  }

  // Pass handleProductClick to HomeContent
  return <HomeContent onProductClick={handleProductClick} />;
}
