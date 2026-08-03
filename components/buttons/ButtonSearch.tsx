import { Button } from "react-bootstrap";
import ZIcon from "../icons/ZIcon";

export default function ButtonSearch(
  {
    onClick,
    className = ""
  }
    :
    {
      onClick?: () => void;
      className?: string;
    }
) {
  return (
    <>
      <Button type="button" variant="primary" className={`component btn-search ${className}`} onClick={() => {
        onClick?.()
      }}>
        <ZIcon type="search" />
      </Button>
    </>
  );
}
