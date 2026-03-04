import { MapPin, CheckCircle2, MessageCircle } from "lucide-react";
import type { ShopData } from "@/lib/store";

interface AboutSectionProps {
  shop: ShopData;
}

export function AboutSection({ shop }: AboutSectionProps) {
  if (!shop.shopBio) return null;

  return (
    <section className="py-20" style={{ backgroundColor: "hsl(40 30% 94%)" }}>
      <div className="container">
        <div className="grid items-start gap-10 md:grid-cols-[auto_1fr]">
          {/* Left label */}
          <div className="hidden md:block">
            <h2
              className="font-heading text-[7rem] font-black uppercase leading-none tracking-tighter opacity-[0.06]"
              style={{ writingMode: "vertical-lr", color: "hsl(var(--foreground))" }}
            >
              OUR STORY
            </h2>
          </div>

          {/* Right content */}
          <div className="animate-fade-up max-w-2xl">
            <h2 className="mb-6 font-heading text-3xl font-black uppercase tracking-tight text-foreground md:hidden">
              OUR STORY
            </h2>

            <div className="clay relative p-6">
              <span className="absolute -left-2 -top-4 font-serif text-7xl leading-none text-foreground/10">
                "
              </span>
              <p className="text-lg leading-relaxed text-muted-foreground">{shop.shopBio}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="clay-pill inline-flex items-center gap-1.5 bg-card px-4 py-2 text-xs font-semibold text-foreground">
                <MapPin className="h-3.5 w-3.5" /> Based in {shop.location}
              </span>
              <span className="clay-pill inline-flex items-center gap-1.5 bg-card px-4 py-2 text-xs font-semibold text-foreground">
                <CheckCircle2 className="h-3.5 w-3.5" /> Quality Guaranteed
              </span>
              <span className="clay-pill inline-flex items-center gap-1.5 bg-card px-4 py-2 text-xs font-semibold text-foreground">
                <MessageCircle className="h-3.5 w-3.5" /> Fast Response
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
