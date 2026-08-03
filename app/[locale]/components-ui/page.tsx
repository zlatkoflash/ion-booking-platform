"use client";

import IconText from "@/components/buttons/IconText";
import Logo from "@/components/headers/Logo";
import { Card, CardBody, Col, Container, Row } from "react-bootstrap";
import iconCart from "@/assets/images/icon-cart-grey.svg";
import globeIcon from "@/assets/images/icon-globe.svg";
import dropdownIcon from "@/assets/images/icon-arrow-menu-down.png";
import LanguageSwitcher from "@/components/dropdowns/LanguageSwitcher";
import ButtonPerson from "@/components/buttons/ButtonPerson";
import RatingWidget from "@/components/Rating/RatingWidget";
import X4PeopleThatRate from "@/components/Rating/X4PeopleThatRate";
import RatingStars from "@/components/Rating/RatingStars";
import Title from "@/components/typography/Title";
import ButtonSearch from "@/components/buttons/ButtonSearch";
import ZIcon from "@/components/icons/ZIcon";
import SearchDropdownFilter from "@/components/dropdowns/SearchDropdownFilter";
import IconTextGroup from "@/components/buttons/IconTextGroup";
import ButtonDefault from "@/components/buttons/ButtonDefault";
import ButtonAddHeart from "@/components/buttons/ButtonAddHeart";
import IconsTextInlineGroup from "@/components/buttons/IconsTextInlineGroup";
import ZBadge from "@/components/buttons/ZBadge";
import PriceGroup from "@/components/typography/PriceGroup";
import BookingCounterIconText from "../booking/[booking_id]/details/BookingCounterIconText";
import BookingPendingCounter from "../booking/[booking_id]/details/BookingPendingCounter";
import DealsExpireInCounter from "../booking/[booking_id]/confirm/components/DealsExpireInCounter";
import TimeRemainingCounter from "../Client/ViewBookingTicket/components/TimeRemainingCounter";

