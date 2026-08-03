import ZIcon from "../icons/ZIcon";
import icon_close_big from '@/assets/images/icon-close-big.svg';

export default function ButtonClose(
  {
    onClick,
    className
  }
    :
    {
      onClick?: () => void,
      className?: string
    }) {
  return (
    <button className={`component btn btn-close btn-close-big ${className}`} onClick={onClick} type="button">
      {
        // <img src={icon_close_big.src} alt="Close" />
      }
      <ZIcon type="close" />
    </button>
  )
}