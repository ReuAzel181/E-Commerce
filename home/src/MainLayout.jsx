import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "remixicon/fonts/remixicon.css";
import "./index.scss";
import Footer from "home/Footer";
import Header from "home/Header";

import PDPContent from "pdp/PDPContent";
import HomeContent from "home/HomeContent"; 
import CartContent from "cart/CartContent";
import ErrorBoundary from "./ErrorBoundary";

export default function MainLayout() {
    return (
        <Router>
            <div className="container-main">
                <Header />
                <div className="my-10">
                    <ErrorBoundary>
                        <Routes>
                            <Route path="/" element={<HomeContent />} />
                            <Route path="/product/:id" element={<PDPContent />} />
                            <Route path="/cart" element={<CartContent />} />
                            <Route path="*" element={<div>404 - Page Not Found</div>} />
                        </Routes>
                    </ErrorBoundary>
                </div>
                <Footer />
            </div>  
        </Router>
    );
}
