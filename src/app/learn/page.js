import React from "react";
import { TbChecklist } from "react-icons/tb";
import { TfiStatsUp } from "react-icons/tfi";
import { GiOpenBook } from "react-icons/gi";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { FaUserCheck } from "react-icons/fa";

export default function Learn() {
  return (
    <div className="py-28 xxxs:py-5 xxs:py-10 grid font-poppins grid-rows-9">
      <div className="row-span-2 border-b-[1px] gap-3 flex flex-col justify-center items-center text-center">
        <h1 className="text-3xl font-bold">List Your Home With OpenHouse</h1>
        <p className="">
          With our listing program, we make it keep track, and market your
          property
        </p>
      </div>
      <div className="row-span-7 mt-20 xxxs:grid-cols-1 xxs:grid-cols-1 grid grid-cols-5">
        <div className="col-span-3 w-3/4 mx-auto gap-2 grid grid-rows-5">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center">
              <TbChecklist className="mr-2 text-5xl p-2 bg-zinc-200 rounded-full " />
              <h2 className="text-xl font-semibold">
                Step-By-Step Guide of the Listing Process
              </h2>
            </div>
            <div className="flex flex-row justify-center items-center">
              <p className="font-semibold text-zinc-700">
                When is the option period over? What can I expect from the
                appraisal process? We lay out the whole process for you, and
                walk with you through it.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center">
              <TfiStatsUp className="mr-2 text-5xl p-2 bg-zinc-200 rounded-full " />
              <h2 className="text-xl font-semibold">
                Accurate Market Data to Decide The Right Listing Price
              </h2>
            </div>
            <div className="flex flex-row justify-center items-center">
              <p className="font-semibold text-zinc-700">
                OpenHouse listing agents use all of the market data available to
                us, to determine what the best price is for you to sell at,
                based on your situation.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center">
              <GiOpenBook className="mr-2 text-5xl p-2 bg-zinc-200 rounded-full " />
              <h2 className="text-xl font-semibold">
                Dedicated Landing Page For Your Home
              </h2>
            </div>
            <div className="flex flex-row justify-center items-center">
              <p className="font-semibold text-zinc-700">
                Your home will receive its own personal web page on our website,
                complete with the ability for interested buyers to reach out and
                schedule an appointment.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center">
              <HiOutlineDesktopComputer className="mr-2 text-5xl p-2 bg-zinc-200 rounded-full " />
              <h2 className="text-xl font-semibold">
                Complete Digital Marketing Plan
              </h2>
            </div>
            <div className="flex flex-row justify-center items-center">
              <p className="font-semibold text-zinc-700">
                Our comprehensive and detailed marketing plan is a proven system
                we use to ultimately get the attention of prospective buyers on
                your listing.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center">
              <FaUserCheck className="mr-2 text-5xl p-2 bg-zinc-200 rounded-full " />
              <h2 className="text-xl font-semibold">
                Complete List of Preferred Vendors
              </h2>
            </div>
            <div className="flex flex-row justify-center items-center">
              <p className="font-semibold text-zinc-700">
                We have a full list of preferred vendors: contractors,
                home-inspectors, staging services, etc.. available for your use;
                vendors we know and trust, who are seasoned in their craft, and
                understand the home-selling process
              </p>
            </div>
          </div>
        </div>
        <div className=" col-span-2 pt-10 px-16">
          <div className="sticky top-52 py-7 rounded-lg px-5 shadow-2xl mx-auto bg-zinc-900 w-full">
            <h2 className="text-lg text-slate-200 font-semibold">
              Find Out What Your Home Is Worth
            </h2>
            <h3 className="text-slate-400 font-semibold">
              Recieve a personalized estimate via e-mail within 24hrs
            </h3>
            <div className="pt-5">
              <label className=" text-slate-400 text-sm font-semibold">
                Full Name
                <input className="text-black px-2 w-full rounded-md h-10"></input>
              </label>
              <label className=" text-slate-400 text-sm font-semibold">
                Email
                <input className="text-black px-2 w-full rounded-md h-10"></input>
              </label>
              <label className=" text-slate-400 text-sm font-semibold">
                Address
                <input className="text-black px-2 w-full rounded-md h-10"></input>
              </label>
            </div>
            <button className="flex mt-3 items-center justify-center  text-white text-md  hover:bg-zinc-800 transition-all bg-zinc-700 rounded-2xl w-full h-12">
              Get Your Home Value
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
