"use client";
import React, { useCallback, useEffect, useState } from "react";
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
} from "firebase/firestore";

export default function ViewHouse() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedHouseData, setSelectedHouseData] = useState([]);
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

  return (
    <div>
      ViewHouse
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
