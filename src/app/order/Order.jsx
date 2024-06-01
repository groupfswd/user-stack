"use client";

import { getAllOrderApi } from "@/fetch/order";
import { useState, useEffect, useCallback } from "react";
import { convertToRupiah } from "@/lib/convertRupiah";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import Link from "next/link";
export default function OrderPage() {
  const [orderData, setOrderData] = useState(null);
  const [orderItems, setOrderItems] = useState(null);

  const [sortDisabled, setSortDisabled] = useState(false);
  const [filterDisabled, setFilterDisabled] = useState(false);
  const [totalPagesArray, setTotalPagesArray] = useState([]);
  const [activeButton, setActiveButton] = useState(null);
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
    }
    fetchOrder();
  }, []);

  useEffect(() => {
    if (orderData) {
      setOrderItems(orderData.data);
    }
  }, [orderData]);

  useEffect(() => {
    setTotalPagesArray([]);
    let x = [];
    if (orderItems) {
      for (let i = 1; i <= orderData.totalPages; i++) {
        x.push(i);
      }
      setTotalPagesArray(x);
    }
  }, [orderItems]);

  const handleSort = async (event) => {
    setSortDisabled(true);
    const sortBy = event.target.value;
    const params = createQueryString("sort_by", sortBy);
    const updateUrl = `${Pathname}?${params}`;
    router.push(updateUrl);
    const response = await getAllOrderApi(params);
    setOrderData(response);
    router.refresh();
  };

  const handleFilter = async (event) => {
    setFilterDisabled(true);
    const filterBy = event.target.value;
    const params = createQueryString("filter_status", filterBy);
    console.log(params);
    const updateUrl = `${Pathname}?${params}`;
    router.push(updateUrl);

    const response = await getAllOrderApi(params);
    setOrderData(response);
    router.refresh();
  };

  const handlePage = async (event) => {
    const page = event.target.value;
    setActiveButton(event.target.value);
    const params = createQueryString("page", page);
    const updateUrl = `${Pathname}?${params}`;
    router.push(updateUrl);
    const response = await getAllOrderApi(params);
    setOrderData(response);
    router.refresh();
  };

  useEffect(() => {
    if (orderData) {
      console.log(orderData);
    }
  }, [orderItems]);

  return (
    <div className="xl:w-1/2 lg:w-9/12 md:w-11/12 sm:w-11/12 mx-auto mt-10 flex flex-col tracking-wide">
      <div className="flex justify-between items-end mb-5 p-2">
        <h1 className="text-3xl font-bold">Order</h1>
        <div className=" flex gap-2">
          <select className="select select-bordered" onChange={handleSort}>
            <option value={0} disabled={sortDisabled}>
              Sort By:
            </option>
            <option value={"created_at asc"}>Created At Asc</option>
            <option value={"created_at desc"}>Created At Desc</option>
            <option value={"updated_at asc"}>Updated At Asc</option>
            <option value={"updated_at desc"}>Updated At Desc</option>
          </select>

          <select className="select select-bordered" onChange={handleFilter}>
            <option value={0} disabled={filterDisabled}>
              Order By Status:
            </option>
            <option value={""}>All</option>
            <option value={"cancelled"}>Cancelled</option>
            <option value={"waiting_payment"}>Waiting Payment</option>
            <option value={"waiting_approval"}>Waiting Approval</option>
            <option value={"approved"}>Approved</option>
            <option value={"shipping"}>Shipping</option>
            <option value={"delivered"}>Delivered</option>
            <option value={"completed"}>Completed</option>
          </select>
        </div>
      </div>
      {/* full order */}
      <div className="flex flex-col gap-4">
        {orderItems?.map((item) => (
          <div key={item.id} className="card flex rounded-none p-2 border-b">
            {/* text */}

            <div className="flex gap-4 items-center justify-between mb-2">
              <h2 className="text-xl font-bold">ID: {item.id}</h2>
              <Link className="underline font-bold" href={`/order/${item.id}`}>
                See order detail
              </Link>
            </div>

            <div className="flex gap-10 items-center">
              <div className="flex flex-col gap-4 mt-5">
                <img
                  src={item.order_items[0].product.image}
                  alt="Product Image"
                />
                {item.order_items.length > 1 && (
                  <p className="text-sm text-gray-600">
                    + {item.order_items.length - 1} More
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-xl">
                  Total Price:{" "}
                  {convertToRupiah(item.total_price + item.shipping_cost)}
                </p>
                <p className="text-sm">
                  Created At:{" "}
                  {new Date(item.created_at).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                  {"  "}(
                  {new Date(item.created_at).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                  )
                </p>
                <p className="text-sm">
                  Updated At:{" "}
                  {new Date(item.updated_at).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                  {"  "}(
                  {new Date(item.updated_at).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                  )
                </p>

                {item.status === "completed" && (
                  <p className="text-white p-1 bg-[limegreen] text-center">
                    {" "}
                    {item.status.split("_").join(" ")}
                  </p>
                )}
                {item.status === "delivered" && (
                  <p className="text-white p-1 bg-[limegreen] text-center">
                    {" "}
                    {item.status.split("_").join(" ")}
                  </p>
                )}

                {item.status === "cancelled" && (
                  <p className="bg-red text-white p-1 text-center">
                    {" "}
                    {item.status.split("_").join(" ")}
                  </p>
                )}

                {item.status === "waiting_payment" && (
                  <p className="bg-[gold] text-white p-1 text-center">
                    {item.status.split("_").join(" ")}
                  </p>
                )}
                {item.status === "waiting_approval" && (
                  <p className="bg-[gold] text-white p-1 text-center">
                    {item.status.split("_").join(" ")}
                  </p>
                )}

                {item.status === "approved" ||
                  (item.status === "shipping" && (
                    <p className="bg-[lightseagreen] text-white p-1 text-center">
                      {item.status.split("_").join(" ")}
                    </p>
                  ))}

                {item.status === "approved" && (
                  <p className="bg-[lightseagreen] text-white p-1 text-center">
                    {item.status.split("_").join(" ")}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-5"></div>
          </div>
        ))}
      </div>

      <div className="join my-5 justify-end" onClick={handlePage}>
        {orderData &&
          totalPagesArray.map((item) => (
            <button
              value={item}
              key={item}
              className={`join-item btn btn-sm ${
                activeButton === item ? "btn-active" : ""
              }`}
            >
              {item}
            </button>
          ))}
      </div>
    </div>
  );
}
