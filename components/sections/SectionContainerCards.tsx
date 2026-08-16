import { Col, Container, Row } from "react-bootstrap";

export default function SectionContainerCards({
  children,
  hiddenOverflow = false,
  className = ""
}: {
  children: React.ReactNode;
  hiddenOverflow?: boolean;
  className?: string;
}) {
  return (
    <section className={`component section-container-cards ${hiddenOverflow ? 'hidden-overflow' : ''} ${className}`}>
      <Container>
        <Row>
          <Col>{children}</Col>
        </Row>
      </Container>
    </section>
  );
}
