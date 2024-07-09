"use client";
import Image from "next/image";
import HouseListingItem from "@/components/HouseListingItem";
import { useEffect, useState } from "react";
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
} from "firebase/firestore";

export default function Home() {
  const [search, setSearch] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [houseList, setHouseList] = useState([]);
  console.log(houseList)

  useEffect(() => {
    const getHouseData = async () => {
      const collectionRef = collection(db, "house");

      const docsSnap = await getDocs(collectionRef);

      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          bathroom: doc.data().bathroom,
          description: doc.data().description,
          garage: doc.data().garage,
          post: doc.data().post,
          price: doc.data().price,
          state: doc.data().state,
          suburb: doc.data().suburb,
          type: doc.data().type,
          yearBuilt: doc.data().yearBuilt,
        };
      });
      setHouseList(data);
    };
    getHouseData();
  }, []);

  // console.log(search);
  const DUMMY_DATA = [
    {
      id: 1,
      houseImage: "house1Img",
      houseName: "House 1",
      houseStreetNo: 61,
      houseStreet: "City Road",
      houseSuburb: "Southbank",
      houseState: "Victoria",
      housePost: 3006,
      housePrice: 5000,
    },
    {
      id: 2,
      houseImage: "house2Img",
      houseName: "House 2",
      houseStreetNo: 57,
      houseStreet: "h2City Road",
      houseSuburb: "h2Southbank",
      houseState: "h2Victoria",
      housePost: 3111,
      housePrice: 300,
    },
    {
      id: 3,
      houseImage: "house3Img",
      houseName: "House 3",
      houseStreetNo: 24,
      houseStreet: "house3street",
      houseSuburb: "h3Southbank",
      houseState: "h3Victoria",
      housePost: 2934,
      housePrice: 125,
    },
  ];
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {openFilter ? (
        <FilterModal show={openFilter} onClose={setOpenFilter} />
      ) : (
        ""
      )}
      <div className="w-full">
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="border-2"
          placeholder="Enter"
        ></input>
        <button
          onClick={() => console.log(search)}
          className="border-2 w-24 h-12 bg-green-400"
        >
          log
        </button>
        <FilterButton show={openFilter} onClose={setOpenFilter} />
        <div className="grid grid-cols-3 border-2 text-center w-full">
          {houseList.map((house) => (
            <HouseListingItem
            key={house.id}
            id={house.id}
            bathroom={house.bathroom}
            description={house.description}
            garage={house.garage}
            post={house.post}
            price={house.price}
            state={house.state}
            suburb={house.suburb}
            type={house.type}
            yearBuilt={house.yearBuilt}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
