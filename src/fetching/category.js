import accessToken from "@/lib/jwtToken";

const { default: BASE_URL } = require("@/lib/baseUrl");

export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await res.json();
  console.log(data, "+++");
  return data;
};

export const getDetailCategories = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "GET",
  });
  const data = await res.json();
  return data.data;
};
