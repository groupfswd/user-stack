import { register } from "@/fetching/auth";
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
  const [errors, setErrors] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirm_password) {
      setPasswordMatch(false);
      return;
    }
    try {
      await register({
        fullname,
        email,
        password,
        phone_number,
      });
      router.push("/login");
    } catch (error) {
      setErrors(true);
      setTimeout(() => setErrors(false), 3000);
    }
  };

  const handlePasswordChange = (e, setPasswordFunc) => {
    setPasswordFunc(e.target.value);
    setPasswordMatch(password === e.target.value);
  };

  return (
    <form>
      <div className="flex flex-col md:flex-row items-center mb-5">
        <label className="items-center w-full md:w-40 mr-4">Full Name</label>
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

      <div className="flex flex-col md:flex-row items-center mb-5">
        <label className="items-center w-full md:w-40 mr-4">Password</label>
        <input
          className={`w-full md:w-2/3 border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm ${
            !passwordMatch ? "border-red-500" : ""
          }`}
          name="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => handlePasswordChange(e, setPassword)}
          minLength="8"
          required
        ></input>
      </div>

      <div className="flex flex-col md:flex-row items-center mb-5">
        <label className="items-center w-full md:w-40 mr-4">
          Confirm Password
        </label>
        <input
          className={`w-full md:w-2/3 border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm ${
            !passwordMatch ? "border-red-500" : ""
          }`}
          name="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={confirm_password}
          onChange={(e) => handlePasswordChange(e, setConfirmPassword)}
          required
        ></input>
      </div>

      <div className="flex flex-col md:flex-row items-center mb-5">
        <label className="items-center w-full md:w-40 mr-4">Phone Number</label>
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
          onClick={handleRegister}
          className="flex w-1/2 justify-center rounded-md bg-blue-600 px-3 py-2 text-white font-semibold leading-6 shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Register
        </button>
      </div>
    </form>
  );
}
