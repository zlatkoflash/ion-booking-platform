"use client"

import CustomSelect from "@/components/forms/inputs/CustomSelect";
import CardExperience, { ICardExperience } from "@/components/sliders/CardExperience";
import CardExperienceLabels from "@/components/sliders/CardExperienceLabels";
import Title from "@/components/typography/Title";
import { IDBTourIncludeDetails } from "@/utils/interface-database"
import { updateUrlParam } from "@/utils/navigation";
import { Col, Container, Row } from "react-bootstrap";

export default function WrapWishlistItems(
  {
    experiences
  }
    :
    {
      experiences: IDBTourIncludeDetails[]
    }
) {

  const updateUrlParamFor = updateUrlParam();

  return <>
    <section className="wrap-wishlist-items">
      <Container>
        <Row>
          <Col>

            <div className="wrap-wishlist-heading">
              <Title headingType="h4" headingStyle="Text-md-Regular" color="--color-text-fg" className="count-title">{`${experiences.length} saved experiences`}</Title>

              <div className="controls-inputs">
                <CustomSelect
                  onChange={(
                    value: string | number,
                    object: { value: string | number; label: string; } | null
                  ) => {
                    updateUrlParamFor("orderType", value as string);
                  }}
                  size="size-small"
                  options={[
                    { value: "recently-saved", label: "Recently saved" },
                    { value: "price-ascending", label: "Price (ascending)" },
                    { value: "price-descending", label: "Price (descending)" },
                    /*{ value: "rating-low-to-high", label: "Rating (low to high)" },
                    { value: "rating-high-to-low", label: "Rating (high to low)" },*/
                  ]}
                  placeholder="Recently saved"
                />
              </div>

            </div>

            <div className="wrap-wishlist-items-grid">
              {
                experiences?.map((tour) => {

                  const item: ICardExperience = {
                    image_url: tour.cover || "",
                    location: `${tour.location.city}, ${tour.location.country}`,
                    // location: tour.tour.location || "",
                    // rating: tour.tour.rating || 0,
                    // review_count: tour.tour.review_count || 0,
                    title: tour.title || "",
                    description: tour.description || "",
                    bottomLabel: `by ${tour.vendor.title} • ${tour.duration_label}`,
                    // price: tour.tour.price || 0,
                    coverURL: tour.cover || "",
                    priceFrom: tour.price || 0,
                    discountPercent: tour.discount,
                    id: tour.id,
                    isFor: "experience",
                    haveHeart: tour.haveHeart,
                    elementForLeftLabelPLace: <>
                      <CardExperienceLabels bookingDetails={tour} />
                      {
                        // <CardExperienceLabels bookingDetails={tour} />
                      }
                    </>,
                    link: `/tour/${tour.slug}`
                    /*onClickHeart(state) {
                      console.log("state", state);
                    },*/
                  };

                  return <CardExperience details={item} key={`item-${tour.id}`} />
                })
              }
            </div>
          </Col>
        </Row>
      </Container>
    </section>

  </>
}