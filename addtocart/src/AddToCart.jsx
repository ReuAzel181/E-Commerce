import React, { useEffect, useState } from "react";
import { jwt, addToCart } from "cart/cart";

export default function AddToCart({ id }) {
    const [loggedIn, setLoggedIn] = useState(false);

    createEffect(() => {
        const subscription = jwt.subscribe((jwtToken) => {
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