"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { IoMdCart } from "react-icons/io";
import { LiaSearchSolid } from "react-icons/lia";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (Cookies.get("isLoggedIn") === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("isLoggedIn");
    setIsLoggedIn(false);
    window.location.reload();
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="navbar bg-[#3797db]">
      <div className="flex-1">
        <Link
          href="/"
          className="btn btn-ghost hover:bg-[#3187c5] text-white text-xl"
        >
          Baby Wonders
        </Link>
        <Link
          href="/product"
          className="btn btn-ghost hover:bg-[#3187c5] text-white text-xl"
        >
          Products
        </Link>
      </div>

      <div className="flex-none gap-5">
        <div className="form-control relative">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
            value={search}
            onChange={handleSearch}
          />
          <Link href={`/product?search=${search}`}>
            {" "}
            <LiaSearchSolid className="text-3xl absolute top-2 right-2" />
          </Link>
        </div>

        <div className="text-2xl text-white">
          <Link href="/cart">
            <IoMdCart />
          </Link>
        </div>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            {isLoggedIn ? (
              <>
                <li>
                  <Link href="/user">Profile</Link>
                </li>
                <li>
                  <Link href="/wishlist">Wishlist</Link>
                </li>
                <li>
                  <a onClick={handleLogout} className="text-red-600">
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <li>
                <Link href="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
