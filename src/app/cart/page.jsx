import { ShoppingBag } from "lucide-react";
import React from "react";

const Cart = () => {
  return (
    <div>
      <h2 className="flex gap-8 items-center text-lg">
        <ShoppingBag /> 0
      </h2>
    </div>
  );
};

export default Cart;
