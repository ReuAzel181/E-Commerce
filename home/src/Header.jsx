import React from "react";
import "./index.scss";
import Login from "cart/Login";
import MiniCart from "cart/MiniCart";

export default function Header() {
      return (
            <div className="flex" style={{ width: "100%", justifyContent: "space-between" }}>
                  <div className="header">
                        <div className="logo"><img src="http://localhost:8080/logo.png" alt="Fidget Spinner World" /></div>
                        <div className="header-text">Fidget Spinner World</div>
                        <div className="flex-end"> <MiniCart /> <Login /></div>
                  </div>
            </div>
            
      );
}