"use client"

import Image from "next/image";
import example_photo_1 from "@/assets/images/gallery-example-1.png";
import example_photo_2 from "@/assets/images/gallery-example-2.png";
import example_photo_3 from "@/assets/images/gallery-example-3.png";
import IconsTextInlineGroup from "../buttons/IconsTextInlineGroup";
import IconText from "../buttons/IconText";
import ButtonDefault from "../buttons/ButtonDefault";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import ButtonClose from "../buttons/ButtonClose";
import ButtonCircleArrow from "../buttons/ButtonCircleArrow";
import ZPicture from "../illustrations/ZPicture";
import { useTranslations } from "next-intl";


export default function GalleryTour(
  {
    photos = [],
    iconTextsLabels = null
  }
    :
    {
      photos?: { src: string, alt: string }[],
      iconTextsLabels?: React.ReactElement | null
    }
) {

  const tCommon = useTranslations("Common");


  const [lightboxOpen, setLightboxOpen] = useState(false);

  console.log("Gallery items:", photos);

  if (photos.length < 4) {
    return <>Gallery should have at least 4 images</>
  }

  return (
    <>
      <div className="component gallery-tour">


        <div className="photos-grid">
          <Image src={photos[0].src} alt={photos[0].alt} width={800} height={800} onClick={() => {
            setLightboxOpen(true)
          }} />
          <div className="right-x2-photos">
            <Image src={photos[1].src} alt={photos[1].alt} width={800} height={800} onClick={() => {
              setLightboxOpen(true)
            }} />
            <Image src={photos[2].src} alt={photos[2].alt} width={800} height={800} onClick={() => {
              setLightboxOpen(true)
            }} />
          </div>
        </div>
        <div className="photos-grid mobile">
          <Image src={photos[0].src} alt={photos[0].alt} width={800} height={800} onClick={() => {
            setLightboxOpen(true)
          }} />
          <div className="right-x3-photos">
            <Image src={photos[1].src} alt={photos[1].alt} width={800} height={800} onClick={() => {
              setLightboxOpen(true)
            }} />
            <Image src={photos[2].src} alt={photos[2].alt} width={800} height={800} onClick={() => {
              setLightboxOpen(true)
            }} />
            <Image src={photos[3].src} alt={photos[2].alt} width={800} height={800} onClick={() => {
              setLightboxOpen(true)
            }} />
          </div>
        </div>


        <IconsTextInlineGroup>
          {
            iconTextsLabels !== null && <>{iconTextsLabels}</>
          }
          {
            iconTextsLabels === null && <>
              <IconText text={tCommon("best_seller")} iconType="trophy-outline" type="card-city-label" />
              <IconText text={tCommon("booked_n_times_today", { n: 10 })} iconType="power-outline" type="card-city-label" />
            </>
          }
        </IconsTextInlineGroup>

        <ButtonDefault variant="light" label={tCommon("all_photo")} className="btn-view-all-photos" onClick={() => {
          setLightboxOpen(true)
        }} />

      </div>

      <GalleryLightbox photos={photos} show={lightboxOpen} onClickClose={() => {
        setLightboxOpen(false)
        console.log("Closing lightbox...");
      }} />
    </>
  )
}

export function GalleryLightbox(
  { photos, show, onClickClose, showNavigation = true }
    :
    { photos: { src: string, alt: string }[], show: boolean, onClickClose?: () => void, showNavigation?: boolean }) {

  const [activeIndex, setActiveIndex] = useState(0);
  // const refSwiper = useRef<any>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  // if(swiperInstance===null)return <></>

  return <>
    <div className={`component gallery-lightbox ${show ? 'show' : ''}`} onClick={(e) => {
      if (e.target === e.currentTarget) {
        onClickClose?.();
      }
    }}>
      <ButtonClose className="for-mobile" onClick={() => {
        onClickClose?.();
      }} />
      <div className="gallery-components-wrap">



        <div className="swiper-big-image-holder">
          <Swiper
            spaceBetween={0}
            effect={'fade'}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            loop={false} // when is true custom navigation do not work
            fadeEffect={{
              crossFade: true
            }}
            modules={[
              EffectFade,
              // Navigation, 
              // Pagination
            ]}
            className="swiper-big-images"
            onSlideChange={(swiper) => {
              console.log("swiper.activeIndex:", swiper.activeIndex, "swiper.realIndex:", swiper.realIndex);
              setActiveIndex(swiper.realIndex);
            }}
            onSwiper={(swiper) => { setSwiperInstance(swiper) }}
          // ref={refSwiper}

          >
            {
              photos.map((photo, index) => (
                <SwiperSlide key={index}>
                  <Image src={photo.src} alt={photo.alt} width={1500} height={1200} />
                </SwiperSlide>
              ))
            }
          </Swiper>

          <ButtonClose onClick={() => {
            onClickClose?.();
          }} />

          {
            showNavigation && <>
              <ButtonCircleArrow orientation="orientation-left" type="big-for-gallery-navigation" onClick={() => {
                swiperInstance.slidePrev();
              }} disabled={activeIndex === 0} />
              <ButtonCircleArrow orientation="orientation-right" type="big-for-gallery-navigation" onClick={() => {
                swiperInstance.slideNext();
              }} disabled={activeIndex === photos.length - 1} /></>
          }
        </div>




        {
          showNavigation && <div className="thumbnails-wrap">
            <Swiper
              slidesPerView={4}
              spaceBetween={0}
              // centeredSlides={true}
              pagination={{
                clickable: true,
              }}
              modules={[
                // Pagination
              ]}
              breakpoints={{
                0: {
                  slidesPerView: 3,
                  spaceBetween: 0
                },
                /**/
                700: {
                  slidesPerView: 4,
                  spaceBetween: 0
                },
                800: {
                  slidesPerView: 5,
                  spaceBetween: 0
                },
                900: {
                  slidesPerView: 6,
                  spaceBetween: 0
                },
                1000: {
                  slidesPerView: 7,
                  spaceBetween: 0
                },
                1100: {
                  slidesPerView: 8,
                  spaceBetween: 0
                },
                1200: {
                  slidesPerView: 10,
                  spaceBetween: 0
                }
              }}
              className="swiper-thumbnails"
            >
              {
                photos.map((photo, index) => (
                  <SwiperSlide key={index}>
                    <ZPicture pictureUrl={photo.src} alt={photo.alt} className={index === activeIndex ? "active" : ""} onClick={() => {
                      swiperInstance.slideTo(index);
                    }} />
                  </SwiperSlide>
                ))
              }
            </Swiper>



          </div>
        }



      </div>
    </div>
  </>
}