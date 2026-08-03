"use client";

import { useSelector } from "react-redux";
import ButtonPerson from "./ButtonPerson";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import example_profile_image from "@/assets/images/example-profile-image.png";
import profile_placeholder from "@/assets/images/profile-placeholdedr.jpg";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { setAuthState, setShowModalAuth } from "@/redux/auth/authSlice";
import { logoutAction } from "@/redux/auth/authThunks";
import { Link } from "@/translations-engine/routing";
import Title from "../typography/Title";
import { useTranslations } from "next-intl";


export default function ButtonProfile() {

  const userSupabase = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  // console.log("userSupabase:", userSupabase);

  return <>

    {
      userSupabase && <>
        {
          userSupabase.user_metadata.role === "client" && <DropdownButtonForClient />
        }
        {
          userSupabase.user_metadata.role === "administrator" && <DropdownForAdministrator />
        }
      </>
    }

    {
      !userSupabase && <>
        <ButtonPerson onClick={() => {
          dispatch(setShowModalAuth({
            show: true,
            contentType: "login"
          }))
        }} />
      </>
    }

  </>
}


function DropdownButtonForClient() {
  // Define your dropdown menu popover contents

  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);

  const tCommon = useTranslations("Common");

  const popoverMenu = (
    <Popover className="component profile-dropdown-popover">
      <Popover.Body style={{ padding: '0.5rem 0' }}>
        {/* <Link href="/Client/Home" className="dropdown-item">Dashboard</Link> */}
        <Link href="/Client/BookingsAndRefunds" className="dropdown-item">{tCommon("bookings_and_refunds")}</Link>
        {/*<Link href="/Client/Settings" className="dropdown-item">Settings</Link>*/}
        <hr className="dropdown-divider" />
        <button className="dropdown-item" type="button" onClick={() => {
          dispatch(logoutAction())
        }}>Logout</button>
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger="click"            // Shows when pressed
      rootClose                  // Closes when clicking outside
      placement="bottom-end"     // Where it appears
      overlay={popoverMenu}      // The popover elements
    >
      {/* Hand over React-Bootstrap's internal trigger logic to a standard HTML wrapper */}
      {({ ref, ...triggerHandler }) => (
        <span ref={ref} {...triggerHandler} className="profile-button-set" style={{ cursor: 'pointer' }}>
          {user !== null && <Title headingType="div" headingStyle="Text-sm-Regular" color="--color-text-fg" className="user-email">{user.email}</Title>}
          <ButtonPerson imgUrl={profile_placeholder.src} />
        </span>
      )}
    </OverlayTrigger>
  );
}
function DropdownForAdministrator() {
  // Define your Admin-specific popover contents

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const tCommon = useTranslations("Common");

  const adminPopoverMenu = (
    <Popover id="admin-dropdown-popover">
      <Popover.Body>
        {/*<Link href="/Client/Home" className="dropdown-item">Client Dashboard</Link>*/}
        <Link href="/Client/BookingsAndRefunds" className="dropdown-item">{tCommon("bookings_and_refunds")}</Link>
        {/*<Link href="/Administrator/Dashboard" className="dropdown-item">Admin Dashboard</Link>*/}
        {/*<Link href="/Administrator/Users" className="dropdown-item">Manage Users</Link>*/}
        {/*<Link href="/Administrator/Settings" className="dropdown-item">System Settings</Link>*/}
        <hr className="dropdown-divider" />
        <button className="dropdown-item" type="button" onClick={() => {
          dispatch(logoutAction());
        }}>{tCommon("logout")}</button>
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger="click"            // Opens when pressed
      rootClose                  // Closes when clicking outside the menu
      placement="bottom-end"     // Aligns nicely below the profile button
      overlay={adminPopoverMenu} // The popover element declared above
    >
      {/* Function child safely hooks React-Bootstrap's internal trigger engine */}
      {({ ref, ...triggerHandler }) => (
        <span ref={ref} {...triggerHandler} className="profile-button-set" style={{ cursor: 'pointer' }}>
          {user !== null && <Title headingType="div" headingStyle="Text-sm-Regular" color="--color-text-fg" className="user-email">{user.email}</Title>}
          <ButtonPerson imgUrl={profile_placeholder.src} />
        </span>
      )}
    </OverlayTrigger>
  );
}
