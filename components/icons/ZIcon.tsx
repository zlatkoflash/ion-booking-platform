"use client";

import { SVGProps } from "react";
import ZIconHeart from "./ZIconHeart"; // Import your clean component
import ZIconTicket from "./ZIconTicket"; // Import your clean component
import ZIconCart from "./ZIconCart";
import ZIconGlobe from "./ZIconGlobe";
import ZIconPerson from "./ZIconPerson";
import ZIconSearch from "./ZIconSearch";
import ZIconHeartOutline from "./ZIconHeartOutline";
import ZIconCheckCircle from "./ZIconCheckCircle";
import ZIconWarningShield from "./ZIconWarningShield";
import ZIconStarOutline from "./ZIconStarOutline";
import ZIconPeople from "./ZIconPeople";
import ZIconBackward from "./ZIconBackward";
import ZIconArrowRight from "./ZIconArrowRight";
import ZIconHourglassTop from "./ZIconHourglassTop";
import ZIconPinOutline from "./ZIconPinOutline";
import ZIconFireOutline from "./ZIconFireOutline";
import ZIconPowerOutline from "./ZIconPowerOutline";
import ZIconPercentOutline from "./ZIconPercentOutline";
import ZIconStar from "./ZIconStar";
import ZIconStarForRating from "./ZIconStarForRating";
import ZIconKeyOutline from "./ZIconKeyOutline";
import ZIconCalendarOutline from "./ZIconCalendarOutline";
import ZIconSocialFacebook from "./ZIconSocialFacebook";
import ZIconSocialInstagram from "./ZIconSocialInstagram";
import ZIconSocialLinkedin from "./ZIconSocialLinkedin";
import ZIconSocialTiktok from "./ZIconSocialTiktok";
import ZIconSocialX from "./ZIconSocialX";
import ZIconSocialYoutube from "./ZIconSocialYoutube";
import Link from "next/link";
import ZIconBusinessCenter from "./ZIconBusinessCenter";
import ZIconLocationOnPin from "./ZIconLocationOnPin";
import ZIconApproval from "./ZIconApproval";
import ZIconBookmarkCheck from "./ZIconBookmarkCheck";
import ZIconVerified from "./ZIconVerified";
import ZIconMail from "./ZIconMail";
import ZIconCall from "./ZIconCall";
import ZIconSocialWhatsapp from "./ZIconSocialWhatsapp";
import ZIconPlusCircle from "./ZIconPlusCircle";
import ZIconMinusCircle from "./ZIconMinusCircle";
import ZIconKeyboardArrowLeft from "./ZIconKeyboardArrowLeft";
import ZIconOpenInNewWindowOutline from "./ZIconOpenInNewWindowOutline";
import ZIconTrophyOutline from "./ZIconTrophyOutline";
import ZIconCloseBig from "./ZIconCloseBig";
import ZIconCalendarCheckOutline from "./ZIconCalendarCheckOutline";
import ZIconTimeWaveOutline from "./ZIconTimeWaveOutline";
import ZIconPinDistanceOutline from "./ZIconPinDistanceOutline";
import ZIconPinSolid from "./ZIconPinSolid";
import ZIconCheck from "./ZIconCheck";
import ZIconPinLocationSolid from "./ZIconPinLocationSolid";
import ZIconFlag from "./ZIconFlag";
import ZIconPlusCircleOutline from "./ZIconPlusCircleOutline";
import ZIconMinusCircleOutline from "./ZIconMinusCircleOutline";
import ZIconInfoCircleOutline from "./ZIconInfoCircleOutline";
import ZIconPowerSolid from "./ZIconPowerSolid";
import ZIconVerifiedShieldOutline from "./ZIconVerifiedShieldOutline";
import ZIconDangerOutline from "./ZIconDangerOutline";
import ZIconSellOutline from "./ZIconSellOutline";
import ZIconPencilOutline from "./ZIconPencilOutline";
import ZIconLockOutline from "./ZIconLockOutline";
import ZIconEye from "./ZIconEye";
import ZIconEyeClosed from "./ZIconEyeClosed";
import ZIconClose from "./ZIconClose";
import ZIconClockAlarmOutline from "./ZIconClockAlarmOutline";
import ZIconDownload from "./ZIconDownload";
import ZIconDashboard from "./ZIconDashboard";
import ZIconQuiz from "./ZIconQuiz";
import ZIconTrashOutline from "./ZIconTrashOutline";
import ZIconHamburg from "./ZIconHamburg";
import ZIconX3DotsActions from "./ZIconX3DotsActions";
import ZIconImportContacts from "./ZIconImportContacts";
import ZIconFootprint from "./ZIconFootprint";
import ZIconHandshake from "./ZIconHandshake";
// import ZIconCalendar from "./ZIconCalendar"; // Import your clean component

