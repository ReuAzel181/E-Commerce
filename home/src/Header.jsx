import React from "react";
import "./index.scss";
import Login from "cart/Login";
import MiniCart from "cart/MiniCart";
import { Link } from "react-router-dom";


class ErrorBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = { hasError: false };
      }
    
      static getDerivedStateFromError(error) {
        return { hasError: true };
      }
    
      componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
      }
    
      render() {
        if (this.state.hasError) {
          return <h1>Something went wrong.</h1>;
        }
    
        return this.props.children; 
      }
}

export default function Header() {
      
      return (
            <div className="flex" style={{ width: "100%", justifyContent: "space-between" }}>
                  <div className="header">
                        <Link to="/">
                        <div className="header-logo-text">
                          <div className="logo"><img src="http://localhost:8080/logo.png" alt="Fidget Spinner World" /></div>
                          <div className="header-text">Fidget Spinner World</div>
                        </div>
                        </Link>

                        <div className="nav-link">
                            <div>Home</div> |
                            <div>Shop</div> |
                            <div>Discover</div>
                        </div>

                        <Link id="cart" to="/cart"><div className="nav-link">Cart</div></Link>

                        <div className="nav-link">  <ErrorBoundary> <MiniCart />  </ErrorBoundary> <ErrorBoundary> <Login /> </ErrorBoundary></div>
                  </div>
            </div>
      ); 
}