"use client";
import Loader from "@/components/Loader";
import UserCard from "@/components/HotelCard";
import { useGithubUsers } from "../hooks/useGithubUsers";
import { useHotels } from "@/hooks/useHotels";
import { useHotelContext } from "@/context/HotelContext";
import { useEffect, useState } from "react";
import HotelCard from "@/components/HotelCard";
import ModalLayout from "@/components/Modal";
import { useModalStatusContext } from "@/context/ModalContext";
import SearchBar from "@/components/SearchBar";
import { IHotel } from "@/utils/interface";
import { useForm } from "react-hook-form";
import CreateForm from "@/components/CreateForm";
import Image from "next/image";
import View from "@/components/View";
import DeleteItem from "@/components/DeleteItem";
import CreateHotelModal from "@/components/modal/CreateHotelModal";
import EditHotelModal from "@/components/modal/EditHotelModal";
import DeleteHotelModal from "@/components/modal/DeleteHotelModal";
import ViewHotelModal from "@/components/modal/ViewHotelModal";

export default function Home() {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
  } = useForm<any>({ mode: "onChange" });

  const { loading, hotelData, getHotels } = useHotelContext();

  console.log(loading, "loading");

  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openView, setOpenView] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const [filteredHotelData, setFilteredhotelData] =
    useState<IHotel[]>(hotelData);

  console.log("hotel data", hotelData);
  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      setFilteredhotelData(hotelData);
    } else {
      const filteredData =
        hotelData &&
        hotelData.filter((data) => {
          return data.name
            .toLocaleLowerCase()
            .includes(query.toLocaleLowerCase());
        });
      setFilteredhotelData(filteredData);
      return filteredData;
    }
  };

  useEffect(() => {
    getHotels();
  }, []);

  return (
    <div className="min-h-screen mx-7 xs:ps-2 px-4 md:px-24 ">
      <div className=" flex justify-between pb-3">
        <div>
          <SearchBar onSearch={handleSearch} />
        </div>
        <div>
          <div
            className="p-2 rounded-lg bg-slate-600 hover:bg-slate-400 text-white text-sm cursor-pointer"
            onClick={() => setOpenCreate(true)}
          >
            {" "}
            Create
          </div>
        </div>
      </div>
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
                <HotelCard
                  hotel={hotel}
                  key={hotel.id}
                  onDelete={() => setOpenDelete(true)}
                  onEdit={() => setOpenEdit(true)}
                  onView={() => setOpenView(true)}
                />
              ))}
          </div>
        )}
        {!loading && hotelData?.length === 0 && (
          <div className="flex justify-center items-center">
            No hotel found!
          </div>
        )}
      </>
      <CreateHotelModal isOpen={openCreate} toggleModal={setOpenCreate} />
      <EditHotelModal isOpen={openEdit} toggleModal={setOpenEdit} />
      <DeleteHotelModal isOpen={openDelete} toggleModal={setOpenDelete} />
      <ViewHotelModal isOpen={openView} toggleModal={setOpenView} />
    </div>
  );
}
