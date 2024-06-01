import BASE_URL from "@/lib/baseUrl";
import accessToken from "@/lib/token";

export const getWishlist = async () => {
  const response = await fetch(`${BASE_URL}/wishlists`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  console.log(data);
  return data;
};

export const createWishlist = async (wishlistItem) => {
  const response = await fetch(`${BASE_URL}/wishlists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(wishlistItem),
  });

  if (!response.ok) {
    throw new Error("Failed to create wishlist");
  }

  const data = await response.json();
  return data;
};

export const deleteWishlist = async (Id) => {
  const response = await fetch(`${BASE_URL}/wishlists/${Id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete wishlist item");
  }

  return "Wishlist item deleted successfully";
};
