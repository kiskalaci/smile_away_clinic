export interface price_list_skeleton {
  categories: category[];
}

export interface category {
  id: number;
  category_name: string;
  ancestry: number;
  product_category_languages: product_category_languages[];
  products: product[];
}

export interface product_category_languages {
  category_name: string;
  language: string;
  category_language_id: number;
}

export interface product {
  product_id: number;
  product_name: string;
  has_quantity: false;
  healing_period: number[];
  brands: brand[];
}

export interface product_languages {
  product_language_id: number;
  language: string;
  product_name: string;
  description: string;
  currency: string;
  average_price: string;
}

export interface brand {
  id: number;
  name: string;
  made_in: string;
  since: string;
}
