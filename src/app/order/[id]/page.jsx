"use client";

import { getDetailOrderApi } from "@/fetch/order";
import { convertToRupiah } from "@/lib/convertRupiah";
import { useEffect, useState } from "react";
import { findAddress } from "@/fetch/address";

export default function OrderPage({ params }) {
  const id = params.id;
  const [orderData, setOrderData] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    async function fetchOrder() {
      const response = await getDetailOrderApi(id);
      setOrderData(response);
    }
    fetchOrder();
  }, []);
  // calculate total quantity
  useEffect(() => {
    if (orderData) {
      setTotalQuantity(
        orderData.order_items.reduce((acc, item) => acc + item.quantity, 0)
      );
    }
  }, [orderData]);

  useEffect(() => {
    async function fetchAdress() {
      const response = await findAddress(orderData?.address);
      setAddress(response);
    }
    fetchAdress();
  }, [orderData]);
  return (
    <div className="container mx-auto my-10">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-bold">ORDER DETAIL</h1>
          </div>
          <div>
            <p>Order ID: {orderData?.id}</p>
            <p>Status: {orderData?.status.split("_").join(" ")}</p>
          </div>
        </div>
        <div className="flex gap-4 border border-solid p-4">
          <div>
            <p>Nama: {orderData?.user.fullname}</p>
            <p>Email: {orderData?.user.email}</p>
            <p>Phone: {orderData?.user.phone_number}</p>
          </div>
          <div className="divider divider-horizontal"></div>
          <div>
            <h1 className="text-lg">Send to address: {address?.title}</h1>
            {address && (
              <p>
                {address?.street_address}, {address?.city.name} City,
                {address?.province} Province,
                {address?.postal_code}
              </p>
            )}
          </div>
        </div>
        <div className="border border-solid p-4">
          <div>Products</div>
          <div className="flex gap-4">
            {orderData?.order_items.map((item) => (
              <div key={item.id}>
                <p>{item.product.name}</p>
                <img src="/placeholderimage.png" alt="placeholder" />
                <p>{convertToRupiah(item.price)}</p>
                <p>quantity: {item.quantity}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-solid p-4">
          <div>
            <div className="flex gap-4">
              <div>
                <p>Total quantity: {totalQuantity}</p>
                <p>Sub Total: {orderData?.total_price}</p>
                <p>Total Wight: {orderData?.total_weight} g</p>
                <p>Shipping Cost: {orderData?.shipping_cost}</p>
              </div>
              <div className="divider divider-horizontal"></div>
              <div>
                <p>Store Name: {orderData?.store.name}</p>
                <p>Bank Name: {orderData?.store.bank_name}</p>
                <p>Bank Account: {orderData?.store.bank_account}</p>
                <p>
                  Store Address: {orderData?.store.street_address},{" "}
                  {orderData?.store.city.name} City, {orderData?.store.province}{" "}
                  Province, {orderData?.store.postal_code}
                </p>
              </div>
            </div>

            <div className="divider"></div>

            <p>
              Total price:{" "}
              {convertToRupiah(
                orderData?.total_price + orderData?.shipping_cost
              )}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <input type="file" accept="image/*" />
          <button className="max-w-full btn btn-primary">
            Send Payment Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
