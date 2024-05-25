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

  return (
    <div className="container mx-auto">
      <div className="overflow-x-auto">
        <table className="table text-left">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Order Id</th>
              <th>Product</th>
              <th>Total price</th>
              <th>Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {orderData?.data.map((order, index) => (
              <tr key={order.id} className="hover">
                <td>{index + 1}</td>
                <td>{order.id}</td>
                <td>{order.order_items.map((item) => item.product.name)}</td>
                <td>{convertToRupiah(order.total_price)}</td>
                <td>{order.status.split("_").join(" ")}</td>
                <td className="text-right">
                  <Link href={`/order/${order.id}`} className="btn">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
