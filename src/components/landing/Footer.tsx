import { Store, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12" style={{ backgroundColor: "hsl(var(--muted) / 0.1)" }}>
      <div className="container">
        <div className="flex flex-col items-center gap-6 text-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="clay-sm flex h-8 w-8 items-center justify-center bg-primary text-primary-foreground" style={{ borderRadius: "0.625rem" }}>
              <Store className="h-4 w-4" />
            </div>
            <span className="text-lg font-extrabold text-primary">VibeVendor</span>
          </Link>
          <p className="text-sm text-muted-foreground">Your shop, alive online.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-foreground">Terms</a>
            <a href="#" className="transition-colors hover:text-foreground">Contact</a>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3 text-primary" />
            Powered by AI
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
