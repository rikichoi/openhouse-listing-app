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

  return (
    <div>
      ViewHouse
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
