import { MessageCircle } from "lucide-react";

interface MobileStickyWhatsAppProps {
  whatsappBase: string;
}

export function MobileStickyWhatsApp({ whatsappBase }: MobileStickyWhatsAppProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 block p-3 md:hidden">
      <a
        href={`${whatsappBase}?text=${encodeURIComponent("Hello! I'd like to make an enquiry.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="clay-button flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-4 text-base font-bold text-white shadow-lg animate-pulse-warm"
      >
        <MessageCircle className="h-5 w-5" /> Order on WhatsApp
      </a>
    </div>
  );
}
