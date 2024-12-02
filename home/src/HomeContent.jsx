import React, { useEffect, useState } from "react";

import { getProducts } from "./products";

import { currency } from "./products";


//Home Content Component
export default function HomeContent() {
      const [products, setProducts] = useState([]);

      useEffect(() => {
            getProducts().then(setProducts);

      }, []); // dependency array is empty to run only once 

      return <div className="grid grid-cols-3 gap-10">
            {products.map((product) => (
                  <div key={product.id}>
                        <img src={product.image} alt={product.name} />
                        <div className="flex flex-col">
                              <div className="flex">
                              <div className="inline-block font-bold whitespace-nowrap">
                                    <a>{product.name}</a>
                              </div>
                              <div className="inline-block ml-5 font-bold">
                              {currency.format(product.price)}
                              </div>
                              </div>
                              <div className="text-sm mt-5">
                                    {product.description}
                              </div>
                        </div>
                  </div>
            ))}
      </div>
};



