import { ClipboardList, Sparkles, Share2 } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Fill Your Shop Details",
    description: "Enter your shop name, products, and WhatsApp number in our simple form.",
  },
  {
    icon: Sparkles,
    title: "AI Builds Your Storefront",
    description: "Our AI writes compelling descriptions and creates your beautiful micro-website.",
  },
  {
    icon: Share2,
    title: "Share Your Link & QR Code",
    description: "Get a shareable link and QR code to send to customers instantly.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container">
        <div className="mb-14 text-center">
          <h2 className="mb-3 text-3xl font-extrabold text-foreground md:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto max-w-md text-muted-foreground">
            Three simple steps to get your business online
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={i}
              className="clay group relative p-8 text-center transition-all duration-300 hover:-translate-y-1 animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "both" }}
            >
              <div className="clay-pill absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center bg-primary text-sm font-bold text-primary-foreground">
                {i + 1}
              </div>
              <div className="clay-sm mx-auto mb-4 mt-2 flex h-14 w-14 items-center justify-center bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground" style={{ borderRadius: "1rem" }}>
                <step.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
