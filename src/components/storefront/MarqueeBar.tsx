import type { CategoryTheme } from "@/lib/category-theme";

interface MarqueeBarProps {
  shopName: string;
  theme: CategoryTheme;
}

export function MarqueeBar({ shopName, theme }: MarqueeBarProps) {
  const items = theme.phrases.flatMap((phrase) => [
    shopName.toUpperCase(),
    phrase,
  ]);
  // Duplicate for seamless loop
  const track = [...items, ...items];

  return (
    <div className="overflow-hidden bg-[#1C1917] py-3">
      <div className="animate-marquee flex whitespace-nowrap">
        {track.map((text, i) => (
          <span key={i} className="mx-4 text-sm font-bold uppercase tracking-widest text-white">
            {text} <span style={{ color: theme.accentHex }} className="mx-3">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
