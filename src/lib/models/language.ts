
export class Language {
    id: number;
    name: string;
    flag?: string;
    description?: string;
    selected: boolean;

    constructor(id: number, name: string, flag?: string, description?: string) {
        this.id = id;
        this.name = name;
        this.flag = flag;
        this.description = description;
        this.selected = false;
    };

    static fromJson(item: Object): Language {
        const map = new Map(Object.entries(item));
        const [first_key] = map.keys();
        const [first_value] = map.values();
        return new Language(
            parseInt(first_key),
            first_value,
            "",
            "",
        );
    }

    static getFlagFromLocale(locale: string): string {
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

}
