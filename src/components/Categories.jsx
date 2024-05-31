"use client";
import Link from "next/link";

const categories = [
  {
    id: 1,
    name: "pakaian",
    src: "/cat5.png",
    href: "/category",
  },
  {
    id: 2,
    name: "mainan",
    src: "/cat1.png",
    href: "/category2",
  },
  {
    id: 3,
    name: "mainan",
    src: "/cat2.png",
    href: "/category3",
  },
];

function Categories() {
  return (
    <div className="flex grid-cols-3 justify-center">
      {categories.map((category) => (
        <div key={category.id}>
          <Link href={category.href}>
            <img
              src={category.src}
              width={200}
              height={200}
              className="border-2  mx-5 mt-5 shadow-md rounded-md transform transition duration-300 ease-in-out hover:scale-105 hover:cursor-pointer"
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Categories;
