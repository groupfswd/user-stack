import BASE_URL from "@/lib/baseUrl";
import accessToken from "@/lib/token";

export const updateOrderItemsApi = async (params) => {
  const response = await fetch(`${BASE_URL}/order_items/update`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  const data = await response.json();
  return data;
};
