"use client";

import { useState } from "react";
import { IoSearch } from "react-icons/io5";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="mt-7 md:flex gap-2 hidden">
      <input
        className="h-8 w-80 rounded-md"
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white rounded-lg w-7 h-8 pl-1 "
      >
        <IoSearch />
      </button>
    </div>
  );
}

export default Search;
