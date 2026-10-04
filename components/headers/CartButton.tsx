"use client";

import { Link } from "@/translations-engine/routing"
import ZIcon from "../icons/ZIcon"
import IconText from "../buttons/IconText"
import { useTranslations } from "next-intl";
import { useAppSelector } from "@/redux/hooks";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ON_CART_UPDATED } from "@/utils/window-events";
// import { count } from "console";
import { getApiData } from "@/utils/api";
// import { getCartSessionId } from "@/utils/cart-server";
import { IBokunCart } from "@/utils/interface-bokun";
import { getCartDetails } from "@/utils/cart";

export default function CartButton(
  {
    type
  }
    :
    {
      type: 'desktop' | "mobile"
    }
) {


  const pathName = usePathname();
  console.log("pathName:", pathName);
  const browser_id = useAppSelector((state) => state.auth.browser_user_id);
  // const dispatch = useAppDispatch();
  const tCommon = useTranslations("Common");

  // const [cartDetails, setCartDetails] = useState<IBokunCart | null>(null)

  const cart = useAppSelector((state) => state.booking.cart);
  const cartDetails = cart.cartDetails;

  const totalCount = () => {
    if (cartDetails === null) return 0;
    return cartDetails.activityBookings.length;
  }


  /*useEffect(() => {

    async function fetchCartCount() {

      const details = await getCartDetails(cart.cart_session_id);

      if (details.ok) {
        setCartDetails(details.detailsCart);
      }

      console.log("details cart:", details);

    }

    fetchCartCount();

    // 2. Listen for your custom add-to-cart event across the app
    window.addEventListener(ON_CART_UPDATED, fetchCartCount);

    // 3. Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener(ON_CART_UPDATED, fetchCartCount);
    };

  }, []);*/


  if (type === 'desktop')
    return <>
      <IconText
        type="header-link"
        text={tCommon("cart")}
        // iconSrc={iconCart.src}
        iconType="cart"
        href={`/ShoppingCart`}
        className={`${pathName === "/ShoppingCart" ? "active" : "not-active"}`}
        count={totalCount()}
      />
    </>
  return <>
    <Link className="cart-button" href={`/ShoppingCart`}>
      <ZIcon type="cart" count={totalCount()} />
    </Link>
  </>
}