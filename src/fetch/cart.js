import BASE_URL from "@/lib/baseUrl";

export const getCart = async () => {
  const response = await fetch(`${BASE_URL}/carts`, {
    method: "GET",
  });
  const data = await response.json();

  return data;
};

export const updateCart = async (params) => {
  const response = await fetch(`${BASE_URL}/carts/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ params }),
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
      },
    }
  );

  const data = await response.json();

  return data;
};
