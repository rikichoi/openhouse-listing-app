"use client";
import React, { useCallback, useEffect, useState } from "react";
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
  const [counter, setCounter] = useState(0);
  const [filterQuery, setFilterQuery] = useState("/?");
  const [selectedType, setSelectedType] = useState();
  const [selectedMinPrice, setSelectedMinPrice] = useState();
  const [selectedMaxPrice, setSelectedMaxPrice] = useState();
  console.log(filterQuery);
  // const createQueryString = useCallback(
  //     (name, string) => {
  //       const params = new URLSearchParams(searchParams.toString())
  //       params.set(name, value)

  //       return params.toString()
  //     },
  //     [searchParams]
  //   )
  const housingTypeHandler = async (e) => {
    setSelectedType(`type=${e.target.value}`);
  };

  const minPriceHandler = async (e) => {
    setSelectedMinPrice(`min=${e.target.value}`);
  };

  const maxPriceHandler = async (e) => {
    setSelectedMaxPrice(`max=${e.target.value}`);
  };

  // this function adds values to previous state
  const filterQueryModifier = async (e) => {
    setFilterQuery((prevState) => (prevState += e.target.value));
  };

  useEffect(() => {
    const queryArray = [selectedType, selectedMinPrice, selectedMaxPrice];
    const joinedQuery = queryArray.join("&");
    setFilterQuery("/?" + joinedQuery);
  }, [selectedType, selectedMinPrice, selectedMaxPrice]);

  //   Array.from(searchParams.values())
  //   (`${prevState}${e.target.value}`)
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

  const maxPrices = [
    {
      label: "Any",
      value: 250000,
    },
    {
      label: "$100000",
      value: 100000,
    },
    {
      label: "$125000",
      value: 125000,
    },
    {
      label: "$150000",
      value: 1750000,
    },
    {
      label: "$150000",
      value: 150000,
    },
    {
      label: "$200000",
      value: 200000,
    },
    {
      label: "$225000",
      value: 225000,
    },
  ];

  const minPrices = [
    {
      label: "Any",
      value: 0,
    },
    {
      label: "$50000",
      value: 50000,
    },
    {
      label: "$75000",
      value: 75000,
    },
    {
      label: "$125000",
      value: 125000,
    },
    {
      label: "$150000",
      value: 150000,
    },
    {
      label: "$175000",
      value: 175000,
    },
    {
      label: "$200000",
      value: 200000,
    },
  ];

  return (
    <div className="absolute  flex justify-center w-full h-full">
      <div className="grid grid-rows-7 fixed overflow-scroll w-2/5 h-4/5 bg-slate-500  border-black">
        <div className="h-[1000px]">
          {/* Exit Section */}
          <button
            onClick={() => router.push(filterQuery)}
            className="w-14 row-span-1 h-14 justify-self-end rounded-full text-lg bg-green-600 text-white"
          >
            Push
          </button>
          <button
            onClick={() => console.log(selectedMinPrice)}
            className="w-14 row-span-1 h-14 justify-self-end rounded-full text-lg bg-red-500 text-white"
          >
            Log
          </button>
          {/* Type Filter Section       */}
          <div className=" row-span-3 pt-3 px-10">
            <h1 className="text-xl font-bold mb-2">Property type</h1>
            <ul className="grid grid-cols-2 gap-3">
              {housingTypes.map((housing) => (
                <li key={housing.type}>
                  <input
                    onChange={housingTypeHandler}
                    name="housingTypeRadio"
                    value={housing.value}
                    type="radio"
                    className="mr-1"
                  />
                  <span className="font-bold">{housing.type}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Price Filter Section */}
          <div className="w-full border-2 row-span-2 pt-3 px-10">
            <h1 className="text-xl font-bold mb-2">Price</h1>
            <div className="grid grid-cols-2 h-24">
              <div>
                <select id="minPrice" className="w-1/2 h-1/2" name="minPrice">
                  {minPrices.map((price) => (
                    <option
                      label={price.label}
                      key={price.value}
                      value={price.value}
                      onClick={() => setSelectedMinPrice(`min=${price.value}`)}
                    >
                      {price.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select className="w-1/2 h-1/2" name="minPrice">
                  {maxPrices.map((price) => (
                    <option
                      label={price.label}
                      key={price.value}
                      value={price.value}
                      onClick={() => setSelectedMaxPrice(`max=${price.value}`)}
                    >
                      {price.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
