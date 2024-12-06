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
                        <div className="logo"><img src="http://localhost:8080/logo.png" alt="Fidget Spinner World" /></div>
                        <Link to="/"><div className="header-text">Fidget Spinner World</div></Link>
                        <Link id="cart" to="/cart"><div className="">Cart</div></Link>
                        <div className="flex-end">  <ErrorBoundary> <MiniCart />  </ErrorBoundary> <ErrorBoundary> <Login /> </ErrorBoundary></div>
                  </div>
            </div>
      ); 
}