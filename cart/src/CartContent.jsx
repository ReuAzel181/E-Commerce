import React, { useState, useEffect } from "react";

import MiniCart from "./MiniCart";
import Login from './Login'
import { login, jwt } from "./cart";

export default function CartContent() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const subscription = jwt.subscribe((val) => setToken(val ?? ""));
    return () => subscription.unsubscribe();
  }, []);

  return (<div>
    <div></div>JWT: {token}
    <Login />
    <MiniCart />  
      </div>
  );
} 