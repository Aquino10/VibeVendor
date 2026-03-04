import { QRCodeSVG } from "qrcode.react";
import { Link } from "react-router-dom";
import type { ShopData } from "@/lib/store";

interface StorefrontFooterProps {
  shop: ShopData;
  shopUrl: string;
}

export function StorefrontFooter({ shop, shopUrl }: StorefrontFooterProps) {
  return (
    <footer className="border-t border-border py-14" style={{ backgroundColor: "hsl(40 20% 97%)" }}>
      <div className="container text-center">
        <div className="clay mx-auto mb-6 inline-block p-6">
          <QRCodeSVG id="shop-qr-code" value={shopUrl} size={120} bgColor="transparent" fgColor="hsl(0 0% 9%)" />
          <p className="mt-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Scan to visit this shop
          </p>
          <p className="mt-1 text-sm font-bold text-foreground">{shop.shopName}</p>
        </div>

        <p className="mt-4 text-sm font-bold text-foreground">{shop.shopName}</p>
        {shop.tagline && <p className="mt-1 text-xs italic text-muted-foreground">{shop.tagline}</p>}

        <p className="mt-6 text-xs text-muted-foreground">
          Powered by{" "}
          <Link to="/" className="font-bold text-primary hover:underline">
            VibeVendor 🧡
          </Link>
        </p>
      </div>
    </footer>
  );
}
