"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getDetailProduct } from "@/fetching/product";

const ProductPage = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { id } = params; // Replace with the actual product ID you want to display

  useEffect(() => {
    const loadProduct = async () => {
      try {
        console.log(id, "<<<< ini id");
        const data = await getDetailProduct(id);
        setProduct(data);
      } catch (err) {
        setError("Failed to load product.");
      }
    };

    loadProduct();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105">
      <Link href={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          width={100}
          height={90}
          className="w-full h-auto object-cover rounded-t-lg"
        />
        <h2 className="mt-4 font-semibold text-lg text-gray-900 py-4">
          {product.name}
        </h2>
        <p className="text-sm text-gray-600">{product.description}</p>
        <p className="text-lg text-gray-900 font-semibold">
          Harga: Rp{product.price}
        </p>
      </Link>
    </div>
  );
};

export default ProductPage;
