"use client";

import { useState, useEffect } from "react";
import { getCart, updateCart } from "@/fetch/cart";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CartItems from "@/components/CartItems";
import { convertToRupiah } from "@/lib/convertRupiah";
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
          <Link href={"/products"} className="btn btn-info">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="my-10 text-gray-600 container mx-auto ">
      <div className="font-bold mb-5">
        <h1 className="text-3xl font-bold">SHOPPING CART</h1>
      </div>
      <div className="flex justify-between gap-4 flex-wrap">
        <div className="cart-container flex flex-col gap-4 flex-grow">
          {cartData?.map((item, index) => (
            <div key={item.id} className="border border-solid">
              <CartItems item={cartData[index]} />
            </div>
          ))}
        </div>

        <div className="summary-container flex flex-col gap-4 flex-grow lg:max-w-[400px]">
          <div className="border border-solid px-4 py-2">
            <h1 className="text-2xl font-bold">ORDER SUMMARY</h1>
            <div className="flex justify-between">
              <p>Total item(s)</p>
              <p>{totalQuantity}</p>
            </div>
            <div className="flex justify-between">
              <p>Total Weight</p>
              <p>{totalWeight} g</p>
            </div>
            <div className="flex justify-between">
              <p className="font-bold">Total Price</p>
              {totalPrice && (
                <p className="font-bold">{convertToRupiah(totalPrice)}</p>
              )}
            </div>

            <hr />
            <div className="action-container flex flex-col gap-4 mt-4">
              <button
                className="btn btn-error text-white text-xl font-bold"
                onClick={handleCheckout}
              >
                CHECKOUT
              </button>
              <Link
                href={"/products"}
                className="btn btn-primary-content text-xl border-solid-2 font-bold"
              >
                CONTINUE SHOPPING
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
