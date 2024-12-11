import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "remixicon/fonts/remixicon.css";
import "./index.scss";
import './pdp-index.scss';
import './index2.scss';

import Footer from "home/Footer";
import Header from "home/Header";

import PDPContent from "pdp/PDPContent";
import HomeContent from "home/HomeContent"; 
import CartContent from "cart/CartContent";
import ErrorBoundary from "./ErrorBoundary";

export default function MainLayout() {
    return (
        <Router>
            <div className="background-container"><img src="http://localhost:8080/CR.png" alt="bg1" /></div>
            <div className="background-container2"><img src="http://localhost:8080/CL.png" alt="bg2" /></div>
            <div className="chat-box">
                <div><img src="http://localhost:8080/chat.png" alt="chat" /></div>
                <div className="chat-text">Chat</div>
            </div>
            <div className="container-main">
                <Header />
                <div className="my-10" style={{ marginTop: 0 }}>
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
