import Image from "next/image";
import city_example from "@/assets/images/city-example.png";
import Title from "../typography/Title";
import ButtonDefault from "../buttons/ButtonDefault";
import { ICardCity } from "./SliderCities";




export default function CardCity({details={
  image_url: "",
  title: "Florence",
  subTitle: "20+ tours",
  link: "/"
}}:{details?:ICardCity}) {
  return (
    <>
      <div className="component card-city">
        <Image src={details.image_url? details.image_url : city_example} alt="City example" width={400} height={400} />
        <div className="content">
          <Title headingType="h4" headingStyle="Display-sm-Semibold" color="--color-text-fg">
            {details.title}
          </Title>
          <Title headingType="p" headingStyle="Text-lg-Medium" color="--color-text-fg-subtle">{details.subTitle}</Title>
          <ButtonDefault label="Explore Now" addArrowOnTheEnd={true} link={details.link} />
        </div>
      </div>
    </>
  );
}
