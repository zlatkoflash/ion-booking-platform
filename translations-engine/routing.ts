import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'it', 'fr', 'de'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

// Clean navigation helpers that manage locales automatically
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);