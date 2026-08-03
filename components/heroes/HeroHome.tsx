"use client";

import cover from "@/assets/images/walk-in-town.png";
// import Image from "next/image";
import { Col, Container, Modal, Row } from "react-bootstrap";
import RatingWidget from "../Rating/RatingWidget";
import CoverImage from "../covers/CoverImage";
import Title from "../typography/Title";
import SearchSlotsForm from "../SearchSlotsForm/SearchSlotsForm";
import SearchSlotsFilters from "../SearchSlotsForm/SearchSlotsFilters";
import IconTextGroupGrid from "../buttons/IconTextGroupGrid";
import ButtonDefault from "../buttons/ButtonDefault";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setModalFiltersShow } from "@/redux/controls/controlsSlice";
import ZIcon from "../icons/ZIcon";
import { getTotalCountFromParticipantObject } from "@/utils/booking-client";
import { DateToFormatMar52026 } from "@/utils/dates-times";
import { useTranslations } from "next-intl";

export default function HeroHome() {

  const tCommon = useTranslations("Common");

  return (
    <>
      <section className="component hero hero-home">
        <CoverImage cover={cover} />
        <Container>
          <Row>
            <Col>
              <div className="heading-part">
                <RatingWidget />
                <Title headingType="h1" headingStyle="Display-2xl-Medium" className="">
                  {tCommon("every_mile")}, {tCommon("every_smile")}
                </Title>
              </div>

              <SearchSlotsForm />
              <SearchButtonForMobile />
              <SearchSlotsFilters />

              <hr />

              <IconTextGroupGrid />

            </Col>
          </Row>
        </Container>
      </section>
      <FiltersToursModal />
    </>
  );
}


export function FiltersToursModal() {

  const modalFiltersShow = useAppSelector((state) => state.controls.modalFiltersShow);
  const dispatch = useAppDispatch();

  return <>
    <Modal show={modalFiltersShow} onHide={() => {
      dispatch(setModalFiltersShow(false));
    }}
      centered
      animation={true}
      className="modal-mobile-menu modal-filters-tours">
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <div className="heading-content">
                <Title headingType="h3" headingStyle="Text-lg-Medium">
                  Choose Place
                </Title>
                <ZIcon type="close" onClick={() => {
                  dispatch(setModalFiltersShow(false));
                }} />
              </div>
              <SearchSlotsForm />

            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  </>
}

export function SearchButtonForMobile() {

  const tForms = useTranslations("Forms");
  // const tForms = useTranslations("Forms");

  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.booking.filters);
  const searchingParts = [];
  if (filters.city !== null && filters.city !== "") {
    searchingParts.push(filters.city)
  }
  if (filters.selectedDates.length > 0) {
    searchingParts.push(`${DateToFormatMar52026(filters.selectedDates[0])}`)
  }
  if (filters.participantsCount.adults > 0) {
    searchingParts.push(`${filters.participantsCount.adults} ${tForms("adults")}`)
  }
  if (filters.participantsCount.children > 0) {
    searchingParts.push(`${filters.participantsCount.children} ${tForms("children")}`)
  }
  if (filters.participantsCount.infants > 0) {
    searchingParts.push(`${filters.participantsCount.infants} ${tForms("infants")}`)
  }

  return <>
    <div className="button-mobile-search-wrap">
      <ButtonDefault variant="light" label={searchingParts.length > 0 ? `${searchingParts.join(", ")} ` : tForms("where_do_you_want_to_walk")} iconType="search" onClick={() => {
        dispatch(setModalFiltersShow(true));
      }} />
    </div>
  </>
}