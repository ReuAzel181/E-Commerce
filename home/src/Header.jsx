import React from "react";
import "./index.scss";

export default function Header() {
      return (
            <div className="header">
                  <div className="logo">
                        <img src="http://localhost:3000/logo.png" alt="Fidget Spinner World" />
                  </div>
                  <div className="header-text">
                        Fidget Spinner World
                  </div>
            </div>
      );
}