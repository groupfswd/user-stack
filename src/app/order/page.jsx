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
    console.log(activeButton);
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
  return (
    <div className="container mx-auto mt-10 flex flex-col text-gray-600">
      <div className="flex justify-between items-end mb-5">
        <h1 className="text-3xl font-bold">ORDER</h1>
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
      <div className="join my-5 justify-end" onClick={handlePage}>
        {orderData &&
          totalPagesArray.map((item) => (
            <button
              value={item}
              key={item}
              // className={"join-item btn btn-sm"}
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
