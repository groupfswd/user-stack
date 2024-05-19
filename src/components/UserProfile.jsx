import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { findUser } from "@/fetch/user";
import { findAddress } from "@/fetch/address";
import { findCity } from "@/fetch/city";

export default function UserPage() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [address, setAddress] = useState("");
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userData = await findUser();
      const addressData = await findAddress(1);
      setUser(userData);
      setAddress(addressData);
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
        } catch (error) {
          console.error("Error fetching city:", error);
        }
      }
    };

    fetchCity();
  }, [address.city_id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  if (!address) {
    return <div>Address not found</div>;
  }

  return (
    <div>
      <div className="justify-center m-5 tracking-wide leading-relaxed">
        <div className="p-5 text-left relative">
          <p className="text-2xl font-bold pb-3">{user.fullname}</p>
          <p className="text-medium font-medium">{user.email}</p>
          <p className="text-medium font-medium">{user.phone_number}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="black"
            className="w-6 h-6 absolute right-5 top-6 cursor-pointer"
            onClick={() => router.push("/user/edit")}
          >
            <path
              fillRule="evenodd"
              d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="bg-gray-300 rounded-lg p-5 relative">
          <p className="text-2xl font-bold pb-3">Shipping Address (Default)</p>
          <p className="text-xl font-medium">{address.title}</p>
          <p className="font-medium">{address.street_address}</p>
          <p className="font-medium">
            {address.province}, {cityName}
          </p>
          <p className="font-medium">{address.postal_code}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="black"
            className="w-6 h-6 absolute right-5 top-5 cursor-pointer"
            onClick={() => router.push("/user/addresses")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
