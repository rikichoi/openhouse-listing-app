"use client";
import React, { useCallback, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Map, Marker } from "react-map-gl";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/firebase";
import {
  FieldPath,
  collection,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  doc,
  where,
  query,
  and,
  GeoPoint,
} from "firebase/firestore";
import { accessToken } from "mapbox-gl";
import { IoIosArrowBack } from "react-icons/io";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { TfiRulerAlt2 } from "react-icons/tfi";

export default function ViewHouse() {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedHouseData, setSelectedHouseData] = useState([]);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const collectionRef = collection(db, "house");
  const houseId = searchParams.get("id").toString();
  const docRef = doc(db, "house", houseId);

  //   const q = query(collection(db, "house"), where(FieldPath.documentId(),  "==", houseId));
  useEffect(() => {
    async function getSelectedHouseData() {
      const docSnap = await getDoc(docRef);
      setSelectedHouseData(docSnap.data());
    }
    getSelectedHouseData();
  }, []);

  function retrieveGeopoint() {
    if (
      selectedHouseData.geopoint !== "undefined" &&
      selectedHouseData.geopoint
    ) {
      setViewState((prev) => ({
        ...prev,
        latitude: selectedHouseData.geopoint.latitude,
      }));
      setViewState((prev) => ({
        ...prev,
        longitude: selectedHouseData.geopoint.longitude,
      }));
      setViewState((prev) => ({ ...prev, zoom: 12 }));
      setViewMarkerState((prev) => ({
        ...prev,
        latitude: selectedHouseData.geopoint.latitude,
      }));
      setViewMarkerState((prev) => ({
        ...prev,
        longitude: selectedHouseData.geopoint.longitude,
      }));
    } else {
      return;
    }
  }

  useEffect(() => {
    retrieveGeopoint();
  }, [selectedHouseData]);

  const [viewState, setViewState] = useState({
    mapboxAccessToken: mapboxToken,
    longitude: "",
    latitude: "",
    zoom: 12,
  });

  const [viewMarkerState, setViewMarkerState] = useState({
    longitude: "",
    latitude: "",
  });

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div className="px-36 font-poppins">
      <div className="w-full bg-white z-20 text-sm border-b-2 sticky top-0 flex flex-row gap-2 pt-24 pb-3">
        <button
          onClick={() => router.push("/listings")}
          className="flex flex-row mr-10 text-center p-2 hover:border-black justify-center items-center  border-2 rounded-lg"
        >
          <IoIosArrowBack className="text-lg mr-3" />
          <p>Back</p>
        </button>
        <button
          onClick={() => router.push("#overview")}
          className="flex flex-row text-center p-2 hover:border-black justify-center items-center  border-2 rounded-lg"
        >
          <p>Overview</p>
        </button>
        <button className="flex flex-row text-center p-2 hover:border-black justify-center items-center  border-2 rounded-lg">
          <p>Property Details</p>
        </button>
        <button className="flex flex-row text-center p-2 hover:border-black justify-center items-center  border-2 rounded-lg">
          <p>Map</p>
        </button>
      </div>
      <div
        id="overview"
        className="border-b-2 pb-7 scroll-mt-40 pt-4 grid grid-cols-5"
      >
        <img
          src={selectedHouseData.img}
          className="col-span-3 rounded-lg max-h-full"
        ></img>
        <div className="col-span-2 p-20">
          <h1 className="text-3xl text-zinc-700 font-semibold">
            {selectedHouseData.street},
          </h1>
          <h1 className="text-3xl text-zinc-700 font-semibold">
            {selectedHouseData.suburb},
          </h1>
          <h1 className="text-3xl text-zinc-700 font-semibold">
            {selectedHouseData.state} {selectedHouseData.post}
          </h1>
          <div className="grid pt-10 grid-cols-3 ">
            <h3 className="flex items-center gap-3">
              <FaBed />
              {selectedHouseData.bed} Bed
            </h3>
            <h3 className="flex items-center gap-3">
              <FaBath />
              {selectedHouseData.bathroom} Bath
            </h3>
            <h3 className="flex items-center gap-3">
              <TfiRulerAlt2 />
              {(selectedHouseData.land | 0).toLocaleString()} m&sup2;
            </h3>
          </div>
          <div className="col-span-1 flex justify-between">
            <h3 className="flex items-center gap-3">
              {selectedHouseData.type}
            </h3>
            <h3 className="text-[#639671] py-10 text-2xl font-bold ">
              ${(selectedHouseData.price | 0).toLocaleString()}
            </h3>
          </div>
          <h3 className="flex items-center gap-3">
            Auction Date:{" "}
            {new Date(selectedHouseData.date || 0).toLocaleTimeString(
              "en-US",
              options
            )}
          </h3>
        </div>
      </div>

      <div
        id="overview"
        className="border-b-2 pb-7 scroll-mt-36 pt-10 grid grid-cols-5"
      >
        <div className="col-span-3  grid grid-rows-12">
          <div className="border-b-2 row-span-2">
            <h2 className="text-xl font-semibold">Property Description</h2>
            <p>{selectedHouseData.description}</p>
          </div>
          <div className="border-b-2 row-span-2">
            <h2 className="text-xl font-semibold">Property Specs</h2>
            <p>{selectedHouseData.description}</p>
          </div>
          <div className="border-b-2 row-span-2">
            <h2 className="text-xl font-semibold">Property Highlights</h2>
            <p>{selectedHouseData.description}</p>
          </div>
          <div className="border-b-2 row-span-6">
            <h2 className="text-xl font-semibold">
              Map for {selectedHouseData.street}
            </h2>
            {selectedHouseData.geopoint ? (
              <Map
                {...viewState}
                onMove={(evt) => setViewState(evt.viewState)}
                style={{ width: 600, height: 400 }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
              >
                <Marker
                  {...viewMarkerState}
                  onMove={(evt) => setViewMarkerState(evt.viewMarkerState)}
                ></Marker>
              </Map>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-span-2 px-16">
          <div className=" py-7 rounded-lg px-5 shadow-2xl mx-auto bg-zinc-900 w-full">
            <h2 className="text-lg text-slate-200 font-semibold">
              Request More Info
            </h2>
            <h3 className="text-slate-400 font-semibold">
              We will get back to you within 24hrs.
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
                Message
                <input className="text-black px-2 w-full rounded-md h-10"></input>
              </label>
            </div>
            <button className="flex mt-3 items-center justify-center  text-white text-md  hover:bg-zinc-800 transition-all bg-zinc-700 rounded-2xl w-full h-12">
              Get More Info
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => console.log(viewState)}
        className="border-2 bg-red-700 w-full h-56"
      >
        Log
      </button>
      <button
        onClick={() => router.push(`/edit-house?id=${houseId}`)}
        className="border-2 bg-green-700 w-full h-56"
      >
        Edit Listing
      </button>
      <ul>
        <li>Bathroom: {selectedHouseData.bathroom}</li>
        <li>Description: {selectedHouseData.description}</li>
        <li>Garage: {selectedHouseData.garage}</li>
        <li>Post: {selectedHouseData.post}</li>
        <li>Price: {selectedHouseData.price}</li>
        <li>State: {selectedHouseData.state}</li>
        <li>Suburb: {selectedHouseData.suburb}</li>
        <li>Property Type: {selectedHouseData.type}</li>
        <li>Year Built: {selectedHouseData.yearBuilt}</li>
        <li>Land: {selectedHouseData.land}</li>
        <li>History: {selectedHouseData.history}</li>
        <li>
          <img src={selectedHouseData.img}></img>
        </li>
      </ul>
    </div>
  );
}
