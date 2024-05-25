import BASE_URL from "@/lib/baseUrl";
import accessToken from "@/lib/token";

export const createOrderApi = async (params) => {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(params),
  });

  const data = await response.json();

  return data;
};
