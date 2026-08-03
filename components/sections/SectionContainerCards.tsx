import { Col, Container, Row } from "react-bootstrap";

export default function SectionContainerCards({
  children,
  hiddenOverflow = false
}: {
  children: React.ReactNode;
  hiddenOverflow?: boolean;
}) {
  return (
    <section className={`component section-container-cards ${hiddenOverflow ? 'hidden-overflow' : ''}`}>
      <Container>
        <Row>
          <Col>{children}</Col>
        </Row>
      </Container>
    </section>
  );
}
