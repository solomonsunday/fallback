import React from "react";
import ModalLayout from "../Modal";
import View from "../View";

const ViewHotelModal = ({
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
        title: "View",
      }}
      modalResult={() => {
        toggleModal(false);
      }}
    >
      <View />
    </ModalLayout>
  );
};

export default ViewHotelModal;
