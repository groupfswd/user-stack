const { default: BASE_URL } = require("@/lib/baseUrl");
import Cookies from "js-cookie";

export const findUser = async (id) => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.data;
  } catch (error) {}
};

export const updateUser = async (params) => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    const data = await response.json();
    return data;
  } catch (error) {}
};
