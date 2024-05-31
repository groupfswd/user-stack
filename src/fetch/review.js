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

export const createReview = async (params) => {
  const response = await fetch(`${BASE_URL}/reviews`, {
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

export const getReviewByItemId = async (id) => {
  const response = await fetch(`${BASE_URL}/reviews?item_id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  return data;
};

export const updateReview = async (params) => {
  const response = await fetch(`${BASE_URL}/reviews/${params.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(params.data),
  });

  const data = await response.json();
  return data;
};
