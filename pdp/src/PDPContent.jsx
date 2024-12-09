import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { currency, getProductById } from "home/products";



export default function PDPContent() {
      const {id} = useParams();
      const [product, setProduct] = useState(null);

      useEffect(() => {
            if (id) {
                  getProductById(id).then(setProduct)
            } else{
                  setProduct(null);
            }
      }, [id]);

      if(!product) return null;

      return (
      
            <><div className="grid grid-cols-4 gap-5">
                  <div>
                        <img src={product.image} alt={product.name} />
                  </div>
            </div><div>
                        <div className="flex">
                              <h1 className="font-bold text-3xl flew-grow">{product.name}</h1>
                              <div className ="font-bold text-3xl flex-end ml-10">
                                    {currency.format(product.price)}
                              </div>
                        </div>
                        <div className="mt-10">{product.description}</div>
                        <div className="mt-10">{product.longDescription}</div>

                  </div></>
        
      );
}