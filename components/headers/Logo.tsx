import yellow_blue_logo from "@/assets/images/logo-header.svg";
import logo_white_logo from "@/assets/images/logo-footer.svg";
import logo_for_auth from "@/assets/images/logo-for-auth.svg";
import Link from "next/link";

export default function Logo({type="yellow-blue"}:{type?:"yellow-blue"|"yellow-white" | "for-auth"}) {

  const logoURL = ()=>{
    if(type==="yellow-blue") return yellow_blue_logo.src;
    else if(type=="for-auth")return logo_for_auth.src;
    return logo_white_logo.src;
  }

  return (
    <>
      <Link href="/" className="component logo">
        <img src={logoURL()} alt="WALKS IN TOWN" />
      </Link>
    </>
  );
}
