const testimonials = [
  {
    name: "Amaka O.",
    role: "Fashion Vendor, Lagos",
    quote: "I set up my shop in 4 minutes! My customers love how professional it looks.",
    initial: "A",
  },
  {
    name: "Chidi K.",
    role: "Food Vendor, Abuja",
    quote: "VibeVendor helped me reach new customers through WhatsApp. Sales are up 40%!",
    initial: "C",
  },
  {
    name: "Ngozi E.",
    role: "Beauty Products, Port Harcourt",
    quote: "The QR code on my packaging sends people straight to my online shop. So smart!",
    initial: "N",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="mb-14 text-center">
          <h2 className="mb-3 text-3xl font-extrabold text-foreground md:text-4xl">
            Loved by Vendors
          </h2>
          <p className="mx-auto max-w-md text-muted-foreground">
            Join hundreds of vendors already growing with VibeVendor
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={i} className="clay p-6">
              <p className="mb-4 text-sm italic text-muted-foreground">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="clay-pill flex h-10 w-10 items-center justify-center bg-primary/10 text-sm font-bold text-primary">
                  {t.initial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
