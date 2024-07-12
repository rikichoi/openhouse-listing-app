"use client";
import React, { useState, useEffect } from "react";
import {
  getDownloadURL,
  uploadBytesResumable,
  ref,
  getStorage,
} from "firebase/storage";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  where,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

const initialState = {
  bathroom: 0,
  bed: 0,
  description: "Description Not Provided",
  garage: 0,
  history: "New",
  land: 0,
  post: 0,
  price: 0,
  state: "State Not Provided",
  street: "Street Not Provided",
  suburb: "Suburb Not Provided",
  type: "Type Not Provided",
  yearBuilt: 0,
  date: new Date(),
  pool: JSON.parse("false"),
  shed: "false",
  balcony: "false",
  tennis: "false",
  aircon: "false",
  solar: "false",
  heating: "false",
  fire: "false",
  method: "Private",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const collectionRef = collection(db, "house");
    try {
      await addDoc(collectionRef, data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full h-full">
      <button
        onClick={() => console.log(data)}
        className="w-full border-2 bg-green-600 h-32"
      >
        LOG
      </button>
      <button className="border-2 w-24 h-12 text-white bg-red-700">
          <a className="text-center font-semibold" href="/">
            RETURN
          </a>
        </button>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="w-1/2 m-auto grid p-14"
      >
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
        <div className="border-2 grid grid-rows-6">
          <h2 className="row-span-1">Property Type</h2>
          <div className="row-span-5 grid grid-cols-2">
            <div>
              <div>
                <input
                  name="type"
                  type="radio"
                  className="border-2 mr-2"
                  onChange={handleChange}
                  value={"House"}
                ></input>
                <label className="">House</label>
              </div>
              <div>
                <input
                  name="type"
                  type="radio"
                  className="border-2 mr-2"
                  value={"Townhouse"}
                  onChange={handleChange}
                ></input>
                <label className="">Townhouse</label>
              </div>
              <div>
                <input
                  name="type"
                  type="radio"
                  className="border-2 mr-2"
                  value={"Apartment and Unit"}
                  onChange={handleChange}
                ></input>
                <label className="">Apartment and Unit</label>
              </div>
              <div>
                <input
                  name="type"
                  type="radio"
                  className="border-2 mr-2"
                  value={"Villa"}
                  onChange={handleChange}
                ></input>
                <label className="">Villa</label>
              </div>
              <div>
                <input
                  name="type"
                  type="radio"
                  className="border-2 mr-2"
                  value={"Retirement Living"}
                  onChange={handleChange}
                ></input>
                <label className="">Retirement Living</label>
              </div>
            </div>
            <div>
              <div>
                <input
                  name="type"
                  type="radio"
                  className="border-2 mr-2"
                  value={"Land"}
                  onChange={handleChange}
                ></input>
                <label className="">Land</label>
              </div>
              <div>
                <input
                  name="type"
                  type="radio"
                  className="border-2 mr-2"
                  value={"Acreage"}
                  onChange={handleChange}
                ></input>
                <label className="">Acreage</label>
              </div>
              <div>
                <input
                  name="type"
                  type="radio"
                  className="border-2 mr-2"
                  value={"Rural"}
                  onChange={handleChange}
                ></input>
                <label className="">Rural</label>
              </div>
              <div>
                <input
                  name="type"
                  type="radio"
                  className="border-2 mr-2"
                  value={"Block of Units"}
                  onChange={handleChange}
                ></input>
                <label className="">Block of Units</label>
              </div>
            </div>
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
