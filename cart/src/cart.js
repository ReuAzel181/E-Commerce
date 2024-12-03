import React, { useState, useEffect } from "react";
import { BehaviorSubject } from "rxjs";

const API_SERVER = "http://localhost:8080";

// Create a BehaviorSubject to hold the JWT token
export const jwt = new BehaviorSubject(null);

// Login function
export const login = (username, password) =>
  fetch(`${API_SERVER}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Login failed");
      }
      return res.json();
    })
    .then((data) => {
      jwt.next(data.access_token); // Save the token in the BehaviorSubject
      return data.access_token;
    })
//     .catch((error) => {
//       console.error("Error during login:", error);
//       throw error;
//     });

      export function useLoggedIn() {
            const [loggedIn, setLoggedIn] = useState(!!jwt.value);
            useEffect(() => {
                  setLoggedIn(!!jwt.value);
                  return jwt.subscribe((c) => {
                        setLoggedIn(!!jwt.value);
                  });
            }, []);
            return loggedIn;
      }