// 1. Explicitly define your strict string options
export type ZIconType =
  | "heart"
  | "heart-outline"
  | "ticket" // have star
  | "cart"
  | "globe"
  | "person"
  | "search"
  | "check-circle"
  | "warning-shield"
  | "star-outline"
  | "star"
  | "star-for-rating"
  // | "ticket-star" // it is ticket :)
  | "people"
  | "backward"
  | "arrow-right" | "hourglass-top"
  | "pin-outline"
  | "pin-solid"
  | "fire-outline" | "power-outline" | "percent-outline"
  | "key-outline"
  | "calendar-outline"
  | "calendar-check-outline"
  | "social-facebook"
  | "social-instagram"
  | "social-linkedin"
  | "social-tiktok"
  | "social-x"
  | "social-youtube"
  | "business-center"
  | "location-on-pin"
  | "approval"
  | "bookmark-check"
  | "verified"
  | "mail"
  | "call"
  | "social-whatsapp"
  | "plus-circle"
  | "minus-circle"
  | "keyboard-arrow-left"
  | "open-in-new-window-outline"
  | "trophy-outline"
  | "time-wave-outline"
  | "pin-distance-outline"
  | "check"
  | "pin-location-solid"
  | "flag"
  | "minus-circle-outline"
  | "plus-circle-outline"
  | "info-circle-outline"
  | "power-solid"
  | "verified-shield-outline"
  | "danger-outline"
  | "sell-outline"
  | "pencil-outline"
  | "lock-outline"
  | "eye"
  | "eye-closed"
  | "close"
  | "clock-alarm-outline"
  | "download"
  | "dashboard"
  | "quiz"
  | "trash-outline"
  | "hamburg"
  | "x3-dots-actions"
  | "import-contacts"
  | "footprint"
  | "handshake"
  | "none"
  // | 'close-big';
  ;

export interface ZIconProps extends SVGProps<SVGSVGElement> {
  type: ZIconType;
  size?: number | string;
  href?: string;
  onClick?: (e: any) => void;
  variant?: "secondary" | "danger" | "success" | "warning" | "default";
  count?: number | null;
}

