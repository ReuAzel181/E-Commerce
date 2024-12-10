import React, { useState } from "react";
import { login, useLoggedIn } from "./cart";
import "./login.scss"; // Import the new CSS file

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
                <img src="http://localhost:8080/profile.png" alt="profile" id="showLogin"/>
            </span>
            {showLogin && (
                <div className="login-modal">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(evt) => setUsername(evt.target.value)}
                        className="login-input"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(evt) => setPassword(evt.target.value)}
                        className="login-input mt-2"
                    />
                    {error && <div className="login-error">{error}</div>} {/* Display error */}
                    <button
                        className="login-button"
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