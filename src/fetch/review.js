import BASE_URL from "@/lib/baseUrl";
import accessToken from "@/lib/token";

export const getReviews = async () => {
  const response = await fetch(`${BASE_URL}/reviews?id=1`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};