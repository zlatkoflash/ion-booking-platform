import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

export default function CoverImage({
  cover,
}: {
  cover: string | StaticImport;
}) {
  return (
    <>
      <div className="component cover">
        <Image
          src={cover}
          alt="Walks In Town Hero"
          width={1920}
          height={1080}
        />
      </div>
    </>
  );
}
