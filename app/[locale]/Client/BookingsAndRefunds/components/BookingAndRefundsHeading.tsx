import Title from "@/components/typography/Title";
import { Col, Container, Row } from "react-bootstrap";

export default function BookingAndRefundsHeading(
  { title = "Bookings & Refunds", className = "" }
    :
    { title?: string, className?: string }
) {
  return <>
    <div className={`booking-and-refund-heading ${className}`}>
      <Container>
        <Row>
          <Col>
            <div className="inner-content-wrap">
              <Title headingType="h1" headingStyle="Display-xs-Medium" color="--color-text-fg">
                {title}
              </Title>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </>
}