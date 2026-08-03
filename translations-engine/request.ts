import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // Use the full absolute alias so the bundler resolves it perfectly
  const [
    // home, 
    common, forms, validation, tour,
    templateHome,
    templateSearch
  ] = await Promise.all([
    // import(`@/translations-engine/messages/${locale}-home.json`).then((m) => m.default),
    import(`@/translations-engine/messages/${locale}-common.json`).then((m) => m.default),
    import(`@/translations-engine/messages/${locale}-forms.json`).then((m) => m.default),
    import(`@/translations-engine/messages/${locale}-validation.json`).then((m) => m.default),
    import(`@/translations-engine/messages/${locale}-tour.json`).then((m) => m.default),

    import(`@/translations-engine/messages/${locale}-template-home.json`).then((m) => m.default),
    import(`@/translations-engine/messages/${locale}-template-search.json`).then((m) => m.default),

  ]);

  return {
    locale,
    messages: {
      // Home: home,
      Common: common,
      Forms: forms,
      Validation: validation,
      Tour: tour,

      TemplateHome: templateHome,
      TemplateSearch: templateSearch,
    }
  };
});