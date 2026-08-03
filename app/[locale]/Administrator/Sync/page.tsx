import ButtonDefault from "@/components/buttons/ButtonDefault";
import { Col, Container, Row } from "react-bootstrap";
import ButtonSyncExperiences from "./ButtonSyncExperiences";

export default function SyncPage() {



  return (
    <Container>
      <Row>
        <Col className="p-5 d-flex align-items-center flex-wrap gap-2">
          <div>

            <ButtonSyncExperiences />

          </div>
        </Col>
      </Row>
    </Container>
  )
}