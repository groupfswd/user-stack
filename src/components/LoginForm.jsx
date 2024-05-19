import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { login } from "@/fetch/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
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
        router.push("/");
      }
    } catch (error) {
      setError(true);
    } finally {
      setTimeout(() => setError(false), 3000);
    }
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
        <div className="flex flex-col md:flex-row items-center box-border">
          <label className="items-center w-full md:w-40 mr-4">Password</label>
          <input
            className="w-full md:w-2/3 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            required=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
      </form>
    </div>
  );
}
