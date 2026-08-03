"use client";

import IconText from "@/components/buttons/IconText";
import ZIcon, { ZIconType } from "@/components/icons/ZIcon";
import { useState } from "react";

export default function TourPageSelector(
  
  {
    placeholder,
    icon,
    active=false,
    haveValue=false
  }
  :
  {
    placeholder: string,
    icon: ZIconType,
    active?: boolean,
    haveValue?: boolean
  }){

    const [textValue, set_textValue] = useState("");

  return <>
    <div className={`tour-page-selector ${active?'active':""} ${haveValue?'have-value':""}`}>
      <div className="wrap-selector-elements">
        <IconText iconType={icon} type="icon-text-tour-prop-selector" text={textValue!==""?textValue:placeholder} />
        <ZIcon type="arrow-right" className="icon-arrow" />
      </div>
    </div>
  </>
}