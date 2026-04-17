import { cn } from "@/lib/utils";

type BrandLogoProps = {
  alt: string;
  className?: string;
  theme?: "light" | "dark";
  compact?: boolean;
};

function BrandMark({ isDark, compact }: { isDark: boolean; compact: boolean }) {
  const lightTone = "#FAF9F7";
  const accentTone = isDark ? "#D6B57A" : "#CCA86B";
  const bgTone = "#03050B";

  return (
    <span
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-[0.9rem]",
        compact ? "h-10 w-10" : "h-11 w-11",
        "shadow-[0_12px_30px_rgba(3,5,11,0.22)]"
      )}
      style={{ background: bgTone }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 64 64"
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="64" height="64" rx="14" fill={bgTone} />
        <text
          x="12.6"
          y="39.8"
          fill={lightTone}
          fontFamily="Cormorant Garamond, Georgia, Times New Roman, serif"
          fontSize="43"
          fontWeight="600"
          letterSpacing="-1.9"
        >
          S
        </text>
        <circle cx="40" cy="40.2" r="17.6" stroke={accentTone} strokeWidth="3.35" />
        <path
          d="M30.8 40.2L35 37.62V39.72L32.92 40.92L35 43.14V45.24L30.8 42.68V40.2ZM37.2 46.56L39.74 35.78H41.7L39.16 46.56H37.2ZM47.04 42.68L42.82 45.24V43.14L44.9 40.92L42.82 39.72V37.62L47.04 40.2V42.68Z"
          fill={accentTone}
        />
      </svg>
    </span>
  );
}

export default function BrandLogo({
  alt,
  className,
  theme = "light",
  compact = false
}: BrandLogoProps) {
  const isDark = theme === "dark";

  return (
    <span className={cn("inline-flex items-center gap-3", className)} aria-label={alt}>
      <BrandMark isDark={isDark} compact={compact} />

      {!compact ? (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-[var(--font-display)] text-[1.58rem] tracking-[-0.055em]",
              isDark ? "text-white" : "text-[hsl(var(--foreground))]"
            )}
          >
            Serhii
          </span>
          <span
            className={cn(
              "mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.28em]",
              isDark ? "text-white/54" : "text-[hsl(var(--foreground))]/54"
            )}
          >
            Oberemchuk
          </span>
        </span>
      ) : null}
    </span>
  );
}
