"use client"

import { handleLogout } from "../api/add-custom-token";
import { TableBookingsProvider } from "../ProviderTableBookings";
import TableWithBookingsAdmin from "./TableWithBookingsAdmin";

export default function ManageMyBookingContentAdmin() {
  return (
    <TableBookingsProvider
    // bookings_owner="all"
    >
      <TableWithBookingsAdmin />
    </TableBookingsProvider>
  )
}