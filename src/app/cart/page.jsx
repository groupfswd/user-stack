"use client";

import { useState, useEffect } from "react";
import { getCart, updateCart, getShippingCost } from "@/fetch/cart";
import CartItems from "@/components/CartItems";
import { getAdress } from "@/fetch/address";
import Link from "next/link";

export default function CartPage() {
  const [cartData, setCartData] = useState(null);
  const [cartItems, setCartItems] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [store, setStore] = useState(0);

  const [address, setAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [destination_id, setDestinationId] = useState("");
  const [courier, setCourier] = useState("");
  const [shippingOption, setShippingOption] = useState(null);
  const [shipping, setShipping] = useState("");

  const [disableAddress, setDisableAdress] = useState(false);
  const [disableCourier, setDisableCourier] = useState(false);
  const [disableShippingOption, setDisableShippingOption] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [disableCheckout, setDisableCheckout] = useState(true);

  // fetch cart
  useEffect(() => {
    async function fetchCart() {
      const response = await getCart();
      setCartData(response.cart);
      setCartItems(response.cart.cart_items);
      setTotalQuantity(response.total_quantity);
      setStore(response.cart.store);
    }

    fetchCart();
  }, []);

  // fetch address
  useEffect(() => {
    async function fetchAddress() {
      const response = await getAdress();
      setAddress(response);
    }

    fetchAddress();
  }, []);

  // handle address
  async function handleAddress(e) {
    setSelectedAddress(e.target.value);
    setDisableAdress(true);
    setDestinationId(address.data[e.target.value - 1].city_id);
  }

  // handle courier
  async function handleCourier(e) {
    setCourier(e.target.value);
    setDisableCourier(true);
  }

  // handle shipping
  async function handleShippingOption(e) {
    setShipping(e.target.value);
    setDisableShippingOption(true);
  }

  useEffect(() => {
    async function fetchShippingCost() {
      setIsLoading(true);
      const params = {
        weight: cartData.total_weight,
        destination_id: destination_id,
        origin_id: store.city_id,
        courier: courier,
      };

      const response = await getShippingCost(params);
      setShippingOption(response);
      setIsLoading(false);
      setDisableShippingOption(false);
      setShipping(-1);
    }

    if (destination_id && courier) {
      fetchShippingCost();
    }
  }, [courier, destination_id]);

  useEffect(() => {
    async function updateCartData() {
      if (cartData && courier && shippingOption && shipping) {
        const params = {
          shipping_cost: shippingOption[shipping]?.cost[0].value,
          courier: courier,
          shipping_method: shippingOption[shipping]?.service,
          store_id: cartData.store_id,
          cart_items_attributes: cartItems.map((item) => ({
            product_id: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        };
        const response = await updateCart(params);
        setCartData(response);
      }
    }

    if (shipping !== -1) {
      updateCartData();
    }
  }, [shipping]);

  useEffect(() => {
    async function updateCartData() {
      if (cartItems) {
        const params = {
          shipping_cost: 0,
          courier: null,
          shipping_method: null,
          cart_items_attributes: cartItems.map((item) => ({
            product_id: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        };
        const response = await updateCart(params);
        setCartData(response);
      }
    }
    updateCartData();
  }, [cartItems]);

  useEffect(() => {
    if (destination_id && courier && shippingOption && shipping !== -1) {
      setDisableCheckout(false);
    }
  });

  async function handleCheckout() {}

  // render

  if (!cartData) {
    return <div>Loading...</div>;
  }

  if (cartItems && cartItems.length === 0) {
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
    <>
      {}
      <div className="container mx-auto">
        <h1>SHOPPING CART</h1>
      </div>
      <div className="container mx-auto flex justify-between">
        {/* cart container */}
        <div className="cart-container flex flex-col gap-4">
          {cartItems?.map((item, index) => (
            <CartItems key={item.id} item={cartItems[index]} />
          ))}
        </div>

        <div>
          {/* Address */}
          <div>
            <h1>Address</h1>
            <select
              className="select select-bordered w-full max-w-xs"
              value={selectedAddress}
              onChange={handleAddress}
            >
              <option disabled={disableAddress} value="null">
                Select Address
              </option>
              {address?.data.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}: {item.street_address}, {item.city.name},{" "}
                  {item.province}, {item.postal_code}
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
              onChange={handleCourier}
              disabled={true && !selectedAddress}
            >
              <option disabled={disableCourier} value="null">
                Select Courier
              </option>
              <option value={"jne"}>JNE</option>
              <option value={"pos"}>POS</option>
              <option value={"tiki"}>TIKI</option>
            </select>
          </div>

          {/* shipping option */}
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div>
              {shippingOption && (
                <div>
                  <h1>Shipping Option</h1>
                  <select
                    className="select select-bordered w-full max-w-xs"
                    value={shipping}
                    onChange={handleShippingOption}
                    disabled={true && !courier}
                  >
                    <option disabled={disableShippingOption} value={-1}>
                      Select Service
                    </option>
                    {shippingOption?.map((item, index) => (
                      <option key={item.service} value={index}>
                        {item.service} service, {item.description}, Cost Rp.
                        {item.cost[0].value}, estimated time {item.cost[0].etd}{" "}
                        day
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}
        </div>

        {/* summary container */}
        <div className="summary-container flex flex-col gap-4">
          <div className="border border-gray-700 px-4 py-2">
            <h1>Order Summary</h1>
            <p>Total item: {totalQuantity}</p>
            <p>Sub Total: Rp. {cartData.total_price}</p>
            <p>Total Weight: {cartData.total_weight} g</p>
            <p>Shipping Cost: Rp. {cartData.shipping_cost}</p>
            <p>Total: Rp. {cartData.total_price + cartData.shipping_cost}</p>
          </div>

          <div className="action-container flex flex-col gap-4">
            <button
              className="btn btn-error"
              disabled={disableCheckout}
              onClick={handleCheckout}
            >
              Checkout
            </button>
            <Link href={"/products"} className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
