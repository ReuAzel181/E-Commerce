import React, { useState, useEffect } from "react";
import { cart, clearCart } from "cart/cart";
import { currency } from "home/products";

export default function CartContent() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        const subscription = cart.subscribe((value) => setItems(value?.cartItems ?? []));
        return () => subscription.unsubscribe();
    }, []);

    return (
        <div className="cart-container">
            <div className="cart-grid">
                {items.length === 0 ? (
                    <div className="col-span-4 text-center">No items listed</div>
                ) : (
                    <>
                    <div className="cart-batch-item">
                        {items.map((item) => (
                                <React.Fragment key={item.id}>
                                    <div className="cart-item-quantity">{item.quantity}</div>
                                    <img src={item.image} alt={item.name} className="cart-image" />
                                    <div className="cart-item-name">{item.name}</div>
                                    <div className="cart-item-price text-right">
                                        {currency.format(item.price * item.quantity)}
                                    </div>
                                </React.Fragment>
                        ))}
                    </div>
                        
                        <div className="cart-total">
                            Total: {currency.format(
                                items.reduce((a, v) => a + v.price * v.quantity, 0)
                            )}
                        </div>
                        {items.length > 0 && (
                            <div className="cart-buttons">
                                <div className="flex-grow">
                                    <button id="clearcart" className="clear-cart-button" onClick={clearCart}>
                                        Clear Cart
                                    </button>
                                </div>
                                <div className="flex-end">
                                    <button id="checkout" className="checkout-button">
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}