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
import { IoIosArrowBack } from "react-icons/io";


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
        <div className="container grid grid-row-3 overflow-scroll bg-zinc-50 border-2 border-black mx-auto max-w-xl h-1/4 rounded-3xl mt-12">
          <h1 className="flex justify-center self-center text-center align-middle text-xl font-semibold mx-auto text-zinc-700">
          Are you sure that you want to delete this listing?
            </h1>
          <div className="w-full flex justify-between px-32">
            <button
              onClick={() => (deleteListingHandler(), onClose(false), router.push('/'))}
              className="flex flex-row text-center max-h-16 max-w-24 p-2 bg-red-500 hover:bg-red-700 hover:border-black justify-center items-center border-zinc-600 border-2 rounded-lg"
              >
                Remove Listing
              </button>
            <button
              onClick={() => onClose(false)}
              className="flex flex-row text-center max-h-16 max-w-24 p-2 hover:bg-zinc-200 hover:border-black justify-center items-center border-zinc-600 border-2 rounded-lg"
              >
                <IoIosArrowBack className="text-lg mr-3" />
                <p className="text-lg">Cancel</p>
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}
