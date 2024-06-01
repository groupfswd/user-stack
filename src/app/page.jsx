import ProductTemplate from "@/components/productTemplate";
import Image from "next/image";
import Head from "next/head";
import Hero from "@/components/hero";
import ProductsPage from "./product/page";
import Categories from "@/components/Categories";
import Hero2 from "@/components/hero2";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="text-center mt-20">
        <ProductsPage />
        <h1 className="md:text-8xl text-4xl font-bold text-center text-gray-900">
          <span className="text-blue-700"> Beli</span> peralatan bayi dengan{" "}
          <span className="text-blue-700">mudah</span>
        </h1>
        <Hero2 />
        {/* <Categories /> */}
      </div>
    </>
  );
}
