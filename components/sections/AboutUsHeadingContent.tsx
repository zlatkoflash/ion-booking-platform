import { Col, Container, Row } from "react-bootstrap";
import IconText from "../buttons/IconText";
import Title from "../typography/Title";

export default function AboutUsHeadingContent(
  {
    badgeText = "About us",
    title = "Turning every mile into a smile",
    paragraph = `Walks in Town was founded on a simple idea: the best way to know a city is to walk it with someone who truly loves it. We're a team of local guides, storytellers, and city lovers on a mission to make every traveler feel like they belong.`
  }
    :
    {
      badgeText?: string;
      title?: string;
      paragraph?: string;
    }
) {
  return <>
    <section className="about-us-heading">
      <Container>
        <Row>
          <Col>
            <IconText text={badgeText} type="badge-style" variation="primary" />
            <Title headingType="h1" headingStyle="Display-lg-Semibold" color="--color-text-fg">{title}</Title>
            <Title headingType="p" headingStyle="Text-xl-Regular" color="--color-text-fg-subtle">
              <span dangerouslySetInnerHTML={{ __html: paragraph }} />
            </Title>
          </Col>
        </Row>
      </Container>
    </section>
  </>
}