import ProductTemplate from "@/components/productTemplate";
import Image from "next/image";
import Head from "next/head";
import Hero from "@/components/hero";
import ProductsPage from "./product/page";
import Categories from "@/components/categories";

export default function Home() {
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
      </Head>

      <Hero />

      <Categories />

      <div className="text-center mt-20">
        <h1 className="md:text-8xl text-4xl font-bold text-center text-gray-900">
          <span className="text-blue-700"> Beli</span> peralatan bayi dengan{" "}
          <span className="text-blue-700">mudah</span>
        </h1>
      </div>
      <div>
        <ProductsPage />
      </div>
    </>
  );
}
