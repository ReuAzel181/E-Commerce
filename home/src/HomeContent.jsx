import React, { useState, useEffect } from "react";
import { getProducts, currency } from "./products";

// Home Content Component
export default function HomeContent({ onProductClick }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []); // dependency array is empty to run only once

  return (
    <div className="home-content">
      {products.map((product) => (
        <div key={product.id} className="product-container" onClick={() => onProductClick(product)} >
          <div className="flex">
            <img src={product.image} alt={product.name} className="product-image" />
          </div>
            <div className="product-name"><a>{product.name}</a></div>
            <div className="product-price"> {currency.format(product.price)} </div>   
            <div  className="product-description">  {product.description}  </div>
        </div>
      ))}
    </div>
  );
}
