export interface CategoryTheme {
  accent: string;       // HSL for CSS variable
  accentHex: string;    // Hex for inline usage
  accentBg: string;     // Tailwind class for bg
  accentText: string;   // Tailwind class for text
  accentBorder: string; // Tailwind class for border
  secondary: string;    // Complementary color hex
  phrases: string[];    // Marquee phrases
}

const themes: Record<string, CategoryTheme> = {
  "Food & Drinks": {
    accent: "0 84% 50%",
    accentHex: "#DC2626",
    accentBg: "bg-[#DC2626]",
    accentText: "text-[#DC2626]",
    accentBorder: "border-[#DC2626]",
    secondary: "#FFFBEB",
    phrases: ["FRESH DAILY", "ORDER NOW", "TASTE THE BEST", "MADE WITH LOVE"],
  },
  "Fashion & Clothing": {
    accent: "0 0% 6%",
    accentHex: "#0F0F0F",
    accentBg: "bg-[#0F0F0F]",
    accentText: "text-[#0F0F0F]",
    accentBorder: "border-[#0F0F0F]",
    secondary: "#FFC0CB",
    phrases: ["NEW ARRIVALS", "STAY STYLISH", "WEAR THE VIBE", "SHOP NOW"],
  },
  "Beauty & Wellness": {
    accent: "144 24% 40%",
    accentHex: "#4D7C5F",
    accentBg: "bg-[#4D7C5F]",
    accentText: "text-[#4D7C5F]",
    accentBorder: "border-[#4D7C5F]",
    secondary: "#FDE8E8",
    phrases: ["GLOW UP", "SELF CARE", "FEEL BEAUTIFUL", "SHOP NOW"],
  },
  Electronics: {
    accent: "226 71% 40%",
    accentHex: "#1D4ED8",
    accentBg: "bg-[#1D4ED8]",
    accentText: "text-[#1D4ED8]",
    accentBorder: "border-[#1D4ED8]",
    secondary: "#FFFFFF",
    phrases: ["TECH DEALS", "LATEST GADGETS", "SHOP SMART", "PLUG IN"],
  },
  "Home & Crafts": {
    accent: "22 64% 46%",
    accentHex: "#C2602A",
    accentBg: "bg-[#C2602A]",
    accentText: "text-[#C2602A]",
    accentBorder: "border-[#C2602A]",
    secondary: "#FFFBEB",
    phrases: ["HANDMADE", "CRAFTED WITH CARE", "HOME VIBES", "SHOP NOW"],
  },
  Agriculture: {
    accent: "143 61% 24%",
    accentHex: "#166534",
    accentBg: "bg-[#166534]",
    accentText: "text-[#166534]",
    accentBorder: "border-[#166534]",
    secondary: "#FDE68A",
    phrases: ["FARM FRESH", "FROM THE SOIL", "NATURALLY GROWN", "ORDER NOW"],
  },
  Other: {
    accent: "25 95% 53%",
    accentHex: "#F97316",
    accentBg: "bg-[#F97316]",
    accentText: "text-[#F97316]",
    accentBorder: "border-[#F97316]",
    secondary: "#FFFBEB",
    phrases: ["SHOP NOW", "BEST DEALS", "TOP QUALITY", "CHECK IT OUT"],
  },
};

export function getCategoryTheme(category: string): CategoryTheme {
  return themes[category] || themes["Other"];
}

export const categoryEmojis: Record<string, string> = {
  "Food & Drinks": "🍔",
  "Fashion & Clothing": "👗",
  Electronics: "📱",
  "Beauty & Wellness": "💅",
  "Home & Crafts": "🏠",
  Agriculture: "🌿",
  Other: "🛍️",
};
