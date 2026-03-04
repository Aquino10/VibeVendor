import { Share2, Download, Edit, BarChart3 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface CreatorBarProps {
  shopUrl: string;
  onDownloadQR: () => void;
}

export function CreatorBar({ shopUrl, onDownloadQR }: CreatorBarProps) {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shopUrl);
    toast({ title: "Link copied!", description: "Share it with your customers." });
  };

  return (
    <div className="bg-[#1C1917] text-white">
      <div className="container flex flex-wrap items-center justify-between gap-3 py-3">
        <p className="text-sm font-semibold tracking-wide">
          🎉 Your VibeVendor shop is <span className="uppercase">LIVE!</span>
        </p>
        <div className="flex gap-2">
          <Link to={`/shop/${slug}/pos`}>
            <Button size="sm" variant="outline" className="gap-1.5 border-primary/40 bg-primary/20 text-primary-foreground hover:bg-primary/30">
              <BarChart3 className="h-3.5 w-3.5" /> ScanKart POS
            </Button>
          </Link>
          <Button size="sm" variant="outline" className="gap-1.5 border-white/20 bg-transparent text-white hover:bg-white/10" onClick={handleCopyLink}>
            <Share2 className="h-3.5 w-3.5" /> Copy Link
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5 border-white/20 bg-transparent text-white hover:bg-white/10" onClick={onDownloadQR}>
            <Download className="h-3.5 w-3.5" /> Download QR
          </Button>
          <Link to="/create">
            <Button size="sm" variant="outline" className="gap-1.5 border-white/20 bg-transparent text-white hover:bg-white/10">
              <Edit className="h-3.5 w-3.5" /> Edit Shop
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
