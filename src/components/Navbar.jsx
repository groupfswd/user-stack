import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex justify-between bg-gray-100">
      <Link href="/">
        <h1 className="text-gray-800 font-bold text-3xl my-5 ml-10">
          Stack <span className="text-blue-600">Masters</span>
        </h1>
      </Link>

      <ul className=" my-5 mx-10 gap-5 flex">
        <Link
          className="text-2xl font-semibold hover:border-b-4 hover:text-blue-600"
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
    </div>
  );
}
