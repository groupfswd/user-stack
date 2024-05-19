import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { findUser, updateUser } from "@/fetch/user.js";

export default function EditUser() {
  const router = useRouter();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await findUser();
      setFullname(userData.fullname);
      setEmail(userData.email);
      setPhoneNumber(userData.phone_number);
    };
    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const params = {
      fullname,
      email,
      phone_number,
      password,
    };
    const updatedUser = await updateUser(params);
    if (updatedUser) {
      router.push("/user");
    } else {
      setErrors(true);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <div className="flex flex-col md:flex-row items-center mb-5">
        <label className="items-center w-full md:w-40 mr-4">Full Name</label>
        <input
          className="w-full md:w-2/3 border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm"
          name="Full Name"
          type="text"
          placeholder="Enter your Full Name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          minLength="3"
          required
        ></input>
      </div>
      <div className="flex flex-col md:flex-row items-center mb-5">
        <label className="items-center w-full md:w-40 mr-4">Email</label>
        <input
          className="w-full md:w-2/3 border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm"
          name="Email"
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>
      </div>
      <div className="flex flex-col md:flex-row items-center mb-5">
        <label className="items-center w-full md:w-40 mr-4">Phone Number</label>
        <input
          className="w-full md:w-2/3 border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm"
          name="Phone Number"
          type="tel"
          placeholder="Enter your Phone Number"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        ></input>
      </div>

      <div className="flex flex-col md:flex-row items-center mb-5">
        <label className="items-center w-full md:w-40 mr-4">Password</label>
        <input
          className="w-full md:w-2/3 border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm"
          name="Password"
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
      </div>
      <div className="flex flex-col md:flex-row items-center mb-5">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Confirm Update
        </button>
      </div>
      {errors && (
        <div className="text-red-500 text-sm">
          An error occurred. Please try again.
        </div>
      )}
    </form>
  );
}
