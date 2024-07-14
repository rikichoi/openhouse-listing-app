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
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const [search, setSearch] = useState("");
  const [sortFilter, setSortFilter] = useState("(a, b) => b.createdAt - a.createdAt");
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
  const [filteredQuery, setFilteredQuery] = useState("");
  const collectionRef = collection(db, "house");

  const sortOptions = [
    {
      type: "Newest",
      value: "(a, b) => b.createdAt - a.createdAt"
    },
    {
      type: "Oldest",
      value: "(a, b) => a.createdAt - b.createdAt"
    },
    {
      type: "Highest Price",
      value: "(a, b) => b.price - a.price"
    },
    {
      type: "Lowest Price",
      value: "(a, b) => a.price - b.price"
    }
  ]

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
          createdAt: doc.data().createdAt,
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
        <button className="border-2 w-24 h-12 bg-cyan-400">
          <a className="text-center font-semibold" href="/list-house">
            ADD HOUSE
          </a>
        </button>
        <button
          onClick={() => console.log(sortFilter.replace(/^"(.*)"$/, '$1'))}
          className="border-2 w-24 h-12 bg-green-400"
        >
          LOG
        </button>
        <button
          onClick={() => getFilteredData()}
          className="border-2 w-24 h-12 bg-green-400"
        >
          GET
        </button>
        <FilterButton show={openFilter} onClose={setOpenFilter} />
        <div>
        <select
                  id="sortOptions"
                  defaultValue={"Newest"}
                  className="w-1/2 h-1/2"
                  name="sortOptions"
                >
                  {sortOptions.map((options) => (
                    <option
                      onClick={()=>setSortFilter(options.value.replace(/^"(.*)"$/, '$1'))}
                      label={options.type}
                      key={options.type}
                      value={options.value}
                    >
                      {options.label}
                    </option>
                  ))}
                </select>
              </div>
        <div className="grid grid-cols-3 gap-10 border-2 text-center w-full">
          {houseList.sort(eval(sortFilter)).map((house) => (
              <HouseListingItem
                key={house.id}
                id={house.id}
                createdAt={house.createdAt}
                bathroom={house.bathroom}
                description={house.description}
                garage={house.garage}
                post={house.post}
                price={house.price}
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
    </main>
  );
}
