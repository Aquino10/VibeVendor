import { Sparkles, Globe, MessageCircle, QrCode } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Product Descriptions",
    description: "Professional copy written for you — no writing skills needed.",
  },
  {
    icon: Globe,
    title: "Instant Micro-Website",
    description: "A real webpage for your shop that looks premium and professional.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Contact Button",
    description: "Customers reach you in one tap — no app downloads required.",
  },
  {
    icon: QrCode,
    title: "QR Code Generator",
    description: "Bridge your offline shop to online with a scannable code.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20" style={{ backgroundColor: "hsl(var(--muted) / 0.15)" }}>
      <div className="container">
        <div className="mb-14 text-center">
          <h2 className="mb-3 text-3xl font-extrabold text-foreground md:text-4xl">
            Everything You Need
          </h2>
          <p className="mx-auto max-w-md text-muted-foreground">
            Powerful features to help your business thrive online
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {features.map((feature, i) => (
            <div
              key={i}
              className="clay group flex gap-4 p-6 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="clay-sm flex h-12 w-12 shrink-0 items-center justify-center bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground" style={{ borderRadius: "0.875rem" }}>
                <feature.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="mb-1 text-base font-bold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
