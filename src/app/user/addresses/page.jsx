"use client";

import AddressesList from "@/components/AddressesList";
import Link from "next/link";

export default function AddressesPage() {
  return (
    <div className="mt-10">
      <div className="flex justify-center text-3xl font-bold">Addresses</div>
      <Link href="/user" className="flex justify-center"><u>Back to Account Detail</u></Link>
      <div>
        <AddressesList />
      </div>
    </div>
  );
}
