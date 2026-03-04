import { MapPin, MessageCircle, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ShopData } from "@/lib/store";
import type { CategoryTheme } from "@/lib/category-theme";
import { categoryEmojis } from "@/lib/category-theme";

interface HeroBannerProps {
  shop: ShopData;
  theme: CategoryTheme;
  whatsappBase: string;
}

function BrandMark({ name, accentHex }: { name: string; accentHex: string }) {
  return (
    <div
      className="clay flex aspect-square w-full items-center justify-center text-[8rem] font-black text-white uppercase"
      style={{ backgroundColor: accentHex }}
    >
      {name.charAt(0)}
    </div>
  );
}

export function HeroBanner({ shop, theme, whatsappBase }: HeroBannerProps) {
  const scrollToProducts = () => {
    document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "hsl(40 20% 97%)" }}>
      {/* Diagonal accent */}
      <div
        className="absolute right-0 top-0 hidden h-full w-[45%] md:block"
        style={{ backgroundColor: theme.accentHex, clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)" }}
      />

      <div className="container relative z-10 grid min-h-[70vh] items-center gap-10 py-16 md:grid-cols-[1.4fr_1fr]">
        {/* Left */}
        <div className="animate-fade-up space-y-6">
          <span
            className="clay-pill inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white"
            style={{ backgroundColor: theme.accentHex }}
          >
            {categoryEmojis[shop.category] || "🛍️"} {shop.category}
          </span>

          <h1
            className="font-heading text-5xl font-black uppercase leading-[0.95] tracking-tight text-foreground md:text-7xl lg:text-8xl"
          >
            {shop.shopName}
          </h1>

          {shop.tagline && (
            <p className="max-w-lg text-lg italic text-muted-foreground">{shop.tagline}</p>
          )}

          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" /> {shop.location}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a href={`${whatsappBase}?text=${encodeURIComponent("Hello! I visited your shop.")}`} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="clay-button gap-2 text-white"
                style={{ backgroundColor: theme.accentHex }}
              >
                <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
              </Button>
            </a>
            <Button
              size="lg"
              variant="outline"
              className="clay-button gap-2 border-2"
              style={{ borderColor: theme.accentHex, color: theme.accentHex }}
              onClick={scrollToProducts}
            >
              See Our Products <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Right */}
        <div className="relative mx-auto w-full max-w-sm animate-fade-up md:max-w-none">
          {/* Decorative dots */}
          <div className="absolute -right-4 -top-4 grid grid-cols-3 gap-2 opacity-30">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-2 w-2 rounded-full" style={{ backgroundColor: theme.accentHex }} />
            ))}
          </div>
          <div className="absolute -bottom-3 -left-3 text-4xl opacity-20">✦</div>
          <div className="absolute -right-2 top-1/2 text-2xl opacity-20">★</div>

          <div className="clay overflow-hidden">
            {shop.shopLogo ? (
              <img src={shop.shopLogo} alt={shop.shopName} className="aspect-square w-full object-cover" />
            ) : (
              <BrandMark name={shop.shopName} accentHex={theme.accentHex} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
