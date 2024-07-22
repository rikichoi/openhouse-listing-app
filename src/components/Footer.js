import React from "react";
import Image from "next/image";
import Logo from "@/images/logo.png";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="px-40 pt-16 pb-24 border-t-2 font-poppins grid xxxs:p-3 xxs:p-3 xxxs:grid-cols-2 xxs:grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 grid-cols-4">
      <div className="grid grid-rows-5 gap-5">
        <Image src={Logo} className="max-w-44 row-span-2"></Image>
        <div className="row-span-3">
          <p>45 Damian Street</p>
          <p>United States</p>
          <p>Sydney, NWS 12345</p>
        </div>
      </div>
      <div className="grid grid-rows-5 gap-5">
        <h1 className="text-2xl">Quick Links</h1>
        <div className="row-span-3 grid gap-2">
          <p className="hover:cursor-pointer hover:text-zinc-700">Home</p>
          <p className="hover:cursor-pointer hover:text-zinc-700">About Us</p>
          <p className="hover:cursor-pointer hover:text-zinc-700">Amenities</p>
          <p className="hover:cursor-pointer hover:text-zinc-700">Price</p>
        </div>
      </div>
      <div className="grid grid-rows-5 gap-5">
        <h1 className="text-2xl">Important Links</h1>
        <div className="row-span-3 grid gap-2">
          <p className="hover:cursor-pointer hover:text-zinc-700">Terms and Conditions</p>
          <p className="hover:cursor-pointer hover:text-zinc-700">Legal</p>
          <p className="hover:cursor-pointer hover:text-zinc-700">Business</p>
          <p className="hover:cursor-pointer hover:text-zinc-700">Partners</p>
        </div>
      </div>
      <div className="grid grid-rows-5 gap-5">
        <h1 className="text-2xl">Let&apos;s Connect!</h1>
        <div className="row-span-3 grid gap-2">
          <p>Connect with agents, build your network, make great business.</p>
          <div className="grid grid-cols-4">
            <button className="hover:bg-zinc-900 flex justify-center items-center rounded-full w-14 h-14 bg-orange-400"><FaFacebookSquare className="text-xl text-white"/></button>
            <button className="hover:bg-zinc-900 flex justify-center items-center rounded-full w-14 h-14 bg-orange-400"><FaSquareTwitter className="text-xl text-white"/></button>
            <button className="hover:bg-zinc-900 flex justify-center items-center rounded-full w-14 h-14 bg-orange-400"><IoLogoYoutube className="text-xl text-white"/></button>
            <button className="hover:bg-zinc-900 flex justify-center items-center rounded-full w-14 h-14 bg-orange-400"><FaLinkedin className="text-xl text-white"/></button>
          </div>
        </div>
      </div>
    </div>
  );
}
