import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  alt: string;
  className?: string;
  theme?: "light" | "dark";
  compact?: boolean;
};

function BrandMark({ alt, compact }: { alt: string; compact: boolean }) {
  return (
    <span
      className={cn(
        "relative flex shrink-0 items-center justify-center ",
        compact ? "h-10 w-10" : "h-11 w-11",
      )}
    >
      <Image
        src="/Logo.svg"
        alt={alt}
        fill
        sizes={compact ? "40px" : "44px"}
        className="rounded-xl object-cover object-center"
        priority
      />
    </span>
  );
}

export default function BrandLogo({
  alt,
  className,
  theme = "light",
  compact = false,
}: BrandLogoProps) {
  const isDark = theme === "dark";

  return (
    <span
      className={cn("inline-flex items-center gap-3", className)}
      aria-label={alt}
    >
      <BrandMark alt={alt} compact={compact} />

      {!compact ? (
        <span
          className={cn(
            "text-[0.78rem] font-semibold uppercase tracking-[0.28em]",
            isDark ? "text-white/78" : "text-[hsl(var(--foreground))]/78",
          )}
        >
          OBEREMCHUK
        </span>
      ) : null}
    </span>
  );
}
