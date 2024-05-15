import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-full flex justify-center">
        <Image
          src="/hero.png"
          width={1000}
          height={900}
          className="rounded-xl w-9/10 h-auto"
        ></Image>
      </div>
    </div>
  );
};

export default Hero;
