import React from "react";
import ModalLayout from "../Modal";
import DeleteItem from "../DeleteItem";

const DeleteHotelModal = ({
  isOpen,
  toggleModal,
}: {
  isOpen: boolean;
  toggleModal: (value: boolean) => void;
}) => {
  return (
    <ModalLayout
      parameters={{
        isOpened: isOpen,
        title: "Delete",
        // size: "medium",
      }}
      modalResult={() => {
        toggleModal(false);
      }}
    >
      <DeleteItem onCloseModal={() => toggleModal(false)} />
    </ModalLayout>
  );
};

export default DeleteHotelModal;
