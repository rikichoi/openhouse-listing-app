"use client";
import "mapbox-gl/dist/mapbox-gl.css";
import { Map, Marker } from "react-map-gl";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import HouseListingItem from "@/components/HouseListingItem";
import FilterButton from "@/components/Filter/FilterButton";
import FilterModal from "@/components/Filter/FilterModal";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  where,
  query,
  and,
  GeoPoint,
} from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowRightLong } from "react-icons/fa6";
import { CiGift } from "react-icons/ci";
import { MdLeaderboard } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { FaChalkboardTeacher } from "react-icons/fa";
import Logo from "@/images/logo.png";
import { IoIosSearch } from "react-icons/io";

export default function Listings() {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const [search, setSearch] = useState("");
  const [sortFilter, setSortFilter] = useState(
    "(a, b) => b.createdAt - a.createdAt"
  );
  const [openFilter, setOpenFilter] = useState(false);
  const [houseList, setHouseList] = useState([]);
  const searchParams = useSearchParams();

  // const unfilteredParam = Array.from(typeParam.values());
  const [typeFilter, setTypeFilter] = useState("");
  const [minPriceFilter, setMinPriceFilter] = useState(0);
  const [maxPriceFilter, setMaxPriceFilter] = useState(165000);
  const [minBedroomFilter, setMinBedroomFilter] = useState(0);
  const [maxBedroomFilter, setMaxBedroomFilter] = useState(5);
  const [bathroomFilter, setBathroomFilter] = useState(0);
  const [carFilter, setCarFilter] = useState(0);
  const [minLandFilter, setMinLandFilter] = useState(0);
  const [maxLandFilter, setMaxLandFilter] = useState(100000000);
  const [historyFilter, setHistoryFilter] = useState("");
  const [saleMethodFilter, setSaleMethodFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [filteredQuery, setFilteredQuery] = useState("");
  const collectionRef = collection(db, "house");

  const sortOptions = [
    {
      type: "Newest",
      value: "(a, b) => b.createdAt - a.createdAt",
    },
    {
      type: "Oldest",
      value: "(a, b) => a.createdAt - b.createdAt",
    },
    {
      type: "Highest Price",
      value: "(a, b) => b.price - a.price",
    },
    {
      type: "Lowest Price",
      value: "(a, b) => a.price - b.price",
    },
  ];

  const router = useRouter();

  function getFilterType() {
    setTypeFilter(searchParams.get("type") || "");
    setHistoryFilter(searchParams.get("history") || "");
    setMinPriceFilter(searchParams.get("minPrice") || 0);
    setMaxPriceFilter(searchParams.get("maxPrice") || 100000000);
    setMinBedroomFilter(searchParams.get("minBed") || 0);
    setMaxBedroomFilter(searchParams.get("maxBed") || 5);
    setBathroomFilter(searchParams.get("bathroom") || 0);
    setCarFilter(searchParams.get("car") || 0);
    setMinLandFilter(searchParams.get("minLand") || 0);
    setMaxLandFilter(searchParams.get("maxLand") || 100000000);
    setSaleMethodFilter(searchParams.get("method") || "");
    setLocationFilter(searchParams.get("location") || "");

    // setSaleMethodFilter(searchParams.get("minLand") || 0)
  }

  async function getFilteredData() {
    const docsSnap = await getDocs(filteredQuery);
    try {
      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          bathroom: doc.data().bathroom,
          bed: doc.data().bed,
          description: doc.data().description,
          garage: doc.data().garage,
          post: doc.data().post,
          price: doc.data().price,
          street: doc.data().street,
          state: doc.data().state,
          suburb: doc.data().suburb,
          type: doc.data().type,
          yearBuilt: doc.data().yearBuilt,
          land: doc.data().land,
          history: doc.data().history,
          date: doc.data().date,
          pool: doc.data().pool,
          shed: doc.data().shed,
          balcony: doc.data().balcony,
          tennis: doc.data().tennis,
          aircon: doc.data().aircon,
          solar: doc.data().solar,
          heating: doc.data().heating,
          fire: doc.data().fire,
          method: doc.data().method,
          img: doc.data().img,
          method: doc.data().method,
          geopoint: doc.data().geopoint,
        };
      });
      setHouseList(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    let q;

    getFilterType();
    if (
      !searchParams.get("type") &&
      searchParams.get("history") &&
      searchParams.get("method")
    ) {
      q = query(
        collectionRef,
        and(
          where("price", ">=", parseInt(minPriceFilter)),
          and(where("price", "<=", parseInt(maxPriceFilter))),
          and(where("bed", ">=", parseInt(minBedroomFilter))),
          and(where("bed", "<=", parseInt(maxBedroomFilter))),
          and(where("bathroom", ">=", parseInt(bathroomFilter))),
          and(where("garage", ">=", parseInt(carFilter))),
          and(where("land", ">=", parseInt(minLandFilter))),
          and(where("land", "<=", parseInt(maxLandFilter))),
          and(where("history", "==", historyFilter.toString())),
          and(where("method", "==", saleMethodFilter.toString()))
        )
      );
      setFilteredQuery(q);
    }
    if (
      !searchParams.get("type") &&
      searchParams.get("history") &&
      !searchParams.get("method")
    ) {
      q = query(
        collectionRef,
        and(
          where("price", ">=", parseInt(minPriceFilter)),
          and(where("price", "<=", parseInt(maxPriceFilter))),
          and(where("bed", ">=", parseInt(minBedroomFilter))),
          and(where("bed", "<=", parseInt(maxBedroomFilter))),
          and(where("bathroom", ">=", parseInt(bathroomFilter))),
          and(where("garage", ">=", parseInt(carFilter))),
          and(where("land", ">=", parseInt(minLandFilter))),
          and(where("land", "<=", parseInt(maxLandFilter))),
          and(where("history", "==", historyFilter.toString()))
        )
      );
      setFilteredQuery(q);
    }
    if (
      !searchParams.get("type") &&
      !searchParams.get("history") &&
      searchParams.get("method")
    ) {
      q = query(
        collectionRef,
        and(
          where("price", ">=", parseInt(minPriceFilter)),
          and(where("price", "<=", parseInt(maxPriceFilter))),
          and(where("bed", ">=", parseInt(minBedroomFilter))),
          and(where("bed", "<=", parseInt(maxBedroomFilter))),
          and(where("bathroom", ">=", parseInt(bathroomFilter))),
          and(where("garage", ">=", parseInt(carFilter))),
          and(where("land", ">=", parseInt(minLandFilter))),
          and(where("land", "<=", parseInt(maxLandFilter))),
          and(where("method", "==", saleMethodFilter.toString()))
        )
      );
      setFilteredQuery(q);
    }
    if (
      !searchParams.get("history") &&
      searchParams.get("type") &&
      searchParams.get("method")
    ) {
      q = query(
        collectionRef,
        and(
          where("type", "==", typeFilter.toString()),
          and(where("price", ">=", parseInt(minPriceFilter))),
          and(where("price", "<=", parseInt(maxPriceFilter))),
          and(where("bed", ">=", parseInt(minBedroomFilter))),
          and(where("bed", "<=", parseInt(maxBedroomFilter))),
          and(where("bathroom", ">=", parseInt(bathroomFilter))),
          and(where("garage", ">=", parseInt(carFilter))),
          and(where("land", ">=", parseInt(minLandFilter))),
          and(where("land", "<=", parseInt(maxLandFilter))),
          and(where("method", "==", saleMethodFilter.toString()))
        )
      );
      setFilteredQuery(q);
    }

    if (
      !searchParams.get("history") &&
      searchParams.get("type") &&
      !searchParams.get("method")
    ) {
      q = query(
        collectionRef,
        and(
          where("type", "==", typeFilter.toString()),
          and(where("price", ">=", parseInt(minPriceFilter))),
          and(where("price", "<=", parseInt(maxPriceFilter))),
          and(where("bed", ">=", parseInt(minBedroomFilter))),
          and(where("bed", "<=", parseInt(maxBedroomFilter))),
          and(where("bathroom", ">=", parseInt(bathroomFilter))),
          and(where("garage", ">=", parseInt(carFilter))),
          and(where("land", ">=", parseInt(minLandFilter))),
          and(where("land", "<=", parseInt(maxLandFilter)))
        )
      );
      setFilteredQuery(q);
    }

    if (
      searchParams.get("history") &&
      searchParams.get("type") &&
      !searchParams.get("method")
    ) {
      q = query(
        collectionRef,
        and(
          where("type", "==", typeFilter.toString()),
          and(where("price", ">=", parseInt(minPriceFilter))),
          and(where("price", "<=", parseInt(maxPriceFilter))),
          and(where("bed", ">=", parseInt(minBedroomFilter))),
          and(where("bed", "<=", parseInt(maxBedroomFilter))),
          and(where("bathroom", ">=", parseInt(bathroomFilter))),
          and(where("garage", ">=", parseInt(carFilter))),
          and(where("land", ">=", parseInt(minLandFilter))),
          and(where("land", "<=", parseInt(maxLandFilter))),
          and(where("history", "==", historyFilter.toString()))
        )
      );
      setFilteredQuery(q);
    }

    if (
      !searchParams.get("history") &&
      !searchParams.get("type") &&
      !searchParams.get("method")
    ) {
      q = query(
        collectionRef,
        and(
          and(where("price", ">=", parseInt(minPriceFilter))),
          and(where("price", "<=", parseInt(maxPriceFilter))),
          and(where("bed", ">=", parseInt(minBedroomFilter))),
          and(where("bed", "<=", parseInt(maxBedroomFilter))),
          and(where("bathroom", ">=", parseInt(bathroomFilter))),
          and(where("garage", ">=", parseInt(carFilter))),
          and(where("land", ">=", parseInt(minLandFilter))),
          and(where("land", "<=", parseInt(maxLandFilter)))
        )
      );
      setFilteredQuery(q);
    }

    if (
      searchParams.get("history") &&
      searchParams.get("type") &&
      searchParams.get("method")
    ) {
      q = query(
        collectionRef,
        and(
          where("type", "==", typeFilter.toString()),
          and(where("price", ">=", parseInt(minPriceFilter))),
          and(where("price", "<=", parseInt(maxPriceFilter))),
          and(where("bed", ">=", parseInt(minBedroomFilter))),
          and(where("bed", "<=", parseInt(maxBedroomFilter))),
          and(where("bathroom", ">=", parseInt(bathroomFilter))),
          and(where("garage", ">=", parseInt(carFilter))),
          and(where("land", ">=", parseInt(minLandFilter))),
          and(where("land", "<=", parseInt(maxLandFilter))),
          and(where("history", "==", historyFilter.toString())),
          and(where("method", "==", saleMethodFilter.toString()))
        )
      );
      setFilteredQuery(q);
    }
    try {
      setFilteredQuery(q);
    } catch (error) {}
  }, [
    bathroomFilter,
    carFilter,
    historyFilter,
    maxBedroomFilter,
    maxLandFilter,
    maxPriceFilter,
    minBedroomFilter,
    minLandFilter,
    minPriceFilter,
    saleMethodFilter,
    searchParams,
    typeFilter,
  ]);

  useEffect(() => {
    getFilteredData();
  }, [filteredQuery]);

  return (
    <main
      className={
        openFilter == true
          ? "pt-20 z-40 fixed overflow-hidden min-w-full bg-gray-50 min-h-screen"
          : "bg-gray-50 pt-20 min-h-screen"
      }
    >
      {openFilter ? (
        <FilterModal show={openFilter} onClose={setOpenFilter} />
      ) : (
        ""
      )}
      <div className="grid fixed z-40 grid-cols-5 border-b-2 w-full shadow-md items-center py-2 bg-white font-poppins px-36">
        <button
          onClick={() => setOpenFilter(true)}
          className=" text-zinc-800 col-span-3 flex text-center flex-row w-full"
          placeholder="Enter"
        >
          <IoIosSearch className="text-2xl mr-2" />
          Search region, suburb or postcode
        </button>
        <div className="col-span-2 gap-3 justify-end flex flex-row">
          <button
            onClick={() => setOpenFilter(true)}
            className="border-2 border-zinc-400 rounded-3xl text-zinc-800 p-3 transition-all hover:border-black hover:text-black hover:bg-zinc-50"
          >
            <p className="text-center font-semibold ">Property type</p>
          </button>
          <button
            onClick={() => setOpenFilter(true)}
            className="border-2 border-zinc-400 rounded-3xl text-zinc-800 p-3 transition-all hover:border-black hover:text-black hover:bg-zinc-50"
          >
            <p className="text-center font-semibold ">Price</p>
          </button>
          <button
            onClick={() => setOpenFilter(true)}
            className="border-2 border-zinc-400 rounded-3xl text-zinc-800 p-3 transition-all hover:border-black hover:text-black hover:bg-zinc-50"
          >
            <p className="text-center font-semibold ">Bed</p>
          </button>
          <FilterButton show={openFilter} onClose={setOpenFilter} />
        </div>
      </div>

      <main className="grid grid-cols-5">
        <div className="px-2 w-full col-span-3">
          <div>
            <div className="pt-24 font-poppins font-semibold text-lg">
              <h2 className="pb-5 pl-2 w-full flex flex-row">
                Melbourne Listings | Upcoming Open Houses{" "}
                {/* <span className="font-normal">
                  ({houseList.length} Results)
                </span> */}
                <div className="ml-auto flex flex-row">
                  <h4 className="pr-2 font-normal">Sort By:</h4>
                  <select
                    id="sortOptions"
                    defaultValue={"Newest"}
                    className="text-base bg-white p-1 border-2 hover:cursor-pointer rounded-lg"
                    name="sortOptions"
                  >
                    {sortOptions.map((options) => (
                      <option
                        onClick={() =>
                          setSortFilter(options.value.replace(/^"(.*)"$/, "$1"))
                        }
                        label={options.type}
                        key={options.type}
                        value={options.value}
                      >
                        {options.label}
                      </option>
                    ))}
                  </select>
                </div>
              </h2>

              <div className="grid grid-cols-3 gap-y-7 justify-items-center">
                {houseList
                  .filter(
                    (house) =>
                      house.street.toLowerCase().includes(locationFilter) ||
                      house.state.toLowerCase().includes(locationFilter) ||
                      house.post.toString().includes(locationFilter)
                  )
                  .sort(eval(sortFilter))
                  .map((house) => (
                    <HouseListingItem
                      key={house.id}
                      id={house.id}
                      bed={house.bed}
                      createdAt={house.createdAt}
                      bathroom={house.bathroom}
                      description={house.description}
                      garage={house.garage}
                      post={house.post}
                      price={house.price}
                      street={house.street}
                      state={house.state}
                      suburb={house.suburb}
                      type={house.type}
                      yearBuilt={house.yearBuilt}
                      land={house.land}
                      history={house.history}
                      img={house.img}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="fixed right-0 pt-20 object-fill col-span-2">
          <Map
            mapboxAccessToken={mapboxToken}
            initialViewState={{
              longitude: 144.9631,
              latitude: -37.8136,
              zoom: 12,
            }}
            style={{ width: 600, height: 570 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            {houseList.map((house) => (
              <Marker
                key={house.id}
                longitude={house.geopoint.longitude}
                latitude={house.geopoint.latitude}
              ></Marker>
            ))}
          </Map>
        </div>
      </main>
    </main>
  );
}
