"use client";
import React, { useState, useEffect } from "react";
import {
  getDownloadURL,
  uploadBytesResumable,
  ref,
  getStorage,
} from "firebase/storage";
import { db } from "@/lib/firebase";

const initialState = {
  bathroom: "",
  bed: "",
  description: "",
  garage: "",
  history: "",
  land: "",
  post: "",
  price: "",
  state: "",
  street: "",
  suburb: "",
  type: "",
  yearBuilt: "",
  date: "",
  pool: "false",
  shed: "false",
  balcony: "false",
  tennis: "false",
  aircon: "false",
  solar: "false",
  heating: "false",
  fire: "false",
  method: "",
};

export default function ListHouse() {
  const [data, setData] = useState(initialState);
  const {
    bathroom,
    bed,
    description,
    garage,
    history,
    land,
    post,
    price,
    state,
    street,
    suburb,
    type,
    yearBuilt,
    date,
    pool,
    shed,
    balcony,
    tennis,
    aircon,
    solar,
    heating,
    fire,
    method,
  } = data;
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({});
  const storage = getStorage();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  return (
    <div className="w-full h-full">
      <button
        onClick={() => console.log(data)}
        className="w-full border-2 bg-green-600 h-32"
      >
        LOG
      </button>
      <form className="w-1/2 m-auto grid p-14">
        <h1 className="text-3xl text-center">List a house</h1>
        {/* Address Section */}
        <div className="grid grid-rows-4">
          <h2>Address</h2>
          <input
            className="w-full border-2"
            name="street"
            placeholder="Street Address"
            value={street}
            onChange={handleChange}
          ></input>
          <div className="grid grid-cols-2">
            <input
              value={suburb}
              onChange={handleChange}
              className="w-full border-2"
              placeholder="Suburb"
              name="suburb"
            ></input>
            <input
              value={state}
              onChange={handleChange}
              className="w-full border-2"
              placeholder="State"
              name="state"
            ></input>
          </div>
          <div className="grid grid-cols-2">
            <input
              className="w-full border-2"
              placeholder="Postal / Zip code"
              name="post"
              value={post}
              onChange={handleChange}
            ></input>
            <input
              value={yearBuilt}
              type="number"
              name="yearBuilt"
              onChange={handleChange}
              className="w-full border-2"
              placeholder="Year Built"
            ></input>
          </div>
        </div>
        {/* Sale Method Section */}
        <div className="border-2 flex flex-col">
          <h2>Sale Method</h2>

          <div>
            <input
              name="method"
              type="radio"
              className="border-2 mr-2"
              onChange={handleChange}
              value={"private"}
            ></input>
            <label className="">Private treaty sale</label>
          </div>
          <div>
            <input
              name="method"
              type="radio"
              className="border-2 mr-2"
              value={"auction"}
              onChange={handleChange}
            ></input>
            <label className="">Auction</label>
          </div>
        </div>
        {/* Date and Price Section */}
        <div className="border-2 grid grid-cols-2">
          <div>
            <h2>Open House Date</h2>
            <input
              name="date"
              value={date}
              onChange={handleChange}
              type="datetime-local"
              className="w-full border-2"
            ></input>
          </div>
          <div>
            <h2>Listing Price</h2>
            <input
              name="price"
              onChange={handleChange}
              value={price}
              type="number"
              className="w-full border-2"
            ></input>
          </div>
        </div>

        {/* History Section */}
        <div className="border-2 flex flex-col">
          <h2>Property History</h2>
          <div>
            <input
              onChange={handleChange}
              value={"new"}
              name="history"
              type="radio"
              className="border-2 mr-2"
            ></input>
            <label className="">New</label>
          </div>
          <div>
            <input
              onChange={handleChange}
              value={"established"}
              name="history"
              type="radio"
              className="border-2 mr-2"
            ></input>
            <label className="">Established</label>
          </div>
        </div>
        {/* Land and Description Section */}
        <div className="border-2 grid grid-cols-3">
          <div className="col-span-2">
            <h2>Property Description</h2>
            <input
              name="description"
              onChange={handleChange}
              value={description}
              className="w-full border-2"
            ></input>
          </div>
          <div>
            <h2>Land Space</h2>
            <input
              name="land"
              onChange={handleChange}
              value={land}
              type="number"
              className="w-full border-2"
            ></input>
          </div>
        </div>
        {/* Bed, bathroom, garage Section */}
        <div className="border-2 grid grid-cols-3">
          <div className="">
            <h2>Bedroom(s)</h2>
            <input
              name="bed"
              onChange={handleChange}
              value={bed}
              type="number"
              className="w-full border-2"
            ></input>
          </div>
          <div>
            <h2>bathroom(s)</h2>
            <input
              name="bathroom"
              onChange={handleChange}
              value={bathroom}
              type="number"
              className="w-full border-2"
            ></input>
          </div>
          <div>
            <h2>Car space</h2>
            <input
              name="garage"
              onChange={handleChange}
              value={garage}
              type="number"
              className="w-full border-2"
            ></input>
          </div>
        </div>

        {/* Indoor Features Section */}
        <div className="border-2 flex flex-col">
          <h2>Indoor Features</h2>
          <div>
            <input
              onChange={handleChange}
              value={true}
              name="aircon"
              type="checkbox"
              className="border-2 mr-2"
            ></input>
            <label className="">Air conditioning</label>
          </div>
          <div>
            <input
              onChange={handleChange}
              value={true}
              name="solar"
              type="checkbox"
              className="border-2 mr-2"
            ></input>
            <label className="">Solar panels</label>
          </div>
          <div>
            <input
              onChange={handleChange}
              value={true}
              name="heating"
              type="checkbox"
              className="border-2 mr-2"
            ></input>
            <label className="">Heating</label>
          </div>
          <div>
            <input
              onChange={handleChange}
              value={true}
              name="fire"
              type="checkbox"
              className="border-2 mr-2"
            ></input>
            <label className="">Fire place</label>
          </div>
        </div>
        {/* Outdoor Features Section */}
        <div className="border-2 flex flex-col">
          <h2>Outdoor Features</h2>
          <div>
            <input
              onChange={handleChange}
              value={true}
              name="pool"
              type="checkbox"
              className="border-2 mr-2"
            ></input>
            <label className="">Swimming pool</label>
          </div>
          <div>
            <input
              onChange={handleChange}
              value={true}
              name="shed"
              type="checkbox"
              className="border-2 mr-2"
            ></input>
            <label className="">Shed</label>
          </div>
          <div>
            <input
              onChange={handleChange}
              value={true}
              name="balcony"
              type="checkbox"
              className="border-2 mr-2"
            ></input>
            <label className="">Balcony</label>
          </div>
          <div>
            <input
              onChange={handleChange}
              value={true}
              name="tennis"
              type="checkbox"
              className="border-2 mr-2"
            ></input>
            <label className="">Tennis court</label>
          </div>
        </div>
        <div className="grid border-2 grid-rows-2">
          <h2>Property Image</h2>
          <input
            className="w-full border-2"
            type="file"
            label="Upload"
            onChange={(e) => setFile(e.target.files[0])}
            placeholder="Upload Image"
          ></input>
        </div>
        <button
          className="border-2 bg-green-600"
          type="submit"
          disabled={progress !== null && progress < 100}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
