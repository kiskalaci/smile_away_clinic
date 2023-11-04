export class PriceListItem {
  id: number;
  name: string;
  brand: string;
  price: string;
  product_category: string;
  average_price: string;
  is_selected: boolean;

  constructor(
    id: number,
    name: string,
    price: string,
    brand: string,
    product_category: string,
    average_price: string,
    is_selected: boolean,
  ) {
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.price = price;
    this.product_category = product_category;
    this.average_price = average_price;
    this.is_selected = is_selected;
  }
}
