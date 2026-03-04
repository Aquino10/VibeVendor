import { Link } from "react-router-dom";
import { Store } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 clay rounded-none border-b border-border/30">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="clay-sm flex h-9 w-9 items-center justify-center bg-primary text-primary-foreground" style={{ borderRadius: "0.75rem" }}>
            <Store className="h-5 w-5" />
          </div>
          <span className="text-xl font-extrabold text-primary">VibeVendor</span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <a href="#how-it-works" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            How It Works
          </a>
          <a href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Features
          </a>
          <Link to="/create">
            <Button size="sm" className="clay-button bg-primary text-primary-foreground">Create My Shop</Button>
          </Link>
        </div>
        <Link to="/create" className="md:hidden">
          <Button size="sm" className="clay-button bg-primary text-primary-foreground">Get Started</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
