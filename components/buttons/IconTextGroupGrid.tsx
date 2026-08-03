import IconTextGroup from "./IconTextGroup";
import { useTranslations } from "next-intl";

export default function IconTextGroupGrid() {

  const tCommon = useTranslations("Common");

  return (
    <>
      <div className="component icon-texts-group-grid">
        <IconTextGroup
          icon="heart-outline"
          title="150"
          description={tCommon("smiling_today")}
        />
        <IconTextGroup
          icon="check-circle"
          title="2,500"
          description={tCommon("last_month")}
        />
        <IconTextGroup
          icon="person"
          title="45,000+"
          description={tCommon("total_guests")}
        />
      </div>
    </>
  );
}
