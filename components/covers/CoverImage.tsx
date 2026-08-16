import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import ZPicture from "../illustrations/ZPicture";

export default function CoverImage({
  cover,
}: {
  cover: string | StaticImport;
}) {
  return (
    <>
      <div className="component cover">
        {/* <Image
          src={cover}
          alt="Walks In Town Hero"
          width={1920}
          height={1080}
        /> */}
        <ZPicture pictureUrl={cover} width={1920} height={1080} alt="Walks In Town Hero" paralaxEffect={"vertical-up-when-top-is-minus"} />
      </div>
    </>
  );
}
