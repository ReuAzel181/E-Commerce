// import React, { useState, useEffect } from "react";
// import { getProducts, currency } from "./products";
// import { addToCart, useLoggedIn} from "cart/cart";

// // Home Content Component
// export default function HomeContent({ onProductClick }) {
//   const loggedIn = useLoggedIn();
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     getProducts().then(setProducts);
//   }, []); // dependency array is empty to run only once

//   return (
//     <div className="home-content">
//       {products.map((product) => (
//         // <div key={product.id} className="product-container" onClick={() => onProductClick(product)} >
//         <div key={product.id} className="product-container">
//           <div className="flex">
//             <img src={product.image} alt={product.name} className="product-image" />
//           </div>
//             <div className="product-name"><a>{product.name}</a></div>
//             <div className="product-price"> {currency.format(product.price)} </div>   
//             <div  className="product-description">  {product.description}  </div>
//             {loggedIn && (
//               <div className="text-right mt-2">
//                 <button className="bg-blue-500 hover:bg-blue-700 text-weight" onClick={() => addToCart(product.id)} id={`addtocart_${product.id}`}>
//                   Add to Cart                                                                                     
//                 </button>
//               </div>
//             )}
//         </div>

//       ))}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { getProducts, currency } from "./products";
import { addToCart, useLoggedIn } from "cart/cart";
import { useNavigate } from "react-router-dom"; 

// Home Content Component
export default function HomeContent({ onProductClick }) {
  const loggedIn = useLoggedIn();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Create an AbortController to handle cleanup
    const controller = new AbortController();
    const signal = controller.signal;
  
    const fetchProducts = async () => {
      try {
        console.log("Fetching products...");
        const data = await getProducts({ signal }); // Pass the signal to the fetch function

        console.log("Products fetched:", data);
        if (!Array.isArray(data)) {
          throw new Error("Invalid product data structure");
        }

        setProducts(data);
      } catch (err) {
        // Handle fetch errors (including abort errors)
        if (err.name !== 'AbortError') {
          console.error("Error fetching products:", err);
          setError(err.message || "Failed to load products.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  
    // Cleanup the fetch request when the component unmounts
    return () => {
      console.log("Cleanup in useEffect");
      controller.abort(); // Abort the fetch request
    };
  }, []);
  

  if (loading) return <div>Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home-content">
      {products.map((product) => (
        <div key={product.id} className="product-container">
          <div className="flex">
            <img src={product.image} alt={product.name} className="product-image" />
          </div>
          <div className="product-name">
            <a onClick={() => onProductClick && onProductClick(product)}>{product.name}</a>
          </div>
          <div className="product-price">{currency.format(product.price)}</div>
          <div className="product-description">{product.description}</div>
          {loggedIn && (
            <div className="text-right mt-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-weight"
                onClick={() => addToCart(product.id)}
                id={`addtocart_${product.id}`}
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
