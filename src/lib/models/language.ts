export interface Language {
  id: number;
  name: string;
  is_selected: boolean;
}

export function getFlagFromLocale(locale: string): string {
  switch (locale) {
    case "en":
      return "🇬🇧";
    case "fr":
      return "🇫🇷";
    case "de":
      return "🇩🇪";
    case "hu":
      return "🇭🇺";
    default:
      return "";
  }
}
