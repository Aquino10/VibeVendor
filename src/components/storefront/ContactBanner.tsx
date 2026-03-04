import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CategoryTheme } from "@/lib/category-theme";

interface ContactBannerProps {
  theme: CategoryTheme;
  whatsappBase: string;
}

export function ContactBanner({ theme, whatsappBase }: ContactBannerProps) {
  return (
    <section className="relative overflow-hidden py-20 text-white" style={{ backgroundColor: "hsl(var(--foreground))" }}>
      {/* Decorative */}
      <span className="absolute left-6 top-6 font-serif text-[12rem] leading-none opacity-[0.04]">"</span>
      <span className="absolute bottom-6 right-6 font-serif text-[12rem] leading-none opacity-[0.04]">"</span>

      <div className="container relative z-10 text-center">
        <h2 className="font-heading text-4xl font-black uppercase tracking-tight md:text-6xl">
          READY TO ORDER?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-lg text-white/70">
          Message us directly on WhatsApp — we respond within minutes
        </p>
        <a
          href={`${whatsappBase}?text=${encodeURIComponent("Hello! I'd like to make an enquiry.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block"
        >
          <Button size="lg" className="clay-button gap-2 bg-emerald-600 px-10 text-lg text-white hover:bg-emerald-700 animate-pulse-warm">
            <MessageCircle className="h-5 w-5" /> Message Us on WhatsApp
          </Button>
        </a>
      </div>
    </section>
  );
}
