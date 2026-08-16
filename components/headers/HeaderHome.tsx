"use client";

import { Col, Container, Modal, Row } from "react-bootstrap";
import Logo from "@/components/headers/Logo";
import IconText from "@/components/buttons/IconText";
import profile_placeholder from "@/assets/images/profile-placeholdedr.jpg";

import wishlistIcon from "@/assets/images/icon-heart-grey.svg";
import iconTicket from "@/assets/images/icon-ticked-grey.svg";
import iconCart from "@/assets/images/icon-cart-grey.svg";
import LanguageSwitcher from "../dropdowns/LanguageSwitcher";
import ButtonPerson from "../buttons/ButtonPerson";
import ButtonProfile from "../buttons/ButtonProfile";
import { Link, usePathname } from "@/translations-engine/routing";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ZIcon from "../icons/ZIcon";
import ModalCloseButton from "../modals/ModalCloseButton";
import { useState } from "react";
import ButtonDefault from "../buttons/ButtonDefault";
import { setMobileMenuIsOpened } from "@/redux/controls/controlsSlice";
import Image from "next/image";
// import { usePathname } from "next/navigation";

export default function HeaderHome(
  {
    type = "default"
  }
    :
    {
      type?: "default" | "for-payment-flow"
    }
) {

  const pathName = usePathname();
  console.log("pathName:", pathName);
  const browser_id = useAppSelector((state) => state.auth.browser_user_id);
  const dispatch = useAppDispatch();
  const tCommon = useTranslations("Common");

  return (
    <>
      <header>
        <Container className="desktop-header-content">
          <Row>
            <Col className="content-holder">


              <div className="left-content">
                <Logo />
                <ul className="desktop-pages-menu">
                  <li>
                    <Link href="/" className={`${pathName === "/" ? "active" : "not-active"}`}>
                      <Title headingType="span" headingStyle="Text-md-Regular" color="--color-text-fg">{tCommon("home")}</Title>
                    </Link>
                  </li>
                  <li>
                    <Link href="/AboutUs" className={`${pathName === "/AboutUs" ? "active" : "not-active"}`}>
                      <Title headingType="span" headingStyle="Text-md-Regular" color="--color-text-fg">{tCommon("about_us")}</Title>
                    </Link>
                  </li>
                  <li>
                    <Link href="/ContactUs" className={`${pathName === "/ContactUs" ? "active" : "not-active"}`}>
                      <Title headingType="span" headingStyle="Text-md-Regular" color="--color-text-fg">{tCommon("contact")}</Title>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="menu-navigation">
                {
                  type === "default" && <>
                    <div className="container-main-links">
                      <IconText
                        type="header-link"
                        text={tCommon("wishlist")}
                        // iconSrc={wishlistIcon.src}
                        iconType="heart"
                        href="/Client/Wishlist"
                        className={`${pathName === "/Client/Wishlist" ? "active" : "not-active"}`}
                      />
                      <IconText
                        type="header-link"
                        text={tCommon("bookings")}
                        // iconSrc={iconTicket.src}
                        iconType="ticket"
                        href="/Client/BookingsAndRefunds"
                        className={`${pathName === "/Client/BookingsAndRefunds" ? "active" : "not-active"
                          }`}
                      />
                      <IconText
                        type="header-link"
                        text={tCommon("cart")}
                        // iconSrc={iconCart.src}
                        iconType="cart"
                        href={`/ShoppingCart?session=${browser_id}`}
                        className={`${pathName === "/ShoppingCart" ? "active" : "not-active"
                          }`}
                      />
                    </div>
                    <div className="separator"></div>
                    <div className="container-language-and-profile">
                      <LanguageSwitcher />
                      {
                        // <ButtonPerson url="/user/auth/login" />
                      }
                      <ButtonProfile />
                    </div>
                  </>
                }
                {
                  type === "for-payment-flow" && <>
                    <div className="container-language-and-profile">
                      <LanguageSwitcher />
                      {
                        // <ButtonPerson url="/user/auth/login" />
                      }
                      <ButtonProfile />
                    </div>
                  </>
                }
              </div>

              <div className="btn-hamburg">
                <ZIcon type="hamburg" onClick={() => {
                  dispatch(setMobileMenuIsOpened(true));
                }} />
              </div>

            </Col>
          </Row>
        </Container>

        <MobileMenuHeader />

      </header>

      <MobileModalMenu />

    </>
  );
}



function MobileModalMenu() {

  // const [isOpened, setIsOpened] = useState(true);
  const mobileMenuIsOpened = useAppSelector((state) => state.controls.mobileMenuIsOpened);
  const dispatch = useAppDispatch();


  return <>
    <Modal show={mobileMenuIsOpened} onHide={() => {
      dispatch(setMobileMenuIsOpened(false));
    }}
      centered
      animation={true}
      className="modal-mobile-menu">
      {
        /*<ModalCloseButton onClick={() => {
        // dispatch(setShowModalAuth({ show: false, contentType: "login" }))
      }} />*/
      }
      <Modal.Body onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // 1. We treat target as an Element (safe for DOM methods like closest)
        const target = e.target as Element;

        // 2. We find the closest anchor
        const anchor = target.closest('a');

        // 3. We ensure an anchor was found before acting
        if (anchor instanceof HTMLAnchorElement) {
          console.log('Anchor found:', anchor.href);
          dispatch(setMobileMenuIsOpened(false));
          // Add your logic here
        }
      }}>
        <MobileMenuHeader />
        <MobileMenuScrollingContent />
        <MobileMenuFooter />
      </Modal.Body>

    </Modal>
  </>
}


