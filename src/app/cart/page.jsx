"use client";

import { useState, useEffect } from "react";
import { getCart, updateCart } from "@/fetch/cart";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CartItems from "@/components/CartItems";

export default function CartPage() {
  const [cartData, setCartData] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const router = useRouter();

  // fetch cart
  useEffect(() => {
    async function fetchCart() {
      const response = await getCart();
      setCartData(response.cart_items);
    }

    fetchCart();
  }, []);

  // calculate total quantity

  useEffect(() => {
    setTotalQuantity(cartData?.reduce((acc, item) => acc + item.quantity, 0));
  }, [cartData]);

  //calculate total weight

  useEffect(() => {
    setTotalWeight(
      cartData?.reduce(
        (acc, item) => acc + item.product.weight * item.quantity,
        0
      )
    );
  }, [cartData]);

  // calculate total price
  useEffect(() => {
    setTotalPrice(
      cartData?.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
  }, [cartData]);

  // checkout
  async function handleCheckout() {
    const params = {
      total_price: totalPrice,
      total_weight: totalWeight,
      store_id: 1,
      cart_items_attributes: cartData,
    };

    const response = await updateCart(params);

    router.push(`/checkout`);
  }

  // render

  if (!cartData) {
    return <div>Loading...</div>;
  }

  if (cartData.length === 0) {
    return (
      <div>
        <div className="container flex flex-col mx-auto items-center my-52">
          <h1>Your cart is empty</h1>
          <Link href={"/products"} className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="my-10">
      <div className="container mx-auto font-bold mb-10">
        <h1 className="text-2xl">SHOPPING CART</h1>
      </div>
      <div className="container mx-auto flex justify-between gap-4 flex-wrap">
        <div className="cart-container flex flex-col gap-4 flex-grow">
          {cartData?.map((item, index) => (
            <CartItems key={item.id} item={cartData[index]} />
          ))}
        </div>

        <div className="summary-container flex flex-col gap-4">
          <div className="border border-solid px-4 py-2">
            <h1>Order Summary</h1>
            <p>Total item: {totalQuantity}</p>
            <p>Total Weight: {totalWeight} g</p>
            <p>Sub Total: Rp. {totalPrice}</p>
          </div>

          <div className="action-container flex flex-col gap-4">
            <button className="btn btn-error" onClick={handleCheckout}>
              Checkout
            </button>
            <Link href={"/products"} className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
