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
import { createReview, getReviewByItemId, updateReview } from "@/fetch/review";

export default function OrderPage({ params }) {
  const id = params.id;
  const [orderData, setOrderData] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [address, setAddress] = useState(null);
  const [image, setImage] = useState(null);
  const [finalDate, setFinalDate] = useState(null);
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(null);
  const [reviewData, setReviewData] = useState(null);
  const [step, setStep] = useState(null);
  const [completed, setCompleted] = useState(null);

  const router = useRouter();

  const status = [
    "waiting_payment",
    "waiting_approval",
    "approved",
    "shipping",
    "delivered",
    "completed",
  ];

  useEffect(() => {
    document.title = "Order Details";
  }, []);

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
      const response = await findAddress(orderData?.address_id);
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

  async function handleReview(productId, itemOrderId) {
    const params = {
      product_id: productId,
      comments: review,
      rating: rating,
      order_item_id: itemOrderId,
    };
    const id = itemOrderId;
    if (rating === null || rating === 0) {
      alert("Please select rating first");
    } else {
      try {
        const response = await createReview(params);
        setReview(null);
        setRating(null);
        const update = await updateOrderItemsApi({ id });
        if (update) {
          window.location.reload();
        }
      } catch (err) {
        alert("Something went wrong, please try again");
      }
    }
  }

  useEffect(() => {
    if (orderData) {
      const index = status.indexOf(orderData.status);
      setStep(index);
    }
  }, [orderData]);

  useEffect(() => {
    if (orderData) {
      const allItemsReviewed = orderData.order_items.every(
        (item) => item.is_reviewed
      );
      if (allItemsReviewed === true) {
        setCompleted(true);
      }
    }
  }, [orderData]);

  async function handleSeeReview(itemId) {
    const response = await getReviewByItemId(itemId);
    setReviewData(response);
    document.getElementById(itemId).showModal();
  }

  async function handleUpdateReview() {
    const params = {
      data: {
        comments: review,
        rating: rating,
      },
      id: +reviewData[0].id,
    };

    const response = await updateReview(params);
    if (response) {
      setReview(null);
      setRating(null);
      window.location.reload();
    }
  }

  async function handleCompletedOrder() {
    const response = await updateOrderApi(id, {
      status: "completed",
    });
    window.location.reload();
  }

  function handleCloseModal() {
    document.getElementById(reviewData[0].id).close();
    setReviewData(null);
  }

  return (
    <div className="xl:w-1/2 lg:w-9/12 md:w-11/12 sm:w-11/12 mx-auto my-5 tracking-wide">
      <Link className="mb-5 btn btn-sm btn-primary-content" href="/order">
        BACK
      </Link>
      <div className="flex flex-col gap-4 border p-2">
        <div className="flex justify-between">
          <div className="">
            <h1 className="text-2xl font-bold">Order Detail</h1>
          </div>
          <div>
            <p>Order ID: {orderData?.id}</p>
            <p>Status: {orderData?.status.split("_").join(" ")}</p>
          </div>
        </div>

        <hr />

        <div className="flex flex-col text-center">
          {orderData && (
            <ul className="steps w-full mb-5">
              <li className="step step-info">Order Created</li>
              <li className="step step-info">Payment</li>
              <li className={`step ${step > 0 ? "step-info" : ""}`}>
                Waiting approval
              </li>
              <li className={`step ${step > 1 ? "step-info" : ""}`}>
                Approved
              </li>
              <li className={`step ${step > 2 ? "step-info" : ""}`}>
                Shipping
              </li>
              <li className={`step ${step > 3 ? "step-info" : ""}`}>
                Delivered
              </li>
              <li
                className={`step ${step > 4 ? "step-info" : ""}`}
                data-content="✓"
              >
                Completed
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
          {orderData?.status === "approved" && (
            <p className="text-xl text-success">
              Your payment has been successfully verified and your order is now
              being prepared. Thank you for your patience!
            </p>
          )}
          {orderData?.status === "shipping" && (
            <div className="flex flex-col items-center item gap-4">
              <p className="text-xl">
                Your product is now shipping and should arrive soon. We
                appreciate your patience and hope you enjoy your purchase!
              </p>
              {orderData?.status === "shipping" && (
                <button
                  className="btn btn-info w-11/12 text-xl font-bold"
                  onClick={handleDelivered}
                >
                  DELIVERED
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
              {completed ? (
                <div>
                  <button
                    className="btn btn-info w-full"
                    onClick={handleCompletedOrder}
                  >
                    Complete
                  </button>
                  <p className="text-xl mt-2">
                    Just one last step to finish your order
                  </p>
                </div>
              ) : (
                <p className="text-xl">
                  Your product has been delivered. please review the product
                </p>
              )}
            </div>
          )}
          {orderData?.status === "completed" && (
            <div className="flex flex-col gap-4">
              <p className="text-xl ">
                We hope to see you again. Thank you for your purchase!
              </p>
            </div>
          )}
        </div>

        <div className="divider divider-vertical"></div>

        <div className="flex flex-col gap-4 text-lg">
          <h1 className="text-2xl font-bold">Delivery Info</h1>
          <div>
            <table className="table text-lg">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td className="text-right">:</td>
                  <td>{orderData?.user.fullname}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td className="text-right">:</td>
                  <td>{orderData?.user.email}</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td className="text-right">:</td>
                  <td>{orderData?.user.phone_number}</td>
                </tr>
                <tr>
                  <td>Address ({address?.title})</td>
                  <td className="text-right">:</td>
                  {address && (
                    <td>
                      {address?.street_address}, {address?.city.name} City,
                      {address?.province} Province,
                      {address?.postal_code}
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="border flex justify-end gap-4 bg-[#fffcf5]">
        <h1>
          <span className="font-bold">Delivery Service:</span>{" "}
          {orderData?.shipping_method}
        </h1>
        <p>
          {" "}
          <span className="font-bold">Estimated:</span>{" "}
          {orderData?.estimated_day} (days)
        </p>
        {orderData?.no_resi && (
          <p>
            {" "}
            <span className="font-bold">Receipt:</span> {orderData?.no_resi}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-4 border p-2">
        <div>
          <h1 className="text-2xl font-bold mt-5 mb-5">Products</h1>
          <div className="flex gap-4 text-grey-600 flex-col">
            {orderData?.order_items.map((item, index) => (
              <div key={item.id}>
                <div
                  className="card card-side rounded-none border p-2 items-center bg-accent"
                  onClick={router.forward(`/product/${item.product.id}`)}
                >
                  <figure>
                    <img src={item.product.image} alt="placeholder" />
                  </figure>
                  <div className="card-body">
                    <p className="card-title">
                      Product {index + 1}: {item.product.name}
                    </p>
                    <p>{convertToRupiah(item.price)}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  {orderData?.status === "delivered" &&
                    item.is_reviewed === false && (
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() =>
                          document.getElementById(item.id).showModal()
                        }
                      >
                        Review
                      </button>
                    )}
                  {orderData?.status === "delivered" ||
                    (orderData?.status === "completed" &&
                      item.is_reviewed === true && (
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => handleSeeReview(item.id)}
                        >
                          See Review
                        </button>
                      ))}

                  {/* modal */}
                  <dialog id={item.id} className="modal">
                    {item.is_reviewed === true && reviewData && (
                      <div className="modal-box w-11/12 max-w-5xl">
                        <div className="flex flex-col gap-4">
                          <p>Thank you for your feedback!</p>
                          <textarea
                            className="textarea textarea-bordered"
                            placeholder="Write your review here"
                            defaultValue={reviewData[0]?.comments}
                            onChange={(e) => setReview(e.target.value)}
                          ></textarea>
                          <select
                            className="select select-bordered w-full"
                            defaultValue={reviewData[0]?.rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                          >
                            <option value={0}>Select Rating</option>
                            <option value={5}>5 - Excelent</option>
                            <option value={4}>4 - Very good</option>
                            <option value={3}>3 - Good</option>
                            <option value={2}>2 - Fair</option>
                            <option value={1}>1 - Poor</option>
                          </select>
                          <button
                            className="btn btn-warning"
                            onClick={handleUpdateReview}
                          >
                            Update
                          </button>
                          <div className="modal-action">
                            <form method="dialog">
                              <button
                                className="btn"
                                onClick={handleCloseModal}
                              >
                                Close
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}
                    {item.is_reviewed === false && (
                      <div className="modal-box w-11/12 max-w-5xl">
                        <div className="flex flex-col gap-4">
                          <textarea
                            className="textarea textarea-bordered"
                            placeholder="Leave a review"
                            onChange={(e) => setReview(e.target.value)}
                          ></textarea>
                          <select
                            className="select select-bordered w-full"
                            onChange={(e) => setRating(Number(e.target.value))}
                          >
                            <option value={0}>Select Rating</option>
                            <option value={5}>5 - Excelent</option>
                            <option value={4}>4 - Very good</option>
                            <option value={3}>3 - Good</option>
                            <option value={2}>2 - Fair</option>
                            <option value={1}>1 - Poor</option>
                          </select>

                          <button
                            className="btn btn-warning"
                            type="button"
                            onClick={() =>
                              handleReview(item.product.id, item.id)
                            }
                          >
                            Leave a review
                          </button>
                        </div>
                        <div className="modal-action">
                          <form method="dialog">
                            <button className="btn">Close</button>
                          </form>
                        </div>
                      </div>
                    )}
                  </dialog>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          {orderData && (
            <div>
              {/* order */}
              <div className="flex flex-col flex-grow">
                <div className="mt-5">
                  <h1 className="text-2xl font-bold">Order Summary</h1>
                </div>
                <table className="table text-lg border-solid">
                  <tbody className="text-left">
                    <tr>
                      <td>Total quantity</td>
                      <td className="text-right">:</td>
                      <td>{totalQuantity}</td>
                    </tr>
                    <tr>
                      <td>Sub Total:</td>
                      <td className="text-right">:</td>
                      <td>{convertToRupiah(orderData?.total_price)}</td>
                    </tr>
                    <tr>
                      <td>Total Weight</td>
                      <td className="text-right">:</td>
                      <td>{orderData?.total_weight} gram</td>
                    </tr>
                    <tr>
                      <td>Shipping Cost</td>
                      <td className="text-right">:</td>
                      <td>{convertToRupiah(orderData?.shipping_cost)}</td>
                    </tr>
                    <tr>
                      <td className="font-bold">Total Price</td>
                      <td className="text-right">:</td>
                      <td className="text-2xl text-error font-bold">
                        {convertToRupiah(
                          orderData?.total_price + orderData?.shipping_cost
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
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
        {/* store */}
        {orderData?.status === "waiting_payment" && (
          <div>
            <div className="flex flex-col gap-2 ">
              <h1 className="text-2xl mb-5">Store Address</h1>
              <p>Store Name: {orderData?.store.name}</p>
              <p>Bank Name: {orderData?.store.bank_name}</p>
              <p>Bank Account Number: {orderData?.store.bank_account}</p>
              <p>Store Contact: {orderData?.store.phone_number}</p>
              <p>
                Store Address: {orderData?.store.street_address},{" "}
                {orderData?.store.city.name} City, {orderData?.store.province}{" "}
                Province, {orderData?.store.postal_code}
              </p>
            </div>
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
          </div>
        )}
      </div>
    </div>
  );
}
