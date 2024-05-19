import { useState } from "react";

const Wishlist = () => {
  const [productId, setProductId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: productId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to wishlist");
      }

      // Handle success, maybe redirect or show a success message
      console.log("Added to wishlist successfully!");
    } catch (error) {
      console.error("Error adding to wishlist:", error.message);
    }
  };

  return (
    <div>
      <h1>Add to Wishlist</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Product ID:
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </label>
        <button type="submit">Add to Wishlist</button>
      </form>
    </div>
  );
};

export default Wishlist;