export default function ZIcon({
  type,
  size = 20,
  className = "",
  href = "",
  onClick,
  variant = "default",
  count = null,
  ...props
}: ZIconProps) {
  // 2. Map the string keys directly to the real Component Functions
  const iconMap: Record<ZIconType, React.ComponentType<any>> = {
    heart: ZIconHeart,
    // heart: () => null, // Placeholder example
    ticket: ZIconTicket, // Placeholder example
    // calendar: () => null, // Placeholder example
    cart: ZIconCart,
    globe: ZIconGlobe,
    person: ZIconPerson,
    search: ZIconSearch,
    "heart-outline": ZIconHeartOutline,
    "check-circle": ZIconCheckCircle,
    "warning-shield": ZIconWarningShield,
    "star-outline": ZIconStarOutline,
    people: ZIconPeople,
    backward: ZIconBackward,
    "arrow-right": ZIconArrowRight,
    "hourglass-top": ZIconHourglassTop,
    "pin-outline": ZIconPinOutline,
    "fire-outline": ZIconFireOutline,
    "power-outline": ZIconPowerOutline,
    "percent-outline": ZIconPercentOutline,
    star: ZIconStar,
    "star-for-rating": ZIconStarForRating,
    "key-outline": ZIconKeyOutline,
    "calendar-outline": ZIconCalendarOutline,
    "social-facebook": ZIconSocialFacebook,
    "social-instagram": ZIconSocialInstagram,
    "social-linkedin": ZIconSocialLinkedin,
    "social-tiktok": ZIconSocialTiktok,
    "social-x": ZIconSocialX,
    "social-youtube": ZIconSocialYoutube,
    "business-center": ZIconBusinessCenter,
    "location-on-pin": ZIconLocationOnPin,
    "approval": ZIconApproval,
    "bookmark-check": ZIconBookmarkCheck,
    "verified": ZIconVerified,
    "mail": ZIconMail,
    "call": ZIconCall,
    "social-whatsapp": ZIconSocialWhatsapp,
    "plus-circle": ZIconPlusCircle,
    "minus-circle": ZIconMinusCircle,
    "keyboard-arrow-left": ZIconKeyboardArrowLeft,
    "open-in-new-window-outline": ZIconOpenInNewWindowOutline,
    "trophy-outline": ZIconTrophyOutline,
    // "close-big": ZIconCloseBig
    "calendar-check-outline": ZIconCalendarCheckOutline,
    "time-wave-outline": ZIconTimeWaveOutline,
    "pin-distance-outline": ZIconPinDistanceOutline,
    "pin-solid": ZIconPinSolid,
    "check": ZIconCheck,
    "pin-location-solid": ZIconPinLocationSolid,
    "flag": ZIconFlag,
    "plus-circle-outline": ZIconPlusCircleOutline,
    "minus-circle-outline": ZIconMinusCircleOutline,
    "info-circle-outline": ZIconInfoCircleOutline,
    "power-solid": ZIconPowerSolid,
    "verified-shield-outline": ZIconVerifiedShieldOutline,
    "danger-outline": ZIconDangerOutline,
    "sell-outline": ZIconSellOutline,
    "pencil-outline": ZIconPencilOutline,
    "lock-outline": ZIconLockOutline,
    "eye": ZIconEye,
    "eye-closed": ZIconEyeClosed,
    "close": ZIconClose,
    "clock-alarm-outline": ZIconClockAlarmOutline,
    "download": ZIconDownload,
    "dashboard": ZIconDashboard,
    "quiz": ZIconQuiz,
    "trash-outline": ZIconTrashOutline,
    "hamburg": ZIconHamburg,
    "x3-dots-actions": ZIconX3DotsActions,
    "import-contacts": ZIconImportContacts,
    "footprint": ZIconFootprint,
    "handshake": ZIconHandshake,
    "none": () => null,
  };

  // 3. Extract the functional component reference from the dictionary
  const SelectedIconComponent = iconMap[type];

  // 4. Runtime protection fallback
  if (!SelectedIconComponent) {
    console.warn(`Icon type "${type}" was not found in the ZIcon registry.`);
    return null;
  }

  if (type === "none") {
    return null;
  }

  const wrapperClasses = `component z-icon z-icon-wrapper z-icon-${type} ${className} ${onClick !== undefined ? 'clickable' : ''} ${variant}`;
  // 5. Render the real component while passing down standard props cleanly
  if (href !== undefined && href !== "") {
    return (
      <Link href={href} className={wrapperClasses} onClick={(e) => {
        onClick?.(e);
      }}>
        <SelectedIconComponent size={size} className={className} {...props} />
        {count !== null && count > 0 && (
          <span className="count">{count}</span>
        )}
      </Link>
    );
  }

  return (
    <span className={wrapperClasses} onClick={(e) => {
      onClick?.(e);
    }}>
      <SelectedIconComponent size={size} className={className} {...props} />
      {count !== null && count > 0 && (
        <span className="count">{count}</span>
      )}
    </span>
  );
}
