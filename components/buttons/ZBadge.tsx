import { ButtonVariant } from "react-bootstrap/esm/types";

export default function ZBadge(
  { label, label2 = "", type = "default", variant }
    :
    {
      label: string,
      label2?: string;
      type?: "default" | "form-badge" | "cart-item-badge" | "booking-reference-badge"; variant?: ButtonVariant;
    }
) {
  return <>
    <div className={`component z-badge ${type} ${variant}`}>
      {label}
      {label2 && (
        <span className="label-2">{label2}</span>
      )}
    </div>
  </>;
}