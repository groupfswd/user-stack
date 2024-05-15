"use client";
import { useEffect, useState } from "react";
import { getDetailProduct } from "@/fetch/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default function DetailPage({ params }) {
  const id = params.id;
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getDetailProduct(id);
      setProduct(response);
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(product);
  }, [product]);
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="card lg:card-side bg-base-100 ">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
              alt="Album"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product.name}</h2>
            <p>Rp{product.price}</p>
            Quantity
            <div>
              <select className="select select-bordered w-full max-w-xs">
                <option disabled selected>
                  1
                </option>
                <option>Han Solo</option>
                <option>Greedo</option>
              </select>
            </div>
            <div className="card-actions">
              <button className="btn btn-primary">Add To Cart</button>
            </div>
          </div>
        </div>
        <div>{product.description}</div>
      </div>
      <Footer />
    </>
  );
}
