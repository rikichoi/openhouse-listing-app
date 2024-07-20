import { React } from "react";
import Logo from "@/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { IoMoonOutline } from "react-icons/io5";

export default function Navbar() {
  return (
    <div className="fixed border-b-2 font-poppins z-40 w-full h-20 bg-white flex flex-row justify-between">
      <div className="pl-10 h-full font-semibold flex items-center gap-10">
        <Image src={Logo} className="max-w-44"></Image>
        <Link href={"/"} className="text-black">
          Home
        </Link>
        <Link href={"/listings"} className="text-black">
          Listings
        </Link>
        <Link href={""} className="text-black">
          Learn
        </Link>
        <Link href={""} className="text-black">
          Contact
        </Link>
      </div>
      <div className="pr-10 flex flex-row justify-between gap-3">
        <button className="h-14 w-20 m-auto border-2 bg-gray-800 text-white font-semibold hover:opacity-80 rounded-2xl">Login</button>
        <button className="m-auto h-14 w-14 border-2 flex  justify-center items-center rounded-2xl"><IoMoonOutline /></button>
      </div>
    </div>
  );
}
