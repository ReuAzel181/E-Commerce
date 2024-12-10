import React, { useEffect, useState } from "react";

import { getProducts } from "./products";
import { addToCart, useLoggedIn } from "cart/cart";
import { currency } from "./products";

// Home Content Component
export default function HomeContent() {
  const [products, setProducts] = useState([]);
  const loggedIn = useLoggedIn(); // Use the hook to check if the user is logged in

  useEffect(() => {
    getProducts().then(setProducts);
  }, []); // Dependency array is empty to run only once

  return (
    <div className="grid grid-cols-4 gap-5">
      {products.map((product) => (
        <div key={product.id}>
          <img src={product.image} alt={product.name} />
          <div className="flex flex-col">
            <div className="flex justify-between items-center font-bold">
              <a>{product.name}</a>
              <div>{currency.format(product.price)}</div>
            </div>
            <div className="text-sm mt-2">{product.description}</div>
            {loggedIn && (
              <div className="text-right mt-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                  onClick={() => addToCart(product.id)}
                  id={`addtocart_${product.id}`}
                >
                  Add to Cart
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
