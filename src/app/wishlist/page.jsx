"use client";
import { useEffect, useState } from "react";
import { getWishlist, deleteWishlist } from "@/fetching/wishlist";
import { convertToRupiah } from "@/lib/convertRupiah";
import { BsTrash, BsCart4 } from "react-icons/bs";
import Link from "next/link";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);

  async function deleteWishlistItem(itemId) {
    try {
      const response = await deleteWishlist(itemId);

      if (response.ok) {
        const updatedWishlist = wishlist.filter((item) => item.id !== itemId);
        setWishlist(updatedWishlist);
        console.log("Item deleted successfully");
        window.location.reload();
      } else {
        throw new Error("Failed to delete the item");
      }
    } catch (error) {
      console.error("Error deleting wishlist item:", error.message);
    }
  }

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { data } = await getWishlist();
        setWishlist(data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    fetchWishlist();
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-center">Daftar Wishlist</h1>
      <div className="grid sm:grid-cols-4 grid-cols-2 gap-4 max-h-2xl my-10 mx-5">
        {wishlist.map((wishlistItem) => (
          <div
            key={wishlistItem.id}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg"
          >
            <img
              src={wishlistItem.product.image}
              alt={wishlistItem.product.name}
              className="w-full h-auto object-cover rounded-t-lg"
            />
            <h2 className="mt-4 font-semibold text-2xl text-gray-900 py-4">
              {wishlistItem.product.name}
            </h2>
            <p className="text-sm text-gray-600">
              Deskripsi: {wishlistItem.product.description}
            </p>
            <p className="text-lg text-gray-900 font-semibold">
              {convertToRupiah(wishlistItem.product.price)}
            </p>
            <div className=" flex items-end">
              <button className="px-5 py-5 my-5 bg-[#3797DB] text-white hover:bg-blue-600 rounded-xl shadow-lg transform transition duration-300 ease-in-out hover:scale-105">
                <Link href="/cart" className="flex gap-1">
                  <BsCart4 />
                  Buy Now
                </Link>
              </button>
            </div>
            <div className="flex gap-5 ">
              <button className="text-2xl shadow-lg transform transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-500 hover:text-white">
                <Link href="/cart">
                  <BsCart4 />
                </Link>
              </button>
              <button
                className=" text-2xl shadow-lg transform transition duration-300 ease-in-out hover:scale-105 hover:bg-red-500 hover:text-white"
                onClick={() => deleteWishlistItem(wishlistItem.id)}
              >
                <BsTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
