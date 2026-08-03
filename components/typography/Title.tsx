"use client";

import Link from "next/link";

export default function Title({
  children,
  headingType,
  headingStyle,
  color,
  className = "",
  href,
  onClick
}: {
  children: React.ReactNode;
  headingType: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "a" | "paragraphs" | "div" | "span";
  headingStyle?:
  | "default"
  | "Display-2xl-Medium"
  | "Display-md-Semibold"
  | "Text-lg-Regular"
  | "Display-sm-Semibold" | "Text-lg-Medium" | "Text-xl-Medium" | "Text-md-Regular" | "Text-sm-Regular"
  | "Text-xl-Semibold"
  | "Text-sm-Semibold"
  | "Display-sm-Medium"
  | "Display-xs-Medium"
  | "Text-md-Medium"
  | "Text-xs-CAPS"
  | "Text-sm-Medium"
  | "Text-xs-Regular"
  | "Text-lg-Semibold"
  | "Text-md-Semibold"
  | "Text-sm-Bold"
  | "Text-lg-Bold"
  | "Text-sm-CAPS";
  color?: "" | "--color-text-fg" | "--color-text-fg-subtle"
  | "--color-text-fg-on-accent"
  | "--color-text-fg-inverted"
  | "--color-text-fg-muted"
  | "--color-text-fg-error"
  | "--color-text-fg-success";
  className?: string;
  href?: string;
  onClick?: (e: any) => void
}) {
  const HeadingTagZ = headingType !== "paragraphs" ? headingType : "div";
  const classes = `component title ${headingType === "p" ? "paragraph" : ""} ${headingStyle || ""} ${className} title-${headingType}`;
  const style = {
    ...(color !== undefined && color !== ""
      ? {
        color: `var(${color})`,
      }
      : {}),
  };
  if (headingType === "a" && href !== undefined && href !== "") {
    return <Link href={href} className={classes} style={style} onClick={(e) => {
      onClick?.(e)
    }}>
      {children}
    </Link>
  }

  return (
    <HeadingTagZ
      className={classes}
      style={style}
      href={href}
      onClick={(e) => {
        onClick?.(e)
      }}
    >
      {children}
    </HeadingTagZ>
  );
}
