"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getCategories } from "@/fetching/category";
import { convertToRupiah } from "@/lib/convertRupiah";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await getCategories();
        if (response.message === "Success" && Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]); // Set to an empty array in case of error
      }
    };

    loadCategories();
  }, []);

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105">
      {categories.length === 0 ? (
        <p>No categories available</p>
      ) : (
        categories.map((category) => (
          <div key={category.id} className="mb-2 p-2 border-b border-gray-200">
            <h1 className="text-xl font-bold">{category.name}</h1>
            <p>{category.name}</p>
            <p>Updated at: {new Date(category.updated_at).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CategoriesPage;
