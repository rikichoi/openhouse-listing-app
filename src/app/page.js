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
  and,
} from "firebase/firestore";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [search, setSearch] = useState("");
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
  const [outdoorFilter, setOutdoorFilter] = useState("");
  const [indoorFilter, setIndoorFilter] = useState("");

  function getFilterType() {
    //     {
    // let params = []
    //       for(let entry of searchParams.entries()) {
    //         params.push(entry);
    //       }
    //       // let unfiltered = Array.from(typeParam.values());
    //       // let type = "";
    //       // for (var i = 0, len = unfiltered.length; i < len; i++) {
    //       //   type = unfiltered[i];
    //       // }
    //       setTypeFilter(params);
    //     }
    setTypeFilter(searchParams.get("type") || "")
    setMinPriceFilter(searchParams.get("minPrice") || 0);
    setMaxPriceFilter(searchParams.get("maxPrice") || 100000000);
    setHistoryFilter(searchParams.get("history") || "");
    setMinBedroomFilter(searchParams.get("minBed") || 0)
    setMaxBedroomFilter(searchParams.get("maxBed") || 5);
    setBathroomFilter(searchParams.get("bathroom") || 0);
    setCarFilter(searchParams.get("car") || 0);
  }

  async function getFilteredData() {
    const collectionRef = collection(db, "house");
    const q = query(
      collectionRef,
      and(
        where("type", ">=", typeFilter.toString()),
        and(where("price", ">=", parseInt(minPriceFilter))),
        and(where("price", "<=", parseInt(maxPriceFilter))),
        and(where("bed", ">=", parseInt(minBedroomFilter))),
        and(where("bed", "<=", parseInt(maxBedroomFilter))),
        and(where("bathroom", ">=", parseInt(bathroomFilter))),
        and(where("car", ">=", parseInt(carFilter))),
        // and(where("land", ">=", parseInt(minLandFilter))),
        // and(where("land", "<=", parseInt(maxLandFilter))),
        and(where("history", ">=", historyFilter.toString())),
        // and(where("indoor", "array-contains", indoorFilter.toString())),
        // and(where("method", ">=", saleMethodFilter.toString()))
      )
    );

    // where("type", "==", typeFilter.toString())
    const docsSnap = await getDocs(q);

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
  }

  // useEffect(() => {
  //   const getHouseData = async () => {
  //     const collectionRef = collection(db, "house");

  //     const docsSnap = await getDocs(collectionRef);

  //     const data = docsSnap.docs.map((doc) => {
  //       return {
  //         id: doc.id,
  //         ...doc.data(),
  //         bathroom: doc.data().bathroom,
  //         description: doc.data().description,
  //         garage: doc.data().garage,
  //         post: doc.data().post,
  //         price: doc.data().price,
  //         state: doc.data().state,
  //         suburb: doc.data().suburb,
  //         type: doc.data().type,
  //         yearBuilt: doc.data().yearBuilt,
  //       };
  //     });
  //     setHouseList(data);
  //   };
  //   getHouseData();
  // }, []);

  // console.log(search);
  // const DUMMY_DATA = [
  //   {
  //     id: 1,
  //     houseImage: "house1Img",
  //     houseName: "House 1",
  //     houseStreetNo: 61,
  //     houseStreet: "City Road",
  //     houseSuburb: "Southbank",
  //     houseState: "Victoria",
  //     housePost: 3006,
  //     housePrice: 5000,
  //   },
  //   {
  //     id: 2,
  //     houseImage: "house2Img",
  //     houseName: "House 2",
  //     houseStreetNo: 57,
  //     houseStreet: "h2City Road",
  //     houseSuburb: "h2Southbank",
  //     houseState: "h2Victoria",
  //     housePost: 3111,
  //     housePrice: 300,
  //   },
  //   {
  //     id: 3,
  //     houseImage: "house3Img",
  //     houseName: "House 3",
  //     houseStreetNo: 24,
  //     houseStreet: "house3street",
  //     houseSuburb: "h3Southbank",
  //     houseState: "h3Victoria",
  //     housePost: 2934,
  //     housePrice: 125,
  //   },
  // ];
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
          onClick={() =>
            console.log(minPriceFilter, maxPriceFilter, typeFilter, minBedroomFilter, maxBedroomFilter, bathroomFilter, carFilter, historyFilter)
          }
          className="border-2 w-24 h-12 bg-green-400"
        >
          LOG
        </button>
        <button
          onClick={() => getFilterType()}
          className="border-2 w-24 h-12 bg-green-400"
        >
          FILTER
        </button>
        <button
          onClick={() => getFilteredData()}
          className="border-2 w-24 h-12 bg-green-400"
        >
          GET
        </button>
        <FilterButton show={openFilter} onClose={setOpenFilter} />
        <div className="grid grid-cols-3 gap-10 border-2 text-center w-full">
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
