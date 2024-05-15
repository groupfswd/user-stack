import Image from "next/image";
import React from "react";
import AddToWishlistButton from "@/components/addToWishlist";

const ProductTemplate = () => {
  const products = [
    {
      id: 1,
      title: "piring bayi",
      descriptions: "lorem ipsum",
      url: "/piringby.jpg",
      harga: "Rp 25,000",
    },
    {
      id: 2,
      title: "piring bayi",
      descriptions: "lorem ipsum",
      url: "/gelasby.jpg",
      harga: "Rp 25,000",
    },
    {
      id: 3,
      title: "piring bayi",
      descriptions: "lorem ipsum",
      url: "/bayi1.jpg",
      harga: "Rp 25,000",
    },
    {
      id: 1,
      title: "piring bayi",
      descriptions: "lorem ipsum",
      url: "/piringby.jpg",
      harga: "Rp 25,000",
    },
    {
      id: 2,
      title: "piring bayi",
      descriptions: "lorem ipsum",
      url: "/gelasby.jpg",
      harga: "Rp 25,000",
    },
    {
      id: 3,
      title: "piring bayi",
      descriptions: "lorem ipsum",
      url: "/bayi1.jpg",
      harga: "Rp 25,000",
    },
    {
      id: 1,
      title: "piring bayi",
      descriptions: "lorem ipsum",
      url: "/piringby.jpg",
      harga: "Rp 25,000",
    },
    {
      id: 2,
      title: "piring bayi",
      descriptions: "lorem ipsum",
      url: "/gelasby.jpg",
      harga: "Rp 25,000",
    },
    {
      id: 3,
      title: "piring bayi",
      descriptions: "lorem ipsum",
      url: "/bayi1.jpg",
      harga: "Rp 25,000",
    },
    {
      id: 1,
      title: "piring bayi",
      descriptions: "lorem ipsum",
      url: "/piringby.jpg",
      harga: "Rp 25,000",
    },
    {
      id: 2,
      title: "piring bayi",
      descriptions: "lorem ipsum",
      url: "/gelasby.jpg",
      harga: "Rp 25,000",
    },
    {
      id: 3,
      title: "piring bayi",
      descriptions: "lorem ipsum",
      url: "/bayi1.jpg",
      harga: "Rp 25,000",
    },
  ];

  return (
    <div>
      <div className=" grid sm:grid-cols-6 text-center items-center gap-y-10 py-10">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col items-center p-4">
            <div className="items-center">
              <h2 className="font-semibold text-3xl">{product.title}</h2>
              <Image
                className="items-center"
                src={product.url}
                width={300}
                height={200}
              />
              <h3 className="text-2xl px-10 py-10">{product.descriptions}</h3>
              <p className="font-semibold px-10 py-10">{product.harga}</p>
              <AddToWishlistButton />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductTemplate;
