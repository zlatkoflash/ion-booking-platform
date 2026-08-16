"use client";

import illustration_check from '@/assets/images/confirm-check-illustration.svg';
import ButtonDefault from '@/components/buttons/ButtonDefault';
import ZBadge from '@/components/buttons/ZBadge';
import Title from '@/components/typography/Title';
import { useRouter } from '@/translations-engine/routing';
import { IDBBookingDetails } from '@/utils/interface-database';
import { useTranslations } from 'next-intl';
import { Col, Container, Row } from 'react-bootstrap';

export default function ConfirmHeading(
  {
    booking
  }
    :
    {
      booking: IDBBookingDetails
    }
) {

  const route = useRouter();

  const tCommon = useTranslations("Common");
  const tForms = useTranslations("Forms");

  return <>
    <div className="confirm-heading">
      <Container>
        <Row>
          <Col>

            <div className="inner-wrap-content">
              <img className='check-illustration' src={illustration_check.src} alt="Confirm Check Illustration" />
              <div className="description">
                <Title headingType="h1" headingStyle="Display-xs-Medium" color="--color-text-fg">{tCommon("youre_all_booked")}</Title>
                <Title headingType='p' headingStyle='Text-md-Regular' color="--color-text-fg-subtle">
                  {tCommon("youre_all_booked_subtitle")}
                </Title>

                <ZBadge
                  label={tForms("booking_reference")}
                  label2={booking.confirmation_code ?? "Not-found"}
                  type="booking-reference-badge"
                  variant="primary"
                />
              </div>

              <ButtonDefault link={`/Client/ViewBookingTicket/${booking.id}/tour-detail`} label={tCommon("open_my_dashboard")} variant='primary' onClick={() => {
                // route.push("/Client/BookingsAndRefunds")
              }} />

              <Title headingType='p' headingStyle='Text-xs-Regular' color="--color-text-fg-subtle">
                {tForms("powered_by_stripe_secure_info")}
              </Title>
            </div>

          </Col>
        </Row>
      </Container>
    </div>
  </>
}