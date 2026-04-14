type EditorialOrbitProps = {
  className?: string
  accentClassName?: string
}

export default function EditorialOrbit({
  className = "",
  accentClassName = "text-[hsl(var(--primary))]"
}: EditorialOrbitProps) {
  return (
    <svg
      viewBox="0 0 420 420"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <defs>
        <linearGradient id="orbitFade" x1="50" y1="40" x2="360" y2="360" gradientUnits="userSpaceOnUse">
          <stop stopColor="currentColor" stopOpacity="0.95" />
          <stop offset="0.55" stopColor="currentColor" stopOpacity="0.24" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <g className={`origin-center ${accentClassName}`}>
        <circle cx="210" cy="210" r="152" stroke="url(#orbitFade)" strokeWidth="1.2" className="orbit-spin-slow" />
        <ellipse cx="210" cy="210" rx="182" ry="92" stroke="url(#orbitFade)" strokeWidth="1.1" className="orbit-spin-reverse" />
        <ellipse cx="210" cy="210" rx="112" ry="198" stroke="url(#orbitFade)" strokeWidth="1" className="orbit-spin-slower" />
        <path d="M56 252C94 162 162 118 246 124C316 128 366 172 384 242" stroke="url(#orbitFade)" strokeWidth="1.35" />
        <circle cx="132" cy="129" r="6" fill="currentColor" className="orbit-pulse" />
        <circle cx="307" cy="164" r="4" fill="currentColor" fillOpacity="0.75" className="orbit-pulse-delay" />
        <circle cx="246" cy="308" r="5" fill="currentColor" fillOpacity="0.84" className="orbit-pulse" />
        <circle cx="210" cy="210" r="14" fill="currentColor" fillOpacity="0.12" />
        <circle cx="210" cy="210" r="3.2" fill="currentColor" />
      </g>
    </svg>
  )
}
