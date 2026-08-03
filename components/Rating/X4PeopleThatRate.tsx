import person1 from "@/assets/images/person-1.png";
import person2 from "@/assets/images/person-2.png";
import person3 from "@/assets/images/person-3.png";
import person4 from "@/assets/images/person-4.png";
import Image from "next/image";

export default function X4PeopleThatRate({type="default"}:{type?:"default" | "for-the-banner"
}) {
  return (
    <div className={`component x4-people-that-rate ${type}`}>
      <div className="person">
        <Image
          src={person1}
          alt="Walk In Town Person 1"
          width={40}
          height={40}
        />
      </div>
      <div className="person">
        <Image
          src={person2}
          alt="Walk In Town Person 2"
          width={40}
          height={40}
        />
      </div>
      <div className="person">
        <Image
          src={person3}
          alt="Walk In Town Person 3"
          width={40}
          height={40}
        />
      </div>
      <div className="person">
        <Image
          src={person4}
          alt="Walk In Town Person 4"
          width={40}
          height={40}
        />
      </div>
    </div>
  );
}
