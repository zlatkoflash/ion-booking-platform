import Link from "next/link";
import ZIcon, { ZIconType } from "../icons/ZIcon";

export default function IconText({
  type,
  text,
  subText,
  iconSrc,
  iconType,
  href,
  hrefTarget = "_self",
  variation,
  className = "",
  fullWidthCentered = false,
  addPoint = false,
  type2 = "type2-default",
  hideTextOnMobile = false,
  showOnlyOnMobile = false,
  showOnlyOnDesktop = false
}: {
  type:
  | "header-link"
  | "footer-link"
  | "header-language-switcher"
  | "for-yellow-panel"
  | "card-city-label"
  | "card-city-label-content-heading"
  | "white-panel-title-subtitle"
  | "illustration-title-subtitle"
  | "footer-info"
  | "for-subscribe-panel"
  | "subheader-back"
  | "subheader-share"
  | "subheader-gold-trophies"
  | "for-tour-stat"
  | "for-tour-stat-booking"
  | "four-tour-item-check"
  | "label-for-form"
  | "icon-text-tour-prop-selector"
  | "icon-text-label-solid"
  | "info-form"
  | "tour-form-checks"
  | "icon-text-alert"
  | "icon-text-for-input-label"
  | "icon-text-stat-for-booking-item"
  | "icon-text-booking-big"
  | "payment-flow-secure-form"
  | "badge-style"
  | "badge-style-item-booking"
  | "badge-style-item-booking-boxed"
  | "tickets-style"
  | "booking-whats-next"
  | "history-item"
  | "icon-text-cancellation-info"
  ;
  type2?: "header-link-mobile" | "type2-default";
  variation?: "warning" | "primary" | "secondary" | "danger" | "success" | "info" | "warning-solid" | "light";
  text: string | React.ReactNode;
  subText?: string | React.ReactNode;
  iconSrc?: string;
  iconType?: ZIconType;
  href?: string;
  hrefTarget?: "_blank" | "_self";
  className?: string;
  fullWidthCentered?: boolean;
  addPoint?: boolean;
  hideTextOnMobile?: boolean;
  showOnlyOnMobile?: boolean;
  showOnlyOnDesktop?: boolean;
}) {
  const Content = () => {
    if (
      type === "illustration-title-subtitle"
      || type === "for-tour-stat"
      || type === "for-tour-stat-booking"
      || type === "icon-text-label-solid"
      || type === "tour-form-checks"
      || type === "booking-whats-next"
      || type === "history-item"
      || type === "icon-text-cancellation-info"
      || type === "icon-text-alert"
    ) {
      return (
        <>
          {iconType && <ZIcon type={iconType} />}
          {iconSrc && <img src={iconSrc} alt={typeof text === 'string' ? text : 'Icon Booking Platform'} />}
          <div className="content">
            <span className="title">{text}</span>
            {(subText && subText !== "") && <span className="sub-title">{subText}</span>}
          </div>
        </>
      );
    }
    return (
      <>
        {iconType && <ZIcon type={iconType} />}
        {iconSrc && <img src={iconSrc} alt={typeof text === 'string' ? text : 'Icon Booking Platform'} />}
        {
          typeof text === "string" && <span className="title" dangerouslySetInnerHTML={{ __html: text }} />
        }
        {
          typeof text !== "string" && <span className="title">{text}</span>
        }
        {(subText && subText !== "") && <span className="sub-title">{subText}</span>}
      </>
    );
  };

  return (
    <>
      <div className={`component icon-text ${type} ${type2} ${variation} ${className} ${fullWidthCentered === true ? "full-width-centered" : ""} ${addPoint === true ? "add-point" : ""} ${hideTextOnMobile === true ? "hide-text-on-mobile" : ""} ${showOnlyOnMobile === true ? "show-only-on-mobile" : ""} ${showOnlyOnDesktop === true ? "show-only-on-desktop" : ""}`}>
        {(() => {
          if ((
            type === "header-link" && href && href !== ""
          ) || (type === "footer-info" && href && href !== "") || (typeof href === "string" && href.includes("https"))) {
            return <Link href={href || "/"} target={hrefTarget}>{Content()}</Link>;
          }
          return <div>{Content()}</div>;
        })()}
      </div>
    </>
  );
}
