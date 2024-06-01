"use client";

import { useState, useEffect } from "react";
import { getAllReviews } from "@/fetch/review";
import { FaStar } from "react-icons/fa6";

export default function Review({ product_id }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getAllReviews();
      const filteredData = data.filter(
        (review) => review.product_id === product_id
      );
      setReviews(filteredData);
    };

    fetchReviews();
  }, [product_id]);

  return (
    <div className="container mx-auto my-10 text-gray-600">
      <div className="flex border-b">
        <h1 className="text-3xl font-bold">Reviews</h1>
      </div>
      <div>
        {reviews.map((review, index) => (
          <div className="border-b pb-5 pt-5" key={index}>
            <div className="rating">
              {[...Array(review.rating)].map((_, index) => (
                <FaStar key={index} className="text-xl text-yellow-500" />
              ))}
            </div>
            <p className="text-xl font-bold">{review.user.fullname}</p>
            <p className="text-xs">
              {new Date(review.created_at).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="text-lg">{review.comments}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
