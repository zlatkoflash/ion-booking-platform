"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
/*import ZLeafletMapZoomButtons, {
  ZLeafletMapEvents,
} from "./ZLeafletMapZoomButtons";*/
import Image from "next/image";
// import icon_pin from "./../../assets/images/icon-pin.svg";
// import { useMyListing } from "@/app/Dashboard/MyListing/AddNewListing/MyListingProviderEditor";
import { useEffect, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ZIcon from "../icons/ZIcon";
import { useAppSelector } from "@/redux/hooks";

function MapUpdater({
  lat,
  lng,
  zoom,
}: {
  lat: number;
  lng: number;
  zoom: number;
}) {
  const map = useMap(); // Now this works because it's a CHILD of MapContainer
  const selectedMobileSection = useAppSelector((state) => state.controls.tourMobileSectionActive);

  useEffect(() => {
    if (lat && lng) {
      // Use flyTo for a smooth move, or setView for an instant jump
      map.setView([lat, lng], zoom, { animate: false });
    }
  }, [lat, lng, zoom, map]);

  //const [isInitiliazed, setIsInitiliazed] = useState(false);

  useEffect(() => {
    // This forces Leaflet to recalculate the view
    // 100ms delay ensures the browser has finished the layout reflow

    /*if (lat && lng) {
      // Use flyTo for a smooth move, or setView for an instant jump
      map.setView([lat, lng], zoom, { animate: false });
    }*/
    map.invalidateSize();
    /*const timer = setTimeout(() => {
      map.invalidateSize();
      // setIsInitiliazed(true);
    }, 100);

    return () => clearTimeout(timer);*/
  }, [map, selectedMobileSection]);

  return null; // This component doesn't render anything visual
}


// Helper function to build dynamic numbered icons
const createNumberedIcon = (number: number, checked: boolean) => {
  const customHtmlString = renderToStaticMarkup(
    <div className={`icon-marker-center route-marker-number ${checked ? 'active' : ''}`} style={{ position: 'relative', display: 'inline-block' }}>
      <ZIcon type="pin-solid" />
      <ZIcon type="pin-solid" className="yellow-pin" />
      <span className="number" style={{

      }}>
        {number}
      </span>
    </div>
  );

  return L.divIcon({
    html: customHtmlString,
    className: "custom-moving-pin",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
};





export default function ZLeafletMap({
  onLocationChange,
  initPositionAndZoom,
  showPinForLocation = true,
  showPinCentered = false,
  pins = [],
  onClickedPin
  // changeThePositionFromAuside
}: {
  onLocationChange: (
    lat: number,
    lng: number,
    address: string,
    zoom: number,
    postcode: string,
    city: string,
    country?: string
  ) => void;
  initPositionAndZoom?: {
    lat: number;
    lng: number;
    zoom: number;
    disableNavigation?: boolean;
  };
  showPinForLocation?: boolean;
  showPinCentered?: boolean;
  pins?: {
    lat: number;
    lng: number;
    zoom: number;
  }[];
  onClickedPin?: (pinIndex: number) => void
  // changeThePositionFromAuside?:(lat:number, lng:number, zoom: number)=>void
}) {
  /*const {
    location_map_lat,
    location_map_lng,
    location_map_address,
    setLocationMapLat,
    setLocationMapLng,
    setLocationMapAddress
  } = useMyListing();*/

  const position: [number, number] = [
    initPositionAndZoom?.lat || 39.95185892663005,
    initPositionAndZoom?.lng || -75.13000488281251,
  ]; // Minsk coordinates
  /*const icon = L.icon({
    iconUrl: 'path/to/your/icon.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });*/

  /*useEffect(() => {
    if (initPositionAndZoom === undefined) return;
    const map = useMap();
    map.setView([initPositionAndZoom.lat, initPositionAndZoom.lng], initPositionAndZoom.zoom);
  }, []);*/

  // 1. Convert your React element into an HTML string for Leaflet
  /*const customHtmlString = renderToStaticMarkup(
    <div className="icon-marker-center">
      {
        // <Image src={icon_pin} alt="Pin" width={40} height={40} />
      }
      <ZIcon type="pin-solid" />
    </div>,
  );

  // 2. Create the Leaflet DivIcon wrapper
  const movingCustomIcon = L.divIcon({
    html: customHtmlString,
    className: "custom-moving-pin", // Removes default white square box styles
    iconSize: [40, 40], // Matches the size layout of your element
    iconAnchor: [20, 40], // X (half width), Y (full height) so the tip points exactly to the coordinate
  });*/

  const [checkedPinIndex, setCheckedPinIndex] = useState(-1);

  return (
    <div
      className="map-wrap"
      style={{
        pointerEvents:
          initPositionAndZoom?.disableNavigation === true ? "none" : "auto",
      }}
    >
      <MapContainer
        zoomControl={false}
        center={position}
        zoom={initPositionAndZoom?.zoom || 15}
        style={{ height: "var(--route-map-height)", width: "100%" }}
      >
        {(
          initPositionAndZoom !== undefined && checkedPinIndex === -1
        ) && (
            <MapUpdater
              lat={initPositionAndZoom.lat}
              lng={initPositionAndZoom.lng}
              zoom={initPositionAndZoom.zoom}
            />
          )}
        {(
          checkedPinIndex !== -1
        ) && (
            <MapUpdater
              lat={pins[checkedPinIndex].lat}
              lng={pins[checkedPinIndex].lng}
              zoom={pins[checkedPinIndex].zoom}
            />
          )}

        {
          // this  show street labels
          /*
          <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
          */
        }
        {/* PASTE THIS CLEAN NO-LABELS LAYER INSTEAD */}
        {
          /*<TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
        />*/
        }

        <TileLayer
          attribution='Tiles &copy; Esri'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
        />
        {/*<Marker position={position} icon={icon}>
        <Popup>Kastrychnitskaya Street</Popup>
      </Marker>*/}

        {
          // 3. Render your pin securely pinned to the dynamic coordinates 
        }
        {
          /*showPinForLocation === true && <Marker position={position} icon={movingCustomIcon}>
            <Popup>Kastrychnitskaya Street</Popup>
          </Marker>*/
        }
        {
          pins && pins.map((pin, index) => {

            const movingIconNumbered = createNumberedIcon(index + 1, checkedPinIndex === index);

            return <Marker key={index} position={[pin.lat, pin.lng]} icon={movingIconNumbered}
              eventHandlers={{
                click: () => {
                  console.log('Pin clicked:', pin);
                  setCheckedPinIndex(index)
                  onClickedPin?.(index)
                }
              }}
            >
              {
                // <Popup>Kastrychnitskaya Street</Popup>
              }
            </Marker>
          })
        }


        {
          showPinCentered && <div className="icon-marker-center">
            {
              // <Image src={icon_pin} alt="Pin" />
            }
            <ZIcon type="pin-solid" />
          </div>
        }



        {/* <ZLeafletMapEvents
          onLocationChange={(lat, lng, address, zoom, city, postcode, country) => {
            onLocationChange(lat, lng, address, zoom, city, postcode, country);
          }}
        /> */}

        {initPositionAndZoom?.disableNavigation !== true && (

          <>
            {
              // <ZLeafletMapZoomButtons /
            }

          </>
        )}
      </MapContainer>
    </div>
  );
}
