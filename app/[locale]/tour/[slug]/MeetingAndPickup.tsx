"use client";

import ZIcon from "@/components/icons/ZIcon";
import ZPicture from "@/components/illustrations/ZPicture";
import Title from "@/components/typography/Title";
import place_example from "@/assets/images/place-example.png";
import ButtonDefault from "@/components/buttons/ButtonDefault";
import { generateGoogleMapLink, generateGoogleMapLinkByAddress } from "@/utils/maps";
import { useState } from "react";
import { GalleryLightbox } from "@/components/galleries/GalleryTour";
import { useTranslations } from "next-intl";

export default function MeetingAndPickup(
  {
    address = "Lindt Chocolate Shop Firenze Duomo",
    addressFull = "Piazza del Duomo 15R, 50129 Florence, Italy",
    description = `Meet your guide in front of the Lindt Chocolate Shop, located on the left side of the cathedral entrance.
            <br/>
            Your guide will be holding an orange flag for easy identification.`,
    photoURL = null,
    // onClickShowModal = false
  }
    :
    {
      address?: string
      addressFull?: string,
      description?: string,
      photoURL: string | null,
      // onClickShowModal?: boolean
    }
) {

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(addressFull);
      setCheckedFeedback();
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const tCommon = useTranslations("Common");

  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const setCheckedFeedback = () => {
    setCopied(true);
    // Reset the button label state text back to normal after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  return <>
    <div className="meeting-and-pickup" data-section="section-meeting-and-pickup">

      <Title headingType="h3" headingStyle="Display-xs-Medium" color="--color-text-fg">{tCommon('meeting_pickup')}</Title>


      <div className="place-content">
        <div className="icon-wrap">
          <ZIcon type="pin-location-solid" />
        </div>
        <div className="content-inner">
          <div className="left-content">
            <Title headingType="p" headingStyle="Text-xs-CAPS" color="--color-text-fg-muted" className="period-label">{tCommon("meeting_point")}</Title>
            <Title headingType="h4" headingStyle="Text-lg-Medium" color="--color-text-fg">{address}</Title>
            <Title headingType="h4" headingStyle="Text-lg-Medium" color="--color-text-fg-subtle" className="title-place">{addressFull}</Title>
            <Title headingType="div" headingStyle="Text-sm-Regular" color="--color-text-fg-subtle" className="description">
              <span dangerouslySetInnerHTML={{ __html: description }} />
            </Title>

            <div className="buttons">
              <ButtonDefault variant="outline-primary" label={`${copied ? '✓ ' : ''}${tCommon("copy_address")}`} onClick={() => {
                handleCopy()
              }} />
              <ButtonDefault variant="primary" label={tCommon('open_in_google_maps')} link={generateGoogleMapLinkByAddress(addressFull)} target="_blank" />
            </div>
          </div>
          <div className="right-content">
            <ZPicture
              pictureUrl={photoURL !== null ? photoURL : place_example.src}
              alt={address}
              onClick={() => {
                setShowModal(true);
              }}
            />
          </div>
        </div>
      </div>


      <hr />

      <div className="place-content end">
        <div className="icon-wrap">
          <ZIcon type="flag" />
        </div>
        <div className="content-inner">
          <div className="left-content">
            <Title headingType="p" headingStyle="Text-xs-CAPS" color="--color-text-fg-muted" className="period-label">{tCommon("end_point")}</Title>
            <Title headingType="h4" headingStyle="Text-lg-Medium" color="--color-text-fg">{tCommon("returns_to_the_meeting_point")}</Title>
            <Title headingType="p" headingStyle="Text-lg-Regular" color="--color-text-fg-subtle">{tCommon("the_experience_finishes_back_at_the_original_meeting_point")}</Title>
          </div>
          <div className="right-content">
            {
              // <ZPicture pictureUrl={place_example.src} alt="Lindt Chocolate Shop Firenze Duomo" />
            }
          </div>
        </div>
      </div>




    </div>

    <GalleryLightbox
      photos={[
        {
          alt: address || "Picture",
          src: photoURL !== null ? photoURL : place_example.src
        }
      ]}
      show={showModal}
      onClickClose={() => setShowModal(false)}
      showNavigation={false}
    />

  </>
}