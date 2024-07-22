"use client";
import React, { useCallback, useEffect, useState, useContext } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Link from "next/link";
import { authContext } from "@/lib/context/auth-context";
import { MdOutlineAddBusiness } from "react-icons/md";
import { IoHomeSharp } from "react-icons/io5";
import { FaList } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa";
import { IoIosSchool } from "react-icons/io";

export default function HamburgerModal({ show, onClose }) {
  const { user, loading, logout } = useContext(authContext);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [applyDisabled, setApplyDisabled] = useState(true);
  const [search, setSearch] = useState("");

  if (!user) {
    return (
    <div className="xs:hidden sm:hidden md:hidden fixed font-poppins h-full backdrop-blur-md mt-10 z-50 flex pt-10 top-0 w-full ">
      <div className="h-1/2 w-full grid grid-rows-5 ">
        <Link
          href={"/login"}
          className="row-span-1 h-full p-3 border-y-2 border-zinc-800 flex items-center hover:bg-green-600 bg-green-700 w-full"
        >
          <MdOutlineAddBusiness className="text-3xl text-white mx-5"/>
          <h1 className="flex text-2xl font-semibold text-white ">
            List Property
          </h1>
        </Link>
        <Link
          href={"/"}
          className="row-span-1 h-full p-3 border-b-2 border-zinc-800 items-center  flex hover:bg-zinc-300 bg-zinc-200 w-full"
        >
          <IoHomeSharp className="text-3xl text-zinc-700 mx-5"/>
          <h1 className="flex text-2xl font-semibold text-zinc-700">
            Home
          </h1>
        </Link>
        <Link
          href={"/listings"}
          className="row-span-1 h-full p-3 border-b-2 border-zinc-800 items-center  flex hover:bg-zinc-300 bg-zinc-200 w-full"
        >
          <FaList className="text-3xl text-zinc-700 mx-5"/>
          <h1 className="flex text-2xl font-semibold text-zinc-700">
            Listings
          </h1>
        </Link>
        <Link
          href={"/learn"}
          className="row-span-1 h-full p-3 border-b-2 border-zinc-800 items-center flex hover:bg-zinc-300 bg-zinc-200 w-full"
        >
          <IoIosSchool className="text-3xl text-zinc-700 mx-5"/>
          <h1 className="flex text-2xl font-semibold text-zinc-700">
            Learn
          </h1>
        </Link>
        <Link
          href={"/contact"}
          className="row-span-1 h-full p-3 border-b-2 border-zinc-800 items-center flex hover:bg-zinc-300 bg-zinc-200 w-full"
        >
          <FaBookOpen className="text-3xl text-zinc-700 mx-5"/>
          <h1 className="flex text-2xl font-semibold text-zinc-700">
            Contact
          </h1>
        </Link>
      </div>
    </div>
  );
}
return (
  <div className="xs:hidden sm:hidden md:hidden fixed font-poppins h-full backdrop-blur-md mt-10 z-50 flex pt-10 top-0 w-full ">
  <div className="h-1/2 w-full grid grid-rows-5 ">
    <Link
      href={"/list-property"}
      className="row-span-1 h-full p-3 border-y-2 border-zinc-800 flex items-center hover:bg-green-600 bg-green-700 w-full"
    >
      <h1 className="flex text-2xl font-semibold text-white pl-14">
        List Property
      </h1>
    </Link>
    <Link
      href={"/"}
      className="row-span-1 h-full p-3 border-b-2 border-zinc-800 items-center  flex hover:bg-zinc-300 bg-zinc-200 w-full"
    >
      <h1 className="flex text-2xl font-semibold text-zinc-700 pl-14">
        Home
      </h1>
    </Link>
    <Link
      href={"/listings"}
      className="row-span-1 h-full p-3 border-b-2 border-zinc-800 items-center  flex hover:bg-zinc-300 bg-zinc-200 w-full"
    >
      <h1 className="flex text-2xl font-semibold text-zinc-700 pl-14">
        Listings
      </h1>
    </Link>
    <Link
      href={"/learn"}
      className="row-span-1 h-full p-3 border-b-2 border-zinc-800 items-center flex hover:bg-zinc-300 bg-zinc-200 w-full"
    >
      <h1 className="flex text-2xl font-semibold text-zinc-700 pl-14">
        Learn
      </h1>
    </Link>
    <Link
      href={"/contact"}
      className="row-span-1 h-full p-3 border-b-2 border-zinc-800 items-center flex hover:bg-zinc-300 bg-zinc-200 w-full"
    >
      <h1 className="flex text-2xl font-semibold text-zinc-700 pl-14">
        Contact
      </h1>
    </Link>
  </div>
</div>
);
}