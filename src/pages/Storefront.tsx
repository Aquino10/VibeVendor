import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { getShop, type ShopData } from "@/lib/store";
import { getCategoryTheme } from "@/lib/category-theme";
import confetti from "canvas-confetti";
import { Store, Sparkles, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreatorBar } from "@/components/storefront/CreatorBar";
import { HeroBanner } from "@/components/storefront/HeroBanner";
import { MarqueeBar } from "@/components/storefront/MarqueeBar";
import { AboutSection } from "@/components/storefront/AboutSection";
import { ProductsGrid } from "@/components/storefront/ProductsGrid";
import { ContactBanner } from "@/components/storefront/ContactBanner";
import { StorefrontFooter } from "@/components/storefront/StorefrontFooter";
import { MobileStickyWhatsApp } from "@/components/storefront/MobileStickyWhatsApp";

const Storefront = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const [shop, setShop] = useState<ShopData | null>(null);
  const isNew = searchParams.get("new") === "true";
  const isCreator = isNew;
  const shopUrl = window.location.origin + `/shop/${slug}`;

  useEffect(() => {
    if (slug === "demo-store") {
      setShop({
        slug: "demo-store",
        shopName: "Mama's Kitchen",
        category: "Food & Drinks",
        location: "Lekki, Lagos",
        whatsapp: "919876543210",
        tagline: "The best homemade Nigerian cuisine in Lekki — made with love, served with pride.",
        shopBio: "Welcome to Mama's Kitchen! We've been serving delicious homemade Nigerian dishes to the Lekki community for over 5 years. Every meal is prepared fresh with the finest local ingredients. From our famous jollof rice to our signature pepper soup, we guarantee a taste of home in every bite.",
        products: [
          { id: "1", name: "Jollof Rice", price: 2500, description: "Our award-winning jollof rice is slow-cooked with tomatoes, peppers, and a secret blend of spices. Served with your choice of protein — a true Nigerian classic." },
          { id: "2", name: "Pepper Soup", price: 3000, description: "A warming bowl of aromatic pepper soup made with fresh catfish and traditional herbs. Perfect for any weather — it's comfort in a bowl." },
          { id: "3", name: "Fried Plantain", price: 500, description: "Golden, crispy fried plantain slices — the perfect side dish or snack. Sweet, savory, and absolutely addictive." },
        ],
        createdAt: Date.now(),
      });
    } else if (slug) {
      setShop(getShop(slug));
    }
  }, [slug]);

  useEffect(() => {
    if (isNew && shop) {
      setTimeout(() => {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ["#F97316", "#EAB308", "#16A34A"] });
      }, 500);
    }
  }, [isNew, shop]);

  if (!shop) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: "#FAFAF7" }}>
        <div className="text-center">
          <Store className="mx-auto mb-4 h-12 w-12 text-[#78716C]" />
          <h1 className="mb-2 font-heading text-2xl font-black uppercase text-[#1C1917]">Shop Not Found</h1>
          <p className="mb-6 text-[#78716C]">This storefront doesn't exist or has been removed.</p>
          <Link to="/create"><Button>Create Your Own Shop</Button></Link>
        </div>
      </div>
    );
  }

  const theme = getCategoryTheme(shop.category);
  const whatsappBase = `https://wa.me/${shop.whatsapp.replace(/\D/g, "")}`;

  const handleDownloadQR = () => {
    const svg = document.getElementById("shop-qr-code");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      ctx?.drawImage(img, 0, 0, 512, 512);
      const a = document.createElement("a");
      a.download = `${shop.shopName}-qr.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="min-h-screen animate-fade-in" style={{ backgroundColor: "#FAFAF7" }}>
      {isCreator && <CreatorBar shopUrl={shopUrl} onDownloadQR={handleDownloadQR} />}

      <HeroBanner shop={shop} theme={theme} whatsappBase={whatsappBase} />
      <MarqueeBar shopName={shop.shopName} theme={theme} />
      <AboutSection shop={shop} />
      <ProductsGrid products={shop.products} theme={theme} whatsappBase={whatsappBase} />
      <ContactBanner theme={theme} whatsappBase={whatsappBase} />
      <StorefrontFooter shop={shop} shopUrl={shopUrl} />

      {/* Floating CTA for non-creators */}
      {!isCreator && (
        <div className="fixed bottom-0 left-0 right-0 z-40 hidden border-t border-[#E5E0D5] bg-white/95 backdrop-blur-md md:block">
          <div className="container flex items-center justify-between py-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" style={{ color: theme.accentHex }} />
              <span className="text-sm font-semibold text-[#1C1917]">Want your own shop?</span>
            </div>
            <Link to="/create">
              <Button size="sm" className="gap-1.5" style={{ backgroundColor: theme.accentHex }}>
                Create Free <ExternalLink className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Mobile sticky WhatsApp */}
      <MobileStickyWhatsApp whatsappBase={whatsappBase} />
    </div>
  );
};

export default Storefront;