export default function PageComponentsUI() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card className="my-5">
              <CardBody>
                <h4>Logos</h4>
                <hr />
                <Logo />
              </CardBody>
            </Card>
            <Card className="my-5">
              <CardBody>
                <h4>Icon Text</h4>
                <hr />

                <Container>
                  <Row>
                    <Col
                      className="d-flex flex-wrap gap-3 align-items-center"
                      style={{
                        backgroundColor: "silver",
                      }}
                    >
                      <IconText
                        type="header-link"
                        text="Cart"
                        iconSrc={iconCart.src}
                      />
                      <IconText
                        type="header-language-switcher"
                        text="Eng"
                        iconSrc={globeIcon.src}
                      />
                      <IconTextGroup
                        icon="globe"
                        title="45,000+"
                        description="total guests"
                      />
                      <IconText type="footer-link" text="Footer Link" iconType="bookmark-check" />
                      <IconText type="header-language-switcher" text="Footer Link" iconType="bookmark-check" />
                      <IconText type="for-yellow-panel" text="Footer Link" iconType="bookmark-check" />
                      <IconText type="card-city-label" text="card-city-label" iconType="bookmark-check" />
                      <IconText type="card-city-label-content-heading" text="Footer Link" iconType="bookmark-check" />
                      <IconText type="white-panel-title-subtitle" text="Footer Link" iconType="bookmark-check" />
                      <IconText type="illustration-title-subtitle" text="Footer Link" iconType="bookmark-check" subText="Example Sub Text" />
                      <IconText type="footer-info" text="Footer Link" iconType="bookmark-check" />
                      <IconText type="for-subscribe-panel" text="Footer Link" iconType="bookmark-check" />
                      <IconText type="four-tour-item-check" iconType="check" text={"four-tour-item-check"} />
                      <IconText iconType="ticket" text="Discounted rates for kids" type="label-for-form" />
                      <IconText type="icon-text-label-solid" iconType="fire-outline" text="This is a special occasion!" subText="This place is usually booked." key={'card-city-label'} variation="warning" />
                      <IconText iconType="info-circle-outline" type="info-form" text="Booked 60 times yesterday" />
                      <IconText type='icon-text-for-input-label' text={'Icon text for input label'} iconType={'approval'} />
                      <IconText type="payment-flow-secure-form" iconType="lock-outline" text="Secure Form" />

                      <IconText type="icon-text-alert" iconType="power-solid" variation="warning" text="Log in or Sign-up for a faster checkout and to redeem available Rewards" />
                      <IconText type="icon-text-alert" iconType="power-solid" variation="danger" text="Log in or Sign-up for a faster checkout and to redeem available Rewards" />


                      <IconText type="icon-text-booking-big" iconType="power-solid" variation="warning" text="Log in or Sign-up for a faster checkout and to redeem available Rewards" />

                      <IconText type="badge-style" text="Confirmed" variation="success" iconType="check" />

                      <IconText iconType="ticket" text="3 tickets · Ready to download" type="tickets-style" />

                      <IconText type="booking-whats-next" iconType="calendar-check-outline" text="Add to calendar" subText="Save the date so you don't miss it" />

                      <IconText type="history-item" iconType="mail" text="Confirmation Email Sent" subText="Check your inbox for booking details" />


                      <IconText text="icon-text-stat-for-booking-item" type="icon-text-stat-for-booking-item" iconType="person" />

                      <IconText text="badge-style-item-booking with point" type="badge-style-item-booking" variation="danger" addPoint={true} />

                      <IconText text="badge-style-item-booking-boxed" type="badge-style-item-booking-boxed" variation="primary" addPoint={true} />

                      <IconText text="Cancellation policy" subText="Full refund: Get back 100% of what you paid." type="icon-text-cancellation-info" iconType="info-circle-outline" />

                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p>IconsTextInlineGroup for-tour-stats</p>
                      <IconsTextInlineGroup type="for-tour-stats">
                        <IconText type="for-tour-stat" iconType="open-in-new-window-outline" text="Duration" subText="1 hour and 30 minutes" />
                        <IconText type="for-tour-stat" iconType="open-in-new-window-outline" text="Group Size" subText="Max 15 people" />
                        <IconText type="for-tour-stat" iconType="open-in-new-window-outline" text="Start Time" subText="Multiple times" />
                        <IconText type="for-tour-stat" iconType="open-in-new-window-outline" text="Offered in" subText="English +3" />
                      </IconsTextInlineGroup>
                    </Col>
                  </Row>
                </Container>
              </CardBody>
            </Card>

            <Card className="my-5">
              <CardBody>
                <h4>Dropdowns</h4>
                <hr />
                <div className="d-flex flex-wrap gap-3 align-items-center">
                  <LanguageSwitcher />
                  <SearchDropdownFilter
                    placeholder="Search Dropdown Filter"
                    items={[
                      { value: "1", label: "Option 1" },
                      { value: "2", label: "Option 2" },
                      { value: "3", label: "Option 3" },
                    ]}
                  />
                </div>
              </CardBody>
            </Card>

            <Card className="my-5">
              <CardBody>
                <h4>Buttons</h4>
                <hr />
                <Container>
                  <Row>
                    <Col className="d-flex flex-wrap gap-3 align-items-center">
                      <ButtonPerson />
                      <ButtonSearch />
                      <ButtonDefault label="Default Button" />
                      <ButtonDefault label="Default Button" addArrowOnTheEnd={true} />
                      <ButtonAddHeart />
                      <ZBadge label="Badge Default" />
                      <ZBadge label="Badge used in the form tour" type="form-badge" variant="warning" />
                      <ZBadge label="Cart Item Badge" type="cart-item-badge" variant="warning" />
                      <ZBadge
                        label="Booking Reference"
                        label2="WIT-WAL-85953072"
                        type="booking-reference-badge"
                        variant="primary"
                      />
                    </Col>
                  </Row>
                </Container>
              </CardBody>
            </Card>

            <Card className="my-5">
              <CardBody>
                <h4>Ratings</h4>
                <hr />
                <div className="d-flex flex-wrap gap-3 align-items-center">
                  <RatingWidget />
                  <X4PeopleThatRate />
                  <RatingStars
                    sumValues={4.8}
                    countReviews={45000}
                    textAfterPoint={
                      <>
                        <strong>45,000+</strong> happy guests
                      </>
                    }
                  />
                </div>
              </CardBody>
            </Card>

            <Card className="my-5">
              <CardBody>
                <h4>Icons</h4>
                <hr />
                <style>{`
        .icons-wrap{
          svg{
          path{
          fill: black;
          }
          }
        }
      `}</style>
                <div className="d-flex flex-wrap gap-3 align-items-center icons-wrap">
                  <ZIcon type="cart" />
                  <ZIcon type="globe" />
                  <ZIcon type="heart" />
                  <ZIcon type="person" />
                  <ZIcon type="search" />
                  <ZIcon type="ticket" />
                  <ZIcon type="warning-shield" />
                  <ZIcon type="check-circle" />
                  <ZIcon type="star-outline" />
                  <ZIcon type="people" />
                  <ZIcon type="backward" />
                  <ZIcon type="hourglass-top" />
                  <ZIcon type="percent-outline" />
                  <ZIcon type="pin-outline" />
                  <ZIcon type="fire-outline" />
                  <ZIcon type="power-outline" />
                  <ZIcon type="key-outline" />
                  <ZIcon type="calendar-outline" />
                  <ZIcon type="social-facebook" />
                  <ZIcon type="social-instagram" />
                  <ZIcon type="social-linkedin" />
                  <ZIcon type="social-tiktok" />
                  <ZIcon type="social-x" />
                  <ZIcon type="social-youtube" />
                  <ZIcon type="business-center" />
                  <ZIcon type="location-on-pin" />
                  <ZIcon type="approval" />
                  <ZIcon type="bookmark-check" />
                  <ZIcon type="verified" />
                  <ZIcon type="mail" />
                  <ZIcon type="call" />
                  <ZIcon type="social-whatsapp" />
                  <ZIcon type="plus-circle" />
                  <ZIcon type="minus-circle" />
                  <ZIcon type="trophy-outline" />
                  <ZIcon type="time-wave-outline" />
                  <ZIcon type="calendar-check-outline" />
                  <ZIcon type="pin-solid" />
                  <ZIcon type="check" />
                  <ZIcon type="pin-location-solid" />
                  <ZIcon type="flag" />
                  <ZIcon type="info-circle-outline" />
                  <ZIcon type="verified-shield-outline" />
                  <ZIcon type="danger-outline" />
                  <ZIcon type="power-solid" />
                  <ZIcon type="sell-outline" />
                  <ZIcon type="pencil-outline" />
                  <ZIcon type="lock-outline" />
                  <ZIcon type="eye" />
                  <ZIcon type="eye-closed" />
                  <ZIcon type="close" />
                  <ZIcon type="download" />
                  <ZIcon type="dashboard" />
                  <ZIcon type="quiz" />
                  <ZIcon type="trash-outline" onLoad={() => { }} />
                  <ZIcon type="hamburg" />
                  <ZIcon type="keyboard-arrow-left" />
                  <ZIcon type="x3-dots-actions" />
                </div>
              </CardBody>
            </Card>

            <Card className="my-5">
              <CardBody>
                <h4>Typography</h4>
                <hr />
                <Title headingType="h1" headingStyle="Display-2xl-Medium">
                  Every mile, Every smile
                </Title>
              </CardBody>
            </Card>
          </Col>
        </Row>


        <Row>
          <Col>
            <div className="d-flex flex-wrap gap-5 align-items-center icons-wrap">

              <PriceGroup price={100} type="cart-item" />
              <PriceGroup price={100} type="discount" />
              <PriceGroup price={100} type="per-person" />
              <PriceGroup price={100} type="price-group-for-tour-page" />
              <PriceGroup price={100} type="standard" />

            </div>
          </Col>
        </Row>


        <Row>
          <Col>
            <h4>Counters:</h4>
            <div className="mb-5 d-flex">
              <BookingCounterIconText />
            </div>
            <BookingPendingCounter />
            <DealsExpireInCounter />
            <TimeRemainingCounter />
          </Col>
        </Row>

      </Container>
    </>
  );
}
