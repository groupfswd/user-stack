"use client";

import { getAllOrderApi } from "@/fetch/order";
import { useState, useEffect } from "react";
import { convertToRupiah } from "@/lib/convertRupiah";
import { useSearchParams } from "next/navigation";

import Link from "next/link";
export default function OrderPage() {
  const [orderData, setOrderData] = useState(null);
  const [orderItems, setOrderItems] = useState(null);
  const [searchQueryParams, setSearchQueryParams] = useSearchParams({
    q: "",
  });
  const q = searchQueryParams.get("q");

  useEffect(() => {
    async function fetchOrder() {
      const response = await getAllOrderApi();
      setOrderData(response);
      setOrderItems(response.data);
    }
    fetchOrder();
  }, []);

  useEffect(() => {
    if (orderData) {
      console.log(orderData);
    }
  }, [orderData]);

  useEffect(() => {
    console.log(orderData);
  }, [orderData]);

  return (
    <div className="container mx-auto">
      <div>
        <input
          type="text"
          id="q"
          value={q}
          onChange={(e) =>
            setSearchQueryParams(
              (prev) => {
                prev.set("q", e.target.value);
                return prev;
              },
              { replace: true }
            )
          }
        />
      </div>
      {orderItems?.map((item) => (
        <div
          key={item.id}
          className="card card-side rounded-none p-2 border flex flex-col"
        >
          {item.order_items.map((item) => (
            <div key={item.id} className="card card-side flex flex-col">
              <div className="card-body">
                <figure>
                  <img src="/placeholderimage.png" alt="" className="w-40" />
                </figure>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
