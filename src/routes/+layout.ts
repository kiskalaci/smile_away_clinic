import type { LayoutLoad } from "./$types";
import { loadLocaleAsync } from "$lib/i18n/i18n-util.async";
import { setLocale } from "$lib/i18n/i18n-svelte";
import { detectLocale } from "$lib/i18n/i18n-util";
import Cookies from "js-cookie";

export const load = (async (event) => {

  //!Language
  const lang: string = Cookies.get("language") ?? "en";
  Cookies.set("language", lang);
  const locale = detectLocale(() => [lang]);
  // Load it
  await loadLocaleAsync(locale);
  // Set it
  setLocale(locale);

  return event.data;
}) satisfies LayoutLoad;
