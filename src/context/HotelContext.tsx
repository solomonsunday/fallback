"use client";
import ErrorModal from "@/components/modal/ErrorModal";
import { HOTEL_KEY } from "@/utils/constants";
import {
  ErrorContextProps,
  ErrorResponse,
  HotelContextProps,
  IHotel,
} from "@/utils/interface";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";

import { uuid } from "uuidv4";

const HotelContext = createContext<HotelContextProps | undefined>(undefined);

export const useHotelContext = (): HotelContextProps => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error("useErrorContext must be used within an HotelProvider");
  }
  return context;
};

interface HotelProviderProps {
  children: ReactNode;
}

export const HotelProvider: React.FC<HotelProviderProps> = ({ children }) => {
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [hotelData, setHotelData] = useState<IHotel[]>([]);
  const [loading, setLoading] = useState(false);

  const createHotel = (hotel: IHotel): void => {
    if (!hotel) {
      setError({
        message: "Validation failed: Invalid hotel input",
        status: 400,
        url: "",
      });
      return;
    }

    if (!hotel.id) {
      setError({
        message: "Validation failed: Please provide a valid id",
        status: 400,
        url: "",
      });
      return;
    }

    const storage = localStorage.getItem(HOTEL_KEY);
    let data: IHotel[] = [];
    if (storage?.length) {
      data = JSON.parse(storage);
    }

    localStorage.setItem(HOTEL_KEY, JSON.stringify([...data, hotel]));
  };

  const getHotels = () => {
    const data = localStorage.getItem(HOTEL_KEY);
    setHotelData(data ? JSON.parse(data) : []);
  };

  const getHotel = (id: string): IHotel | null => {
    const storage = localStorage.getItem(HOTEL_KEY);
    const data =
      storage && storage.length ? (JSON.parse(storage) as IHotel[]) : [];
    console.log("stage data", data);
    const foundData = data.find((d) => d.id === id) ?? null;
    console.log("found data", foundData);
    return foundData;
  };

  const updateHotel = (hotel: IHotel) => {
    const storage = localStorage.getItem(HOTEL_KEY);
    const data =
      storage && storage.length ? (JSON.parse(storage) as IHotel[]) : [];

    const foundIndex = data.findIndex((d) => d.id === hotel.id);
    if (foundIndex !== -1) {
      data[foundIndex].name = hotel.name;
      data[foundIndex].address = hotel.address;
      data[foundIndex].city = hotel.city;
      data[foundIndex].country = hotel.country;
      localStorage.setItem(HOTEL_KEY, JSON.stringify(data));
      console.log("LOCAL STORAGE UPDATE");
    } else {
      console.log("NOT UPDATE TO LOCAL STORAGE");
    }
  };

  const deleteHotel = (id: string) => {
    const storage = localStorage.getItem(HOTEL_KEY);
    const data =
      storage && storage.length ? (JSON.parse(storage) as IHotel[]) : [];

    localStorage.setItem(
      HOTEL_KEY,
      JSON.stringify(data.filter((hotel) => hotel.id !== id))
    );

    getHotels();
  };

  const searchHotels = (value: string): IHotel[] => {
    const storage = localStorage.getItem(HOTEL_KEY);
    const data =
      storage && storage.length ? (JSON.parse(storage) as IHotel[]) : [];

    return data.filter((hotel) =>
      hotel.name.toLowerCase().includes(value.toLowerCase())
    );
  };

  useEffect(() => {
    // createHotel({
    //   id: uuid(),
    //   name: "Eko Hotel",
    //   address: "Victoria Island Lagos",
    //   city: "Lagos",
    //   country: "Nigeria",
    // });
    getHotels();
  }, []);

  return (
    <HotelContext.Provider
      value={{
        createHotel,
        updateHotel,
        deleteHotel,
        searchHotels,
        getHotel,
        getHotels,
        hotelData,
        loading,
      }}
    >
      {children}
      {error && <ErrorModal />}
    </HotelContext.Provider>
  );
};
