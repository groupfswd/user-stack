import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { login } from "@/fetch/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      const token = response.accessToken;
      if (!token) {
        setError(true);
      } else {
        Cookies.set("isLoggedIn", "true");
        Cookies.set("accessToken", token);
        setSuccess(true);
        setTimeout(() => {router.push("/");}, 1000);
      }
    } catch (error) {
      setError(true);
    } finally {
      setTimeout(() => setError(false), 3000);
    }
  };

  const handleShowPasssword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex-1 flex flex-col border-r pr-10">
      <div className="mb-5 font-black text-5xl">Login</div>
      <form className="grid grid-cols-1 gap-4" onSubmit={handleLogin}>
        <div className="flex flex-col md:flex-row items-center box-border">
          <label className="items-center w-full md:w-40 mr-4">Email</label>
          <input
            className="w-full md:w-2/3 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            name="email"
            type="email"
            placeholder="Enter your email"
            required=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <div className="flex flex-col md:flex-row items-center mb-5 relative">
          <label className="items-center w-2/5 mr-4">Password</label>
          <input
            className="md:w-2/3 border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm"
            name="Password"
            placeholder="Enter Your Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 absolute right-5"
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

        <button
          type="submit"
          className="w-full bg-[#3797db] hover:bg-[#3187c5] text-white font-bold py-2 px-4 rounded"
          onClick={handleLogin}
        >
          Login
        </button>
        {error && (
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
              <span>Wrong Email or Password!</span>
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
              <span>Login Success!</span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
