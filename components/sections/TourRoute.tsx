"use client";

import dynamic from "next/dynamic";
import Title from "../typography/Title";
import ZLeafletMap from "@/components/maps/ZLefLetMap";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

interface IRouteItem {
  lat: number;
  lng: number;
  zoom: number;
  placeName: string;
  description: string;
  additionalLabel: string;
}


export default function TourRoute(
  {
    centerLocation = {
      lat: 41.9028, // Rome
      lng: 12.4964, // Rome
      zoom: 16,
    },
    routeItems = []
  }: {
    centerLocation?: {
      lat: number,
      lng: number,
      zoom: number
    },
    routeItems?: IRouteItem[]
  }) {

  console.log("routeItems:", routeItems);
  const tCommon = useTranslations("Common");

  const [pinActiveIndex, setPinActiveIndex] = useState<number>(-1);

  return (
    <>

      <div className="tour-route" data-section="section-tour-route">
        <Title headingType="h3" headingStyle="Display-xs-Medium" color="--color-text-fg">
          {tCommon("tour_route")}
        </Title>

        <RouteTourMap
          items={routeItems}
          location={centerLocation}
          onClickedPin={(pinIndex) => {
            setPinActiveIndex(pinIndex);
          }} />

        <ul className="route-tour-map-items">
          {routeItems.map((item, index) => (
            <li key={index} className={`route-tour-map-item ${index === pinActiveIndex ? 'active' : ''}`}>
              <div className="number">
                {index + 1}
              </div>
              <Title headingType="h4" headingStyle="Text-lg-Medium" color="--color-text-fg">{item.placeName}</Title>
              <Title headingType="div" headingStyle="Text-lg-Regular" color="--color-text-fg-subtle" className="route-body-content-wrap">
                <span dangerouslySetInnerHTML={{ __html: item.description }} />
              </Title>
              <Title headingType="p" headingStyle="Text-xs-CAPS" color="--color-text-fg-muted">{item.additionalLabel}</Title>
            </li>
          ))}
        </ul>

      </div>

    </>
  );
}



/*const MapMemoDynamic = useMemo(
  () =>
    dynamic(() => import("@/components/maps/ZLefLetMap"), {
      ssr: false, // This is the magic line that kills the error
      loading: () => (
        <div
          className="map-holder-static-height"
          style={{ height: "var(--route-map-height)", background: "#eee" }}
        />
      ),
    }),
  [],
);*/

// 1. Move the dynamic import OUTSIDE of the component function body.
// Next.js handles the memoization automatically here.
const MapDynamic = dynamic(() => import("@/components/maps/ZLefLetMap"), {
  ssr: false,
  loading: () => (
    <div
      className="map-holder-static-height"
      style={{ height: "var(--route-map-height)", background: "#eee" }}
    />
  ),
});

function RouteTourMap(
  {
    items,
    onClickedPin,
    location = {
      // make the lat and lng for italy Rome
      lat: 41.9028, // Rome
      lng: 12.4964, // Rome
      zoom: 25,
    }
  }
    :
    {
      items: IRouteItem[],
      onClickedPin?: (pinIndex: number) => void,
      location: {
        lat: number,
        lng: number,
        zoom: number
      }
    }) {




  return <>
    <div className="route-tour-map">
      <MapDynamic
        onLocationChange={(lat, lng, address, zoom, postcode, city, country) => { }}
        initPositionAndZoom={{
          // make the lat and lng for italy Rome
          lat: location.lat,
          lng: location.lng,
          zoom: location.zoom,
        }}
        pins={items}
        onClickedPin={(pinIndex: number) => {
          onClickedPin?.(pinIndex)
        }}
      />
    </div>
  </>
}