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
  return <div>

    <ul>
        <li>{bathroom}</li>
        <li>{description}</li>
        <li>{garage}</li>
        <li>{post}</li>
        <li>{price}</li>
        <li>{state}</li>
        <li>{suburb}</li>
        <li>{type}</li>
        <li>{yearBuilt}</li>
    </ul>
  </div>;
}