function MobileMenuHeader() {

  const dispatch = useAppDispatch();
  const browser_id = useAppSelector((state) => state.auth.browser_user_id);
  const mobile_menu_is_opened = useAppSelector((state) => state.controls.mobileMenuIsOpened);

  return <>

    <div className="mobile-menu-header">
      <Container>
        <Row>
          <Col className="elements-wrap">
            <Logo />

            <div className="mobile-right-content">
              <LanguageSwitcher />
              <Link className="cart-button" href={`/ShoppingCart?session=${browser_id}`}>
                <ZIcon type="cart" count={7} />
              </Link>
              <div className="hamburg-button-close">
                <ZIcon type={
                  mobile_menu_is_opened ? "close" : "hamburg"
                } onClick={() => {
                  dispatch(setMobileMenuIsOpened(!mobile_menu_is_opened));
                }} />
              </div>
            </div>

          </Col>
        </Row>
      </Container>
    </div>
  </>
}


import exampleProfileImage from '@/assets/images/example-profile-image-2.png';
import Title from "../typography/Title";
import { logoutAction } from "@/redux/auth/authThunks";
import { setShowModalAuth } from "@/redux/auth/authSlice";
import { useTranslations } from "next-intl";
function MobileMenuScrollingContent() {

  const pathName = usePathname();
  const browser_id = useAppSelector((state) => state.auth.browser_user_id);
  const tCommon = useTranslations("Common");

  return <>
    <div className="scrolling-content">
      <Container>
        <Row>
          <Col>
            <ProfileButtonLink />

            <ul className="mobile-pages-menu">
              <li>
                <Link href="/">
                  <Title headingType="span" headingStyle="Text-lg-Regular" color="--color-text-fg">{tCommon("home")}</Title>
                </Link>
              </li>
              <li>
                <Link href="/AboutUs">
                  <Title headingType="span" headingStyle="Text-lg-Regular" color="--color-text-fg">{tCommon("about_us")}</Title>
                </Link>
              </li>
              <li>
                <Link href="/ContactUs">
                  <Title headingType="span" headingStyle="Text-lg-Regular" color="--color-text-fg">{tCommon("contact")}</Title>
                </Link>
              </li>
            </ul>

            <ul className="mobile-pages-menus-icon-texts">
              <li>
                <Link href="/Client/Wishlist">
                  <IconText
                    type="header-link"
                    text={tCommon("wishlist")}
                    // iconSrc={wishlistIcon.src}
                    iconType="heart"
                    type2="header-link-mobile"
                    // href="/Client/Wishlist"
                    className={`${pathName === "/Client/Wishlist" ? "active" : "not-active"}`}
                  />

                  <ZIcon type="keyboard-arrow-left" />
                </Link>
              </li>
              <li>
                <Link href="/Client/BookingsAndRefunds">
                  <IconText
                    type="header-link"
                    type2="header-link-mobile"
                    text={tCommon("bookings")}
                    // iconSrc={iconTicket.src}
                    iconType="ticket"
                    // href="/Client/BookingsAndRefunds"
                    className={`${pathName === "/Client/BookingsAndRefunds" ? "active" : "not-active"
                      }`}
                  />
                  <ZIcon type="keyboard-arrow-left" />
                </Link>
              </li>
              <li>
                <Link href={`/ShoppingCart?session=${browser_id}`}>
                  <IconText
                    type="header-link"
                    type2="header-link-mobile"
                    text={tCommon("cart")}
                    // iconSrc={iconCart.src}
                    iconType="cart"
                    // href={`/ShoppingCart?session=${browser_id}`}
                    className={`${pathName === "/ShoppingCart" ? "active" : "not-active"
                      }`}
                  />
                  <div className="right-items">
                    <div className="count-items">
                      7
                    </div>
                    <ZIcon type="keyboard-arrow-left" />
                  </div>
                </Link>
              </li>
            </ul>

          </Col>
        </Row>
      </Container>
    </div>
  </>
}


function ProfileButtonLink() {

  const userAuth = useAppSelector((state) => state.auth.user);
  const tCommon = useTranslations("Common");

  if (userAuth === null) return <></>

  return <>
    <div className="mobile-profile-button-link">
      <img src={profile_placeholder.src} alt={`${userAuth.email}`} />
      <div className="content-for">
        <Title headingType="p" headingStyle="Text-sm-Regular" color="--color-text-fg">{userAuth.email}</Title>
        <Title headingType="p" headingStyle="Text-sm-Semibold" color="--color-text-fg-on-accent">{tCommon("view_profile")}</Title>
      </div>
      <ZIcon type="keyboard-arrow-left" />
    </div>
  </>
}


function MobileMenuFooter() {

  const dispatch = useAppDispatch();
  const userAuth = useAppSelector((state) => state.auth.user);
  const tCommon = useTranslations("Common");

  return <>
    <div className="mobile-menu-footer">
      <Container>
        <Row>
          <Col className="mobile-menu-footer-elements-wrap">
            <div className="buttons-set">
              {
                userAuth === null && <>
                  <ButtonDefault label={tCommon("log_in")} variant="primary" onClick={() => {
                    dispatch(setMobileMenuIsOpened(false));
                    dispatch(setShowModalAuth({
                      show: true,
                      contentType: "login"
                    }))
                  }} />
                  <ButtonDefault label={tCommon("sign_up")} variant="outline-primary" onClick={() => {
                    dispatch(setMobileMenuIsOpened(false));
                    dispatch(setShowModalAuth({
                      show: true,
                      contentType: "signup"
                    }))
                  }} />
                </>
              }
              {
                userAuth !== null && <>
                  <ButtonDefault label={tCommon("log_out")} variant="outline-danger" onClick={() => {
                    dispatch(setMobileMenuIsOpened(false));
                    dispatch(logoutAction());
                  }} />
                </>
              }
            </div>

            <hr />

          </Col>
        </Row>
      </Container>
    </div>
  </>
}