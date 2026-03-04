import { MapPin, MessageCircle, Store } from "lucide-react";

const PhoneMockup = () => {
  return (
    <div className="animate-float relative">
      <div className="relative mx-auto w-[280px] rounded-[2.5rem] border-[8px] border-foreground/10 bg-card p-1 shadow-warm-lg">
        <div className="absolute left-1/2 top-0 h-6 w-24 -translate-x-1/2 rounded-b-2xl bg-foreground/10" />
        <div className="overflow-hidden rounded-[2rem] bg-background">
          {/* Mini storefront preview */}
          <div className="bg-gradient-warm p-4 pb-6 text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/20">
              <Store className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="text-sm font-bold text-primary-foreground">Mama's Kitchen</h3>
            <p className="text-xs text-primary-foreground/80">Best jollof in town ✨</p>
          </div>
          <div className="space-y-3 p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> Lekki, Lagos
            </div>
            <div className="grid grid-cols-2 gap-2">
              {["Jollof Rice", "Fried Rice", "Pepper Soup"].map((item, i) => (
                <div key={i} className="rounded-lg bg-muted/50 p-2">
                  <div className="mb-1 flex h-10 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary">
                    {item[0]}
                  </div>
                  <p className="text-[10px] font-medium text-foreground">{item}</p>
                  <p className="text-[10px] font-bold text-secondary">₹2,500</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-1 rounded-lg bg-secondary py-2 text-xs font-medium text-secondary-foreground">
              <MessageCircle className="h-3 w-3" /> Chat on WhatsApp
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
