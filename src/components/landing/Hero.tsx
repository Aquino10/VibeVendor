import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import PhoneMockup from "./PhoneMockup";

const Hero = () => {
  return (
    <section className="bg-gradient-hero relative overflow-hidden py-16 md:py-24">
      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-up">
            <div className="clay-pill mb-4 inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              AI-Powered Storefronts
            </div>
            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Get Your Shop Online{" "}
              <span className="text-gradient-primary">in 5 Minutes</span>
            </h1>
            <p className="mb-8 max-w-lg text-lg text-muted-foreground">
              No tech skills needed. Just fill a form and VibeVendor builds your
              professional storefront instantly — powered by AI.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/create">
                <Button size="lg" className="clay-button gap-2 bg-primary text-primary-foreground text-base">
                  Create My Shop Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/shop/demo-store">
                <Button variant="outline" size="lg" className="clay-button text-base">
                  See Example Store
                </Button>
              </Link>
            </div>
          </div>
          <div className="animate-fade-up-delay-2 flex justify-center">
            <PhoneMockup />
          </div>
        </div>
      </div>
      {/* Decorative blobs */}
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
    </section>
  );
};

export default Hero;
