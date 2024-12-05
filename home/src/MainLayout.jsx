import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";

import "remixicon/fonts/remixicon.css";
import "./index.scss";
import Footer from "home/Footer";
import Header from "home/Header";

import PDPContent from "pdp/PDPContent"
import HomeContent from "home/HomeContent"; 
import CartContent from "cart/CartContent";

import ErrorBoundary from "./ErrorBoundary";

export default function MainLayout () {
    return (
        <Router>
            <ErrorBoundary>
                <div className="container-main">
                    <Header />
                    <div className="my-10">
                        <Routes>
                            <Route exact path="/" element={<HomeContent />} />
                            <Route path="/product/:id" element={<PDPContent />} />
                            <Route path="/cart" element={<CartContent />} />
                            <Route path="*" element={<div>404 - Page Not Found</div>} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </ErrorBoundary>
        </Router>
    );
}

const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<MainLayout />)