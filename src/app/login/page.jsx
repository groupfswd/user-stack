"use client";

import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col md:flex-row mt-10 p-10 border w-full md:w-2/3 mx-auto">
      <LoginForm />
      <div className="flex-1 flex flex-col pl-10 md:border-l md:mt-0 mt-10">
        <div className="mb-5 font-black text-5xl">Create an account</div>
        <div className="mb-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,
          doloribus porro provident cupiditate ullam ipsum alias, ratione fugiat
          dolorem deserunt repudiandae necessitatibus minus, reprehenderit
          similique totam quo esse sapiente fuga?
        </div>
        <Link href="/register">
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Register here!
          </button>
        </Link>
      </div>
    </div>
  );
}
