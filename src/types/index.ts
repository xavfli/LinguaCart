
export type Language = 'en' | 'ru' | 'uz';

export interface ProductTranslation {
  name: string;
  description: string;
}

export interface Product {
  id: string;
  price: number;
  image: string;
  imageHint: string;
  translations: {
    [key in Language]: ProductTranslation;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Translations {
  [key: string]: string | Translations;
}

export interface LocaleMessages {
  en: Translations;
  ru: Translations;
  uz: Translations;
}
