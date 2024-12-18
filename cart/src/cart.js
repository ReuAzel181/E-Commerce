/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { BehaviorSubject } from 'rxjs';

const API_SERVER = 'http://localhost:8080';

export const jwt = new BehaviorSubject(null);
export const cart = new BehaviorSubject(null);



export const getCart = () => {
    const token = jwt.value;
    if (!token) {
        throw new Error("No JWT token available");
    }

    return fetch(`${API_SERVER}/cart`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to fetch cart");
        }
        return res.json();
    })
    .then((data) => {
        cart.next(data);
        return data;
    });
};
        
export const addToCart = (id) =>
    fetch(`${API_SERVER}/cart`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt.value}`,
        },
        body: JSON.stringify({ id }),
    })
        .then((res) => res.json())
        .then(() => {
            getCart();
    });

export const clearCart = () =>
    fetch(`${API_SERVER}/cart`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt.value}`,
        },
    })
        .then((res) => res.json())
        .then(() => {
            getCart();
        });

    export const login = (username, password) => 

        fetch(`${API_SERVER}/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
        .then((res) => res.json())
        .then((data) => {
            jwt.next(data.access_token);
            getCart();
            return data.access_token;
        });
        

    export function useLoggedIn() {
    const [loggedIn, setLoggedIn] = useState(!!jwt.value);

    useEffect(() => {
        setLoggedIn(!!jwt.value); 
        const subscription = jwt.subscribe(() => {
            setLoggedIn(!!jwt.value); 
        });

        return () => {
            subscription.unsubscribe(); 
        };
    }, []);

    return loggedIn;
}

