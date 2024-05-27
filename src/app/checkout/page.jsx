"use client";

import { useEffect, useState } from "react";
import { getCart, getShippingCost, resetCart } from "@/fetch/cart";
import { findAddresses } from "@/fetch/address";
import { convertToRupiah } from "@/lib/convertRupiah";
import { createOrderApi } from "@/fetch/order";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./checkout.css";

export default function CheckoutPage() {
  const [cart, setCart] = useState(null);
  const [cartItem, setCartItem] = useState(null);
  const [address, setAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [disableAddressOption, setDisableAddressOption] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState(null);
  const [disableCourierOption, setDisableCourierOption] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [ShippingCostData, setGetShippingCostData] = useState(null);
  const [disableServiceOption, setDisableServiceOption] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [disableServiceSelection, setDisableServiceSelection] = useState(true);
  const [subTotalPrice, setSubTotalPrice] = useState(0);

  const router = useRouter();

  //   calculate total quantity

  useEffect(() => {
    if (cartItem) {
      setTotalQuantity(cartItem?.reduce((acc, item) => acc + item.quantity, 0));
    }
  }, [cartItem]);

  //   cart
  useEffect(() => {
    async function fetchCart() {
      const response = await getCart();
      setCart(response);
      setCartItem(response.cart_items);

      if (response.cart_items.length === 0) {
        router.push("/cart");
      }
    }

    fetchCart();
  }, []);

  //   subTotal

  useEffect(() => {
    if (cart) {
      setSubTotalPrice(cart.total_price);
    }
  }, [cart]);

  //   address
  useEffect(() => {
    async function fetchAddress() {
      const response = await findAddresses();
      setAddress(response);
    }

    fetchAddress();
  }, []);

  useEffect(() => {
    const params = {
      weight: cart?.total_weight,
      destination_id: selectedAddress?.city_id,
      origin_id: cart?.store.city_id,
      courier: selectedCourier,
    };

    async function fetchCost() {
      setDisableServiceSelection(true);

      const response = await getShippingCost(params);
      setGetShippingCostData(response);
      setDisableServiceSelection(false);
    }

    if (selectedAddress && selectedCourier !== null) fetchCost();
  }, [selectedAddress, selectedCourier]);

  //   function

  function handledAddress(e) {
    const id = e.target.value;
    setSelectedAddress(address?.find((item) => item.id == id));
    setDisableAddressOption(true);
  }

  function handleCourier(e) {
    const courier = e.target.value;
    setSelectedCourier(courier);
    setDisableCourierOption(true);
  }

  function handleService(e) {
    const service = e.target.value;
    setSelectedService(service);
    setDisableServiceOption(true);
  }

  async function handleOrder() {
    const params = {
      store_id: +cart?.store.id,
      shipping_cost: +selectedService?.split("-")[0],
      shipping_method: selectedService?.split("-")[1],
      courier: selectedCourier?.toUpperCase(),
      address: +selectedAddress?.id,
      order_items: cartItem?.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      })),
    };
    if (
      selectedAddress == null ||
      selectedCourier == null ||
      selectedService == null
    ) {
      alert("Please select delivery options");
    } else {
      const response = await createOrderApi(params);
      console.log(response);

      if (response.data == null) {
        alert("Something went wrong, please try again");
      } else {
        await resetCart();
        router.push(`/order/${response.data.id}`);
      }
    }
  }

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-2xl font-bold mb-4">CHECKOUT</h1>
      <div className="main-container flex flex-wrap gap-20">
        <div className="delivery-option flex flex-col flex-grow flex-wrap gap-4 p-4 border border-solid">
          <h2 className="text-xl font-bold">DELIVERY OPTION</h2>
          <div className="flex flex-grow flex-wrap justify-between gap-4">
            {/* address */}
            <div className="flex flex-col flex-grow gap-4">
              <div>
                <select
                  className="select select-bordered w-full max-w-xs"
                  onChange={handledAddress}
                >
                  <option value={0} disabled={disableAddressOption}>
                    Select address
                  </option>
                  {address?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>
              {/* couriers */}
              <div>
                <select
                  className="select select-bordered w-full max-w-xs"
                  onChange={handleCourier}
                >
                  <option value={0} disabled={disableCourierOption}>
                    Select address
                  </option>
                  <option value="jne">JNE</option>
                  <option value="pos">POS</option>
                  <option value="tiki">TIKI</option>
                </select>
              </div>
              {/* services */}
              <div>
                <select
                  className="select select-bordered w-full max-w-xs"
                  onChange={handleService}
                  disabled={disableServiceSelection}
                >
                  <option value={0} disabled={disableServiceOption}>
                    Select address
                  </option>
                  {ShippingCostData?.map((item) => (
                    <option
                      key={item.service}
                      value={item.cost[0].value + "-" + item.service}
                    >
                      {item.service}: estimated {item.cost[0].etd}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col flex-grow gap-4">
              <div className="border border-solid">
                Store
                <div>
                  {cart && <p>{cart?.store.name}</p>}
                  {cart && <p>{cart?.store.street_address}</p>}
                  {cart && <p>{cart?.store.city.name} City</p>}
                  {cart && <p>{cart?.store.province} Province</p>}
                </div>
              </div>
              <div className="divider">Send To</div>
              <div className="border border-solid">
                <div>
                  <p>{selectedAddress?.title}</p>
                  <p>{selectedAddress?.street_address}</p>
                  {selectedAddress && <p>{selectedAddress?.city.name} City</p>}
                  {selectedAddress && (
                    <p>{selectedAddress?.province} Province</p>
                  )}
                  <p>{selectedAddress?.postal_code}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button className="btn btn-primary w-full" onClick={handleOrder}>
              Continue To Payment
            </button>
          </div>
        </div>
        <div className="order-summary flex flex-col flex-grow lg:max-w-[420px] gap-4">
          <div className="flex flex-col gap-4 p-4 border border-solid">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">ORDER SUMMARY</h2>
              <Link className="text-xl font-bold" href={"/cart"}>
                EDIT
              </Link>
            </div>
            <div className="text-md">
              <p>TOTAL ITEM(S): {totalQuantity}</p>
              <p>SUB TOTAL PRICE: {convertToRupiah(subTotalPrice)}</p>
              <p>TOTAL WEIGHT: {cart?.total_weight} g</p>
              {selectedService && (
                <p>
                  TOTAL SHIPPING COST:{" "}
                  {convertToRupiah(parseInt(selectedService?.split("-")[0]))}
                </p>
              )}
              <div className="divider">TOTAL PRICE</div>

              {selectedService && (
                <p className="font-bold">
                  {convertToRupiah(
                    subTotalPrice + parseInt(selectedService?.split("-")[0])
                  )}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4 border border-solid">
            <h2 className="text-xl font-bold">ORDER ITEM&#40;S&#41;</h2>
            <div className="flex gap-2 flex-wrap">
              {cartItem?.map((item) => (
                <div key={item.id}>
                  {item.product.name}
                  <img src="/placeholderimage.png" alt="product image" />
                  QUANTITY: {item.quantity}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
