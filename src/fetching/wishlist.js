export const getWishLists = async () => {
  try {
    const response = await fetch(`${BASE_URL}/wishlists`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch wishlists");
    }

    const data = await response.json();
    return data; // Return data here
  } catch (error) {
    console.error("Error fetching wishlists:", error);
    throw error;
  }
};
