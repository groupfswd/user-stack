"use client";

import React, { useState } from "react";
import Count from "@/components/Count";

const Cart = () => {
  const [count, setCount] = useState(0);
  function add() {
    setCount((prevCount) => prevCount + 1);
  }
  return (
    <div>
      <h2 className="flex gap-8 items-center text-lg">
        {count} <Count handleClick={add} />
      </h2>
    </div>
  );
};

export default Cart;
