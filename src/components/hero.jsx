"use client";

import React from "react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Hero = () => {
  return (
    <div className="flex justify-center items-center py-10 ">
      <div className="lg:w-3/5 ">
        <Carousel autoPlay interval={3000} infiniteLoop showThumbs={false}>
          <div>
            <Image
              src="/hero.png"
              width={800}
              height={720}
              quality={100}
              className="rounded-xl"
              alt="Hero Image"
            />
          </div>
          <div>
            <Image
              src="/hero2.png"
              width={800}
              height={720}
              quality={100}
              className="rounded-xl"
              alt="Hero Image"
            />
          </div>
          <div>
            <Image
              src="/hero3.png"
              width={800}
              height={720}
              quality={100}
              className="rounded-xl"
              alt="Hero Image"
            />
          </div>
          <div>
            <Image
              src="/bayi.png"
              width={800}
              height={720}
              quality={100}
              className="rounded-xl"
              alt="Hero Image"
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Hero;
