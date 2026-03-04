import { Link, useLocation, useParams } from "react-router-dom";
import { Package, ShoppingCart, LayoutDashboard } from "lucide-react";

const tabs = [
  { label: "Inventory", icon: Package, path: "inventory" },
  { label: "Checkout", icon: ShoppingCart, path: "checkout" },
  { label: "Dashboard", icon: LayoutDashboard, path: "" },
];

export function BottomNav() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();

  const getPath = (tab: string) =>
    tab ? `/shop/${slug}/pos/${tab}` : `/shop/${slug}/pos`;

  const isActive = (tab: string) => {
    const full = getPath(tab);
    return location.pathname === full;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/30 bg-card/95 backdrop-blur-md">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const active = isActive(tab.path);
          return (
            <Link
              key={tab.label}
              to={getPath(tab.path)}
              className={`flex flex-col items-center gap-1 px-6 py-1.5 transition-colors ${
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className={`h-5 w-5 ${active ? "stroke-[2.5]" : ""}`} />
              <span className="text-[11px] font-semibold">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
