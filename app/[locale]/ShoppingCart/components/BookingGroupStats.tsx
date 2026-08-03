import { Fragment } from "react/jsx-runtime";

export default function BookingGroupStats(
  {
    items,
    showOnlyOnDesktop,
    showOnlyOnMobile
  }
    :
    {
      items: (React.ReactNode | null)[],
      showOnlyOnDesktop?: boolean,
      showOnlyOnMobile?: boolean
    }
) {

  const itemsWithoutNulls = items.filter((item) => item !== null);

  return <>
    <div className={`group-stats-about-booking ${showOnlyOnDesktop ? 'show-only-on-desktop' : ''} ${showOnlyOnMobile ? 'show-only-on-mobile' : ''}`}>
      {itemsWithoutNulls.map((item, index) => {
        return <Fragment key={`booking-group-stat-${index}`}>
          {item}
          {index !== itemsWithoutNulls.length - 1 && <div className="divider" key={`booking-group-stat-divider-${index}`}></div>}
        </Fragment>
      })}
    </div>
  </>
}