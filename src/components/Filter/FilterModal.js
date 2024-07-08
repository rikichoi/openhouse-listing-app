"use client";
import React, { useCallback, useState } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Link from "next/link";

export default function FilterModal({ show, onClose }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedFilter, setSelectedFilter] = useState();
  const [counter, setCounter] = useState(0);
  const [filterQuery, setFilterQuery] = useState();

  // const createQueryString = useCallback(
  //     (name, string) => {
  //       const params = new URLSearchParams(searchParams.toString())
  //       params.set(name, value)

  //       return params.toString()
  //     },
  //     [searchParams]
  //   )
  const housingTypeHandler = async (e) => {
    setFilterQuery(`/?${e.target.value}`);
  };


  const housingTypes = [
    {
      type: "House",
      value: "House",
    },
    {
      type: "Townhouse",
      value: "Townhouse",
    },
    {
      type: "Apartment & Unit",
      value: "Apartment & Unit",
    },
    {
      type: "Villa",
      value: "Villa",
    },
    {
      type: "Retirement Living",
      value: "Retirement Living",
    },
    {
      type: "Land",
      value: "Land",
    },
    {
      type: "Acreage",
      value: "Acreage",
    },
    {
      type: "Rural",
      value: "Rural",
    },
    {
      type: "Block of Units",
      value: "Block of Units",
    },
  ];

  return (
    <div className="absolute flex justify-center w-full h-full">
      <div className="grid grid-rows-7 w-2/5 h-4/5 bg-slate-500 border-2 border-black">
        {/* Exit Section */}
        <button
          onClick={() => router.push(filterQuery)}
          className="w-14 row-span-1 h-14 justify-self-end rounded-full text-lg bg-red-500 text-white"
        >
          Update
        </button>
        <div></div>
        <button
          onClick={() => console.log(selectedFilter)}
          className="w-14 row-span-1 h-14 justify-self-end rounded-full text-lg bg-red-500 text-white"
        >
          Log
        </button>
        {/* Filter 1 Section */}
        <form onSubmit={() => {}}>
          <div className="border-2 row-span-2">
            <h1 className="text-xl font-bold">Property type</h1>
            <ul className="grid grid-cols-2 border-2">
              {housingTypes.map((housing) => (
                <li key={housing.type}>
                  <input
                    onChange={housingTypeHandler}
                    name="housingTypeRadio"
                    value={housing.value}
                    type="radio"
                    className="mr-1"
                  ></input>
                  <p className="font-black">{housing.type}</p>
                </li>
              ))}
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
}
