"use client";

import { Dropdown } from "react-bootstrap";
// import { useRouter, usePathname } from "next/navigation";
import dropdownIcon from "@/assets/images/icon-arrow-menu-down.svg";
import IconText from "../buttons/IconText";
import { usePathname, useRouter } from "next/navigation";
// import { usePathname, useRouter } from "@/translations-engine/routing";

interface Language {
  code: string;
  label: string;
  flag: string;
}

export default function LanguageSwitcher() {
  const router = useRouter();
  const rawPathname = usePathname(); // Enforces immediate access to the current path string

  const languages: Language[] = [
    { code: "en", label: "Eng", flag: "🇬🇧" },
    { code: "it", label: "Ita", flag: "🇮🇹" },
    { code: "fr", label: "Fra", flag: "🇫🇷" },
    { code: "de", label: "Ger", flag: "🇩🇪" },
    // { code: "es", label: "Spa", flag: "🇪🇸" },
    /*{ code: "ro", label: "Rom", flag: "🇷🇴" },
    { code: "ru", label: "Rus", flag: "🇷🇺" },
    { code: "mk", label: "Mak", flag: "🇲🇰" },*/
  ];

  // 1. Parse the URL layout synchronously inside the main component block execution pass
  const segments = rawPathname ? rawPathname.split("/") : [];
  const detectedLocale = segments[1];

  // 2. Identify the matching language right away, completely eliminating state delay jumps
  const currentLang = languages.find((lang) => lang.code === detectedLocale) || languages[0];

  const handleLanguageChange = (nextLocale: string) => {
    // Extract all valid language codes (e.g., ['en', 'de', 'it', 'fr'])
    const localeCodes = languages.map((lang) => lang.code);

    // Create a regex that matches any existing locale at the start of the path (e.g., /it, /de, /fr)
    const localeRegex = new RegExp(`^/(${localeCodes.join("|")})(/|$)`);

    // Strip out any existing locale from the pathname
    const cleanPath = rawPathname.replace(localeRegex, "/");

    // Build the new path with the target locale
    // If cleanPath is just "/" or empty, make it "/[nextLocale]"
    const targetPath = `/${nextLocale}${cleanPath === "/" ? "" : cleanPath}`;

    console.log("Redirecting to:", targetPath);
    router.replace(targetPath);
  };

  return (
    <Dropdown className="component language-switcher" data-language={currentLang.code}>
      <Dropdown.Toggle variant="link">
        <IconText
          type="header-language-switcher"
          text={currentLang.label}
          iconType="globe"
        />
        <img
          className="arrow-dropdown"
          src={dropdownIcon.src}
          alt="Dropdown Arrow"
        />
      </Dropdown.Toggle>

      <Dropdown.Menu align="end" className="custom-menu">
        {languages.map((lang) => (
          <Dropdown.Item
            key={lang.code}
            active={currentLang.code === lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="d-flex align-items-center gap-2 custom-item"
          >
            <span className="flag-icon">{lang.flag}</span>
            <span>{lang.label}</span>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}