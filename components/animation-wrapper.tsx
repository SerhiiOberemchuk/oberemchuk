import type {CSSProperties, ReactNode} from "react";
import {cn} from "@/lib/utils";

interface AnimationWrapperProps {
  children: ReactNode;
  animation: "fade-in" | "slide-up" | "slide-right" | "slide-left" | "scale";
  className?: string;
  delay?: number;
}

export default function AnimationWrapper({
  children,
  animation,
  className,
  delay = 0
}: AnimationWrapperProps) {
  const style =
    delay > 0
      ? ({"--inview-delay": `${delay}ms`} as CSSProperties)
      : undefined;

  return (
    <div
      className={cn("inview-reveal", `animate-${animation}`, className)}
      style={style}
    >
      {children}
    </div>
  );
}
