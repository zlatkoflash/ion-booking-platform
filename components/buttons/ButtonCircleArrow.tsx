import { Button } from "react-bootstrap";
import { ButtonVariant } from "react-bootstrap/esm/types";
import ZIcon, { ZIconType } from "../icons/ZIcon";

// import icon_right from "@/assets/images/icon-arrow-right.svg";

export default function ButtonCircleArrow({
  onClick,
  variant = "outline-secondary",
  orientation = "orientation-right",
  disabled = false,
  iconType = "arrow-right",
  className = "",
  type="default"
  // icon,
}: {
  onClick?: () => void;
  variant?: ButtonVariant;
  orientation?: "orientation-right" | "orientation-left";
  disabled?: boolean;
  iconType?: ZIconType
  className?: string,
  type?: "default" | "big-for-gallery-navigation"
  // icon?: ZICon
}) {
  return (
    <>
      <Button
        type="button"
        variant={variant}
        className={`component button-circle-arrow ${variant} ${orientation} ${className} ${type}`}
        disabled={disabled}
        onClick={(e) => {
          // e.preventDefault();
          onClick && onClick();
        }}
      >
        <ZIcon type={iconType} />
      </Button>
    </>
  );
}
