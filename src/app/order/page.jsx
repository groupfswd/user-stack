"use client";

import { getAllOrderApi } from "@/fetch/order";
import { useState, useEffect } from "react";
import { convertToRupiah } from "@/lib/convertRupiah";
import Link from "next/link";
export default function OrderPage() {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    async function fetchOrder() {
      const response = await getAllOrderApi();
      setOrderData(response);
    }
    fetchOrder();
  }, []);

  useEffect(() => {
    console.log(orderData);
  }, [orderData]);

  return (
    <div>
      {orderData && (
        <div className="container mx-auto">
          {orderData?.data.map((item) => (
            <div
              key={item.id}
              className="card card-side rounded-none border p-2 items-center"
            >
              {orderData?.data.order_items[item].map((item) => (
                <div key={item.id}>
                  <p>{item.product.name}</p>
                  <p>{item.product.price}</p>
                  <p>{item.quantity}</p>
                </div>
              ))}
              <div></div>
            </div>
          ))}

          <div className="join"></div>
        </div>
      )}
    </div>
  );
}
