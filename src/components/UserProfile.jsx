import { useEffect, useState } from "react";
import { findUser } from "@/fetch/user";
import { findAddresses } from "@/fetch/address";
import { findCity } from "@/fetch/city";
import { getAllOrderApi, updateOrderApi } from "@/fetch/order";
import { convertToRupiah } from "@/lib/convertRupiah";
import Link from "next/link";
import Image from "next/image";

export default function UserPage() {
  const [user, setUser] = useState("");
  const [address, setAddress] = useState("");
  const [cityName, setCityName] = useState("");
  const [orders, setOrders] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userData = await findUser();
      const addressesData = await findAddresses();
      const firstAddress = addressesData.sort((a, b) => a.id - b.id)[0];
      setUser(userData);
      setAddress(firstAddress);
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchCity = async () => {
      if (address.city_id) {
        try {
          const cityData = await findCity(address.city_id);
          if (cityData && cityData.name) {
            setCityName(cityData.name);
          }
        } catch (error) {}
      }
    };

    fetchCity();
  }, [address.city_id]);

  useEffect(() => {
    const fetchOrders = async () => {
      const orderData = await getAllOrderApi({ sort_by: "created_at desc" });
      setOrders(orderData);
    };

    fetchOrders();
  }, []);

  const handleCompleteOrder = async (e) => {
    e.preventDefault();
    const orderId = orders.data[0].id;
    const data = {
      status: "delivered",
    };
    await updateOrderApi(orderId, data);
    const orderData = await getAllOrderApi({ sort_by: "created_at desc" });
    setOrders(orderData);
  };

  function statusStyle(status) {
    switch (status) {
      case "cancelled":
        return { background: "red", text: "Cancelled" };
      case "waiting_payment":
        return { background: "gold", text: "Waiting for Payment" };
      case "waiting_approval":
        return { background: "gold", text: "Waiting for Approval" };
      case "approved":
        return { background: "lightseagreen", text: "Approved" };
      case "shipping":
        return { background: "lightseagreen", text: "Shipping" };
      case "delivered":
        return { background: "limegreen", text: "Delivered" };
      case "completed":
        return { background: "limegreen", text: "Completed" };
      default:
        return { background: "red", text: "Unknown Status" };
    }
  }

  return (
    <div>
      <div className="justify-center m-5 tracking-wide leading-relaxed">
        <div className="p-5 text-left relative">
          <p className="text-2xl font-bold pb-3">{user.fullname}</p>
          <p className="text-medium font-medium">{user.email}</p>
          <p className="text-medium font-medium">{user.phone_number}</p>
          <Link href="/user/edit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="black"
              className="w-6 h-6 absolute right-5 top-6 cursor-pointer"
            >
              <path
                fillRule="evenodd"
                d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>

        <div className="bg-gray-300 rounded-lg p-5 relative">
          <p className="text-2xl font-bold pb-3">Shipping Address (Default)</p>
          <p className="text-xl font-medium">{address.title}</p>
          <p className="font-medium">{address.street_address}</p>
          <p className="font-medium">
            {address.province}, {cityName}
          </p>
          <p className="font-medium">{address.postal_code}</p>
          <Link href="/user/addresses">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="black"
              className="w-6 h-6 absolute right-5 top-5 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </Link>
        </div>

        <div className="justify-center m-5">
          <div className="text-2xl font-bold pb-5 relative">
            Latest Order{" "}
            <div className="absolute text-sm right-3 top-1">
              <Link href="/order">
                <u>See More</u>
              </Link>
            </div>
          </div>

          <div>
            {orders.data &&
              orders.data.map((order, index) => {
                const status = statusStyle(order.status);
                return (
                  <div
                    className="border-b mb-5 pb-5 relative left-0"
                    key={index}
                  >
                    <Image
                      src={order?.product?.[0]?.image}
                      width={100}
                      height={100}
                      alt="Product Image"
                    />
                    <div className="absolute top-0 left-28">
                      <p>
                        {new Date(order.created_at).toLocaleDateString(
                          "en-US",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                        {"  "}(
                        {new Date(order.created_at).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}
                        )
                      </p>
                      <p>{convertToRupiah(order.total_price + order.shipping_cost)}</p>
                      <p>
                        {order.courier}, {order.shipping_method}
                      </p>
                      <p className="text-sm">
                        <Link href="/order/[id]" as={`/order/${order.id}`}>
                          {" "}
                          (click here for order detail){" "}
                        </Link>
                      </p>
                    </div>
                    <p
                      className="absolute right-3 top-0"
                      style={{ background: status.background }}
                    >
                      {status.text}
                    </p>
                    {order.status === "shipping" && (
                      <button onClick={handleCompleteOrder} className="btn btn-success text-white absolute right-3 top-10">
                        Complete Order
                      </button>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
