"use client";
import Link from "next/link";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";

const Person = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-blue-600 text-white p-4 rounded-xl items-center w-15 h-10 my-auto pt-2">
      <div className="container  flex px-2  pb-4">
        <div className="flex items-center">
          <FaRegUser />
          <button onClick={() => setIsOpen(!isOpen)} className="ml-3 relative">
            <span>account</span>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-1">
                <Link
                  href="/login"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Person;
