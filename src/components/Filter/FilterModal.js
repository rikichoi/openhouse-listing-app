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
  const [applyDisabled, setApplyDisabled] = useState(true);
  const [search, setSearch] = useState("");

  const sp = new URLSearchParams(searchParams);

  const locationHandler = async (e) => {
    sp.set("location", e.target.value);
  };

  const housingTypeHandler = async (e) => {
    sp.set("type", e.target.value);
  };

  const historyHandler = async (e) => {
    sp.set("history", e.target.value);
  };

  const saleMethodHandler = async (e) => {
    sp.set("method", e.target.value);
  };

  function minPriceHandler(value) {
    sp.set("minPrice", value);
  }

  function maxPriceHandler(value) {
    sp.set("maxPrice", value);
  }

  function minBedHandler(value) {
    sp.set("minBed", value);
  }

  function maxBedHandler(value) {
    sp.set("maxBed", value);
  }

  function bathroomHandler(value) {
    sp.set("bathroom", value);
  }

  function carHandler(value) {
    sp.set("car", value);
  }

  function minLandHandler(value) {
    sp.set("minLand", value);
  }

  function maxLandHandler(value) {
    sp.set("maxLand", value);
  }

  function clearFilter() {
    sp.delete("location");
    sp.delete("type");
    sp.delete("history");
    sp.delete("method");
    sp.delete("minPrice");
    sp.delete("maxPrice");
    sp.delete("minBed");
    sp.delete("maxBed");
    sp.delete("bathroom");
    sp.delete("car");
    sp.delete("minLand");
    sp.delete("maxLand");
    sp.delete("pool");
    sp.delete("shed");
    sp.delete("balcony");
    sp.delete("tennis");
    sp.delete("aircon");
    sp.delete("solar");
    sp.delete("heating");
    sp.delete("fire");
    router.push(`${pathname}?${sp.toString()}`);
    onClose(!show);
  }

  // function outdoorFeaturesHandler(name, value) {
  //   var checkBox = document.getElementById(name);
  //   if (checkBox.checked == true) {
  //     sp.set(name, value);
  //   } else {
  //     sp.delete(name);
  //   }
  // }

  // function indoorFeaturesHandler(name, value) {
  //   var checkBox = document.getElementById(name);
  //   if (checkBox.checked == true) {
  //     sp.set(name, value);
  //   } else {
  //     sp.delete(name);
  //   }
  // }

  const outdoorFeatures = [
    {
      label: "Swimming pool",
      type: "pool",
      value: true,
    },
    {
      label: "Shed",
      type: "shed",
      value: true,
    },
    {
      label: "Balcony",
      type: "balcony",
      value: true,
    },
    {
      label: "Tennis court",
      type: "tennis",
      value: true,
    },
  ];

  const indoorFeatures = [
    {
      label: "Air Conditioning",
      type: "aircon",
      value: true,
    },
    {
      label: "Solar panels",
      type: "solar",
      value: true,
    },
    {
      label: "Heating",
      type: "heating",
      value: true,
    },
    {
      label: "Fire place",
      type: "fire",
      value: true,
    },
  ];

  const saleMethods = [
    {
      label: "Private treaty sale",
      value: "Private",
    },
    {
      label: "Auction",
      value: "Auction",
    },
  ];

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
      value: "Apartment and Unit",
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

  const minBed = [
    {
      label: "Any",
      value: 0,
    },
    {
      label: "Studio",
      value: 0,
    },
    {
      label: "1",
      value: 1,
    },
  ];

  const maxBed = [
    {
      label: "Any",
      value: 5,
    },
    {
      label: "Studio",
      value: 0,
    },
    {
      label: "1",
      value: 1,
    },
    {
      label: "2",
      value: 2,
    },
    {
      label: "3",
      value: 3,
    },
    {
      label: "4",
      value: 4,
    },
    {
      label: "5",
      value: 5,
    },
  ];

  const bathrooms = [
    {
      label: "Any",
      value: 0,
    },
    {
      label: "1+",
      value: 1,
    },
    {
      label: "2+",
      value: 2,
    },
    {
      label: "3+",
      value: 3,
    },
    {
      label: "4+",
      value: 4,
    },
    {
      label: "5+",
      value: 5,
    },
  ];

  const cars = [
    {
      label: "Any",
      value: 0,
    },
    {
      label: "1+",
      value: 1,
    },
    {
      label: "2+",
      value: 2,
    },
    {
      label: "3+",
      value: 3,
    },
    {
      label: "4+",
      value: 4,
    },
    {
      label: "5+",
      value: 5,
    },
  ];

  const minLand = [
    { label: "Any", value: 0 },
    { label: "100 m²", value: 100 },
    { label: "200 m²", value: 200 },
    { label: "300 m²", value: 300 },
    { label: "400 m²", value: 400 },
    { label: "500 m²", value: 500 },
    { label: "600 m²", value: 600 },
    { label: "700 m²", value: 700 },
    { label: "800 m²", value: 800 },
    { label: "900 m²", value: 900 },
    { label: "1000 m²", value: 1000 },

    { label: "2000 m²", value: 2000 },
    { label: "3000 m²", value: 3000 },
    { label: "4000 m²", value: 4000 },
    { label: "5000 m²", value: 5000 },
    { label: "6000 m²", value: 6000 },
    { label: "7000 m²", value: 7000 },
    { label: "8000 m²", value: 8000 },
    { label: "9000 m²", value: 9000 },
    { label: "1 ha", value: 10000 },
    { label: "2 ha", value: 20000 },

    { label: "3 ha", value: 30000 },
    { label: "4 ha", value: 40000 },
    { label: "5 ha", value: 50000 },
    { label: "6 ha", value: 60000 },
    { label: "7 ha", value: 70000 },
    { label: "8 ha", value: 80000 },
    { label: "9 ha", value: 90000 },
    { label: "10 ha", value: 100000 },
    { label: "20 ha", value: 200000 },
    { label: "30 ha", value: 300000 },

    { label: "40 ha", value: 400000 },
    { label: "50 ha", value: 500000 },
    { label: "60 ha", value: 600000 },
    { label: "70 ha", value: 700000 },
    { label: "80 ha", value: 800000 },
    { label: "90 ha", value: 900000 },
    { label: "100 ha", value: 1000000 },
    { label: "200 ha", value: 2000000 },
    { label: "500 ha", value: 5000000 },
    { label: "1000 ha", value: 10000000 },
  ];

  const maxLand = [
    { label: "Any", value: 20000000 },
    { label: "1000 ha", value: 10000000 },
    { label: "500 ha", value: 5000000 },
    { label: "200 ha", value: 2000000 },
    { label: "100 ha", value: 1000000 },
    { label: "90 ha", value: 900000 },
    { label: "80 ha", value: 800000 },
    { label: "70 ha", value: 700000 },
    { label: "60 ha", value: 600000 },
    { label: "50 ha", value: 500000 },
    { label: "40 ha", value: 400000 },

    { label: "30 ha", value: 300000 },
    { label: "20 ha", value: 200000 },
    { label: "10 ha", value: 100000 },
    { label: "9 ha", value: 90000 },
    { label: "8 ha", value: 80000 },
    { label: "7 ha", value: 70000 },
    { label: "6 ha", value: 60000 },
    { label: "5 ha", value: 50000 },
    { label: "4 ha", value: 40000 },
    { label: "3 ha", value: 30000 },

    { label: "2 ha", value: 20000 },
    { label: "1 ha", value: 10000 },
    { label: "9000 m²", value: 9000 },
    { label: "8000 m²", value: 8000 },
    { label: "7000 m²", value: 7000 },
    { label: "6000 m²", value: 6000 },
    { label: "5000 m²", value: 5000 },
    { label: "4000 m²", value: 4000 },
    { label: "3000 m²", value: 3000 },
    { label: "2000 m²", value: 2000 },

    { label: "1000 m²", value: 1000 },
    { label: "900 m²", value: 900 },
    { label: "800 m²", value: 800 },
    { label: "700 m²", value: 700 },
    { label: "600 m²", value: 600 },
    { label: "500 m²", value: 500 },
    { label: "400 m²", value: 400 },
    { label: "300 m²", value: 300 },
    { label: "200 m²", value: 200 },
    { label: "100 m²", value: 100 },
  ];

  const historyOpts = [
    {
      type: "New",
      value: "New",
    },
    {
      type: "Established",
      value: "Established",
    },
  ];

  return (
    <div className="absolute font-poppins z-50 flex top-0 justify-center backdrop-blur-md w-full h-full">
      <div className=" fixed overflow-scroll border-2 border-zinc-500 rounded-xl w-2/5 max-h-[600px] mt-14  bg-zinc-50 ">
        <div className=" grid">
          {/* Exit Section */}
          <div className="row-span-1 h-full p-3 border-b-2 sticky top-0 flex bg-zinc-100 justify-end w-full">
            <h1 className="flex justify-center self-center text-center align-middle text-2xl font-semibold mx-auto text-zinc-700 pl-14">
              Filters
            </h1>
            <button
              onClick={() => onClose(!show)}
              className="w-14 h-14 justify-self-end border-2 rounded-full hover:shadow-inner hover:shadow-slate-800 transition-all text-lg bg-red-600 text-white"
            >
              X
            </button>
          </div>
          {/* Type Filter Section       */}
          <div className="w-full px-5 border-b-2 py-4">
            <input
              onChange={locationHandler}
              className="border-2 w-full rounded-lg text-lg p-2 px-2"
              placeholder="Search region, suburb or postcode"
            ></input>
          </div>
          <div className=" row-span-1 border-b-2 py-5 px-10">
            <h1 className="text-xl font-bold mb-2">Property type</h1>
            <ul className="grid grid-cols-2 gap-3">
              {housingTypes.map((housing) => (
                <li key={housing.type}>
                  <input
                    name="housingTypeRadio"
                    value={housing.value}
                    type="radio"
                    className="mr-1"
                    defaultChecked={searchParams.get("type") === housing.value}
                    onChange={housingTypeHandler}
                  />
                  <span className="">{housing.type}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Price Filter Section */}
          <div className="w-full border-b-2 row-span-1 py-5 px-10">
            <h1 className="text-xl font-bold mb-2">Price</h1>
            <div className="grid grid-cols-2 h-24">
              <div>
                <h2>Min</h2>
                <select
                  id="minPrice"
                  defaultValue={searchParams.get("minPrice")}
                  className="w-1/2 px-2 h-1/2"
                  name="minPrice"
                >
                  {minPrices.map((price) => (
                    <option
                      onClick={() => minPriceHandler(price.value)}
                      label={price.label}
                      key={price.label}
                      value={price.value}
                    >
                      {price.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <h2>Max</h2>
                <select
                  className="w-1/2 px-2 h-1/2"
                  defaultValue={searchParams.get("maxPrice")}
                  name="maxPrice"
                >
                  {maxPrices.map((price) => (
                    <option
                      onClick={() => maxPriceHandler(price.value)}
                      label={price.label}
                      key={price.label}
                      value={price.value}
                    >
                      {price.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Bed Filter Section */}
          <div className="w-full border-b-2 row-span-1 py-5 px-10">
            <h1 className="text-xl font-bold mb-2">Bedrooms</h1>
            <div className="grid grid-cols-2 h-24">
              <div>
                <h2>Min</h2>

                <select
                  id="minBed"
                  defaultValue={searchParams.get("minBed")}
                  className="w-1/2 px-2 h-1/2"
                  name="minBed"
                >
                  {minBed.map((bed) => (
                    <option
                      onClick={() => minBedHandler(bed.value)}
                      label={bed.label}
                      key={bed.label}
                      value={bed.value}
                    >
                      {bed.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <h2>Max</h2>

                <select
                  id="maxBed"
                  defaultValue={searchParams.get("maxBed")}
                  className="w-1/2 px-2 h-1/2"
                  name="maxBed"
                >
                  {maxBed.map((bed) => (
                    <option
                      onClick={() => maxBedHandler(bed.value)}
                      label={bed.label}
                      key={bed.label}
                      value={bed.value}
                    >
                      {bed.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Bathrooom Filter Section */}
          <div className="w-full border-b-2 row-span-1 pt-5 px-10">
            <h1 className="text-xl font-bold mb-2">Bathrooms</h1>
            <div className="grid grid-cols-2 h-24">
              <div>
                <select
                  id="bathrooms"
                  defaultValue={searchParams.get("bathroom")}
                  className="w-full px-2 h-1/2"
                  name="bathrooms"
                >
                  {bathrooms.map((bathroom) => (
                    <option
                      onClick={() => bathroomHandler(bathroom.value)}
                      label={bathroom.label}
                      key={bathroom.value}
                      value={bathroom.value}
                    >
                      {bathroom.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Car Filter Section */}
          <div className="w-full border-b-2 row-span-1 pt-5 px-10">
            <h1 className="text-xl font-bold mb-2">Car spaces</h1>
            <div className="grid grid-cols-2 h-24">
              <div>
                <select
                  defaultValue={searchParams.get("car")}
                  className="w-full px-2 h-1/2"
                  name="cars"
                >
                  {cars.map((car) => (
                    <option
                      onClick={() => carHandler(car.value)}
                      label={car.label}
                      key={car.value}
                      value={car.value}
                    >
                      {car.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Land Filter Section */}
          <div className="w-full border-b-2 row-span-1 pt-5 px-10">
            <h1 className="text-xl font-bold mb-2">Land size</h1>
            <div className="grid grid-cols-2 h-24">
              <div>
                <h2>Min</h2>

                <select
                  id="minLand"
                  defaultValue={searchParams.get("minLand")}
                  className="w-1/2 px-2 h-1/2"
                  name="minLand"
                >
                  {minLand.map((land) => (
                    <option
                      onClick={() => minLandHandler(land.value)}
                      label={land.label}
                      key={land.value}
                      value={land.value}
                    >
                      {land.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <h2>Max</h2>

                <select
                  id="maxLand"
                  defaultValue={searchParams.get("maxLand")}
                  className="w-1/2 px-2 h-1/2"
                  name="maxLand"
                >
                  {maxLand.map((land) => (
                    <option
                      onClick={() => maxLandHandler(land.value)}
                      label={land.label}
                      key={land.value}
                      value={land.value}
                    >
                      {land.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* History Filter Section */}
          <div className=" row-span-1 border-b-2 py-5 px-10 ">
            <h1 className="text-xl font-bold mb-2">
              New or established property
            </h1>
            <ul className="grid grid-cols-2 gap-3">
              {historyOpts.map((history) => (
                <li key={history.type}>
                  <input
                    onChange={historyHandler}
                    name="historyOptsRadio"
                    value={history.value}
                    type="radio"
                    className="mr-1"
                    defaultChecked={
                      searchParams.get("history") === history.value
                    }
                  />
                  <span className="">{history.type}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Outdoor Features Filter Section
          <div className=" row-span-1 pt-3 px-10 pb-10">
            <h1 className="text-xl font-bold mb-2">Outdoor features</h1>
            <ul className="grid grid-cols-2 gap-3">
              {outdoorFeatures.map((feature) => (
                <li key={feature.type}>
                  <input
                    id={feature.type}
                    onClick={() => (
                      console.log(),
                      outdoorFeaturesHandler(feature.type, feature.value)
                    )}
                    name="historyOptsRadio"
                    value={feature.value}
                    type="checkbox"
                    className="mr-1"
                  />
                  <span className="font-bold">{feature.label}</span>
                </li>
              ))}
            </ul>
          </div> */}
          {/* Indoor Features Filter Section
          <div className=" row-span-1 pt-3 px-10 pb-10">
            <h1 className="text-xl font-bold mb-2">Indoor features</h1>
            <ul className="grid grid-cols-2 gap-3">
              {indoorFeatures.map((feature) => (
                <li key={feature.type}>
                  <input
                    id={feature.type}
                    onClick={() =>
                      indoorFeaturesHandler(feature.type, feature.value)
                    }
                    name="historyOptsRadio"
                    value={feature.value}
                    type="checkbox"
                    className="mr-1"
                  />
                  <span className="font-bold">{feature.label}</span>
                </li>
              ))}
            </ul>
          </div> */}
          {/* Sale Method Filter */}
          <div className=" row-span-1 py-5 px-10">
            <h1 className="text-xl font-bold mb-2">Sale method</h1>
            <ul className="grid grid-cols-2 gap-3">
              {saleMethods.map((method) => (
                <li key={method.label}>
                  <input
                    onChange={saleMethodHandler}
                    name="historyOptsRadio"
                    value={method.value}
                    type="radio"
                    className="mr-1"
                    defaultChecked={searchParams.get("method") === method.value}
                  />
                  <span className="">{method.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="row-span-1 h-full p-3 sticky bottom-0 flex border-t-2 bg-zinc-100 justify-end w-full">
            <button
              onClick={() => clearFilter()}
              className="w-36 mr-5 h-14 border-2 hover:shadow-inner hover:shadow-slate-800 transition-all justify-self-end rounded-xl text-lg bg-orange-600 text-white"
            >
              CLEAR FILTER
            </button>
            <button
              type="button"
              id="applyFilterBtn"
              name="applyFilterBtn"
              onClick={() => (
                router.push(`${pathname}?${sp.toString()}`), onClose(!show)
              )}
              className="w-36 h-14 border-2 hover:shadow-inner hover:shadow-slate-800 transition-all justify-self-end rounded-xl text-lg bg-green-600 text-white"
            >
              APPLY FILTER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
