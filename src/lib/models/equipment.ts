export class Equipment {
  id: number;
  name: string;
  brand: string | null;
  description: string;
  selected: boolean;
  constructor(
    id: number,
    name: string,
    brand: string | null,
    description: string,
  ) {
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.description = description;
    this.selected = false;
  }
}
