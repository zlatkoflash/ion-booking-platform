// pages/api/generate-pdf.ts
import { GetBookingDetailsByToken, IBokunBookingActivityBooking, IBokunBookingPricingCategoryBooking } from '@/utils/bokun';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
// import puppeteer from 'puppeteer';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium-min';


/**
 * Generates the HTML string for the Booking Confirmation PDF, 
 * matching the visual structure of the provided image.
 * @param bookingId The unique booking reference ID.
 * @param date The booking date and time.
 * @param adults Number of adults.
 * @param children Number of children.
 */
const getBookingConfirmationHtml = (
  bookingDB: any,
  paymentDB: any,
  bookingBokun: any
): string => {
  // Use basic, reliable styles for PDF generation

  const participantsHtml = () => {
    let participantsHtmlString = "";

    bookingBokun.activityBookings.map((bookingActivityPart: IBokunBookingActivityBooking) => {
      const locCategoriesCount = bookingActivityPart.quantityByPricingCategory;
      Object.keys(locCategoriesCount).map((catId: string) => {
        const countParticipants = locCategoriesCount[Number(catId)];
        console.log("countParticipants:", countParticipants);
        const categoryNameFOrParticipians = bookingActivityPart.pricingCategoryBookings.find((cat: IBokunBookingPricingCategoryBooking) => cat.pricingCategory.id === Number(catId));
        console.log("categoryNameFOrParticipians:", categoryNameFOrParticipians);

        participantsHtmlString += `<p>${countParticipants} ${categoryNameFOrParticipians?.bookedTitle}</p>`

      });
    });



    return participantsHtmlString;
  }

  return `
    <html>
      <head>
        <title>Booking Confirmation - WIT-${bookingBokun.confirmationCode}</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            padding: 40px; 
            color: #333; 
            margin: 0;
            background-color: #f4f7f9; /* Light background for the page container */
          }
          .container {
            max-width: 700px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          }
          .header {
            text-align: center;
            padding-bottom: 30px;
            border-bottom: 1px solid #eee;
          }
          .success-icon {
            color: #4CAF50;
            font-size: 50px;
            line-height: 1;
            margin-bottom: 10px;
          }
          h1 {
            font-size: 28px;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .confirmation-box {
            padding: 30px 0;
          }
          .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #333;
            margin-bottom: 20px;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
          }
          .booking-ref {
            float: right;
            font-size: 14px;
            color: #555;
          }
          .detail-row {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            font-size: 14px;
          }
          .detail-icon {
            font-size: 18px;
            color: #6c757d;
            width: 25px;
            text-align: center;
          }
          .detail-content {
            margin-left: 10px;
          }
          .status-box {
            border-left: 1px solid #eee;
            padding-left: 20px;
          }
          .status-completed {
            color: #4CAF50;
            font-weight: bold;
            font-size: 16px;
            margin-top: 5px;
          }
          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr; /* Two columns for details and status */
            gap: 20px;
          }
          @media print {
            /* Ensure the layout looks good on paper */
            body { background-color: #ffffff; }
            .container { box-shadow: none; border: none; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="success-icon">&#10003;</div>
            <h1>Payment Successful!</h1>
            <p>Thank you for choosing WIT-3.0. Your booking has been confirmed and we've sent you a confirmation email.</p>
          </div>

          <div class="confirmation-box">
            <div class="section-title">
              Booking Confirmation
              <span class="booking-ref">Booking Reference: <span style="color: #007bff; font-weight: bold;">WIT-${bookingBokun.confirmationCode}</span></span>
            </div>

            <div class="grid">
              <div>
                <div class="section-title" style="border-bottom: none; padding-bottom: 0;">Booking Details</div>
                
                <div class="detail-row">
                  <div class="detail-icon">📍</div>
                  <div class="detail-content">
                    ${bookingBokun.activityBookings[0].activity.googlePlace.name}
                  </div>
                </div>
                
                <div class="detail-row">
                  <div class="detail-icon">🗓️</div>
                  <div class="detail-content">
                    Booking Date<br/>${bookingBokun.activityBookings[0].dateString}
                  </div>
                </div>
                
                <div class="detail-row">
                  <div class="detail-icon">👥</div>
                  <div class="detail-content">
                    ${participantsHtml()}
                    <p>Standard Package</p>
                  </div>
                </div>
              </div>

              <div class="status-box">
                <div class="section-title" style="border-bottom: none; padding-bottom: 0;">Payment Status</div>
                
                <div style="margin-bottom: 25px;">
                  <div class="status-completed">&#10003; Payment Completed</div>
                  <div style="font-size: 12px; color: #555;">Your payment has been processed successfully</div>
                </div>

                <div style="margin-bottom: 25px; font-size: 12px;">
                    <span style="font-weight: bold;">Stripe Payment Intent ID</span><br/>
                    ${paymentDB.stripe_payment_intent_id}
                </div>

                <div style="display:none;background-color: #e9f5ff; border: 1px solid #cce5ff; padding: 15px; border-radius: 5px; font-size: 14px;">
                  <div class="detail-icon" style="float: left; margin-right: 10px; color: #007bff;">✉️</div>
                  <span style="font-weight: bold;">Confirmation Email Sent</span><br/>
                  Check your inbox for booking details
                  <div style="clear: both;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

// Vercel Hobby plan limit is 10s. Pro is 300s.
// PDF generation is slow, so we set a higher duration if possible.
// export const maxDuration = 60; 

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  const bookingDetailsForToken = await GetBookingDetailsByToken(token as string);

  if (!bookingDetailsForToken?.data?.bookingBokun) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }

  const { bookingDB, paymentDB, bookingBokun } = bookingDetailsForToken.data;
  let browser = null;

  try {
    const htmlContent = getBookingConfirmationHtml(bookingDB, paymentDB, bookingBokun);
    const isProduction = process.env.NODE_ENV === 'production';

    // 1. Launch Browser with Conditional Config
    browser = await puppeteer.launch({
      args: isProduction ? chromium.args : ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: {
        width: 1280,
        height: 720,
        deviceScaleFactor: 1,
      },
      executablePath: isProduction
        ? await chromium.executablePath('https://github.com/Sparticuz/chromium/releases/download/v143.0.0/chromium-v143.0.0-pack.x64.tar')
        : 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // Change this path if you are on Mac
      headless: isProduction ? true : true,
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' },
    });

    // Cleanup browser immediately
    await browser.close();
    browser = null;

    // Convert Buffer to ArrayBuffer for NextResponse
    const arrayBuffer = pdfBuffer.buffer.slice(
      pdfBuffer.byteOffset,
      pdfBuffer.byteOffset + pdfBuffer.byteLength
    ) as ArrayBuffer;

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="invoice_${bookingBokun.confirmationCode}.pdf"`,
      },
    });

  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { message: 'Failed to generate PDF', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  } finally {
    // Safety check: close browser if it crashed during the process
    if (browser) await browser.close();
  }
}