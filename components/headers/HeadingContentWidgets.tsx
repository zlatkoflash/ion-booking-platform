export default function HeadingContentWidgets({
  children_content,
  children_widget,
  className = "",
  hideWidgetsOnMobile = false
}: {
  children_content?: React.ReactNode;
  children_widget?: React.ReactNode;
  className?: string;
  hideWidgetsOnMobile?: boolean;
}) {
  return (
    <>
      <div className={`component heading-content-widgets ${className} ${hideWidgetsOnMobile ? "hide-widgets-on-mobile" : ""}`}>
        <div className="content-wrap">{children_content}</div>
        <div className="widget-wrap">{children_widget}</div>
      </div>
    </>
  );
}
