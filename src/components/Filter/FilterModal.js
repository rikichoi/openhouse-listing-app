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
  const [selectedMinBed, setSelectedMinBed] = useState();
  const [selectedMaxBed, setSelectedMaxBed] = useState();
  const [selectedBathroom, setSelectedBathroom] = useState();
  const [selectedCar, setSelectedCar] = useState();
  const [selectedMinLand, setSelectedMinLand] = useState();
  const [selectedMaxLand, setSelectedMaxLand] = useState();
  const [selectedHistory, setSelectedHistory] = useState();

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

  // const minPriceHandler = async (e) => {
  //   setSelectedMinPrice(`minPrice=${e.target.value}`);
  // };

  // const maxPriceHandler = async (e) => {
  //   setSelectedMaxPrice(`maxPrice=${e.target.value}`);
  // };

  // const minBedHandler = async (e) => {
  //   setSelectedMinBed(`minBed=${e.target.value}`);
  // };

  // const maxBedHandler = async (e) => {
  //   setSelectedMaxBed(`maxBed=${e.target.value}`);
  // };

  // const bathroomHandler = async (e) => {
  //   setSelectedBathroom(`bathroom=${e.target.value}`);
  // };

  // const carHandler = async (e) => {
  //   setSelectedCar(`car=${e.target.value}`);
  // };

  const historyHandler = async (e) => {
    setSelectedHistory(`history=${e.target.value}`);
  };

  // this function adds values to previous state
  // const filterQueryModifier = async (e) => {
  //   setFilterQuery((prevState) => (prevState += e.target.value));
  // };

  useEffect(() => {
    const queryArray = [
      selectedType,
      selectedMinPrice,
      selectedMaxPrice,
      selectedMinBed,
      selectedMaxBed,
      selectedBathroom,
      selectedCar,
      selectedMinLand,
      selectedMaxLand,
      selectedHistory,
    ];
    const joinedQuery = queryArray.join("&");
    setFilterQuery("/?" + joinedQuery);
  }, [
    selectedType,
    selectedMinPrice,
    selectedMaxPrice,
    selectedMinBed,
    selectedMaxBed,
    selectedBathroom,
    selectedCar,
    selectedMinLand,
    selectedMaxLand,
    selectedHistory,
  ]);

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
    { label: 'Any', value: 20000000 },
    { label: '1000 ha', value: 10000000 },
    { label: '500 ha', value: 5000000 },
    { label: '200 ha', value: 2000000 },
    { label: '100 ha', value: 1000000 },
    { label: '90 ha', value: 900000 },
    { label: '80 ha', value: 800000 },
    { label: '70 ha', value: 700000 },
    { label: '60 ha', value: 600000 },
    { label: '50 ha', value: 500000 },
    { label: '40 ha', value: 400000 },
  
    { label: '30 ha', value: 300000 },
    { label: '20 ha', value: 200000 },
    { label: '10 ha', value: 100000 },
    { label: '9 ha', value: 90000 },
    { label: '8 ha', value: 80000 },
    { label: '7 ha', value: 70000 },
    { label: '6 ha', value: 60000 },
    { label: '5 ha', value: 50000 },
    { label: '4 ha', value: 40000 },
    { label: '3 ha', value: 30000 },
  
    { label: '2 ha', value: 20000 },
    { label: '1 ha', value: 10000 },
    { label: '9000 m²', value: 9000 },
    { label: '8000 m²', value: 8000 },
    { label: '7000 m²', value: 7000 },
    { label: '6000 m²', value: 6000 },
    { label: '5000 m²', value: 5000 },
    { label: '4000 m²', value: 4000 },
    { label: '3000 m²', value: 3000 },
    { label: '2000 m²', value: 2000 },
  
    { label: '1000 m²', value: 1000 },
    { label: '900 m²', value: 900 },
    { label: '800 m²', value: 800 },
    { label: '700 m²', value: 700 },
    { label: '600 m²', value: 600 },
    { label: '500 m²', value: 500 },
    { label: '400 m²', value: 400 },
    { label: '300 m²', value: 300 },
    { label: '200 m²', value: 200 },
    { label: '100 m²', value: 100 }
  ];
  

  const historyOpts = [
    {
      type: "New",
      value: "new",
    },
    {
      type: "Established",
      value: "established",
    },
  ];

  return (
    <div className="absolute flex justify-center w-full h-full">
      <div className=" fixed overflow-scroll w-2/5 h-4/5 bg-slate-500  border-black">
        <div className="h-[1000px] grid">
          {/* Exit Section */}
          <button
            onClick={() => (router.push(filterQuery), onClose(!show))}
            className="w-14 row-span-1 h-14 justify-self-end rounded-full text-lg bg-red-600 text-white"
          >
            X
          </button>
          {/* Type Filter Section       */}
          <div className=" row-span-1 pt-3 px-10">
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
          <div className="w-full border-2 row-span-1 pt-3 px-10">
            <h1 className="text-xl font-bold mb-2">Price</h1>
            <div className="grid grid-cols-2 h-24">
              <div>
                <h2>Min</h2>
                <select id="minPrice" className="w-1/2 h-1/2" name="minPrice">
                  {minPrices.map((price) => (
                    <option
                      label={price.label}
                      key={price.label}
                      value={price.value}
                      onClick={() =>
                        setSelectedMinPrice(`minPrice=${price.value}`)
                      }
                    >
                      {price.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <h2>Max</h2>
                <select className="w-1/2 h-1/2" name="maxPrice">
                  {maxPrices.map((price) => (
                    <option
                      label={price.label}
                      key={price.label}
                      value={price.value}
                      onClick={() =>
                        setSelectedMaxPrice(`maxPrice=${price.value}`)
                      }
                    >
                      {price.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Bed Filter Section */}
          <div className="w-full border-2 row-span-1 pt-3 px-10">
            <h1 className="text-xl font-bold mb-2">Bedrooms</h1>
            <div className="grid grid-cols-2 h-24">
              <div>
                <h2>Min</h2>

                <select id="minBed" className="w-1/2 h-1/2" name="minBed">
                  {minBed.map((bed) => (
                    <option
                      label={bed.label}
                      key={bed.label}
                      value={bed.value}
                      onClick={() => setSelectedMinPrice(`minBed=${bed.value}`)}
                    >
                      {bed.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <h2>Max</h2>

                <select id="maxBed"  className="w-1/2 h-1/2" name="maxBed">
                  {maxBed.map((bed) => (
                    <option
                      label={bed.label}
                      key={bed.label}
                      value={bed.value}
                      onClick={() => setSelectedMaxPrice(`maxBed=${bed.value}`)}
                    >
                      {bed.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Bathrooom Filter Section */}
          <div className="w-full border-2 row-span-1 pt-3 px-10">
            <h1 className="text-xl font-bold mb-2">Bathrooms</h1>
            <div className="grid grid-cols-2 h-24">
              <div>
                <select id="bathrooms" className="w-1/2 h-1/2" name="bathrooms">
                  {bathrooms.map((bathroom) => (
                    <option
                      label={bathroom.label}
                      key={bathroom.value}
                      value={bathroom.value}
                      onClick={() =>
                        setSelectedMinPrice(`bathroom=${bathroom.value}`)
                      }
                    >
                      {bathroom.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Car Filter Section */}
          <div className="w-full border-2 row-span-1 pt-3 px-10">
            <h1 className="text-xl font-bold mb-2">Car spaces</h1>
            <div className="grid grid-cols-2 h-24">
              <div>
                <select className="w-1/2 h-1/2" name="cars">
                  {cars.map((car) => (
                    <option
                      label={car.label}
                      key={car.value}
                      value={car.value}
                      onClick={() => setSelectedMaxPrice(`car=${car.value}`)}
                    >
                      {car.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Land Filter Section */}
          <div className="w-full border-2 row-span-1 pt-3 px-10">
            <h1 className="text-xl font-bold mb-2">Land size</h1>
            <div className="grid grid-cols-2 h-24">
              <div>
                <h2>Min</h2>

                <select id="minLand" className="w-1/2 h-1/2" name="minLand">
                  {minLand.map((land) => (
                    <option
                      label={land.label}
                      key={land.value}
                      value={land.value}
                      onClick={() =>
                        setSelectedMinLand(`minLand=${land.value}`)
                      }
                    >
                      {land.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <h2>Max</h2>

                <select id="maxLand"  className="w-1/2 h-1/2" name="maxLand">
                  {maxLand.map((land) => (
                    <option
                      label={land.label}
                      key={land.value}
                      value={land.value}
                      onClick={() =>
                        setSelectedMaxPrice(`maxLand=${land.value}`)
                      }
                    >
                      {land.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* History Filter Section */}
          <div className=" row-span-1 pt-3 px-10">
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
                  />
                  <span className="font-bold">{history.type}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
