import { useHotelContext } from "@/context/HotelContext";
import Image from "next/image";
import React from "react";
import Map from "./GoogleMap";

const View = () => {
  const { selectedHotel } = useHotelContext();
  const center = {
    lat: 7.2905715, // default latitude
    lng: 80.6337262, // default longitude
  };

  return (
    <div className="flex justify-center items-center space-x-3">
      <div className="rounded-3xl">
        {/* <Image
          src={"/assets/images/anonymous.jpeg"}
          width={500}
          height={100}
          alt="hotel image"
          className="rounded-full w-56 h-56"
        /> */}
        <Map center={center} />
      </div>
      <div>
        <p>
          <span className="font-semibold">Name</span> : {selectedHotel?.name}
        </p>
        <p>
          <span className="font-semibold">Address</span> :{" "}
          {selectedHotel?.address}
        </p>
        <p>
          <span className="font-semibold">City</span> : {selectedHotel?.city}
        </p>
        <p>
          <span className="font-semibold">Country</span> :{" "}
          {selectedHotel?.country}
        </p>
      </div>
    </div>
  );
};

export default View;
