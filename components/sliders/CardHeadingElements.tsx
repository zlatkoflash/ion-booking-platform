export default function CardHeadingElements(
  {
    leftContent, 
    rightContent,
    type="default"
  }:{
    leftContent?: React.ReactNode,
    rightContent?: React.ReactNode,
    type?: "default" | "heading-static"
}){
  return <>
    <div className={`component card-city-heading-elements ${type}`}>
      <div className="left-content">
        {
          leftContent?leftContent:<></>
        }
      </div>
      <div className="right-content">
        {rightContent?rightContent:<></>}
      </div>
    </div>
  </>
}