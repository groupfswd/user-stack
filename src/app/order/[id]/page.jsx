"use client";

import {
  getDetailOrderApi,
  updateOrderApi,
  uploadOrderApi,
} from "@/fetch/order";
import { convertToRupiah } from "@/lib/convertRupiah";
import { useEffect, useState } from "react";
import { findAddress } from "@/fetch/address";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updateOrderItemsApi } from "@/fetch/orderItems";
import { createReview } from "@/fetch/review";

export default function OrderPage({ params }) {
  const id = params.id;
  const [orderData, setOrderData] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [address, setAddress] = useState(null);
  const [image, setImage] = useState(null);
  const [finalDate, setFinalDate] = useState(null);
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(null);
  const [productChoosed, setProductChoosed] = useState(null);
  const [disableRating, setDisableRating] = useState(false);

  const router = useRouter();

  const status = [];

  useEffect(() => {
    async function fetchOrder() {
      const response = await getDetailOrderApi(id);
      setOrderData(response);
    }
    fetchOrder();
  }, []);

  useEffect(() => {
    if (orderData) {
      let event = new Date(orderData?.created_at);
      let newEvent = new Date(event.setDate(event.getDate() + 3));
      setFinalDate(newEvent);
    }
  }, [orderData]);
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
    if (orderData) {
      fetchAdress();
    }
  }, [orderData]);

  async function handleSubmitPayment(e) {
    if (!image) {
      return alert("Please upload your image");
    }
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    const response = await uploadOrderApi(formData);
    const updateResponse = await updateOrderApi(id, {
      status: "waiting_approval",
      image_url: response.image,
    });

    window.location.reload();
  }

  async function handleDelivered() {
    const response = await updateOrderApi(id, {
      status: "delivered",
      delivered_at: new Date(),
    });
    window.location.reload();
  }

  async function handleReview(e) {
    e.preventDefault;
    const params = {
      product_id: +productChoosed.split(" ")[0],
      comments: review,
      rating: rating,
    };
    const id = +productChoosed.split(" ")[1];
    console.log(id, "id");
    try {
      const response = await createReview(params);
      console.log(response);
      const update = await updateOrderItemsApi({ id });
      console.log(update);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (productChoosed) {
      console.log(productChoosed, "<<<<<<");
    }
  }, [productChoosed]);

  return (
    <div className="container bordermx-auto my-5 text-gray-600">
      <Link className="mb-5 btn btn-sm btn-primary-content" href="/order">
        BACK
      </Link>
      <div className="flex flex-col gap-4 border p-2">
        <div className="flex justify-between">
          <div className="">
            <h1 className="text-2xl font-bold">ORDER DETAIL</h1>
          </div>
          <div>
            <p>Order ID: {orderData?.id}</p>
            <p>Status: {orderData?.status.split("_").join(" ")}</p>
          </div>
        </div>

        <div className="divider divider-vertical"></div>

        <div className="flex flex-col text-center">
          {orderData && (
            <ul className="steps w-full pb-10">
              <li className="step step-info">Order Created</li>
              <li className="step step-info">Payment</li>
              <li
                className={`step ${
                  status.includes(orderData?.status) ? "step-info" : ""
                }`}
              >
                Waiting approval
              </li>
              <li
                className={`step ${
                  status.includes(orderData?.status) ? "step-info" : ""
                }`}
              >
                Approved
              </li>
              <li
                className={`step ${
                  status.includes(orderData?.status) ? "step-info" : ""
                }`}
              >
                Shipping
              </li>
              <li
                className={`step ${
                  status.includes(orderData?.status) ? "step-info" : ""
                }`}
                data-content="✓"
              >
                Delivered
              </li>
            </ul>
          )}
          {orderData?.status === "waiting_approval" && (
            <p className="text-xl text-success">
              We have received your payment and are currently in the process of
              verifying it. Thank you for your patience.
            </p>
          )}
          {orderData?.status === "waiting_payment" && (
            <div>
              <p className="text-xl text-error">
                The information regarding your payment can be found below. We
                kindly ask for your attention to ensure everything is processed
                smoothly.
              </p>
              <p className="text-xl text-error">
                Thank you for your cooperation!
              </p>
            </div>
          )}
          {orderData?.status === "shipping" && (
            <div className="flex flex-col gap-4">
              <p className="text-xl ">
                Your product is now shipping and should arrive soon. We
                appreciate your patience and hope you enjoy your purchase!
              </p>
              {orderData?.status === "shipping" && (
                <button
                  className="btn btn-info w-full"
                  onClick={handleDelivered}
                >
                  Delivered
                </button>
              )}
              <p className="text-error">
                &#42;Please hit the button only if you have received your order.
                Thank you for your cooperation!&#42;
              </p>
            </div>
          )}

          {orderData?.status === "delivered" && (
            <div className="flex flex-col gap-4">
              <p className="text-xl ">
                Your product has been delivered. please review the product
              </p>
            </div>
          )}
        </div>

        <div className="divider divider-vertical"></div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <h1 className="text-2xl font bold">Delivery Address</h1>
            <h1 className="">Delivery Service: {orderData?.shipping_method}</h1>
          </div>
          <div className="">
            <p>Nama: {orderData?.user.fullname}</p>
            <p>Email: {orderData?.user.email}</p>
            <p>Phone: {orderData?.user.phone_number}</p>
          </div>
          <div className="divider divider-horizontal"></div>
          <div>
            <h1 className="text-lg">Send to address: {address?.title}</h1>
            {address && (
              <p className="">
                {address?.street_address}, {address?.city.name} City,
                {address?.province} Province,
                {address?.postal_code}
              </p>
            )}
          </div>
        </div>
        <hr />
        <div>
          <h1 className="text-2xl">Products</h1>
          <div className="flex gap-4 text-grey-600 flex-col">
            {orderData?.order_items.map((item, index) => (
              <div key={item.id}>
                <div
                  className="card card-side rounded-none border p-2 items-center"
                  onClick={router.forward(`/product/${item.product.id}`)}
                >
                  <figure>
                    <img src="/placeholderimage.png" alt="placeholder" />
                  </figure>
                  <div className="card-body">
                    <p className="card-title">
                      Product {index + 1}: {item.product.name}
                    </p>
                    <p>{convertToRupiah(item.price)}</p>
                    <p>quantity: {item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* review */}
          {orderData?.status === "delivered" && (
            <div className="card-actions my-5">
              <h1 className="text-2xl mb-5">Review</h1>
              <div className="flex flex-col gap-4 w-full">
                <div className="flex justify-between gap-2 flex-wrap">
                  <div className="flex items-center flex-grow gap-2">
                    <p>Choose Product: </p>{" "}
                    <select
                      className="select select-bordered w-full"
                      onChange={(e) => setProductChoosed(e.target.value)}
                    >
                      {orderData?.order_items.map((item, index) => (
                        <option
                          key={item.id}
                          value={item.product_id + " " + item.id}
                        >
                          Product {index + 1}:{item.product.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center flex-grow gap-2">
                    <p>Rating: </p>

                    <select
                      className="select select-bordered w-full"
                      onChange={(e) => setRating(Number(e.target.value))}
                    >
                      <option value={0} disabled={disableRating}>
                        Select Rating
                      </option>
                      <option value={5}>5 - Excelent</option>
                      <option value={4}>4 - Very good</option>
                      <option value={3}>3 - Good</option>
                      <option value={2}>2 - Fair</option>
                      <option value={1}>1 - Poor</option>
                    </select>
                  </div>
                </div>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Leave a review"
                  onChange={(e) => setReview(e.target.value)}
                ></textarea>

                <button
                  className="btn btn-warning"
                  type="submit"
                  onClick={handleReview}
                >
                  Leave a review
                </button>
              </div>
            </div>
          )}
        </div>

        <div>
          {orderData && (
            <div>
              <div className="flex justify-between flex-wrap">
                {/* store */}
                <div className="flex flex-col gap-2 ">
                  <h1 className="text-2xl mb-5">Store Address</h1>
                  <p>Store Name: {orderData?.store.name}</p>
                  <p>Bank Name: {orderData?.store.bank_name}</p>
                  <p>Bank Account Number: {orderData?.store.bank_account}</p>
                  <p>Store Contact: {orderData?.store.phone_number}</p>
                  <h1>Store Address</h1>
                  <p>
                    {orderData?.store.street_address},{" "}
                    {orderData?.store.city.name} City,{" "}
                    {orderData?.store.province} Province,{" "}
                    {orderData?.store.postal_code}
                  </p>
                </div>
                {/* order */}
                <div className="flex flex-col items-end">
                  <div>
                    <h1 className="text-2xl">Order Summary</h1>
                  </div>
                  <table className="table text-lg ">
                    <tbody className="text-right">
                      <tr>
                        <td>Total quantity:</td>
                        <td>{totalQuantity}</td>
                      </tr>
                      <tr>
                        <td>Total Weight:</td>
                        <td>{orderData?.total_weight} gram</td>
                      </tr>
                      <tr>
                        <td>Sub Total</td>
                        <td>{convertToRupiah(orderData?.total_price)}</td>
                      </tr>
                      <tr>
                        <td>Shipping Cost:</td>
                        <td>{convertToRupiah(orderData?.shipping_cost)}</td>
                      </tr>
                      <tr>
                        <td>Total Price:</td>
                        <td className="text-2xl text-error">
                          {convertToRupiah(
                            orderData?.total_price + orderData?.shipping_cost
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {finalDate && orderData?.status === "waiting_payment" && (
                <p className="text-red-500 text-xl text-center">
                  &#42;&#42; Please pay your order before {finalDate.toString()}
                  &#42;&#42;
                </p>
              )}
            </div>
          )}
        </div>

        {/* payment */}
        {orderData?.status === "waiting_payment" && (
          <div>
            <hr className="mb-5" />
            <div className="mb-5">
              <form
                onSubmit={handleSubmitPayment}
                className="flex flex-col gap-4"
              >
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="file-input file-input-bordered w-full max-w-xs"
                />

                <button type="submit" className="max-w-full btn btn-error">
                  Send Payment Receipt
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
