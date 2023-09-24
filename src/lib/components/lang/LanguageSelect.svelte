<script lang="ts">
  import LL, { setLocale, locale } from "$lib/i18n/i18n-svelte";
  import type { Locales } from "$lib/i18n/i18n-types";
  import { loadLocaleAsync } from "$lib/i18n/i18n-util.async";
  import Cookies from "js-cookie";
  import LanguageRadio from "./LanguageRadio.svelte";
  import { Api } from "$lib/utils/api";
  import { authStatus } from "$lib/utils/auth";
  import { AuthStatus } from "$lib/enums/auth_status";

  async function updateUserSettings(newLocale: Locales) {
    try {
      const data = {
        user_language: {
          language: newLocale.toString(),
        },
      };
      await Api.request("PATCH", "change_language", data);
    } catch (error) {
      console.log(error);
    }
  }

  const switchLocale = async (newLocale: Locales) => {
    try {
      if (!newLocale || $locale === newLocale) return;

      // load new dictionary from server
      await loadLocaleAsync(newLocale);

      // select locale
      setLocale(newLocale);

      // update `lang` attribute
      const doc = document.querySelector<HTMLElement>("html");

      // change locally
      Cookies.set("language", newLocale);
      if (doc) {
        doc.setAttribute("language", newLocale);
      }

      //update user settings if logged in
      if ($authStatus == AuthStatus.authenticated) {
        updateUserSettings(newLocale);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = async (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    if (target.value) {
      await switchLocale(target.value as Locales);
    }
  };
</script>

<p class="mb-5 text-lg font-medium text-gray-900 dark:text-white">
  {$LL.ChooseLanguage}
</p>
<div class="grid gap-2 w-full md:grid-cols-5">
  <LanguageRadio {onChange} countryCode="en" name="🇬🇧 English" />
  <LanguageRadio {onChange} countryCode="fr" name="🇫🇷 Français" />
  <LanguageRadio {onChange} countryCode="hu" name="🇭🇺 Magyar" />
  <LanguageRadio {onChange} countryCode="de" name="🇩🇪 German" />
  <LanguageRadio {onChange} countryCode="es" name="🇪🇸 Español" />
  <LanguageRadio {onChange} countryCode="it" name="🇮🇹 Italiano" />
</div>
