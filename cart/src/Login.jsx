import React, { useState } from "react";
import { login, usedLoggedIn } from "./cart";

export default function Login() {
    const loggedIn = usedLoggedIn();
    const [showLogin, setShowLogin] = useState(false);

    const [username, setUsername] = useState("sally");
    const [password, setPassword] = useState("123");

    if (loggedIn) return null;

    return (
        <>
            <span onClick={() => setShowLogin (!showLogin) }>
                <i className="ri-fingerprint-line text-2xl" id="showLogin"></i>
            </span>
            {showLogin && (
                <div className="absolute p-5 border-4 border-blue-800 p-2 rounded-md w-full"
                    style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                >
                    <input type="text" 
                        placeholder="Username"
                        value={username}
                        onChange={(evt) => setUsername(evt.target.value)}
                        className="border text-sm border-gray-400 p-2 rounded-md w-full"
                    />
                    <input type="password" 
                        value={password}
                        onChange={(evt) => setPassword(evt.target.value)}
                        className="border text-sm border-gray-400 p-2 rounded-md w-full mt-2"
                    />
                    <button
                        className="bg-green-900 text-white py-2 px-5 rounded-md mt-2"
                        onClick={() => login(username, password)}
                        id="loginbtn"
                    >
                        Login    
                    </button>
                </div>
            )}
        </>
    )
}