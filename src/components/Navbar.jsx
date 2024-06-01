"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { IoMdCart } from "react-icons/io";

export default function Navbar() {
  const router = useRouter();
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
    router.push("/");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="navbar bg-[#3797db]">
      <div className="flex-1">
        <a
          href="/"
          className="btn btn-ghost hover:bg-[#3187c5] text-white text-xl"
        >
          Baby Wonders
        </a>
        <a
          href="/product"
          className="btn btn-ghost hover:bg-[#3187c5] text-white text-xl"
        >
          Products
        </a>
      </div>

      <div className="flex-none gap-3">

        <div className="text-2xl text-white border-transparent hover:bg-[#3187c5] border-8 rounded-full">
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="size-10"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  clipRule="evenodd"
                />
              </svg>
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
