import React from "react";

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
  yearBuilt
}) {
  return <div className="border-2">

    <ul>
        <li>Bathroom: {bathroom}</li>
        <li>Description: {description}</li>
        <li>Garage: {garage}</li>
        <li>Post: {post}</li>
        <li>Price: {price}</li>
        <li>State: {state}</li>
        <li>Suburb: {suburb}</li>
        <li>Property Type: {type}</li>
        <li>Year Built: {yearBuilt}</li>
    </ul>
  </div>;
}
