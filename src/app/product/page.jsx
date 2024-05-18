"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts } from "@/fetching/product";
import { convertToRupiah } from "@/lib/convertRupiah";
import { IoIosHeartEmpty } from "react-icons/io";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    loadProducts();
  }, []);

  return (
    <div>
      <div
        className="grid sm:grid-cols-4 gap-4 max-h-2xl:"
        style={{ transform: "scale(0.6)" }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
          >
            <Link href={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                width={100}
                height={90}
                className="w-full h-auto object-cover rounded-t-lg "
              />
              <h2 className="mt-4 font-semibold text-2xl text-gray-900 py-4">
                {product.name}
              </h2>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-lg text-gray-900 font-semibold">
                {convertToRupiah(product.price)}
              </p>
              <div className="flex justify-between">
                <button className="bg-blue-600 py-1 px-1 text-white rounded-full">
                  <Link href="/cart">Add to Cart</Link>
                </button>
                <p>
                  <Link href="/wishlist">Add to Wishlist</Link>
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductsPage;
