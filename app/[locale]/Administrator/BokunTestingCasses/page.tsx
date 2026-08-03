import { Col, Container, Row } from "react-bootstrap";
import BtnAddReservation from "./actions/BtnAddReservation";
import BtnCartGetContent from "./actions-cart/BtnCartGetContent";
import BtnActionsCheckout from "./actions-cart/BtnActionsCheckout";
import BtnActionsQuestion from "./actions-cart/BtnActionsQuestion";
import BtnBookingEdit from "./actions-cart/BtnBookingEdit";
import BtnsBooking from "./actions-cart/BtnsBookings";
import ButtonsForStripeTesting from "./actions-cart/ButtonsForStripeTesting";
import BtnActivityFunctions from "./actions-cart/BtnActivityFunctions";

export default function BokunTestingCassesPage() {
  return <>
    <Container>
      {
        /*<Row>
        <Col className="p-5 d-flex align-items-center flex-wrap gap-2">

          <BtnAddReservation />

        </Col>
      </Row>*/
      }
      <Row>
        <Col className="">

          <h3>Stripe payment functions</h3>

          <div className="p-5 d-flex align-items-center flex-wrap gap-2">

            <ButtonsForStripeTesting />
          </div>


        </Col>
      </Row>
      <Row>
        <Col className="">

          <h3>activity functions</h3>

          <div className="p-5 d-flex align-items-center flex-wrap gap-2">

            <BtnActivityFunctions />
          </div>


        </Col>
      </Row>
      <Row>
        <Col className="">

          <h3>cart-related functions</h3>

          <div className="p-5 d-flex align-items-center flex-wrap gap-2">

            <BtnCartGetContent />
          </div>


        </Col>
      </Row>
      <Row>
        <Col className="">

          <h3>checkout</h3>
          <div className="p-5 d-flex align-items-center flex-wrap gap-2">
            <BtnActionsCheckout />
          </div>


        </Col>
      </Row>
      <Row>
        <Col className="">

          <h3>question</h3>
          <div className="p-5 d-flex align-items-center flex-wrap gap-2">
            <BtnActionsQuestion />
          </div>

        </Col>
      </Row>
      <Row>
        <Col className="">

          <h3>edit</h3>
          <div className="p-5 d-flex align-items-center flex-wrap gap-2">
            <BtnBookingEdit />
          </div>

        </Col>
      </Row>
      <Row>
        <Col className="">

          <h3>bookings</h3>
          <div className="p-5 d-flex align-items-center flex-wrap gap-2">
            <BtnsBooking />
          </div>

        </Col>
      </Row>
    </Container>
  </>
}