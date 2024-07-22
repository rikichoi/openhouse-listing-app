"use client";
import React from "react";
import { TbChecklist } from "react-icons/tb";
import { TfiStatsUp } from "react-icons/tfi";
import { GiOpenBook } from "react-icons/gi";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { FaUserCheck } from "react-icons/fa";
import { accessToken } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Map, Marker } from "react-map-gl";

export default function Contact() {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  return (
    <div className="pt-28 grid font-poppins grid-rows-11">
      <div className="row-span-2 border-b-[1px] gap-3 flex flex-col justify-center items-center text-center">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="">We&apos;d love to hear from you</p>
      </div>
      <div className="row-span-9 mt-10 grid grid-cols-7">
        <div className="col-span-4 w-3/4 mx-auto gap-2 grid grid-rows-5">
          <div className="row-span-4 flex flex-col gap-2">
            <div className="flex flex-row justify-center items-center">
              <Map
                mapboxAccessToken={mapboxToken}
                initialViewState={{
                  longitude: 144.9631,
                  latitude: -37.8136,
                  zoom: 12,
                }}
                style={{ width: 800, height: 570 }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
              />
            </div>
          </div>
          <div className="row-span-1 pt-8 flex flex-col gap-2">
            <div className="flex flex-row justify-center items-center">
              <div className="border-r-2 px-10">
                <h2 className="font-bold">Location</h2>
                <p className="text-sm text-zinc-700">7/13 Devington St,</p>
                <p className="text-sm text-zinc-700">Hawthorn, NWS, 2912</p>
              </div>
              <div className="border-r-2 px-10">
                <h2 className="font-bold">Hours</h2>
                <p className="text-sm text-zinc-700">Monday - Friday</p>
                <p className="text-sm text-zinc-700">9am - 5pm</p>
              </div>
              <div className="border-r-2 px-10">
                <h2 className="font-bold">Direct</h2>
                <p className="text-sm text-zinc-700">openhouse@gmail.com</p>
                <p className="text-sm text-zinc-700">ohouse@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 px-16">
          <h2 className="text-2xl pb-2 font-semibold">Reach Out Directly</h2>
          <h3 className="text-zinc-700 font-semibold">
            We would love to hear from you and answer any questions that are not
            answered in our FAQ section.
          </h3>
          <div className="pt-5">
            <label className="text-sm font-semibold">
              Full Name
              <input className="border-[1px] bg-zinc-100 text-black px-2 w-full rounded-md h-10"></input>
            </label>
            <label className="text-sm font-semibold">
              Email
              <input className="border-[1px] bg-zinc-100 text-black px-2 w-full rounded-md h-10"></input>
            </label>
            <label className="text-sm font-semibold">
              Phone
              <input className="border-[1px] bg-zinc-100 text-black px-2 w-full rounded-md h-10"></input>
            </label>
            <label className="text-sm font-semibold">
              Message
              <textarea className="h-24 border-[1px] bg-zinc-100 text-black px-2 w-full rounded-md"></textarea>
            </label>
          </div>
          <button className="flex mt-3 items-center justify-center  text-white text-md  hover:bg-zinc-800 transition-all bg-zinc-900 rounded-2xl w-full h-12">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
