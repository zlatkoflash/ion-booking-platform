import { NextResponse } from 'next/server';
import { jsPDF } from 'jspdf';
import { TemplateBookingTicket } from './templates/booking-ticket';

export async function GET() {

  /*const htmlString = TemplateBookingTicket();

  const doc = new jsPDF();

  console.log("htmlString:", htmlString);

  // Write "Hello World" at coordinates (10, 10)
  doc.html(, { x: 10, y: 10 });

  // Convert to a Buffer
  const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="hello.pdf"',
    },
  });*/
}