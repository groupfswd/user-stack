import BASE_URL from "@/lib/baseUrl";
import accessToken from "@/lib/token";

export const getAllReviews = async (id) => {
  const res = await fetch(`${BASE_URL}/reviews?id=${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await res.json();
  return data;
};

export const getOneReview = async (id) => {
  const res = await fetch(`${BASE_URL}/reviews/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await res.json();
  return data;
};

export const createReview = async (body) => {
  const res = await fetch(`${BASE_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
};

// export const updateReview = async (id, body) => {
//   const res = await fetch(`${BASE_URL}/reviews/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//     },
//     body: JSON.stringify(body),
//   });
//   const data = await res.json();
//   return data;
// };

export const deleteReview = async (id) => {
  const res = await fetch(`${BASE_URL}/reviews/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await res.json();
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
