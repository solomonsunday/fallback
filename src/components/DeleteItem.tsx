import { useHotelContext } from "@/context/HotelContext";
import React from "react";

const DeleteItem = ({ onCloseModal }: { onCloseModal: () => void }) => {
  const { deleteHotel, selectedHotel } = useHotelContext();

  const handleDeleteHotel = () => {
    if (selectedHotel) {
      deleteHotel(selectedHotel.id);
      console.log("hotel deleted");
      onCloseModal();
    }
  };
  return (
    <div>
      {" "}
      <div className="">
        <p>You are about to delete this item</p>
        <div className="flex items-center justify-between">
          <div></div>
          <div
            className="text-center py-2 px-3 rounded-md bg-red-600 hover:bg-red-500  cursor-pointer text-white text-sm"
            onClick={handleDeleteHotel}
          >
            Continue
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteItem;
