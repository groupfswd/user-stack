"use client"

import UserProfile from "@/components/UserProfile";

export default function UserPage() {
  return (
    <div className="flex justify-center items-center w-screen">
      <div className="min-w-1/3 md:w-1/3">
        <UserProfile />
      </div>
    </div>
  );
}
