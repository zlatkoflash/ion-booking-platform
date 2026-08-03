import Title from "@/components/typography/Title";
import { Col, Container, Row } from "react-bootstrap";
import BookingResultsListTable from "./BookingResultsListTable";
import BookingListTablePagination from "./BookingsListTablePagination";
import { IDBBookingDetails } from "@/utils/interface-database";

export default function BookingsResultsList(
  {
    bookings,
    count
  }
    :
    {
      bookings: IDBBookingDetails[],
      count: number
    }
) {
  return <>

    <section className="booking-results-list">
      <Container>
        <Row>
          <Col>
            <Title headingType="h4" headingStyle="Text-md-Regular" color="--color-text-fg" className="count-title">{count} results</Title>

            <BookingResultsListTable bookings={bookings} />

            <BookingListTablePagination
              totalCountItems={count}
              countItemsPerPage={5}
            />

          </Col>
        </Row>
      </Container>
    </section>

  </>
} 