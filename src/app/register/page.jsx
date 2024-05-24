"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    if (Cookies.get("isLoggedIn") === "true") {
      router.push("/");
    }
  }, []);

  return (
    <div className="mt-10 p-10 border w-full md:w-1/2 mx-auto">
      <div className="text-center mb-10 font-black text-5xl">
        Create an Account
      </div>
      <RegisterForm />
      <div className="mt-3 text-center">
        Already have an account?{" "}
        <Link href="/login">
          <span className="text-blue-600">Login</span>
        </Link>
      </div>
    </div>
  );
}
