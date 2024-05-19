"use client";

import { useEffect, useState } from "react";
import { getWishLists } from "@/fetching/wishlist";

const WishlistPage = () => {
  const [wishlists, setWishlists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWishLists();
        setWishlists(data);
      } catch (error) {
        console.error("Error fetching wishlists:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Wishlist</h1>
      <ul>
        {wishlists && wishlists.length > 0 ? (
          wishlists.map((wishlist) => (
            <li key={wishlist.id}>
              <div>Product Name: {wishlist.product.name}</div>
              <div>Price: {wishlist.product.price}</div>
              <div>Description: {wishlist.product.description}</div>
              {/* Add more product details as needed */}
            </li>
          ))
        ) : (
          <li>No items in wishlist</li>
        )}
      </ul>
    </div>
  );
};

export default WishlistPage;
