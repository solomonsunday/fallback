"use client";
import { IHotel, IUser } from "@/utils/interface";
import { useCallback, useEffect, useState } from "react";
import { httpGetGithubUsers } from "../app/service/requests";
import { useErrorContext } from "@/context/ErrorContext";
import { HOTEL_KEY } from "@/utils/constants";

export const useHotels = (getHotels: () => IHotel[]) => {
  const [hotelData, setHotelData] = useState<IHotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setHotelData(getHotels());
  }, [getHotels]);

  return { hotelData, loading };
};
