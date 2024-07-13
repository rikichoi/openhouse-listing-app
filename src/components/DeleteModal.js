"use client";
import React from "react";
import { useRouter } from "next/navigation";
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
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import {
  getDownloadURL,
  uploadBytesResumable,
  ref,
  getStorage,
} from "firebase/storage";

export default function DeleteModal({ show, onClose, houseID }) {
  const router = useRouter();

  async function deleteListingHandler() {
    const docRef = doc(db, "house", houseID);
    try {
      await deleteDoc(docRef);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div>
      <div className="absolute top-14 left-0 h-full w-full z-50 backdrop-blur-md transition-all duration-300">
        <div className="container grid grid-row-3 overflow-scroll bg-[#78ABA8] border-2 border-black mx-auto max-w-xl h-1/4 rounded-3xl mt-12">
          <p className="flex justify-center">
            Are you sure that you want to delete this listing?
          </p>
          <div className="w-full border-2 flex justify-between px-32">
            <button
              onClick={() => (deleteListingHandler(), onClose(false), router.push('/'))}
              className="border-2 items-center justify-end w-24 h-12 text-white bg-red-700"
            >
              REMOVE LISTING
            </button>
            <button
              onClick={() => onClose(false)}
              className="border-2 items-center justify-end w-24 h-12 text-white bg-red-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
