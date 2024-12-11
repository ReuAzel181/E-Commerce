import React, { useState, useEffect } from "react";
import { cart, clearCart } from "./cart";
import { currency } from "home/products";
import "./index.scss";



export default function MiniCart({ userId }) {
    const [items, setItems] = useState(undefined);
    const [showCart, setShowCart] = useState(false);
    const [user, setUser] = useState(null);
    const defaultUserPhoto = "http://localhost:8080/default-user.png";

    useEffect(() => {
        console.log("userId passed to MiniCart:", userId); // Add this log
        async function fetchUser() {
            try {
                const usersService = new UsersService();
                const userData = await usersService.findOneById(userId);
                if (!userData) {
                    console.error("User not found");
                    return;
                }
                setUser(userData);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }
        if (userId) {
            fetchUser();
        }
    }, [userId]);
    
    
    
    useEffect(() => {
        setItems(cart.value?.cartItems);
    
        const unsubscribe = cart.subscribe((c) => {
            setItems(c?.cartItems);
        });
    
        return () => {
            if (typeof unsubscribe === "function") {
                unsubscribe(); 
            }
        };
    }, []); 
    
    

    if (!items) {
        console.log("No items in the cart");
        return null;
    }

    console.log("Items in the cart:", items);

    return (
        <>
            <span onClick={() => setShowCart (!showCart)} id="showcart_span">
                <div className="user-profile">
                    {console.log("User data:", user)} 
                        <img
                            src={user && user.userphoto ? user.userphoto : defaultUserPhoto}
                            alt={user && user.username ? user.username : "Default User"}
                            className="user-photo"
                        />
                        <div className="item-count">{items.length}</div>
                </div>
            </span>
            {showCart && (
                <>
                <div className="absolute p-5 border-4 border-blue-800 p-2 rounded-md w-full"
                    style={{ top: "50%", left: "50%", width: "500px", transform: "translate(-50%, -50%)", position: "fixed" }} >                    <div className="grid gap-3 text-sm"
                        style={{ gridTemplate: "1ft 3fr 10fr 2fr"}}>
                        {items.map((item) => (
                            <React.Fragment key={item.id}>
                                <div>{item.quantity}</div>
                                <img src={item.image} alt="item.name" className="" style={{ width: "100px", height: "100px" }} />
                                <div>{item.name}</div>
                                <div className="text-right">
                                    {currency.format(item.price * item.quantity)}
                                </div>
                            </React.Fragment>
                        ))}
                        <div>
                            {currency.format (
                                items.reduce((a, v) => a + v.price * v.quantity, 0)
                            )}
                        </div>
                    </div>
                    <div className="flex">
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
                </div>
                
                
                </>
            )}
        </>
    )
}