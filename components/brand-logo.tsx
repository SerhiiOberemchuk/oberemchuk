import { cn } from "@/lib/utils";

type BrandLogoProps = {
  alt: string;
  className?: string;
  theme?: "light" | "dark";
  compact?: boolean;
};

export default function BrandLogo({
  alt,
  className,
  theme = "light",
  compact = false
}: BrandLogoProps) {
  const isDark = theme === "dark";

  return (
    <span className={cn("inline-flex items-center gap-3", className)} aria-label={alt}>
      <span
        className={cn(
          "relative flex shrink-0 items-center justify-center border text-center",
          compact ? "h-10 w-10" : "h-11 w-11",
          isDark
            ? "border-white/16 bg-white/8 text-white"
            : "border-[rgba(45,34,24,0.12)] bg-[linear-gradient(135deg,rgba(255,249,243,0.98),rgba(230,215,199,0.92))] text-[hsl(var(--foreground))]"
        )}
      >
        <span className="font-[var(--font-display)] text-[1.55rem] leading-none tracking-[-0.08em]">
          SO
        </span>
      </span>

      {!compact ? (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-[var(--font-display)] text-[1.55rem] tracking-[-0.05em]",
              isDark ? "text-white" : "text-[hsl(var(--foreground))]"
            )}
          >
            Serhii
          </span>
          <span
            className={cn(
              "mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.24em]",
              isDark ? "text-white/54" : "text-[hsl(var(--muted-foreground))]"
            )}
          >
            Oberemchuk
          </span>
        </span>
      ) : null}
    </span>
  );
}
