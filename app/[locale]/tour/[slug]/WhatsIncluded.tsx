import IconText from "@/components/buttons/IconText";
import Title from "@/components/typography/Title";
import { useTranslations } from "next-intl";

export default function WhatsIncluded(
  { items = [], additional_description = "" }
    :
    {
      items?: string[],
      additional_description?: string
    }
) {

  const t = useTranslations("Tour");
  const tCommon = useTranslations("Common");


  return <>
    <div className="what-is-included" data-section="section-whats-included">

      <Title headingType="h3" headingStyle="Display-xs-Medium" color="--color-text-fg">{tCommon("whats_included")}</Title>

      {
        items.length > 0 && <ul className="main-inclusions">
          {
            items.map((textItem, index) => {

              const labelTranslated = t(`inclusions.${textItem}`);

              if (labelTranslated && labelTranslated !== "")
                return <li key={index}>
                  <IconText type="four-tour-item-check" iconType="check" text={labelTranslated} />
                </li>

              return <li>
                <IconText key={index} type="four-tour-item-check" iconType="check" text={textItem} />
              </li>
            })
          }
        </ul>
      }

      {
        additional_description !== "" && <div className="additional-description" dangerouslySetInnerHTML={{ __html: additional_description }}></div>
      }


    </div>
  </>;
}