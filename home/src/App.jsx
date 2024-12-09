import React from "react";
import ReactDOM from "react-dom/client"; // Ensure correct API for React 18

import "remixicon/fonts/remixicon.css";
import "./index.scss";

import MainLayout from "home/MainLayout";

// Get the root DOM element
const rootElement = document.getElementById("app");
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

// Create a React root (React 18 API)
const root = ReactDOM.createRoot(rootElement);

// Render the MainLayout component
root.render(<MainLayout />);
