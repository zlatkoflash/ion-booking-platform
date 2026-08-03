"use client";

import { Col, Container, Row } from "react-bootstrap";
import illustration_no_results_found from '@/assets/images/illustration-no-bookings-found.jpg';
import illusrtation_no_bookings_yet from '@/assets/images/illustration-no-bookings-yet.jpg'
import Image from "next/image";
import Title from "@/components/typography/Title";
import ButtonDefault from "@/components/buttons/ButtonDefault";
import { useRouter } from "@/translations-engine/routing";
import illustration_no_items_in_cart from '@/assets/images/illustration-no-items-in-cart.svg'
import illustration_wishlist_empty from '@/assets/images/illustration-empty-wishlist.svg'

export default function NoContentIllustration(
  {
    type,
    title,
    paragraph,
    // doRefresh=false;
    button = null
  }
    :
    {
      type: "items-not-found" | "no-items-after-searching" | "no-items-in-cart" | "page-not-found" | "wishlist-empty",
      title: string,
      paragraph: string,
      // doRefresh?: boolean
      button?: {
        label: string;
        onClick: () => void;
      } | null
    }
) {

  const router = useRouter();

  return <>

    <section className="no-content-illustration">
      <Container>
        <Row>
          <Col>
            <div className="wrapper-inner-content">
              {
                type === "items-not-found" && <>
                  <Image alt="No Items found" src={illusrtation_no_bookings_yet} width={400} height={400} />
                </>
              }
              {
                type === "no-items-after-searching" && <>
                  <Image alt="No Items found" src={illustration_no_results_found} width={400} height={400} />
                </>
              }
              {
                type === "no-items-in-cart" && <>
                  <Image alt="No Items found" src={illustration_no_items_in_cart} width={400} height={400} />
                </>
              }
              {
                type === "page-not-found" && <>
                  <Image alt="No Items found" src={illustration_no_results_found} width={400} height={400} />
                </>
              }
              {
                type === "wishlist-empty" && <>
                  <Image alt="Wishlist empty" src={illustration_wishlist_empty} width={400} height={400} />
                </>
              }
              <div className="texts-wrap">
                <Title headingType="h3" headingStyle="Display-xs-Medium" color="--color-text-fg">{title}</Title>
                <Title headingType="p" headingStyle="Text-md-Regular" color="--color-text-fg-subtle">{paragraph}</Title>
              </div>
              {
                (

                  type === "items-not-found" || type === "no-items-in-cart" || type === "page-not-found"

                ) && <div className="buttons-wrap">
                  {
                    button === null && <ButtonDefault label="Browse tours" onClick={() => {
                      router.push("/experiences-search")
                    }} />
                  }
                  {
                    button !== null && <ButtonDefault label={button.label} onClick={() => {
                      button.onClick()
                    }} />
                  }
                </div>
              }
              {
                type === "wishlist-empty" && <div className="buttons-wrap">
                  <ButtonDefault label="Explore experiences" onClick={() => {
                    router.push("/experiences-search")
                  }} />
                </div>
              }

            </div>
          </Col>
        </Row>
      </Container>
    </section>

  </>
}