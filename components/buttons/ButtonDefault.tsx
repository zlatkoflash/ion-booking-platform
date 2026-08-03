import { Button, Spinner } from "react-bootstrap";
import ZIcon, { ZIconType } from "../icons/ZIcon";
import { ButtonVariant } from "react-bootstrap/esm/types";
import { Link } from "@/translations-engine/routing";
// import Link from "next/link";

export default function ButtonDefault({
  label,
  onClick,
  addArrowOnTheEnd = false,
  variant = "primary",
  link = "",
  className = "",
  target,
  loading = false,
  disabled = false,
  iconType = undefined,
  iconPosition = "before-text"
}: {
  label: string;
  onClick?: (e: any) => void;
  addArrowOnTheEnd?: boolean;
  variant?: ButtonVariant;
  link?: string;
  className?: string;
  target?: "" | "_blank" | "_self" | "_parent" | "_top";
  loading?: boolean;
  disabled?: boolean;
  iconType?: ZIconType;
  iconPosition?: "before-text" | "after-text";
}) {
  if (link !== '' && link !== undefined) {
    return (
      <Link
        href={link}
        target={target}
        className={`component btn btn-${variant} ${disabled ? "disabled" : ""}`}
        onClick={(e) => {
          onClick?.(e);
        }}>
        {(iconType && iconPosition === "before-text") && <ZIcon type={iconType} />}
        {label}
        {(iconType && iconPosition === "after-text") && <ZIcon type={iconType} />}
        {addArrowOnTheEnd === true && <ZIcon type="arrow-right" />}
      </Link>
    );
  }
  return (
    <Button
      type="button"
      className={`component ${className} ${disabled ? "disabled" : ""}`}
      disabled={loading}
      variant={variant}
      onClick={(e) => {
        onClick?.(e);
      }}
    >
      {(iconType && iconPosition === "before-text") && <ZIcon type={iconType} />}
      {label}
      {(iconType && iconPosition === "after-text") && <ZIcon type={iconType} />}
      {addArrowOnTheEnd === true && <ZIcon type="arrow-right" />}

      {
        loading && <span className="spinner-holder">
          <Spinner animation="grow" />
        </span>
      }

    </Button>
  );
}
