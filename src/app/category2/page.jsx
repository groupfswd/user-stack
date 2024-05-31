"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts } from "@/fetching/product";
import { convertToRupiah } from "@/lib/convertRupiah";
import { createWishlist } from "@/fetching/wishlist";

const ProductsPageCategory2 = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(8);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      const filteredProducts = data.filter(
        (product) => product.category_id === 2
      ); // Filter products for category_id 2
      setProducts(filteredProducts);
    };

    loadProducts();
  }, []);

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  async function handleWishlist(id) {
    const res = await createWishlist({ product_id: +id });
  }

  return (
    <div
      className="grid sm:grid-cols-4 grid-cols-2 gap-4 max-h-2xl:"
      style={{ transform: "scale(0.6)" }}
    >
      {currentProducts.map((product) => (
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
            <h2 className="mt-4 font-semibold text-2xl text-gray-900 py-4 ">
              {product.name}
            </h2>
            <p>{product.category_id}</p>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-lg text-gray-900 font-semibold">
              {convertToRupiah(product.price)}
            </p>
          </Link>
          <div className="sm:flex lg:flex ">
            <div className="flex sm:gap-2 sm:px-6 sm:py-3 sm:mr-9">
              <button className="hover:bg-blue-700 text-white  bg-blue-500 rounded-full py-2 px-4 transition-colors duration-300 ease-in-out">
                <Link href="/cart" aria-label="Add to Cart">
                  Add to Cart
                </Link>
              </button>
              <button className="hover:bg-blue-700 text-white bg-blue-500 rounded-full py-2 px-4 transition-colors duration-300 ease-in-out">
                <Link href="/order" aria-label="Buy Now">
                  Buy Now
                </Link>
              </button>
            </div>
            <button
              className=" text-gray-700 hover:text-blue-500 transition-colors duration-300 ease-in-out"
              onClick={(e) => handleWishlist(product.id)}
              aria-label="Add to Wishlist"
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      ))}

      <div className="mt-8 px-2 py-3  flex justify-center">
        {Array.from({
          length: Math.ceil(products.length / productPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none ${
              currentPage === index + 1 ? "bg-blue-700" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductsPageCategory2;
