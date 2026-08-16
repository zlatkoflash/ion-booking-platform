"use client";

import { Toast } from "react-bootstrap";
import Title from "../typography/Title";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setGlobalToaster } from "@/redux/controls/controlsSlice";

export default function ZToasterGlobal() {
  const globalToaster = useAppSelector((state) => state.controls.globalToaster);
  const dispatch = useAppDispatch();
  const close = () => {
    dispatch(setGlobalToaster(
      {
        ...globalToaster,
        show: false,
      }
    ));
  }

  return <>
    <Toast
      show={globalToaster.show}
      onClose={close}
      onClick={close}
      className={`toast-global`}
      animation={true}
      delay={5000}
      autohide={true}
    >
      <Toast.Header>
        {
          /*<img
          src="holder.js/20x20?text=%20"
          className="rounded me-2"
          alt=""
        />*/
        }
        <Title headingType="h4" headingStyle="Text-md-Medium" className="me-auto">
          {globalToaster.title}
        </Title>
        {
          /*<Title headingType="span" headingStyle="Text-md-Medium" className="me-auto">
          11 mins ago
        </Title>*/
        }
      </Toast.Header>
      <Toast.Body>
        <Title headingType="p" headingStyle="Text-sm-Regular">{globalToaster.message}</Title>
      </Toast.Body>
    </Toast>
  </>
}