"use client"

import { handleLogout } from "../api/add-custom-token";
import TableWithBookings from "./TableWithBookings";
import { TableBookingsProvider } from "../ProviderTableBookings";

export default function ManageMyBookingContent() {
  return <>
    <TableBookingsProvider bookings_owner="logged-client" >
      <TableWithBookings />
    </TableBookingsProvider>
  </>
}