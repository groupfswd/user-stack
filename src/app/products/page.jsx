"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import { getProducts } from "@/fetch/products";

export default function ProductPage() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      setProduct(data);
    }
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 mt-10">
        <div className="flex justify-end gap-2">
          <div>
            <select className="select select-bordered w-full max-w-xs">
              <option disabled selected>
                filter By:
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
          </div>
          <div>
            <select className="select select-bordered w-full max-w-xs">
              <option disabled selected>
                Sort By:
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 my-4">
          {product.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>

        <div className="flex justify-end">
          <Pagination />
        </div>
      </div>
      <Footer />
    </>
  );
}
