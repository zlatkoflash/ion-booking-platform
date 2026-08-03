"use client";

import { Button } from "react-bootstrap";
import icon_person from "@/assets/images/icon-person.svg";
import { ButtonVariant } from "react-bootstrap/esm/types";
import ZIcon from "../icons/ZIcon";
import Link from "next/link";

export default function ButtonPerson({
  variant = "outline-primary",
  onClick,
  url = "",
  imgUrl
}: {
  variant?: ButtonVariant;
  onClick?: () => void;
  url?: string;
  imgUrl?: string;
}) {
  if (url) {
    return <Link href={url} className={`btn component btn-person btn-${variant}`}>
      {imgUrl ? <img src={imgUrl} alt="Profile Image Walk in Town" className="img-fluid" /> : <ZIcon type="person" />}
    </Link>
  }
  return (
    <Button
      className={"component btn-person"}
      variant={variant}
      onClick={() => {
        onClick?.();
      }}
    >
      {
        // <img src={icon_person.src} alt="Person" />
      }
      {imgUrl ? <img src={imgUrl} alt="Profile Image Walk in Town" className="img-fluid" /> : <ZIcon type="person" />}
    </Button>
  );
}
