import { createRoot } from "react-dom/client";
import React from "react";
import AddToCart from "./AddToCart";

export default function placeAddToCart(el, id) {
  const root = createRoot(el);
  root.render(<AddToCart id={id} />);
}