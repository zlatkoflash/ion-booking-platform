
export default async function PageViewBookingTicketActivity(
  {
    params
  }
    :
    {
      params: Promise<{
        bookingActivityId: string
      }>
    }
) {

  const { bookingActivityId } = await params;
  return <>

    <iframe src={`http://localhost:8000/booking-public/view-ticket?bookingActivityId=${bookingActivityId}`} style={{
      border: "none",
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      zIndex: "1000"
    }}></iframe>

  </>
}