import { useTranslations } from "next-intl";
import ZBadge from "../buttons/ZBadge";
import { capitalizeFirstLetter } from "@/utils/strings";

export default function PriceGroup({
  price,
  discountPercent = 0,
  currencySign = '€',
  type = 'standard',
  // originalValue,
  text = "",
  bolder = false,
  badgeText = "",
  className = ""
}: {
  price: number;
  discountPercent?: number;
  currencySign?: string;
  type?: 'standard' | 'discount' | 'per-person' | 'price-group-for-tour-page' | "cart-item" | "booking-item" | "shopping-cart-item";
  // originalValue?: number | string;
  text?: string;
  bolder?: boolean;
  badgeText?: string;
  className?: string;
}) {
  const formattedOriginalPrice = Number(price).toFixed(2);
  const formattedDiscountedPrice = discountPercent > 0 ? Number(Number(price) * (1 - discountPercent / 100)).toFixed(2) : null;

  const tCommon = useTranslations("Common");

  return (
    <div className={`component price-group-container ${className} ${type} ${bolder === true ? 'bolder' : ''} ${discountPercent > 0 ? 'is-discounted' : ''}`}>

      {/* FORMAT 1: "from €37.49" */}
      {type === 'standard' && (
        <>
          <span className="price-label-from">{tCommon("from")}</span>
          <span className="price-value-current">{currencySign}{formattedOriginalPrice}</span>
          {
            discountPercent > 0 &&
            <span className="price-value-discounted">{currencySign}{formattedDiscountedPrice}</span>
          }
        </>
      )}

      {
        type === "booking-item" && (
          <>

            <span className="price-label">{text}</span>
            <span className="price">{currencySign}{formattedOriginalPrice}</span>

          </>
        )
      }

      {/* FORMAT 2: "from €50.00" (crossed out) "and the price €38.99" */}
      {type === 'discount' && (
        <>
          <span className="price-label-from">{tCommon("from")}</span>
          <span className="price-value-original">{currencySign}{formattedOriginalPrice}</span>
          <span className="price-label-divider">{tCommon("and_the_price")}</span>
          <span className="price-value-discounted">{currencySign}{formattedDiscountedPrice}</span>
        </>
      )}

      {/* FORMAT 3: "From €37.49 per person" */}
      {(
        type === 'per-person'
      ) && (
          <>
            <span className="price-label-from-capitalize">{capitalizeFirstLetter(tCommon("from"))}</span>
            <span className="price-value-current">{currencySign}{formattedOriginalPrice}</span>
            <span className="price-label-per-person">{tCommon("per_person")}</span>
          </>
        )}

      {
        type === "price-group-for-tour-page"
        &&
        (
          <>
            <span className="price-label-from-capitalize">{capitalizeFirstLetter(tCommon("from"))}</span>
            <span className="price-value-current">{currencySign}{formattedOriginalPrice}</span>
            {
              discountPercent > 0 &&
              <span className="price-value-discounted">{currencySign}{formattedDiscountedPrice}</span>
            }
            <span className="price-label-per-person">{tCommon("per_person")}</span>
          </>
        )
      }

      {
        type === "cart-item" && (
          <>
            <span className="label">{text}</span>
            <span>
              {
                badgeText === "" && <span className="price">{currencySign}{formattedOriginalPrice}</span>
              }
              {
                discountPercent > 0 && <span className="price discounted">{currencySign}{formattedDiscountedPrice}</span>
              }
            </span>
            {
              badgeText !== "" ? <>
                <ZBadge label={badgeText} variant="success" type="cart-item-badge" />
              </> : <></>
            }

          </>
        )
      }

      {
        type === "shopping-cart-item" && (
          <>
            <span className="price">{currencySign}{formattedOriginalPrice}</span>
            {
              discountPercent > 0 && <span className="price discounted">{currencySign}{formattedDiscountedPrice}</span>
            }
          </>
        )
      }

    </div>
  );
}