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
  const gradientClasses = ['gradient-1', 'gradient-2', 'gradient-3', 'gradient-4', 'gradient-5', 'gradient-6'];

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
      <div className="overlay-bar">
        <div className="filter-category">
          <button>Newest</button>
          <button>Popular</button>
          <button>Trending</button>
          <button>Best Selling</button>
          <button className="filter">Filter <img src="http://localhost:8080/filter.png" alt="filter" /></button>
        </div>
      </div>
      <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} gradientClass={gradientClasses[index % gradientClasses.length]} loggedIn={loggedIn} />
      ))}
    </div>
    </div>
  );
}

function ProductCard({ product, gradientClass, loggedIn }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="product-container">
      <div className={`product-bg ${gradientClass}`}>
        <div className="favorite">
          <button onClick={handleFavoriteClick}>
            <img src={isFavorite ? "http://localhost:8080/favorite-active.png" : "http://localhost:8080/favorite-inactive.png"} alt="favorite" />
          </button>
        </div>
        <div className="flex">
          <Link to={`/product/${product.id}`}>
            <div className="">
              <img src={product.image} alt={product.name} className="product-image" />
            </div>
            
          </Link>
        </div>
      </div>

      <div className="product-name">
        <Link to={`/product/${product.id}`}>
          <a>{product.name}</a>
        </Link>
      </div>


      <div className="product-description">{product.description}</div>

      <div className="product-pa">
        <div className="product-price">{currency.format(product.price)}</div>

        {loggedIn && (
        <div className="product-add">
          <button
            onClick={() => addToCart(product.id)}
            id={`addtocart_${product.id}`}>
            <img src="http://localhost:8080/add.png" alt="add" />
          </button>
        </div>
        )}
      </div>


      </div>
    
  );
}