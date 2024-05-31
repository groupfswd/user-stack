"use client";

import Link from "next/link";
import Person from "./person";

export default function Navbar() {
  return (
    <div className="bg-[#3797DB]">
      <div className="flex justify-between container mx-auto text-white">
        <Link href="/">
          <h1 className="text-gray-800 font-bold text-3xl my-5">
            Stack <span className="text-white">Masters</span>
          </h1>
        </Link>

        <div className=" my-5 mx-10 gap-5 md:flex hidden">
          <Link
            className="text-2xl font-semibold hover:border-b-4 hover:text-blue-500"
            href="/"
          >
            Home
          </Link>
          <Link
            className="text-2xl font-semibold hover:border-b-4 hover:text-blue-600"
            href="/wishlist"
          >
            Wishlist
          </Link>
          <Link
            className="text-2xl font-semibold hover:border-b-4 hover:text-gray-100 hover:bg-blue-600 hover:rounded-lg"
            href="/product"
          >
            Product
          </Link>
        </div>
        <div className="flex">
          <Person />
        </div>
      </div>
    </div>
  );
}
