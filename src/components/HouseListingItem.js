import React from "react";
import { useRouter } from "next/navigation";

export default function HouseListingItem({
  id,
  bathroom,
  description,
  garage,
  post,
  price,
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
    <button
      onClick={() => router.push(`/view-house?id=${id}`)}
      className="border-2"
    >
      <ul>
        <li>Listed at: {new Date((createdAt).toMillis()).toISOString()}</li>
        <li>Bathroom: {bathroom}</li>
        <li>Description: {description}</li>
        <li>Garage: {garage}</li>
        <li>Post: {post}</li>
        <li>Price: {price}</li>
        <li>State: {state}</li>
        <li>Suburb: {suburb}</li>
        <li>Property Type: {type}</li>
        <li>Year Built: {yearBuilt}</li>
        <li>Land: {land}</li>
        <li>History: {history}</li>
        <li>
          <img src={img}></img>
        </li>
      </ul>
    </button>
  );
}
