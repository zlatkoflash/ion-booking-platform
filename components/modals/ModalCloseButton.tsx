import ZIcon from "../icons/ZIcon";

export default function ModalCloseButton(
  {
    onClick,
    className
  }
    :
    {
      onClick?: () => void,
      className?: string
    }
) {
  return <>
    <div className={`modal-close-button ${className}`} onClick={onClick}>
      <ZIcon type="close" />
    </div>
  </>
}