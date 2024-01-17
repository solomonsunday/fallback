import React from "react";
import ModalLayout from "../Modal";
import CreateForm from "../CreateForm";

const CreateHotelModal = ({
  isOpen,
  toggleModal,
  title = "Create",
}: {
  isOpen: boolean;
  toggleModal: (value: boolean) => void;
  title?: string;
}) => {
  return (
    <ModalLayout
      parameters={{
        isOpened: isOpen,
        title,
        // size: "medium",
      }}
      modalResult={() => {
        toggleModal(false);
      }}
    >
      <CreateForm onCloseModal={() => toggleModal(false)} />
    </ModalLayout>
  );
};

export default CreateHotelModal;
