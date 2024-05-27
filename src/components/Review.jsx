"use client";

import { useState, useEffect } from "react";

import { getReviews } from "@/fetch/review";
export default function Review() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    async function fetchReviews() {
      const data = await getReviews();
      setReviews(data);
    }

    fetchReviews();
  }, []);

  return (
    <div className="container mx-auto my-10 text-gray-600">
      <div className="flex">
        <h1 className="text-3xl font-bold">Reviews</h1>
      </div>
      <hr />
      <div>{JSON.stringify(reviews)}</div>
    </div>
  );
}
