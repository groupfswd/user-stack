"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getDetailProduct } from "@/fetching/product";
import { convertToRupiah } from "@/lib/convertRupiah";

const ProductPage = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { id } = params;

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
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-80">
      <Link href={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          width={100}
          height={90}
          className="w-full h-auto object-cover rounded-t-lg"
        />
        <h2 className="mt-4 font-semibold text-2xl text-gray-900 py-4">
          {product.name}
        </h2>
        <p className="text-sm text-gray-600">{product.description}</p>
        <p className="text-lg text-gray-900 font-semibold">
          {convertToRupiah(product.price)}
        </p>
        <div className="flex justify-between">
          <Link href="/cart">
            <button className="hover:bg-blue-600 text-white bg-[#3797DB] rounded-full px-2 py-2 transform transition duration-300 ease-in-out hover:scale-105 hover:cursor-pointer">
              Add to Cart
            </button>
          </Link>
          <p>
            <button className="mt-3 transform transition duration-300 ease-in-out hover:scale-105 hover:cursor-pointer">
              Add to Wishlist
            </button>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductPage;
