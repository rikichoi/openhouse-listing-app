import React from "react";

export default function HouseListingItem({
  id,
  houseImage,
  houseName,
  houseStreetNo,
  houseStreet,
  houseSuburb,
  houseState,
  housePost,
  housePrice,
}) {
  return <div>

    <ul>
        <li>{houseImage}</li>
        <li>{houseName}</li>
        <li>{houseStreetNo}</li>
        <li>{houseStreet}</li>
        <li>{houseSuburb}</li>
        <li>{houseState}</li>
        <li>{housePost}</li>
        <li>{housePrice}</li>
    </ul>
  </div>;
}
