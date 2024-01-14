"use client";
import Loader from "@/components/Loader";
import UserCard from "@/components/HotelCard";
import { useGithubUsers } from "../hooks/useGithubUsers";
import { useHotels } from "@/hooks/useHotels";
import { useHotelContext } from "@/context/HotelContext";
import { useEffect, useState } from "react";
import HotelCard from "@/components/HotelCard";

export default function Home() {
  const { loading, hotelData } = useHotelContext();
  console.log('hotel data', hotelData);
  return (
    <div className="min-h-screen mx-7 xs:ps-2 px-4 md:px-24 ">
      <>
        {loading ? (
          <div className="flex justify-center items-center h-[75vh]">
            {" "}
            <Loader color="94A3B8" width={40} height={50} />
          </div>
        ) : (
          <div className="space-y-1 grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {hotelData?.length > 0 &&
              hotelData.map((hotel) => (
                <HotelCard hotel={hotel} key={hotel.id} />
              ))}
          </div>
        )}
        {!loading && hotelData?.length === 0 && (
          <div className="flex justify-center items-center">No User found!</div>
        )}
      </>
    </div>
  );
}
