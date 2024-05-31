import Image from "next/image";
import React from "react";

const Hero2 = () => {
  return (
    <div className="sm:flex justify-center gap-4 w-lg items-center text-white bg-[#3797DB] mt-12">
      <div>
        <h1 className="text-4xl font-bold ml-1020 mb-20">
          Setiap ibu ingin yang terbaik untuk si Bayi
        </h1>
        <p className="my-7 font-semibold">
          StackMasters shop peralatan bayi menawarkan solusi praktis bagi para
          orang tua yang sibuk dan ingin memastikan kebutuhan bayi mereka
          terpenuhi dengan cepat dan mudah.
        </p>
      </div>
      <div className="">
        <Image
          className="rounded-xl   px-5 py-5"
          src="/ibubayi.png"
          width={700}
          height={300}
        />
      </div>
    </div>
  );
};

export default Hero2;
