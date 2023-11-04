// export class Equipment {
//   id: number;
//   name: string;
//   brand: string | null;
//   description: string;
//   selected: boolean;
//   constructor(
//     id: number,
//     name: string,
//     brand: string | null,
//     description: string,
//   ) {
//     this.id = id;
//     this.name = name;
//     this.brand = brand;
//     this.description = description;
//     this.selected = false;
//   }
// }

export interface Equipment {
  id: number;
  name: string;
  brand: string;
  description: string;
  is_selected: boolean;
}
//  {
//         "id": 52,
//         "name": "Dental treatment unit",
//         "brand": null,
//         "description": "Der Zahnarztstuhl mit den dazugehörigen Geräten, Instrumente, Beleuchtung, Speibecken",
//         "is_selected": false
//     },
