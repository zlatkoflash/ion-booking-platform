"use client";

import React, { useState } from "react"; // 1. Added React import for forwardRef
import { Dropdown } from "react-bootstrap";
import IconText from "./IconText";
import { useTranslations } from "next-intl";

export default function ButtonShare(
  { hideTextOnMobile = false }
    :
    { hideTextOnMobile?: boolean }
) {
  // Safe extraction of current window location for SSR/Next.js safety
  const shareUrl = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";
  const shareText = typeof document !== "undefined" ? encodeURIComponent(document.title) : "Check this out!";
  const tForms = useTranslations("Forms")

  // Social Share Action Links
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
  const xTwitterUrl = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`;
  const whatsAppUrl = `https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`;
  const viberUrl = `viber://forward?text=${shareText}%20${shareUrl}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${shareText}&body=${shareUrl}`;
  const linkedInURL = `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`;

  // 2. Wrap your exact button inside a clean React.forwardRef handler
  const CustomToggle = React.forwardRef(({ children, onClick }: { children: React.ReactNode, onClick: any }, ref: any) => (
    <button
      className={`button-share type-icon-text-button button-share component button-subheader-share`}
      type="button"
      ref={ref} // Pass the ref down directly to your original button
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        onClick(e); // Triggers the dropdown open/close
      }}
    >
      <IconText type="subheader-share" text={tForms('share')} iconType="open-in-new-window-outline" hideTextOnMobile={hideTextOnMobile} />
    </button>
  ));

  const [isCopied, setIsCopied] = useState(false);

  return (
    <Dropdown>
      {/* React-Bootstrap uses your untouched component as the trigger trigger */}
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />

      {/* The overlay dropdown list menu */}
      <Dropdown.Menu>
        <Dropdown.Item href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
          <IconText type="subheader-back" text="WhatsApp" iconType="social-whatsapp" />
        </Dropdown.Item>

        {
          /*<Dropdown.Item href={viberUrl}>
          <IconText type="subheader-back" text="Viber" iconType="social-whatsapp" />
        </Dropdown.Item>*/
        }

        <Dropdown.Item href={xTwitterUrl} target="_blank" rel="noopener noreferrer">
          <IconText type="subheader-back" text="X / Twitter" iconType="social-x" />
        </Dropdown.Item>

        <Dropdown.Item href={facebookUrl} target="_blank" rel="noopener noreferrer">
          <IconText type="subheader-back" text="Facebook" iconType="social-facebook" />
        </Dropdown.Item>

        <Dropdown.Item href={linkedInURL} target="_blank" rel="noopener noreferrer">
          <IconText type="subheader-back" text="LinkedIn" iconType="social-linkedin" />
        </Dropdown.Item>



        <Dropdown.Item
          href={'#'}
          onClick={(e) => {
            e.preventDefault();
            // Get the current window's URL and copy it to the clipboard
            navigator.clipboard.writeText(window.location.href)
              .then(() => {
                // alert("Link copied to clipboard!"); // Optional: Replace with your UI toast/notification
                setIsCopied(true);
                setTimeout(() => {
                  setIsCopied(false);
                }, 2000);
              })
              .catch((err) => {
                console.error("Failed to copy link: ", err);
              });
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          {
            !isCopied && <IconText type="subheader-back" text="Copy link" iconType="approval" />
          }
          {
            isCopied && <IconText type="subheader-back" text="Copy link" iconType="check" />
          }
        </Dropdown.Item>


      </Dropdown.Menu>
    </Dropdown>
  );
}