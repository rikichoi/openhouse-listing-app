"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/firebase";
import {
  FieldPath,
  collection,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  doc,
  where,
  query,
  and,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import {
  getDownloadURL,
  uploadBytesResumable,
  ref,
  getStorage,
} from "firebase/storage";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

export default function EditHouse() {
  const [houseData, setHouseData] = useState([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const houseId = searchParams.get("id").toString();
  const docRef = doc(db, "house", houseId);
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
    date: new Date(),
    pool: "",
    shed: "",
    balcony: "",
    tennis: "",
    aircon: "",
    solar: "",
    heating: "",
    fire: "",
    method: "",
  };

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
  const tempDate = new Timestamp(0, 0);


  const handleChange = (e) => {
    if(e.target.type == "number"){
      setData({ ...data, [e.target.name]: e.target.valueAsNumber });
    }
    else{
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "house", searchParams.get("id"));
    try {
      await updateDoc(docRef, data);
    } catch (error) {
      console.log(error.message);
    }
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

  useEffect(() => {
    async function getHouseData() {
      const docSnap = await getDoc(docRef);
      setHouseData(docSnap.data());
    }
    getHouseData();
  }, []);

  useEffect(() => {
    setData({
      ...data,
      bathroom: houseData.bathroom,
      bed: houseData.bed,
      description: houseData.description,
      garage: houseData.garage,
      history: houseData.history,
      land: houseData.land,
      post: houseData.post,
      price: houseData.price,
      state: houseData.state,
      street: houseData.street,
      suburb: houseData.suburb,
      type: houseData.type,
      yearBuilt: houseData.yearBuilt,
      date: houseData.date,
      pool: houseData.pool,
      shed: houseData.shed,
      balcony: houseData.balcony,
      tennis: houseData.tennis,
      aircon: houseData.aircon,
      solar: houseData.solar,
      heating: houseData.heating,
      fire: houseData.fire,
      method: houseData.method,
    });
  }, [houseData]);


  return (
    <div className="w-full h-full">
      <button
        onClick={() => console.log(data.date)}
        className="w-full border-2 bg-green-600 h-32"
      >
        LOG
      </button>
      <button
        onClick={() => router.push("/")}
        className="border-2 w-24 h-12 text-white bg-red-700 text-center font-semibold"
      >
        RETURN
      </button>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="w-1/2 m-auto grid p-14"
      >
        <h1 className="text-3xl text-center">Edit Listing</h1>
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
                  checked={data.type === "House"}
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
                  checked={data.type === "House"}
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
                  checked={data.type === "Apartment and Unit"}
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
                  checked={data.type === "Villa"}
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
                  checked={data.type === "Retirement Living"}
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
                  value={"Rural"}
                  onChange={handleChange}
                  checked={data.type === "Rural"}
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
                  checked={data.type === "Block of Units"}
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
              value={"Private"}
              checked={data.method === "Private"}
            ></input>
            <label className="">Private treaty sale</label>
          </div>
          <div>
            <input
              name="method"
              type="radio"
              className="border-2 mr-2"
              value={"Auction"}
              onChange={handleChange}
              checked={data.method === "Auction"}
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
              // defaultValue={new Date((houseData.date||tempDate).toMillis()).toISOString().slice(0,16)}
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
              checked={data.history === "new"}

            ></input>
            <label className="">New</label>
          </div>
          <div>
            <input
              onChange={handleChange}
              value={"established"}
              name="history"
              type="radio"
              checked={data.history === "established"}
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
              value={parseInt(bed)}
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
              checked={JSON.parse(data.aircon||"false")}
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
              checked={JSON.parse(data.solar||"false")}
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
              checked={JSON.parse(data.heating||"false")}
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
              checked={JSON.parse(data.fire||"false")}
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
              checked={JSON.parse(data.pool||"false")}
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
              checked={JSON.parse(data.shed||"false")}
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
              checked={JSON.parse(data.balcony||"false")}
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
              checked={JSON.parse(data.tennis||"false")}
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
        <Button variant="contained" type="submit" disabled={!houseData}>
          Edit
        </Button>
      </form>
    </div>
  );
}
