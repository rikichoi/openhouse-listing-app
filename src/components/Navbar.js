'use client'
import { React, useContext } from "react";
import Logo from "@/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { IoMoonOutline } from "react-icons/io5";
import { authContext } from "@/lib/context/auth-context";

export default function Navbar() {
  const { user, loading, logout } = useContext(authContext);
  if (!user) {
    return (
      <div className="fixed border-b-2 font-poppins z-40 w-full h-20 bg-white flex flex-row justify-between">
        <div className="pl-10 h-full font-semibold flex items-center gap-10">
          <Image src={Logo} className="max-w-44"></Image>
          <Link
            href={"/"}
            className="xxxs:hidden xxs:hidden xs:hidden text-black hover:border-b-2 transition-all border-b-zinc-900"
          >
            Home
          </Link>
          <Link
            href={"/listings"}
            className="xxxs:hidden xxs:hidden xs:hidden text-black hover:border-b-2 transition-all border-b-zinc-900"
          >
            Listings
          </Link>
          <Link
            href={"/learn"}
            className="xxxs:hidden xxs:hidden xs:hidden text-black hover:border-b-2 transition-all border-b-zinc-900"
          >
            Learn
          </Link>
          <Link
            href={"/contact"}
            className="xxxs:hidden xxs:hidden xs:hidden text-black hover:border-b-2 transition-all border-b-zinc-900"
          >
            Contact
          </Link>
        </div>
        <div className="pr-10 flex flex-row justify-between gap-3">
        <Link
          href={"/login"}
          className=" xxxs:text-sm xxs:text-sm xs:text-sm px-4 py-3 m-auto flex items-center border-2 bg-green-800 text-white font-semibold hover:opacity-80 rounded-2xl"
        >
          List
        </Link>
          <Link href={"/login"} className="xxxs:text-sm xxs:text-sm xs:text-sm px-4 py-3 w-20 flex justify-center items-center m-auto border-2 bg-gray-800 text-white font-semibold hover:opacity-80 rounded-2xl">
            Login
          </Link>
          <button className="xxxs:hidden xxs:hidden xs:hidden m-auto h-14 w-14 border-2 flex  justify-center items-center rounded-2xl">
            <IoMoonOutline />
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="fixed border-b-2 font-poppins z-40 w-full h-20 bg-white flex flex-row justify-between">
      <div className="pl-10 h-full font-semibold flex items-center gap-10">
        <Image src={Logo} className="max-w-44"></Image>
        <Link
          href={"/"}
          className="text-black hover:border-b-2 transition-all border-b-zinc-900"
        >
          Home
        </Link>
        <Link
          href={"/listings"}
          className="text-black hover:border-b-2 transition-all border-b-zinc-900"
        >
          Listings
        </Link>
        <Link
          href={""}
          className="text-black hover:border-b-2 transition-all border-b-zinc-900"
        >
          Learn
        </Link>
        <Link
          href={""}
          className="text-black hover:border-b-2 transition-all border-b-zinc-900"
        >
          Contact
        </Link>
      </div>
      <div className="pr-10 flex flex-row justify-between gap-3">
        <Link
          href={"/list-property"}
          className="h-14 px-4 m-auto flex items-center border-2 bg-green-800 text-white font-semibold hover:opacity-80 rounded-2xl"
        >
          List a Property
        </Link>
        <button onClick={logout} className="h-14 m-auto border-2 px-2 bg-red-700 text-white font-semibold hover:opacity-80 rounded-2xl">
          Sign Out
        </button>
        <button className="m-auto h-14 w-14 border-2 flex  justify-center items-center rounded-2xl">
          <IoMoonOutline />
        </button>
      </div>
    </div>
  );
}
