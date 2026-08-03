"use client";

// import { useRouter } from "@/translations-engine/routing";
import { useRouter } from "next/navigation"; // here we use this, reason, we do not add new locale to the path
import { usePathname, useSearchParams } from "next/navigation";

export function updateUrlParam() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // This is your exact function, but it has native access to the hooks above
  return (paramName: string, paramValue: any, arrayPropsForUnset: string[] = []) => {
    const urlParams = new URLSearchParams(searchParams.toString());

    let finalValue: string;
    if (typeof paramValue === 'object' && paramValue !== null) {
      finalValue = JSON.stringify(paramValue);
    } else {
      finalValue = String(paramValue);
    }

    urlParams.set(paramName, finalValue);

    if (arrayPropsForUnset.length > 0) {
      arrayPropsForUnset.forEach((prop) => {
        urlParams.delete(prop);
      });
    }

    const newUrl = `${pathname}?${urlParams.toString()}`;

    // Updates the URL and fetches server data quietly in the background
    router.replace(newUrl, { scroll: false });
  };
}