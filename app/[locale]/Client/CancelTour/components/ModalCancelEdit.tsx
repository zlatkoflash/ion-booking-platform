"use client";


import ButtonDefault from "@/components/buttons/ButtonDefault";
import ModalCloseButton from "@/components/modals/ModalCloseButton";
import Title from "@/components/typography/Title";
import { IDBBookingDetails } from "@/utils/interface-database";
import Modal from "react-bootstrap/Modal";


export default function ModalCancelEdit(
  {
    show,
    handleClose,
    bodyContent = <></>,
    // booking,
    footerContent,
    disable = false,
    title,
    description,

  }
    :
    {
      show: boolean;
      handleClose: () => void;
      // booking: IDBBookingDetails;
      bodyContent?: React.ReactNode;
      footerContent?: React.ReactNode;
      disable?: boolean;
      title: string;
      description: string;
    }
) {


  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        className={`modal-question z-1050 modal-booking-view ${disable ? "disabled" : ""}`}
      >
        <ModalCloseButton onClick={() => {
          handleClose?.()
        }} />
        <Modal.Header>
          <Title headingType="h4" headingStyle="Display-xs-Medium" color="--color-text-fg">{title}</Title>
          <Title headingType="p" headingStyle="Text-lg-Regular" color="--color-text-fg-subtle">{description}</Title>
        </Modal.Header>
        <Modal.Body>
          {bodyContent}
        </Modal.Body>
        <Modal.Footer>
          {
            /*<ButtonDefault label="Close" variant="secondary" onClick={handleClose} />
          <ButtonDefault label="Save Changes" variant="primary" onClick={handleClose} />*/
          }
          {footerContent}
        </Modal.Footer>
      </Modal>
    </>
  );
}