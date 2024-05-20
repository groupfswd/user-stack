"use client";

import { useState, useEffect } from "react";
import { getCart, updateCart, getShippingCost } from "@/fetch/cart";
import CartItems from "@/components/CartItems";
import { getAdress } from "@/fetch/address";

export default function CartPage() {
  const [cartData, setCartData] = useState(null);
  const [address, setAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [courier, setCourier] = useState("");
  const [shippingCost, setShippingCost] = useState(0);
  const [params, setParams] = useState({});

  // useEffect(() => {
  //   let params = {
  //     weight: cartData?.cart.total_weight,
  //     destination_id: selectedAddress,
  //     origin_id: cartData?.cart.store.city_id,
  //     courier: courier,
  //   };

  //   async function fetchShippingCost() {
  //     const response = await getShippingCost(params);
  //     setShippingCost(response);
  //   }

  //   fetchShippingCost();
  // }, [courier, selectedAddress]);

  useEffect(() => {
    async function fetchCart() {
      const response = await getCart();
      setCartData(response);
    }

    fetchCart();
  }, []);

  useEffect(() => {
    async function fetchAddress() {
      const response = await getAdress();
      setAddress(response);
    }

    fetchAddress();
  }, []);

  useEffect(() => {
    console.log(courier, ">>>>>");
  }, [courier]);

  if (!cartData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {}
      <div className="container mx-auto">
        <h1>SHOPPING CART</h1>
      </div>
      <div className="container mx-auto flex justify-between">
        {/* cart container */}
        <div className="cart-container flex flex-col gap-4">
          {cartData.cart.cart_items.map((item) => (
            <CartItems
              key={item.id}
              item={cartData.cart.cart_items[item.id - 1]}
            />
          ))}
        </div>
        {/* summary container */}
        <div className="summary-container flex flex-col gap-4">
          <div className="border border-gray-700 px-4 py-2">
            <h1>Order Summary</h1>
            <p>Total item: {cartData.total_quantity}</p>
            <p>Shipping: {cartData.cart.shipping_cost}</p>
            <p>Total: {cartData.cart.total_price}</p>
          </div>

          {/* Address */}
          <div>
            <h1>Address</h1>
            <select
              className="select select-bordered w-full max-w-xs"
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
            >
              <option defaultValue="null">Select Address</option>
              {address?.data.map((item) => (
                <option key={item.id} value={item.city_id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          {/* courier selection */}
          <div>
            <h1>Courier</h1>
            <select
              className="select select-bordered w-full max-w-xs"
              value={courier}
              onChange={(e) => setCourier(e.target.value)}
            >
              <option defaultValue="null">Select Courier</option>
              <option value={"jne"}>JNE</option>
              <option value={"pos"}>POS</option>
              <option value={"tiki"}>TIKI</option>
            </select>
          </div>

          <div className="action-container flex flex-col gap-4">
            <button className="btn btn-error">Checkout</button>
            <button className="btn btn-primary">Continue Shopping</button>
          </div>
        </div>
      </div>
    </>
  );
}
