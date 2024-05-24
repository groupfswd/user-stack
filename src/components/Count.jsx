"use client";
import { ShoppingBag } from "lucide-react";
export default function Count(props) {
  return (
    <div>
      <h1 onClick={props.handleClick}>
        <ShoppingBag />
      </h1>
    </div>
  );
}
