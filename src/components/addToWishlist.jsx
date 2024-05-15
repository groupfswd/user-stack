"use client";

// components/AddToWishlistButton.js
import axios from "axios";
import React from "react";

function AddToWishlistButton({ userId, productId }) {
  const addToWishlist = async () => {
    try {
      const response = await axios.post("/api/addToWishlist", {
        userId,
        productId,
      });
      alert("Product added to wishlist!");
    } catch (error) {
      alert("Failed to add product to wishlist.");
      console.error(error);
    }
  };

  return <button onClick={addToWishlist}>Add to Wishlist</button>;
}

export default AddToWishlistButton;
