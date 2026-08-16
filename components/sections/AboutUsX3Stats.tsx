import { Col, Container, Row } from "react-bootstrap";
import Title from "../typography/Title";
import ZPicture from "../illustrations/ZPicture";
import pictureDefault from '@/assets/images/about-us-stats-picture-default.jpg';

export default function AboutUsX3Stats(
  {
    className = ""
  }
    :
    {
      className?: string
    }
) {

  const items: {
    h3: string,
    h4: string,
    p: string
  }[] = [
      {
        h3: "45,000+",
        h4: "happy guests",
        p: "Travelers have explored Italy with us through unforgettable local experiences."
      },
      {
        h3: "150",
        h4: "smiling today",
        p: "Handpicked walking tours, day trips, and cultural experiences across Italy."
      },
      {
        h3: "4.8",
        h4: "average rating",
        p: "Highly rated by travelers for friendly guides, local knowledge, and nice service."
      }
    ];

  return <>
    <section className={`about-us-x3-stats ${className}`}>
      <Container>
        <Row>
          <Col>

            <div className="wrapper-stats">

              <ZPicture alt="About Us" pictureUrl={pictureDefault.src} paralaxEffect={"vertical-up"} />

              <ul>
                {
                  /*<li>
                  <Title headingType="h3" headingStyle="Display-lg-Semibold">45,000+</Title>
                  <Title headingType="h4" headingStyle="Text-lg-Semibold">happy guests</Title>
                  <Title headingType="p" headingStyle="Text-md-Regular">Travelers have explored Italy with us through unforgettable local experiences.</Title>
                </li>*/
                }

                {
                  items.map((item, index) => {
                    return (
                      <li key={index}>
                        <Title headingType="h3" headingStyle="Display-lg-Semibold">{item.h3}</Title>
                        <Title headingType="h4" headingStyle="Text-lg-Semibold">{item.h4}</Title>
                        <Title headingType="p" headingStyle="Text-md-Regular">{item.p}</Title>
                      </li>
                    )
                  })
                }

              </ul>
            </div>

          </Col>
        </Row>
      </Container>
    </section>
  </>
}