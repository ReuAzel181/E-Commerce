import React, { useEffect, useState } from "react";
import { jwt, addToCart } from "cart/cart";

export default function AddToCart({ id }) {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const subscription = jwt.subscribe((jwtToken) => {
            console.log("JWT token:", jwtToken);
            setLoggedIn(!!jwtToken);
        });
    
        return () => {
            if (subscription && typeof subscription.unsubscribe === 'function') {
                subscription.unsubscribe();
            }
        };
    }, []);
    

    return (
        <div>
            {loggedIn ? (
                <button onClick={() => addToCart(id)}>Add to Cart</button>
            ) : (
                <button disabled>Please log in to add to cart</button>
            )}
        </div>
    );
}