import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Store, Sparkles } from "lucide-react";

const messages = [
  "Writing your shop bio...",
  "Crafting product descriptions...",
  "Designing your storefront...",
  "Generating your QR code...",
  "Almost ready...",
];

const Generating = () => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const slug = searchParams.get("slug");

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (slug) navigate(`/shop/${slug}?new=true`);
    }, 5000);
    return () => clearTimeout(timer);
  }, [slug, navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="text-center">
        {/* Animated logo */}
        <div className="relative mx-auto mb-8">
          <div className="animate-pulse-warm mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-primary shadow-warm-lg">
            <Store className="h-12 w-12 text-primary-foreground" />
          </div>
          {/* Orbiting sparkles */}
          <div className="absolute inset-0" style={{ animation: "spin-slow 4s linear infinite" }}>
            <Sparkles className="absolute -top-2 left-1/2 h-5 w-5 -translate-x-1/2 text-accent" />
          </div>
          <div className="absolute inset-0" style={{ animation: "spin-slow 4s linear infinite reverse" }}>
            <Sparkles className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 text-primary" />
          </div>
          <div className="absolute inset-0" style={{ animation: "spin-slow 6s linear infinite" }}>
            <Sparkles className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary" />
          </div>
        </div>

        {/* Loading message */}
        <div className="h-8">
          <p
            key={msgIndex}
            className="animate-fade-up text-lg font-semibold text-foreground"
          >
            {messages[msgIndex]}
          </p>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Hang tight — your shop is being created ✨
        </p>

        {/* Progress dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2.5 w-2.5 rounded-full bg-primary"
              style={{
                animation: "pulse-warm 1.4s ease-in-out infinite",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Generating;
