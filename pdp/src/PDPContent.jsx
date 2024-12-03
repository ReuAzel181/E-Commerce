import React, { useState, useEffect } from "react";
import HomeContent from "home/HomeContent"; 
import { useParams } from "react-router-dom";
import { getProductById, currency } from "home/products";

export default function PDPContent() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) { 
      getProductById(id).then(setProduct);
    } else {
      setProduct(null);
    }
    
  }, [id]);

  if (!product) { return null;}

  return (

        <div key={product.id} className="pdp-home-content">
          <div className="flex">
            <img src={product.image} alt={product.name} className="pdp-product-image" />
          </div>
            <div className="pdp-product-name"><a>{product.name}</a></div>
            <div className="pdp-price-name"> {currency.format(product.price)} </div>
            <div className="pdp-description-name">  {product.description}  </div>
        </div>
  
  );
}

