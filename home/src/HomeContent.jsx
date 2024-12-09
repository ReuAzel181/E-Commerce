import React, { useState, useEffect } from "react";
import { getProducts, currency } from "./products";
import { addToCart, useLoggedIn } from "cart/cart";
import { Link } from "react-router-dom";
// import 'pdp/index.scss';

// Home Content Component
export default function HomeContent({ onProductClick }) {
  const loggedIn = useLoggedIn();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const gradientClasses = ['gradient-1', 'gradient-2', 'gradient-3', 'gradient-4'];

  useEffect(() => {
    // Create an AbortController to handle cleanup
    const controller = new AbortController();
    const signal = controller.signal;
  
    const fetchProducts = async () => {
      try {
        console.log("Fetching products...");
        const data = await getProducts({ signal });

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
      <div className="overlay-bar">Hello</div>
      {products.map((product, index) => (
        <div key={product.id} className="product-container">
          <div className={`product-bg ${gradientClasses[index % gradientClasses.length]}`}>
          <div className="flex">
          
            <Link to={`/product/${product.id}`}>
            <img src={product.image} alt={product.name} className="product-image" /></Link>
          </div>
          </div>
          <div className="product-name">
            <Link to={`/product/${product.id}`}>
            <a>{product.name}</a></Link>
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
