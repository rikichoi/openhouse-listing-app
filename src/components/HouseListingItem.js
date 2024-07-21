import React from "react";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { TfiRulerAlt2 } from "react-icons/tfi";
import Link from "next/link";


export default function HouseListingItem({
  id,
  feature,
  bathroom,
  bed,
  description,
  garage,
  post,
  price,
  street,
  state,
  suburb,
  type,
  yearBuilt,
  land,
  history,
  img,
  createdAt,
}) {
  const router = useRouter();

  return (
    <a
    href={`/view-property?id=${id}`}
      className="hover:brightness-90 w-72 text-sm"
    >
      {feature ? (
        <p className="absolute mt-2 bg-gray-500 px-2 py-1 bg-opacity-90 rounded-lg text-white flex items-center text-sm ml-3">
          <FaCheckCircle className="mr-2" />
          {feature}
        </p>
      ) : (
        ""
      )}

      <img src={img} className="h-32 w-full rounded-xl"></img>
      <div className="grid grid-cols-3 py-2">
        <div className="col-span-2 flex flex-col items-start">
          <h3>{street}</h3>
          <h3 className="text-gray-500 font-normal">
            {suburb}, {state} {post}
          </h3>
        </div>
        <div className="col-span-1 flex justify-end">
          <h3 className="text-green-600 font-bold tracking-wide">${price.toLocaleString()}</h3>
        </div>
      </div>
      <div className="grid grid-cols-3 ">
        <h3 className="flex items-center gap-3"><FaBed/>{bed} Bed</h3>
        <h3 className="flex items-center gap-3"><FaBath/>{bathroom} Bath</h3>
        <h3 className="flex items-center gap-3"><TfiRulerAlt2 />{land.toLocaleString()} m&sup2;</h3>
      </div>
    </a>
  );
}
