import BASE_URL from "@/lib/baseUrl";
import accessToken from "@/lib/jwtToken";

export const getCart = async () => {
  const response = await fetch(`${BASE_URL}/carts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  return data;
};

export const updateCart = async (params) => {
  const response = await fetch(`${BASE_URL}/carts/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(params),
  });
  const data = await response.json();
  return data;
};

export const getShippingCost = async (params) => {
  const { weight, destination_id, origin_id, courier } = params;

  const response = await fetch(
    `${BASE_URL}/carts/shipping_costs?weight=${weight}&destination_id=${destination_id}&origin_id=${origin_id}&courier=${courier}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();

  return data;
};

export const deleteCartItem = async (params) => {
  console.log(params);
  const response = await fetch(`${BASE_URL}/carts/cart_items`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(params),
  });
  const data = await response.json();
  return data;
};

export const resetCart = async () => {
  const response = await fetch(`${BASE_URL}/carts`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  return data;
};
