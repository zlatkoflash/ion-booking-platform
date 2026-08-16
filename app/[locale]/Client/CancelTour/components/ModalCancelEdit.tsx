"use client";


import ButtonDefault from "@/components/buttons/ButtonDefault";
import ModalCloseButton from "@/components/modals/ModalCloseButton";
import Title from "@/components/typography/Title";
import { IDBBookingDetails } from "@/utils/interface-database";
import Modal from "react-bootstrap/Modal";
import illustration_off from "@/assets/images/illustration-off.svg";
import illustration_coffee from "@/assets/images/illustration-coffee.svg";


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
    illustration_type = "none"

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

      illustration_type?: "none" | "coffee" | "off"
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
          {
            illustration_type === "off" && <img src={illustration_off.src} alt="WIT discount" />
          }
          {
            illustration_type === "coffee" && <img src={illustration_coffee.src} alt="WIT coffee" />
          }
          {
            title !== "" &&
            <Title headingType="h4" headingStyle="Display-xs-Medium" color="--color-text-fg">{title}</Title>
          }
          {
            description !== "" &&
            <Title headingType="p" headingStyle="Text-lg-Regular" color="--color-text-fg-subtle">{description}</Title>
          }
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