const { default: BASE_URL } = require("@/lib/baseUrl");

export const getProducts = async (newUrl) => {
  const response = await fetch(`${BASE_URL}/products${newUrl}`, {
    method: "GET",
  });
  const data = await response.json();

  return data.result.data;
};

export const getDetailProduct = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "GET",
  });
  const data = await response.json();
  console.log(data, "<<<<");
  return data.data;
};
