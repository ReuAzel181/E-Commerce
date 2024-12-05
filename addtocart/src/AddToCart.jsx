import React, { useEffect, useState } from "react";
import { jwt, addToCart } from "cart/cart";

const AddToCart = ({ id }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    
    // useEffect(() => {
    //     const subscription = jwt.subscribe((jwt) => {
    //     setLoggedIn(!!jwt);
    //     });
    //     return () => subscription.unsubscribe();
    // }, []);

    useEffect(() => {
        const subscription = jwt.subscribe((jwtToken) => {
            setLoggedIn(!!jwtToken);
        });
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        loggedIn && (
        <button
            onClick={() => addToCart(id)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            Add to Cart
        </button>
        )
    );
};

export default AddToCart;