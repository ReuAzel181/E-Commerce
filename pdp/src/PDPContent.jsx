import React, { useState, useEffect } from "react";
import HomeContent from "home/HomeContent"; 
import { getProductById, currency } from "home/products";


export default function PDPContent() {
  const product = 1;

  return <div> Product{product} </div>
}
