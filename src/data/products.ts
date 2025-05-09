import type { Product } from '@/types';

export const sampleProducts: Product[] = [
  {
    id: '1',
    price: 12.99,
    image: 'https://picsum.photos/seed/pizza/400/300',
    imageHint: 'pepperoni pizza',
    translations: {
      en: { name: 'Pepperoni Pizza', description: 'Classic pepperoni pizza with a rich tomato sauce and mozzarella cheese.' },
      ru: { name: 'Пицца Пепперони', description: 'Классическая пицца пепперони с насыщенным томатным соусом и сыром моцарелла.' },
      uz: { name: 'Pepperoni Pitssa', description: 'Klassik pepperoni pitssasi boy tomat sousi va motsarella pishloqi bilan.' },
    },
  },
  {
    id: '2',
    price: 8.99,
    image: 'https://picsum.photos/seed/burger/400/300',
    imageHint: 'cheeseburger beef',
    translations: {
      en: { name: 'Cheeseburger', description: 'Juicy beef patty with cheddar cheese, lettuce, tomato, and special sauce.' },
      ru: { name: 'Чизбургер', description: 'Сочная говяжья котлета с сыром чеддер, салатом, помидором и специальным соусом.' },
      uz: { name: 'Chizburger', description: 'Chedder pishloqi, salat bargi, pomidor va maxsus sous bilan suvli mol go\'shtidan kotlet.' },
    },
  },
  {
    id: '3',
    price: 15.50,
    image: 'https://picsum.photos/seed/sushi/400/300',
    imageHint: 'sushi salmon',
    translations: {
      en: { name: 'Salmon Sushi Set', description: 'Fresh salmon sushi and rolls, served with soy sauce, wasabi, and ginger.' },
      ru: { name: 'Суши Сет с Лососем', description: 'Свежие суши и роллы с лососем, подаются с соевым соусом, васаби и имбирем.' },
      uz: { name: 'Lososli Sushi To\'plami', description: 'Yangi lososli sushi va rollar, soya sousi, vasabi va zanjabil bilan tortiladi.' },
    },
  },
  {
    id: '4',
    price: 10.75,
    image: 'https://picsum.photos/seed/pasta/400/300',
    imageHint: 'pasta carbonara',
    translations: {
      en: { name: 'Spaghetti Carbonara', description: 'Creamy spaghetti with pancetta, egg, and Parmesan cheese.' },
      ru: { name: 'Спагетти Карбонара', description: 'Сливочные спагетти с панчеттой, яйцом и сыром пармезан.' },
      uz: { name: 'Spagetti Karbonara', description: 'Panchetta, tuxum va Parmesan pishloqi bilan qaymoqli spagetti.' },
    },
  },
];
