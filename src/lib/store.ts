export interface Product {
  id: string;
  name: string;
  price: number;
  note?: string;
  image?: string;
  description?: string;
}

export interface ShopData {
  slug: string;
  shopName: string;
  category: string;
  location: string;
  whatsapp: string;
  shopNote?: string;
  shopLogo?: string;
  products: Product[];
  tagline?: string;
  shopBio?: string;
  createdAt: number;
}

const SHOPS_KEY = "vibevendor_shops";
const API_KEY_KEY = "vibevendor_api_key";

export function generateSlug(name: string): string {
  const base = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const id = Math.random().toString(36).substring(2, 7);
  return `${base}-${id}`;
}

export function saveShop(data: ShopData): void {
  const shops = getAllShops();
  shops[data.slug] = data;
  localStorage.setItem(SHOPS_KEY, JSON.stringify(shops));
}

export function getShop(slug: string): ShopData | null {
  const shops = getAllShops();
  return shops[slug] || null;
}

export function getAllShops(): Record<string, ShopData> {
  try {
    return JSON.parse(localStorage.getItem(SHOPS_KEY) || "{}");
  } catch {
    return {};
  }
}

export function getApiKey(): string {
  return localStorage.getItem(API_KEY_KEY) || "";
}

export function setApiKey(key: string): void {
  localStorage.setItem(API_KEY_KEY, key);
}

export function generateAIContent(data: {
  shopName: string;
  category: string;
  location: string;
  shopNote?: string;
  products: { name: string; price: number; note?: string }[];
}): { tagline: string; shopBio: string; products: { name: string; description: string; price: number }[] } {
  const categoryPhrases: Record<string, string> = {
    "Food & Drinks": "delicious meals and refreshing beverages",
    "Fashion & Clothing": "stylish and trendy fashion pieces",
    "Electronics": "quality electronics and gadgets",
    "Beauty & Wellness": "premium beauty and wellness products",
    "Home & Crafts": "beautiful handcrafted items for your home",
    "Agriculture": "fresh farm produce and agricultural products",
    "Other": "quality products and services",
  };

  const phrase = categoryPhrases[data.category] || categoryPhrases["Other"];

  const taglines = [
    `Your trusted destination for ${phrase} in ${data.location}`,
    `Bringing you the finest ${phrase} — right here in ${data.location}`,
    `${data.location}'s favorite spot for ${phrase}`,
  ];

  const tagline = taglines[Math.floor(Math.random() * taglines.length)];

  const shopBio = data.shopNote
    ? `${data.shopName} is proud to serve the ${data.location} community. ${data.shopNote} We're passionate about delivering ${phrase} that our customers love. Visit us today and experience the difference!`
    : `Welcome to ${data.shopName} — your go-to destination for ${phrase} in ${data.location}. We take pride in offering quality products with excellent customer service. Whether you're a first-time visitor or a loyal customer, we're here to make your experience memorable.`;

  const productDescriptions = data.products.map((p) => {
    const descs = [
      `Our ${p.name} is carefully selected to meet the highest standards. ${p.note ? p.note + "." : ""} Perfect for those who value quality.`,
      `Discover the excellence of our ${p.name}. ${p.note ? p.note + "." : ""} A customer favorite that keeps people coming back.`,
      `Experience the best ${p.name} in ${data.location}. ${p.note ? p.note + "." : ""} Quality you can trust at a great price.`,
    ];
    return {
      name: p.name,
      description: descs[Math.floor(Math.random() * descs.length)],
      price: p.price,
    };
  });

  return { tagline, shopBio, products: productDescriptions };
}
