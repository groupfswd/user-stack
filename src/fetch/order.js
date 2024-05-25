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

export const getDetailOrderApi = async (id) => {
  const response = await fetch(`${BASE_URL}/orders/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const getAllOrderApi = async () => {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
