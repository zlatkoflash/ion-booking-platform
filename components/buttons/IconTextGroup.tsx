import ZIcon, { ZIconType } from "../icons/ZIcon";

export default function IconTextGroup({
  icon,
  title,
  description,
}: {
  icon: ZIconType;
  title: string;
  description: string;
}) {
  return (
    <>
      <div className="component icon-texts-group">
        <div className="icon">
          <ZIcon type={icon} />
        </div>
        <div className="icon-content">
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
}
