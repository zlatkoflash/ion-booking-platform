"use client";

import { setTourMobileSectionActive } from "@/redux/controls/controlsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Link, usePathname } from "@/translations-engine/routing"
import { updateUrlParam } from "@/utils/navigation";
import { useSearchParams } from "next/navigation";
import { Col, Container, Row } from "react-bootstrap"

export default function HeaderSubNavigationClient(
  {
    links
  }
    :
    {
      links: {
        url?: string,
        label: string,
        urlParam?: { name: string, value: string },
        mobileSectionVisible?: string,
        mobileOnlyVisible?: boolean
      }[]
    }
) {

  const pathname = usePathname();
  const updateUrlParamClient = updateUrlParam();
  const searchParams = useSearchParams(); // 2. Initialize it
  const dispatch = useAppDispatch();
  const mobileSelectedSection = useAppSelector((state) => state.controls.tourMobileSectionActive);

  // console.log("searchParams:", searchParams);
  // console.log("searchParams.get(""):", searchParams.get(""));

  // const activeLink = 

  return <>

    <section className="header-subnavigation-client">
      <Container>
        <Row>
          <Col>
            <ul>
              {
                links.map((link, index) => (
                  <li key={index} className={
                    `${link.mobileOnlyVisible ? "mobile-only-visible" : ""}`
                  }>
                    <Link
                      href={link.url ? link.url : "#"}
                      title={link.label}
                      className={pathname === link.url
                        ||
                        (link.urlParam && searchParams.get(link.urlParam.name) === link.urlParam.value)
                        ||
                        link.mobileSectionVisible === mobileSelectedSection
                        ? "active" : ""}
                      data-url-param={link.urlParam ? link.urlParam.name : ""}
                      onClick={(e) => {
                        if (!link.url || link.url === "") {
                          e.preventDefault();

                          if (link.urlParam) {
                            updateUrlParamClient(link.urlParam.name, link.urlParam.value);
                          }
                          if (link.mobileSectionVisible && link.mobileSectionVisible !== "") {
                            dispatch(setTourMobileSectionActive(link.mobileSectionVisible));
                          }

                        }
                      }}>
                      {link.label}
                    </Link>
                  </li>
                ))
              }
            </ul>
          </Col>
        </Row>
      </Container>
    </section>

  </>
}