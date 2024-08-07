"use client";
import React, { useState, useEffect, useContext } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
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
  GeoPoint,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Button from "@mui/material/Button";
import { authContext } from "@/lib/context/auth-context";
import { Slider } from "@nextui-org/slider";

export default function ListHouse() {
  const { user, loading, logout } = useContext(authContext);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const initialState = {
    bathroom: 0,
    bed: 0,
    description: "",
    garage: 0,
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
    pool: false,
    shed: false,
    balcony: false,
    tennis: false,
    aircon: false,
    solar: false,
    heating: false,
    fire: false,
    method: "",
    longitude: "",
    latitude: "",
    geopoint: new GeoPoint(lat || 0, lon || 0),
    createdAt: new Date(),
    uid: (user && user.uid) || 0,
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
    geopoint,
  } = data;
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const storage = getStorage();

  const handleChange = (e) => {
    if (e.target.type == "number") {
      setData({ ...data, [e.target.name]: e.target.valueAsNumber });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const handleLocChange = (e) => {
    if (e.target.name == "geopointLon") {
      setLon((a) => (a = e.target.valueAsNumber));
      setData({ ...data, geopoint: new GeoPoint(lat, lon) });
    }
    if (e.target.name == "geopointLat") {
      // setLat((a) => (a = e.target.valueAsNumber));
      // setData({ ...data, geopoint: new GeoPoint(lat, lon) });
      console.log(e.target.valueAsNumber);
      console.log(data);
    }
  };

  useEffect(() => {
    setData({ ...data, geopoint: new GeoPoint(lat, lon) });
  }, [lat, lon]);

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

  const validate = () => {
    let errors = {};
    if (!data.street) {
      errors.street = "Please enter a street";
    }
    if (!data.suburb) {
      errors.suburb = "Please enter a suburb";
    }
    if (!data.state) {
      errors.state = "Please enter a state";
    }
    if (!data.yearBuilt || isNaN(data.yearBuilt)) {
      errors.yearBuilt = "Please enter year built in numbers";
    }
    if (!data.post || isNaN(data.post)) {
      errors.post = "Please enter post code in numbers";
    }
    if (!data.type) {
      errors.type = "Please select a property type";
    }
    if (!data.method) {
      errors.method = "Please select a sale method";
    }
    if (!data.date) {
      errors.date = "Please enter a future date";
    }
    if (!data.price || isNaN(data.price)) {
      errors.price = "Please enter price in numbers";
    }
    if (!data.history) {
      errors.history = "Please select property history";
    }
    if (!data.description) {
      errors.description = "Please enter a property description";
    }
    if (!data.land || isNaN(data.land)) {
      errors.land = "Please enter land in numbers";
    }
    if (!data.bed || isNaN(data.bed)) {
      errors.bed = "Please enter bedroom count in numbers";
    }
    if (!data.bathroom || isNaN(data.bathroom)) {
      errors.bathroom = "Please enter bathroom count in numbers";
    }
    if (!data.garage || isNaN(data.garage)) {
      errors.garage = "Please enter a car space count in numbers";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = validate();
    if (Object.keys(errors).length) return setErrors(errors);
    const collectionRef = collection(db, "house");
    try {
      await addDoc(collectionRef, data);
      setErrors({});
    } catch (error) {
      console.log(error.message);
    }
    router.push("/listings");
  };

  if (!user) {
    return router.push("/");
  }
  return (
    <div className="w-full bg-gray-50 font-opensans pt-16 h-full">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="w-1/2 xxxs:w-5/6 xxs:w-4/5 xs:w-2/3 sm:w-2/3 m-auto grid p-14 gap-5"
      >
        <h1 className="text-3xl text-center font-semibold">
          Add Property Form
        </h1>
        {/* Address Section */}
        <div className="grid grid-rows-4">
          <h2 className="font-semibold">
            Address<span className="text-red-600">*</span>
          </h2>
          <input
            className="w-full border-2"
            name="street"
            value={street}
            onChange={handleChange}
          ></input>
          {errors.street ? <p className="text-red-600">{errors.street}</p> : ""}
          <div className="grid grid-cols-2">
            <h2 className="font-semibold">
              Suburb<span className="text-red-600">*</span>
            </h2>
            <h2 className="font-semibold">
              State<span className="text-red-600">*</span>
            </h2>
          </div>
          <div className="grid grid-cols-2">
            <div>
              <input
                value={suburb}
                onChange={handleChange}
                className="w-full border-2"
                name="suburb"
              ></input>
              {errors.suburb ? (
                <p className="text-red-600">{errors.suburb}</p>
              ) : (
                ""
              )}
            </div>
            <div>
              <input
                value={state}
                onChange={handleChange}
                className="w-full border-2"
                name="state"
              ></input>
              {errors.state ? (
                <p className="text-red-600">{errors.state}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <h2 className="font-semibold">
              Post/Zip Code<span className="text-red-600">*</span>
            </h2>
            <h2 className="font-semibold">
              Year Built<span className="text-red-600">*</span>
            </h2>
          </div>
          <div className="grid grid-cols-2">
            <div>
              <input
                className="w-full border-2"
                name="post"
                type="number"
                value={post}
                onChange={handleChange}
              ></input>
              {errors.post ? <p className="text-red-600">{errors.post}</p> : ""}
            </div>
            <div>
              <input
                value={yearBuilt}
                type="number"
                name="yearBuilt"
                onChange={handleChange}
                className="w-full border-2"
              ></input>
              {errors.yearBuilt ? (
                <p className="text-red-600">{errors.yearBuilt}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <h2 className="font-semibold">
              Latitude (between -90 and 90)
              <span className="text-red-600">*</span>
            </h2>
            <h2 className="font-semibold">
              Longitude (between -180 and 180)
              <span className="text-red-600">*</span>
            </h2>
          </div>
          <div className="grid grid-cols-2">
            <Slider
              name="geopointLat"
              label="Latitude"
              step={0.01}
              value={lat}
              maxValue={90}
              minValue={-90}
              className="w-full  h-full"
              onChange={setLat}
            />
            <Slider
              name="geopointLon"
              label="Longitude"
              step={0.01}
              value={lon}
              maxValue={180}
              minValue={-180}
              className="w-full px-2 h-full"
              onChange={setLon}
            />
          </div>
        </div>
        <div className=" grid grid-rows-6">
          <h2 className="row-span-1 font-semibold">
            Property Type<span className="text-red-600">*</span>
          </h2>
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
            {errors.type ? <p className="text-red-600">{errors.type}</p> : ""}
          </div>
        </div>
        {/* Sale Method Section */}
        <div className=" flex flex-col">
          <h2 className="font-semibold">
            Sale Method<span className="text-red-600">*</span>
          </h2>

          <div>
            <input
              name="method"
              type="radio"
              className="border-2 mr-2"
              onChange={handleChange}
              value={"Private"}
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
            ></input>
            <label className="">Auction</label>
          </div>
          {errors.method ? <p className="text-red-600">{errors.method}</p> : ""}
        </div>
        {/* Date and Price Section */}
        <div className=" grid grid-cols-2">
          <div>
            <h2 className="font-semibold">
              Open House Date<span className="text-red-600">*</span>
            </h2>
            <input
              name="date"
              value={date}
              onChange={handleChange}
              type="datetime-local"
              className="w-full border-2"
            ></input>
            {errors.date ? <p className="text-red-600">{errors.date}</p> : ""}
          </div>
          <div>
            <h2 className="font-semibold">
              Listing Price<span className="text-red-600">*</span>
            </h2>
            <input
              name="price"
              onChange={handleChange}
              value={price}
              type="number"
              className="w-full border-2"
            ></input>
            {errors.price ? <p className="text-red-600">{errors.price}</p> : ""}
          </div>
        </div>

        {/* History Section */}
        <div className=" flex flex-col">
          <h2 className="font-semibold">
            Property History<span className="text-red-600">*</span>
          </h2>
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
          {errors.history ? <p className="text-red-600">{errors.history}</p> : ""}
        </div>
        {/* Land and Description Section */}
        <div className=" grid grid-cols-3">
          <div className="col-span-2">
            <h2 className="font-semibold">
              Property Description<span className="text-red-600">*</span>
            </h2>
            <input
              name="description"
              onChange={handleChange}
              value={description}
              className="w-full border-2"
            ></input>
            {errors.description ? <p className="text-red-600">{errors.description}</p> : ""}
          </div>
          <div>
            <h2 className="font-semibold">
              Land Space<span className="text-red-600">*</span>
            </h2>
            <input
              name="land"
              onChange={handleChange}
              value={land}
              type="number"
              className="w-full border-2"
            ></input>
            {errors.land ? <p className="text-red-600">{errors.land}</p> : ""}
          </div>
        </div>
        {/* Bed, bathroom, garage Section */}
        <div className=" grid grid-cols-3">
          <div className="">
            <h2 className="font-semibold">
              Bedroom(s)<span className="text-red-600">*</span>
            </h2>
            <input
              name="bed"
              onChange={handleChange}
              value={bed}
              type="number"
              className="w-full border-2"
            ></input>
            {errors.bed ? <p className="text-red-600">{errors.bed}</p> : ""}
          </div>
          <div>
            <h2 className="font-semibold">
              Bathroom(s)<span className="text-red-600">*</span>
            </h2>
            <input
              name="bathroom"
              onChange={handleChange}
              value={bathroom}
              type="number"
              className="w-full border-2"
            ></input>
            {errors.bathroom ? <p className="text-red-600">{errors.bathroom}</p> : ""}
          </div>
          <div>
            <h2 className="font-semibold">
              Car space<span className="text-red-600">*</span>
            </h2>
            <input
              name="garage"
              onChange={handleChange}
              value={garage}
              type="number"
              className="w-full border-2"
            ></input>
            {errors.garage ? <p className="text-red-600">{errors.garage}</p> : ""}
          </div>
        </div>

        {/* Indoor Features Section */}
        <div className=" flex flex-col">
          <h2 className="font-semibold">Indoor Features</h2>
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
        <div className=" flex flex-col">
          <h2 className="font-semibold">Outdoor Features</h2>
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
        <div className="grid grid-rows-2">
          <h2 className="font-semibold">
            Property Image<span className="text-red-600">*</span>
          </h2>
          <input
            className="w-full"
            type="file"
            label="Upload"
            onChange={(e) => setFile(e.target.files[0])}
          ></input>
        </div>
        <Button
        onClick={()=>console.log(data.date)}
          variant="contained"
          type="submit"
          // disabled={progress == null || progress < 100}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
