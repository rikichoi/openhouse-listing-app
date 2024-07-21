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


export default function Home() {
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
          uid: doc.data().uid,
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
    <main className="pt-20 min-h-screen">
      <div>
        {openFilter ? (
          <FilterModal show={openFilter} onClose={setOpenFilter} />
        ) : (
          ""
        )}
        <div className="w-full">
          <div className="h-[600px]">
            <div className="font-opensans bg-[url('../images/home-background.jpg')] bg-cover bg-center h-[600px] p-36 grid grid-cols-2">
              <div className="flex flex-col gap-3">
                {" "}
                <p className="text-white brightness-150 text-6xl  font-bold">
                  Marketing Makes
                </p>
                <p className="text-cyan-400 brightness-150 text-6xl  font-bold">
                  The Difference
                </p>
                <p className="text-white brightness-90 pt-5 text-xl  font-semibold">
                  OpenHouse is an online platform, serving the Melbourne
                  community and surrounding areas for the last 2 decades. Keep
                  tabs on open house opportunities in your area with OpenHouse.
                </p>
                <div className="grid grid-cols-2 gap-24 pt-5 px-10">
                  <button onClick={()=>router.push('/listings')} className="text-black text-lg hover:border-2 hover:bg-transparent hover:text-white bg-white rounded-2xl w-full h-16">
                    Browse Listings
                  </button>
                  <button className="text-white text-lg w-full h-16 rounded-2xl border-2 border-gray-400 hover:border-white hover:brightness-150 bg-transparent">
                    Find An Agent
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="px-36 pt-10 font-poppins font-semibold text-lg">
            <h2 className="pb-5">Featured Listings</h2>
            <div className="grid grid-cols-4 justify-items-center">
              {houseList.slice(0, 1).map((house) => (
                <HouseListingItem
                  key={house.id}
                  feature={"Listed By OpenHouse"}
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
          <div className="px-36 pt-10 font-poppins font-semibold text-lg">
            <h2 className="pb-5">Melbourne, Under 200k</h2>
            <div className="grid grid-cols-4 justify-items-center">
              {houseList
                .slice(0, 4)
                .filter((house) => house.price > 200000)
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
          <div className="px-36 py-10">
            <button onClick={()=>router.push('/listings')} className="flex items-center justify-center text-white text-lg hover:border-2 hover:border-black hover:bg-transparent hover:text-black bg-black rounded-2xl w-56 h-16">
              Browse all listings{" "}
              <FaArrowRightLong className=" text-3xl ml-3" />
            </button>
          </div>

          <div className="px-36 pt-10 grid grid-cols-3">
            <div className="col-span-2 space-y-3">
              <h4 className="font-bold text-gray-700">All things property</h4>
              <h3 className="text-3xl font-bold">
                OpenHouse Makes The Management of Open Houses{" "}
                <span>Accessible</span> and <span>Professional</span>
              </h3>
              <h4 className="w-2/3 font-semibold text-gray-700">
                We help Individuals and Families stay on top of the Open House
                Market. Stay up-to-date with the latest news on Open Houses with
                us!
              </h4>
              <div className="py-6">
                <button className="p-1 w-2/5 grid grid-rows-3 text-start text-gray-700 text-lg hover:bg-transparent hover:scale-105 active:scale-100 hover:text-black rounded-2xl ">
                  <h4 className="text-sm font-bold">Connect With Us</h4>
                  <h4 className=" row-span-2 text-sm font-semibold text-gray-700">
                    We have Residential, Commercial, and Rental specialists
                    ready to walk you through the process, no matter your needs.
                  </h4>
                  <div className="flex pt-2 items-center flex-row">
                    <h4 className="text-sm font-bold">Find An Agent</h4>

                    <FaArrowRightLong className=" text-3xl ml-3" />
                  </div>
                </button>
              </div>
            </div>

            {/* <div className="relative h-full w-full bg-white">
              <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_4px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"> */}
            <div className="py-7 rounded-lg px-5 shadow-2xl mx-auto bg-zinc-900 h-full w-full">
              <h2 className="text-lg text-slate-200 font-semibold">
                Have Any Questions About Property?
              </h2>
              <h3 className="text-slate-400 font-semibold">
                Receive a personalized answer via e-mail within the next 24hrs
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
                Get In Touch
              </button>
            </div>
            {/* </div>
            </div> */}
          </div>

          <div className="px-28 py-36 font-poppins grid grid-cols-4 gap-2">
            <div className="grid grid-cols-5">
              <CiGift className="text-5xl p-2 bg-zinc-200 rounded-lg col-span-1" />
              <div className="col-span-4 space-y-2">
                <h4 className="font-bold">Exceptional Service</h4>
                <p>
                  We take care of you like family. Our team of agents and staff
                  are always available for you throuhgout the entire process.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-5">
              <MdLeaderboard className="text-5xl p-2 bg-zinc-200 rounded-lg col-span-1" />
              <div className="col-span-4 space-y-2">
                <h4 className="font-bold">Skilled Negotiations</h4>
                <p>
                  Whether representing you as a buying or selling agent, we get
                  you the best number, relative to the market and your
                  situation.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-5">
              <TiMessages className="text-5xl p-2 bg-zinc-200 rounded-lg col-span-1" />
              <div className="col-span-4 space-y-2">
                <h4 className="font-bold">Clear Communication</h4>
                <p>
                  We pride ourselves as being great communicators. You are never
                  left in the dark, or left on read.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-5">
              <FaChalkboardTeacher className="text-5xl p-2 bg-zinc-200 rounded-lg col-span-1" />
              <div className="col-span-4 space-y-2">
                <h4 className="font-bold">Willingness To Teach</h4>
                <p>
                  The real estate process can have a lot of moving parts, and
                  can be intimidating. We give you the info to make sound real
                  estate decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
