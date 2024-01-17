import React from "react";
import ModalLayout from "../Modal";
import View from "../View";
import EditForm from "../Edit";

const EditHotelModal = ({
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
        title: "Edit",
        // size: "medium",
      }}
      modalResult={() => {
        toggleModal(false);
      }}
    >
      <EditForm onCloseModal={() => toggleModal(false)} />
    </ModalLayout>
  );
};

export default EditHotelModal;
