import { useTranslations } from "next-intl";
import IconText from "../buttons/IconText";

export default function BlueGridIcons() {

  const tCommon = useTranslations("Common");

  return (
    <>
      <div className="component blue-grid-icons-wrapper">
        <IconText type="white-panel-title-subtitle" iconType="people" text={tCommon("small_groups")} subText={tCommon("small_groups_sub")} />
        <IconText type="white-panel-title-subtitle" iconType="person" text={tCommon("passionate_local_guides")} subText={tCommon("passionate_local_guides_sub")} />
        <IconText type="white-panel-title-subtitle" iconType="key-outline" text={tCommon("skip_the_line")} subText={tCommon("skip_the_line_sub")} />
        <IconText type="white-panel-title-subtitle" iconType="heart-outline" text={tCommon("authentic_responsible")} subText={tCommon("authentic_responsible_sub")} />
        <IconText type="white-panel-title-subtitle" iconType="calendar-outline" text={tCommon("flexible_worryfree")} subText={tCommon("flexible_worryfree_sub")} />
      </div>
    </>
  );
}