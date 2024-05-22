import { register } from "@/fetch/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserForm() {
  const router = useRouter();
  const [fullname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirm_password) {
      setPasswordMatch(false);
      return;
    }
    const response = await register({
      fullname,
      email,
      password,
      phone_number,
    });

    if (response.message === "Register Success") {
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } else {setErrors(true);
      setTimeout(() => {
        setErrors(false);
      }, 3000);
    }
  };

  const handlePasswordChange = (e, setPasswordFunc) => {
    setPasswordFunc(e.target.value);
    setPasswordMatch(password === e.target.value);
  };

  const handleShowPasssword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="flex flex-col w-full items-center">
        <form className= "w-2/3"
        onSubmit={handleRegister}>
          <div className="flex flex-col md:flex-row items-center mb-5">
            <label className="items-center w-full md:w-40 mr-4">
              Full Name
            </label>
            <input
              className="w-full md:w-2/3 border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm"
              name="Full Name"
              type="text"
              placeholder="Enter your Full Name"
              value={fullname}
              onChange={(e) => setName(e.target.value)}
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
              placeholder="your@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
          </div>

          <div className="flex flex-col md:flex-row items-center mb-5 relative">
            <label className="items-center w-full md:w-40 mr-4">Password</label>
            <input
              className={`w-full md:w-2/3 border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm ${
                !passwordMatch ? "border-red-500" : ""
              }`}
              name="Password"
              placeholder="Enter Your Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => handlePasswordChange(e, setPassword)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 absolute right-10"
              onClick={handleShowPasssword}
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
          <label className="items-center w-full md:w-40 mr-4">Confirm Password</label>
          <input
            className={`w-full md:w-2/3 border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm ${
              !passwordMatch ? "border-red-500" : ""
            }`}
            name="Password"
            placeholder="Confirm Your Password"
            type={showPassword ? "text" : "password"}
            value={confirm_password}
            onChange={(e) => handlePasswordChange(e, setConfirmPassword)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 absolute right-10"
            onClick={handleShowPasssword}
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

          <div className="flex flex-col md:flex-row items-center mb-5">
            <label className="items-center w-full md:w-40 mr-4">
              Phone Number
            </label>
            <input
              className="w-full md:w-2/3 border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm"
              name="Phone Number"
              type="number"
              placeholder="08**********"
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            ></input>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center mt-10">
            <button
              type="submit"
              className="flex w-1/2 justify-center rounded-md bg-[#3797db] px-3 py-2 text-white font-semibold leading-6 shadow-sm hover:bg-[#3187c5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Register
            </button>
          </div>

          {errors && (
            <div className="toast toast-top toast-center">
              <div className="text-white alert alert-error mb-5 justify-center">
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
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Email Already Exist!</span>
              </div>
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
                <span>Register Success!</span>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
