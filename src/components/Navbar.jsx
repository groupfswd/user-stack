import Link from "next/link";
import Search from "./search";
import Person from "./person";
import Cart from "@/app/cart/page";

export default function Navbar() {
  return (
    <div className="flex justify-between bg-[#3797DB] text-white">
      <Link href="/">
        <h1 className="text-gray-800 font-bold text-3xl my-5 ml-10">
          Stack <span className="text-white">Masters</span>
        </h1>
      </Link>

      <Search />

      <ul className=" my-5 mx-10 gap-5 md:flex hidden">
        <Link
          className="text-2xl font-semibold hover:border-b-4 hover:text-blue-500"
          href="/home"
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
          href="/dashboard"
        >
          Dashboard
        </Link>
      </ul>
      <Cart />
      <Person />
    </div>
  );
}
