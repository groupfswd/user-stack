import BASE_URL from "@/lib/baseUrl";

export const getAdress = async () => {
  const response = await fetch(`${BASE_URL}/addresses`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};
