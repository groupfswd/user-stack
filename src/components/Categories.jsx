import Image from "next/image";

const categories = [
  {
    id: 1,
    name: "pakaian",
    src: "/cat1.png",
  },
  {
    id: 2,
    name: "mainan",
    src: "/cat2.png",
  },
  {
    id: 3,
    name: "mainan",
    src: "/cat5.png",
  },
];
function Categories() {
  return (
    <div className="flex grid-cols-3 justify-center">
      {categories.map((category) => (
        <div key={category.id}>
          <img
            src={category.src}
            width={200}
            height={200}
            className="border-2  mx-5 mt-5 shadow-md rounded-md transform transition duration-300 ease-in-out hover:scale-105 hover:cursor-pointer"
          />
        </div>
      ))}
    </div>
  );
}

export default Categories;
