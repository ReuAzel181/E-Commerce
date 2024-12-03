import React, { useState, useEffect } from "react";
import { cart, clearCart } from "./cart";
import { currency } from "home/products";

export default function MiniCart() {
    const [items, setItems] = useState(undefined);
    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
        setItems(cart.value?.cartItems);
        return cart.subscribe((c) => {
            setItems(c?.cartItems);
        });
    }, []);

    if (!items) {
        console.log("No items in the cart");
        return null;
    }

    console.log("Items in the cart:", items);

    return (
        <>
            <span onClick={() => setShowCart (!showCart)} id="showcart_span">
                <i className="ri-shopping-cart-2-fill text-2xl" id="showcart"></i>
                
                {items.length}
            </span>
        </>
    )

}