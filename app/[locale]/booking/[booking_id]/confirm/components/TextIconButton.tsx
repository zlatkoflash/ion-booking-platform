"use client";

import ButtonDefault from "@/components/buttons/ButtonDefault";
import IconText from "@/components/buttons/IconText";
import { jsPDF } from "jspdf";
import { useTranslations } from "next-intl";
// it must be so the template will be generated
// import html2canvas from "html2canvas"; // 1. Import explicitly

export default function TextIconButton(
  { link = '', target = "_blank" }
    :
    { link?: string, target?: "_blank" | "_self" | "_parent" | "_top" }
) {

  const tForms = useTranslations("Common");

  return <>
    <div className="text-icon-button">

      <IconText iconType="ticket" text={`3 ${3 > 1 ? tForms("tickets") : tForms("ticket")} · ${tForms("ready_to_download")}`} type="tickets-style" />

      <ButtonDefault
        link={link}
        target={target}
        label={tForms("download_tickets")}
        iconType="download" variant="outline-primary"
        // link="" target="_blank" 
        onClick={() => {
          // handleDownload()
        }} />
    </div>
  </>
}


const handleDownload = async () => {
  const doc = new jsPDF('p', 'mm', 'a4');

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

  const htmlString = `
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
  `;

  const container = document.createElement('div');
  container.innerHTML = htmlString;
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '600px';
  container.style.zIndex = '-9999'; // Ensure it's behind everything
  // container.style.opacity = 0;
  document.body.appendChild(container);

  await new Promise((resolve) => setTimeout(resolve, 100));

  // 2. Explicitly pass html2canvas to the html() method
  await doc.html(container, {
    callback: (doc) => {
      doc.save('string-export.pdf');
      document.body.removeChild(container);
    },
    html2canvas: {
      scale: 0.25, // Reduce scale if the content is too large
      useCORS: true // Essential if you have images
    },
    x: 10,
    y: 10,
    width: 170,
    windowWidth: 600,
  });
};