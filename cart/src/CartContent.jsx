import React, { useState, useEffect } from "react";
import { login, jwt } from "./cart";
import Login from "./Login";
import MiniCart from "./MiniCart";

export default function CartContent() {
    const [token, setToken] = useState("");

    useEffect(() => {
        return jwt.subscribe((val) => setToken(val ?? ""));
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>JWT</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{token}</div>
            <Login />
            <MiniCart />
        </div>
    );
}
