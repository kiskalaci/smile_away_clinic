export class Specialty {
  id: number;
  name: string;
  description?: string;
  selected: boolean;

  constructor(id: number, name: string, description?: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.selected = false;
  }

  static fromJson(item: object): Specialty {
    const map = new Map(Object.entries(item));
    const [first_key] = map.keys();
    const [first_value] = map.values();
    return new Specialty(parseInt(first_key), first_value, "");
  }
}
