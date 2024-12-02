import React, { useEffect, useState } from "react";

import { getProducts } from "./products";

import { currency } from "./products";


//Home Content Component
export default function HomeContent() {
      const [products, setProducts] = useState([]);

      useEffect(() => {
            getProducts().then(setProducts);

      }, []); // dependency array is empty to run only once 

      return <div className="grid grid-cols-4 gap-5">
            {products.map((product) => (
                  <div key={product.id}>
                        <img src={product.image} alt={product.name} />
                        <div className="flex">
                              <div className="flex-grow font-bold">
                                    <a>{product.name}</a>
                              </div>
                              <div className="flex-end">
                              {currency.format(product.price)}
                              </div>
                              <div className="text-sm mt-5">
                                    {product.description}
                              </div>
                        </div>
                  </div>
            ))}
      </div>
};



