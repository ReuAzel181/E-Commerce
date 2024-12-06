import React, { useState } from "react";
import { login, useLoggedIn } from "./cart";

export default function Login() {
    const loggedIn = useLoggedIn();
    const [showLogin, setShowLogin] = useState(false);
    const [username, setUsername] = useState("sally");
    const [password, setPassword] = useState("123");
    const [loading, setLoading] = useState(false); // Manage loading state
    const [error, setError] = useState(null); // Manage error state

    if (loggedIn) return null; // Don't show login if the user is logged in

    const handleLogin = async () => {
        try {
            setLoading(true);
            setError(null); // Reset error on new attempt

            await login(username, password); // Assuming login is an async function

            // Handle successful login (e.g., navigate or update context)
        } catch (err) {
            setError("Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <span onClick={() => setShowLogin(!showLogin)}>
                <i className="ri-fingerprint-line text-2xl" id="showLogin"></i>
            </span>
            {showLogin && (
                <div
                    className="absolute p-5 border-4 border-blue-800 p-2 rounded-md w-full"
                    style={{
                        top: "50%",
                        left: "50%",
                        width: "500px",
                        transform: "translate(-50%, -50%)",
                        position: "fixed",
                    }}
                >
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(evt) => setUsername(evt.target.value)}
                        className="border text-sm border-gray-400 p-2 rounded-md w-full"
                        style={{ color: "black" }}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(evt) => setPassword(evt.target.value)}
                        className="border text-sm border-gray-400 p-2 rounded-md w-full mt-2"
                        style={{ color: "black" }}
                    />
                    {error && <div className="text-red-500 text-sm mt-2">{error}</div>} {/* Display error */}
                    <button
                        className="bg-green-900 text-white py-2 px-5 rounded-md mt-2"
                        onClick={handleLogin}
                        id="loginbtn"
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </div>
            )}
        </>
    );
}
