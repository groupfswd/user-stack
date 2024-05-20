import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { findUser, updateUser } from "@/fetch/user.js";

export default function EditUser() {
  const router = useRouter();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState(false);
  const [success, setSuccess] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [togglePassword, setTogglePassword] = useState(false);

  useEffect(() => {
    setPasswordMatch(newPassword === confirmPassword);
  }, [newPassword, confirmPassword]);

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
    if (newPassword !== confirmPassword) {
      setErrors(true);
      return;
    }

    const params = {
      fullname,
      email,
      phone_number,
      password: newPassword,
    };
    try {
      const updatedUser = await updateUser(params);
      if (updatedUser) {
        setSuccess(true);
        setTimeout(() => router.push("/user"), 3000);
      } else {
        setErrors(true);
      }
    } catch (error) {
      setErrors(true);
    }
  };

  const handlePasswordChange = (e, setPasswordFunc) => {
    setPasswordFunc(e.target.value);
    setPasswordMatch(newPassword === e.target.value);
  };

  const handleTogglePassword = () => {
    setTogglePassword(!togglePassword);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleUpdate} className="w-2/5">
        <div className="flex flex-col md:flex-row items-center mb-5">
          <label className="items-center w-2/5 mr-4">Full Name</label>
          <input
            className="md:w-2/3 border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm"
            name="Full Name"
            type="text"
            placeholder="Enter Your Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            minLength="3"
            required
          />
        </div>

        <div className="flex flex-col md:flex-row items-center mb-5">
          <label className="items-center w-2/5 mr-4">Email</label>
          <input
            className="md:w-2/3 border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm"
            name="Email"
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col md:flex-row items-center mb-5">
          <label className="items-center w-2/5 mr-4">Phone Number</label>
          <input
            className="md:w-2/3 border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm"
            name="Phone Number"
            type="number"
            placeholder="08XXXXXXXXXX"
            value={+phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col md:flex-row items-center mb-5 relative">
          <label className="items-center w-2/5 mr-4">New Password</label>
          <input
            className={`md:w-2/3 border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm ${
              !passwordMatch ? "border-red-500" : ""
            }`}
            name="Password"
            placeholder="Enter Your New Password"
            type={togglePassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => handlePasswordChange(e, setNewPassword)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 absolute right-5"
            onClick={handleTogglePassword}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>

        <div className="flex flex-col md:flex-row items-center mb-5 relative">
          <label className="items-center w-2/5 mr-4">
            Confirm New Password
          </label>
          <input
            className={`md:w-2/3 border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm ${
              !passwordMatch ? "border-red-500" : ""
            }`}
            name="Password"
            placeholder="Confirm Your New Password"
            type={togglePassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => handlePasswordChange(e, setConfirmPassword)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 absolute right-5"
            onClick={handleTogglePassword}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center mb-5">
          <button
            className="w-3/5 bg-[#3797db] hover:bg-[#3187c5] text-white font-bold py-2 px-4 rounded-lg"
            type="submit"
          >
            Confirm Update
          </button>
        </div>

        {errors && (
          <div className="flex text-red-500 text-sm justify-center">
            Password Does Not Match
          </div>
        )}

        {success && (
          <div className="toast toast-top toast-center">
            <div className="text-white alert alert-success mb-5 justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Update Success</span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
