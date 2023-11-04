import type { PriceListItem } from "./price_list_item";

export class PriceList {
  id: number;
  start_at: string;
  valid_until: string;
  price_list_items: PriceListItem[];
  constructor(
    id: number,
    start_at: string,
    valid_until: string,
    price_list_items: PriceListItem[],
  ) {
    this.id = id;
    this.start_at = start_at;
    this.valid_until = valid_until;
    this.price_list_items = price_list_items;
  }
}
