export default function CardCityFooter({leftChildren, rigthChildren}:{
  leftChildren?: React.ReactNode;
  rigthChildren?: React.ReactNode;
}) {
  return (
    <>
    <div className="component card-city-footer">
      <div className="left-content">{leftChildren}</div>
      <div className="right-content">{rigthChildren}</div>
    </div>
    </>
  );
}