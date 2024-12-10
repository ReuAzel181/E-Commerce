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
        <div className="flex">
            <div className="my-10 grid grid-cols-4 gap-5" style={{ top: "50%", left: "50%", width: "500px", transform: "translate(-50%, -50%)", position: "fixed" }}>
                {items.length === 0 ? (
                    <div className="col-span-4 text-center">No items listed</div>
                ) : (
                    <>
                        {items.map((item) => (
                            <React.Fragment key={item.id}>
                                <div>{item.quantity}</div>
                                <img src={item.image} alt={item.name} className="" />
                                <div>{item.name}</div>
                                <div className="text-right">
                                    {currency.format(item.price * item.quantity)}
                                </div>
                            </React.Fragment>
                        ))}
                        <div className="text-right col-span-4">
                            {currency.format(
                                items.reduce((a, v) => a + v.price * v.quantity, 0)
                            )}
                        </div>
                        {items.length > 0 && (
                            <div className="flex mb-10 col-span-4">
                                <div className="flex-grow">
                                    <button id="clearcart" className="bg-white border border-green-800 text-black" onClick={clearCart}>
                                        Clear Cart
                                    </button>
                                </div>
                                <div className="flex-end">
                                    <button id="" className="bg-green-900 text-black">
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