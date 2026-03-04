import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/store";
import type { CategoryTheme } from "@/lib/category-theme";

interface ProductsGridProps {
  products: Product[];
  theme: CategoryTheme;
  whatsappBase: string;
}

function ProductInitial({ name, accentHex }: { name: string; accentHex: string }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center text-6xl font-black uppercase text-white"
      style={{ background: `linear-gradient(135deg, ${accentHex}, ${accentHex}dd)` }}
    >
      {name.charAt(0)}
    </div>
  );
}

export function ProductsGrid({ products, theme, whatsappBase }: ProductsGridProps) {
  return (
    <section id="products-section" className="py-20" style={{ backgroundColor: "hsl(40 20% 97%)" }}>
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-4xl font-black uppercase tracking-tight text-foreground md:text-5xl">
            WHAT WE OFFER
          </h2>
          <p className="mt-3 text-muted-foreground">Tap any product to order via WhatsApp</p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="clay group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 animate-fade-up"
              style={{
                borderTop: `4px solid ${theme.accentHex}`,
                animationDelay: `${index * 100}ms`,
                animationFillMode: "both",
              }}
            >
              {/* TOP PICK badge on first */}
              {index === 0 && (
                <div
                  className="clay-pill absolute right-3 top-3 z-20 animate-[spin-slow_8s_linear_infinite] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white"
                  style={{ backgroundColor: theme.accentHex }}
                >
                  ★ TOP PICK
                </div>
              )}

              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden" style={{ borderRadius: "1.25rem 1.25rem 0 0" }}>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <ProductInitial name={product.name} accentHex={theme.accentHex} />
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-heading text-lg font-black uppercase tracking-tight text-foreground">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xl font-black" style={{ color: theme.accentHex }}>
                    ₹{product.price.toLocaleString()}
                  </p>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>

                <a
                  href={`${whatsappBase}?text=${encodeURIComponent(`Hi! I'm interested in ${product.name} for ₹${product.price.toLocaleString()}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block"
                >
                  <Button
                    size="sm"
                    className="clay-button w-full gap-1.5 bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    <MessageCircle className="h-3.5 w-3.5" /> Order on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
