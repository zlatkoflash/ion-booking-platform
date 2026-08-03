import IconsTextInlineGroup from "@/components/buttons/IconsTextInlineGroup";
import IconText from "@/components/buttons/IconText";
import { IDBTourIncludeDetails } from "@/utils/interface-database";
import { useTranslations } from "next-intl";

export default function StatsForTour(
  {
    tour = null
  }
    :
    {
      tour?: IDBTourIncludeDetails | null
    }
) {

  const tCommon = useTranslations("Common");

  if (tour === null)
    return <>
      <IconsTextInlineGroup type="for-tour-stats">
        <IconText type="for-tour-stat" iconType="calendar-check-outline" text={tCommon("duration")} subText="1 hour and 30 minutes" />
        <IconText type="for-tour-stat" iconType="people" text={tCommon("group_size")} subText="Max 15 people" />
        <IconText type="for-tour-stat" iconType="time-wave-outline" text={tCommon("start_time")} subText="Multiple times" />
        <IconText type="for-tour-stat" iconType="globe" text="Offered in" subText="English +3" />
      </IconsTextInlineGroup>
    </>


  return <>
    <IconsTextInlineGroup type="for-tour-stats">
      <IconText type="for-tour-stat" iconType="calendar-check-outline" text={tCommon("duration")} subText={tour.duration_label} />
      <IconText type="for-tour-stat" iconType="people" text={tCommon("group_size")} subText="Max 15 people" />
      <IconText type="for-tour-stat" iconType="time-wave-outline" text={tCommon("start_time")} subText="Multiple times" />
      <IconText type="for-tour-stat" iconType="globe" text={tCommon("offered_in")} subText="English +3" />
    </IconsTextInlineGroup>
  </>
}