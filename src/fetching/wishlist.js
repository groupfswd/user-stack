const { default: BASE_URL } = require("@/lib/baseUrl");

export const getWishLists = async () => {
  const response = await fetch(`${BASE_URL}/wishlists`, {
    method: "GET",
  });
  return await response.json();
};
