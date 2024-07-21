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
import { FaHouse } from "react-icons/fa6";
import { FaRulerCombined } from "react-icons/fa";
import { FaTree } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { FaSwimmingPool } from "react-icons/fa";
import { GiTennisCourt } from "react-icons/gi";
import { TbAirConditioning } from "react-icons/tb";
import { MdOutlineBalcony } from "react-icons/md";
import { GiFireplace } from "react-icons/gi";
import { FaTemperatureHalf } from "react-icons/fa6";
import { PiSolarPanel } from "react-icons/pi";
import { FaWarehouse } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa6";
import HouseListingItem from "@/components/HouseListingItem";

export default function ViewHouse() {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedHouseData, setSelectedHouseData] = useState([]);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const collectionRef = collection(db, "house");
  const [houseList, setHouseList] = useState([]);
  const houseId = searchParams.get("id").toString();
  const docRef = doc(db, "house", houseId);

  useEffect(() => {
    async function getHouseData() {
      const docsSnap = await getDocs(collectionRef);
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

    async function getSelectedHouseData() {
      const docSnap = await getDoc(docRef);
      setSelectedHouseData(docSnap.data());
    }
    getHouseData();
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
        <button
          onClick={() => router.push("#details")}
          className="flex flex-row text-center p-2 hover:border-black justify-center items-center  border-2 rounded-lg"
        >
          <p>Property Details</p>
        </button>
        <button
          onClick={() => router.push("#map")}
          className="flex flex-row text-center p-2 hover:border-black justify-center items-center  border-2 rounded-lg"
        >
          <p>Map</p>
        </button>
        <button
          onClick={() => router.push(`/edit-house?id=${houseId}`)}
          className="flex flex-row text-center p-2 hover:border-black bg-orange-300 justify-center items-center  border-2 rounded-lg"
        >
          Edit Listing
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
            {selectedHouseData.street ? `${selectedHouseData.street},`:""}
          </h1>
          <h1 className="text-3xl text-zinc-700 font-semibold">
          {selectedHouseData.suburb ? `${selectedHouseData.suburb},`:""}
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
            <FaCalendarCheck className="text-red-500 text-3xl" />
            Open House -{" "}
            {new Date(selectedHouseData.date || 0).toLocaleTimeString(
              "en-US",
              options
            )}
          </h3>
        </div>
      </div>

      <div id="details" className="scroll-mt-36 grid grid-cols-5">
        <div className="col-span-3 grid grid-rows-12">
          <div className="border-b-2 row-span-2 py-2 grid grid-rows-4">
            <h2 className="text-xl font-semibold">Property Description</h2>
            <p className="row-span-3">{selectedHouseData.description}</p>
          </div>
          <div className="border-b-2 row-span-2 grid grid-rows-4 py-2">
            <h2 className="text-xl font-semibold">Property Specs</h2>
            <div className="row-span-3 grid grid-cols-2">
              <div className="grid grid-rows-3">
                <p className="flex flex-row items-center">
                  <FaHouse className="mr-2 text-xl" />
                  Property Type:
                  <span className="font-semibold ml-2">
                    {selectedHouseData.type}
                  </span>
                </p>
                <p className="flex flex-row items-center">
                  <FaRulerCombined className="mr-2 text-xl" />
                  Property Price/m&sup2;{" "}
                  <span className="font-semibold ml-2">
                    $
                    {parseInt(
                      selectedHouseData.price / selectedHouseData.land
                    ).toLocaleString()}
                  </span>
                </p>
                <p className="flex flex-row items-center">
                  <FaTree className="mr-2 text-xl" />
                  Lot:
                  <span className="font-semibold ml-2">
                    {(selectedHouseData.land / 4047).toFixed(2)} Acres
                  </span>
                </p>
              </div>
              <div className="grid grid-rows-3">
                <p className="flex flex-row items-center">
                  <FaCalendarAlt className="mr-2 text-xl" />
                  Year Built:
                  <span className="font-semibold ml-2">
                    {selectedHouseData.yearBuilt}
                  </span>
                </p>
                <p className="flex flex-row items-center">
                  <FaSwimmingPool className="mr-2 text-xl" />
                  Swimming Pool:
                  <span className="font-semibold ml-2">
                    {JSON.parse(selectedHouseData.pool || "false") ? "1" : "0"}
                  </span>
                </p>
                <p className="flex flex-row items-center">
                  <GiTennisCourt className="mr-2 text-xl" />
                  Tennis Court:
                  <span className="font-semibold ml-2">
                    {JSON.parse(selectedHouseData.tennis || "false")
                      ? "1"
                      : "0"}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="border-b-2 row-span-2 grid grid-rows-4 py-2">
            <h2 className="text-xl font-semibold">Property Features</h2>
            <div className="row-span-3 grid grid-cols-2">
              <div className="grid grid-rows-3">
                <p className="flex flex-row items-center">
                  <TbAirConditioning className="mr-2 text-xl" />
                  Aircon:
                  <span className="font-semibold ml-2">
                    {JSON.parse(selectedHouseData.aircon || "false")
                      ? "1"
                      : "0"}
                  </span>
                </p>
                <p className="flex flex-row items-center">
                  <MdOutlineBalcony className="mr-2 text-xl" />
                  Balcony:
                  <span className="font-semibold ml-2">
                    {JSON.parse(selectedHouseData.balcony || "false")
                      ? "1"
                      : "0"}
                  </span>
                </p>
                <p className="flex flex-row items-center">
                  <GiFireplace className="mr-2 text-xl" />
                  Fireplace:
                  <span className="font-semibold ml-2">
                    {JSON.parse(selectedHouseData.fire || "false") ? "1" : "0"}
                  </span>
                </p>
              </div>
              <div className="grid grid-rows-3">
                <p className="flex flex-row items-center">
                  <FaTemperatureHalf className="mr-2" />
                  Heating:
                  <span className="font-semibold ml-2">
                    {JSON.parse(selectedHouseData.heating || "false")
                      ? "1"
                      : "0"}
                  </span>
                </p>
                <p className="flex flex-row items-center">
                  <PiSolarPanel className="mr-2" />
                  Solar Panel:
                  <span className="font-semibold ml-2">
                    {JSON.parse(selectedHouseData.solar || "false") ? "1" : "0"}
                  </span>
                </p>
                <p className="flex flex-row items-center">
                  <FaWarehouse className="mr-2" />
                  Shed:
                  <span className="font-semibold ml-2">
                    {JSON.parse(selectedHouseData.shed || "false") ? "1" : "0"}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div id="map" className="border-b-2 scroll-mt-36 row-span-6 py-2">
            <h2 className="text-xl font-semibold pb-2">
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
        <div className=" col-span-2 pt-10 px-16">
          <div className="sticky top-52 py-7 rounded-lg px-5 shadow-2xl mx-auto bg-zinc-900 w-full">
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
                <input
                  defaultValue={`I am interested in ${selectedHouseData.street}.`}
                  className="text-black px-2 w-full rounded-md h-10"
                ></input>
              </label>
            </div>
            <button className="flex mt-3 items-center justify-center  text-white text-md  hover:bg-zinc-800 transition-all bg-zinc-700 rounded-2xl w-full h-12">
              Get More Info
            </button>
          </div>
        </div>
      </div>
      <div className="pt-10 pb-14 font-poppins font-semibold text-lg">
        <h2 className="pb-5">Other Listings</h2>
        <div className="grid grid-cols-4 justify-items-center">
          {houseList.slice(0, 4).map((house) => (
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
  );
}
