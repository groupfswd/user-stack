"use client";

import { getAllOrderApi } from "@/fetch/order";
import { useState, useEffect, useCallback } from "react";
import { convertToRupiah } from "@/lib/convertRupiah";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import Link from "next/link";
export default function OrderPage() {
  const [orderData, setOrderData] = useState(null);
  const [orderItems, setOrderItems] = useState(null);

  const router = useRouter();
  const Pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },

    [searchParams]
  );

  useEffect(() => {
    async function fetchOrder() {
      const response = await getAllOrderApi();
      setOrderData(response);
      setOrderItems(response.data);
    }
    fetchOrder();
  }, []);

  const handleSort = async (event) => {
    const sortBy = event.target.value;
    const params = createQueryString("sort_by", sortBy);
    const updateUrl = `${Pathname}?${params}`;
    router.push(updateUrl, undefined, { replace: true });
    const response = await getAllOrderApi(params);
    console.log(response);
    setOrderItems(response.data);
    router.refresh();
  };
  return (
    <div className="container mx-auto mt-10 flex flex-col text-gray-600">
      <div className="flex justify-between items-end mb-5">
        <h1 className="text-3xl font-bold">ORDER</h1>
        <div className=" flex gap-2">
          <select className="select select-bordered" onChange={handleSort}>
            <option value={0}>Sort By:</option>
            <option value={"created_at asc"}>Created At Asc</option>
            <option value={"created_at desc"}>Created At Desc</option>
            <option value={"updated_at asc"}>Updated At Asc</option>
            <option value={"updated_at desc"}>Updated At Desc</option>
          </select>
          <select className="select select-bordered">
            <option value={0}>Order By Status:</option>
            <option value={"cancelled"}>Cancelled</option>
            <option value={"waiting_payment"}>Waiting Payment</option>
            <option value={"waiting_approval"}>Waiting Approval</option>
            <option value={"approved"}>Approved</option>
            <option value={"shipping"}>Shipping</option>
            <option value={"delivered"}>Delivered</option>
            <option value={"completed"}>Completed</option>
          </select>
          <input
            type="text"
            placeholder="Find your order id here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
      </div>
      {/* full order */}
      {orderItems?.map((item) => (
        <div
          key={item.id}
          className="card card-side rounded-none p-2 border flex"
        >
          <div className="flex flex-col flex-grow">
            <h2>Order id: {item.id}</h2>

            {/* order items */}
            {item.order_items.map((item) => (
              <div key={item.id} className="card card-side rounded-none">
                <figure>
                  <img src="/placeholderimage.png" alt="" className="w-20" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-gray-600">
                    {item.product.name} x {item.quantity}
                  </h2>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 items-end justify-between">
            <Link
              className="btn btn-sm btn-primary-content"
              href={`/order/${item.id}`}
            >
              Details
            </Link>
            <p className="text-sm">
              Created At: {new Date(item.created_at).toDateString()}
            </p>
            <p className="text-sm">
              Updated At: {new Date(item.updated_at).toDateString()}
            </p>
            {item.status !== "delivered" ? (
              <p className="text-warning">
                Status: {item.status.split("_").join(" ")}
              </p>
            ) : (
              <p className="text-success">Status: Delivered</p>
            )}

            <p className="text-2xl font-bold">
              Total: {convertToRupiah(item.total_price)}
            </p>
          </div>
        </div>
      ))}
      <div className="join my-5 justify-end">
        <button className="join-item btn btn-sm">1</button>
        <button className="join-item btn btn-sm btn-active">2</button>
        <button className="join-item btn btn-sm">3</button>
        <button className="join-item btn btn-sm">4</button>
      </div>
    </div>
  );
}
