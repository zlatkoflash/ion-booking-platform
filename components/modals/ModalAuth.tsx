"use client";

import LoginForm from "@/app/[locale]/user/auth/login/LoginForm";
import SignupForm from "@/app/[locale]/user/auth/signup/SignupForm";
import { setShowModalAuth } from "@/redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ModalCloseButton from "./ModalCloseButton";
import ForgotPasswordForm from "@/app/[locale]/user/auth/forgot-password/ForgotPasswordFormt";

export default function ModalAuth() {

  // const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setShowModalAuth({ show: false, contentType: "login" }))
  };

  const modalAuth = useAppSelector((state) => state.auth.modalAuth);

  return <>
    <Modal show={modalAuth.show} onHide={handleClose} centered className="auth-modal">
      {
        /*<Modal.Header closeButton>
        {
          // <Modal.Title>Modal heading</Modal.Title>
        }
      </Modal.Header>*/
      }

      <ModalCloseButton onClick={() => {
        dispatch(setShowModalAuth({ show: false, contentType: "login" }))
      }} />

      <Modal.Body>

        {
          modalAuth.contentType === "login" && <LoginForm />
        }
        {
          modalAuth.contentType === "signup" && <SignupForm />
        }
        {
          modalAuth.contentType === "forgot-password" && <ForgotPasswordForm />
        }

      </Modal.Body>
      {
        /*<Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>*/
      }
    </Modal>
  </>
}