export function TemplateBookingTicket() {

  const data: any = {
    companyName: "Company Name",
    confirmationCode: "CONF-123456",
    qrCodeUrl: "",
    meetingPoint: "Meeting Point",
    locationName: "Location Name",
    date: "Date",
    time: "Time",
    paxCount: "Pax Count",
    tourName: "Tour Name",
    duration: "Duration"
  };




  return `
  <div>
      <header>
        <h1>{data.companyName}</h1>
        <h2>Booking Confirmation</h2>
        <p>Confirmation Code: {data.confirmationCode}</p>
        <img src={data.qrCodeUrl} alt="QR Code" />
      </header>

      <hr />

      <section>
        <h3>Location and Meeting Point</h3>
        <p>Meeting Point: {data.meetingPoint}</p>
        <p>Location: {data.locationName}</p>
      </section>

      <section>
        <h3>Booking Details</h3>
        <table>
          <tr>
            <td>Booking Date:</td>
            <td>{data.date}</td>
          </tr>
          <tr>
            <td>Start Time:</td>
            <td>{data.time}</td>
          </tr>
          <tr>
            <td>Total Participants:</td>
            <td>{data.paxCount}</td>
          </tr>
        </table>
      </section>

      <hr />

      <section>
        <h3>Experience Details</h3>
        <p>Tour Name: {data.tourName}</p>
        <p>Duration: {data.duration}</p>
      </section>
    </div>
  `
}