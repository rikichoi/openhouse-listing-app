"use client";
import React, { useCallback, useEffect, useState, useContext } from "react";
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
  GeoPoint,
} from "firebase/firestore";
import {
  getDownloadURL,
  uploadBytesResumable,
  ref,
  getStorage,
} from "firebase/storage";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import DeleteModal from "@/components/DeleteModal";
import { IoIosArrowBack } from "react-icons/io";
import { authContext } from "@/lib/context/auth-context";
import { Slider } from "@nextui-org/slider";

export default function EditHouse() {
  const { user, loading, logout } = useContext(authContext);
  const [errors, setErrors] = useState({});
  const [houseData, setHouseData] = useState([]);
  const [editStatus, setEditStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
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
    date: "",
    pool: "",
    shed: "",
    balcony: "",
    tennis: "",
    aircon: "",
    solar: "",
    heating: "",
    fire: "",
    method: "",
    geopoint: new GeoPoint(lat || 0, lon || 0),
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
  const [progress, setProgress] = useState({});
  const storage = getStorage();
  const tempDate = new Timestamp(0, 0);

  const handleChange = (e) => {
    if (e.target.type == "number") {
      setData({ ...data, [e.target.name]: e.target.valueAsNumber });
      setEditStatus(true);
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
      setEditStatus(true);
    }
  };

  const handleLocChange = (e) => {
    if (e.target.name == "geopointLon") {
      setLon((a) => (a = e.target.valueAsNumber));
      setData({ ...data, geopoint: new GeoPoint(lat, lon) });
      setEditStatus(true);
    }
    if (e.target.name == "geopointLat") {
      setLat((a) => (a = e.target.valueAsNumber));
      setData({ ...data, geopoint: new GeoPoint(lat, lon) });
      setEditStatus(true);
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

  useEffect(() => {
    async function getHouseData() {
      const docSnap = await getDoc(docRef);
      setHouseData(docSnap.data());
    }
    getHouseData();
  }, []);

  function retrieveGeopoint() {
    if (houseData.geopoint !== "undefined" && houseData.geopoint) {
      setLon(houseData.geopoint.longitude);
      setLat(houseData.geopoint.latitude);
    } else {
      return;
    }
  }

  useEffect(() => {
    retrieveGeopoint();
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
      geopoint: houseData.geopoint,
    });
  }, [houseData]);

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
    const docRef = doc(db, "house", searchParams.get("id"));
    try {
      await updateDoc(docRef, data);
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
    <div
      className={
        showModal == true
          ? "pt-20 z-40 fixed overflow-hidden min-w-full bg-gray-50 min-h-screen"
          : "bg-gray-50 min-h-screen"
      }
    >
      {showModal ? (
        <DeleteModal
          houseID={houseId}
          show={editStatus}
          onClose={setShowModal}
        />
      ) : (
        ""
      )}
      <div className="w-full font-opensans pt-24 px-3 flex justify-between">
        <button
          onClick={() => router.push("/listings")}
          className="flex flex-row text-center p-2 hover:bg-zinc-200 hover:border-black justify-center items-center border-zinc-600 border-2 rounded-lg"
        >
          <IoIosArrowBack className="text-lg mr-3" />
          <p>Back</p>
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="flex flex-row text-center p-2 bg-red-500 hover:bg-red-700 hover:border-black justify-center items-center border-zinc-600 border-2 rounded-lg"
        >
          REMOVE LISTING
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="w-1/2 xxxs:w-5/6 xxs:w-4/5 xs:w-2/3 sm:w-2/3 m-auto grid pb-14 px-14 gap-5"
      >
        <h1 className="text-3xl text-center font-semibold">Edit Listing</h1>
        {/* Address Section */}
        <div className="grid grid-rows-4">
          <h2 className="font-semibold">
            Address<span className="text-red-600">*</span>
          </h2>
          <input
            className="w-full border-2"
            name="street"
            placeholder="Street Address"
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
                placeholder="Suburb"
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
                placeholder="State"
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
                className="w-full [appearance:textfield] border-2"
                placeholder="Postal / Zip code"
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
                className="w-full [appearance:textfield] border-2"
                placeholder="Year Built"
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
                  checked={data.type === "Townhouse"}
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
              // defaultValue={new Date((houseData.date||tempDate).toMillis()).toISOString().slice(0,16)}
              type="datetime-local"
              className="w-full border-2"
            ></input>
            {errors.date ? <p className="text-red-600">{errors.date}</p> : ""}
          </div>
          <div>
            <h2 className="font-semibold">
              Listing Price<span className="text-red-600">*</span>
            </h2>{" "}
            <input
              name="price"
              onChange={handleChange}
              value={price}
              type="number"
              className="w-full [appearance:textfield] border-2"
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
          {errors.history ? (
            <p className="text-red-600">{errors.history}</p>
          ) : (
            ""
          )}
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
              className="w-full  border-2"
            ></input>
            {errors.description ? (
              <p className="text-red-600">{errors.description}</p>
            ) : (
              ""
            )}
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
              className="w-full [appearance:textfield] border-2"
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
              value={parseInt(bed)}
              type="number"
              className="w-full [appearance:textfield] border-2"
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
              className="w-full [appearance:textfield] border-2"
            ></input>
            {errors.bathroom ? (
              <p className="text-red-600">{errors.bathroom}</p>
            ) : (
              ""
            )}
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
              className="w-full [appearance:textfield] border-2"
            ></input>
            {errors.garage ? (
              <p className="text-red-600">{errors.garage}</p>
            ) : (
              ""
            )}
          </div>
        </div>

        {/* Indoor Features Section */}
        <div className=" flex flex-col">
          <h2 className="font-semibold">Indoor Features</h2>
          <div>
            <input
              checked={
                JSON.parse(data.aircon || "false") == true &&
                data.aircon == "true"
              }
              onChange={handleChange}
              value={!JSON.parse(data.aircon || "false")}
              name="aircon"
              type="checkbox"
              className="border-2 mr-2"
            ></input>
            <label className="">Air conditioning</label>
          </div>
          <div>
            <input
              checked={
                JSON.parse(data.solar || "false") == true &&
                data.solar == "true"
              }
              onChange={handleChange}
              value={!JSON.parse(data.solar || "false")}
              name="solar"
              type="checkbox"
              className="border-2 mr-2"
            ></input>
            <label className="">Solar panels</label>
          </div>
          <div>
            <input
              checked={
                JSON.parse(data.heating || "false") == true &&
                data.heating == "true"
              }
              onChange={handleChange}
              value={!JSON.parse(data.heating || "false")}
              name="heating"
              type="checkbox"
              className="border-2 mr-2"
            ></input>
            <label className="">Heating</label>
          </div>
          <div>
            <input
              checked={
                JSON.parse(data.fire || "false") == true && data.fire == "true"
              }
              onChange={handleChange}
              value={!JSON.parse(data.fire || "false")}
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
              checked={
                JSON.parse(data.pool || "false") == true && data.pool == "true"
              }
              onChange={handleChange}
              value={!JSON.parse(data.pool || "false")}
              name="pool"
              type="checkbox"
              className="border-2 mr-2"
            ></input>
            <label className="">Swimming pool</label>
          </div>
          <div>
            <input
              checked={
                JSON.parse(data.shed || "false") == true && data.shed == "true"
              }
              onChange={handleChange}
              value={!JSON.parse(data.shed || "false")}
              name="shed"
              type="checkbox"
              className="border-2 mr-2"
            ></input>
            <label className="">Shed</label>
          </div>
          <div>
            <input
              checked={
                JSON.parse(data.balcony || "false") == true &&
                data.balcony == "true"
              }
              onChange={handleChange}
              value={!JSON.parse(data.balcony || "false")}
              name="balcony"
              type="checkbox"
              className="border-2 mr-2"
            ></input>
            <label className="">Balcony</label>
          </div>
          <div>
            <input
              checked={
                JSON.parse(data.tennis || "false") == true &&
                data.tennis == "true"
              }
              onChange={handleChange}
              value={!JSON.parse(data.tennis || "false")}
              name="tennis"
              type="checkbox"
              className="border-2 mr-2"
            ></input>
            <label className="">Tennis court</label>
          </div>
        </div>
        <div className="grid grid-rows-2">
          <h2 className="font-semibold">Property Image</h2>
          <input
            className="w-full "
            type="file"
            label="Upload"
            onChange={(e) => setFile(e.target.files[0])}
            placeholder="Upload Image"
          ></input>
        </div>
        <Button variant="contained" type="submit">
          Edit
        </Button>
      </form>
    </div>
  );
}
