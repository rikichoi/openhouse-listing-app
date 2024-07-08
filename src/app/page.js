"use client";
import Image from "next/image";
import HouseListingItem from "@/components/HouseListingItem";
import { useState } from "react";
import FilterButton from "@/components/Filter/FilterButton";
import FilterModal from "@/components/Filter/FilterModal";

export default function Home() {
  const [search, setSearch] = useState("");
  const [openFilter, setOpenFilter] = useState(false);

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
          {DUMMY_DATA.map((house) => (
            <HouseListingItem
              key={house.id}
              houseImage={house.houseImage}
              houseName={house.houseName}
              houseStreetNo={house.houseStreetNo}
              houseStreet={house.houseStreet}
              houseSuburb={house.houseSuburb}
              houseState={house.houseState}
              housePost={house.housePost}
              housePrice={house.housePrice}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
