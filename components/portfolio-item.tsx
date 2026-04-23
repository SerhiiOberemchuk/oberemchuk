import Image from "next/image"
import { Link } from "@/i18n/navigation"

interface PortfolioItemProps {
  imageSrc: string
  title: string
  category: string
  slug: string
  description?: string
  highlights?: string[]
  variant?: "default" | "featured"
}

export default function PortfolioItem({
  imageSrc,
  title,
  category,
  slug,
  description,
  highlights = [],
  variant = "default"
}: PortfolioItemProps) {
  const isFeatured = variant === "featured"

  return (
    <Link href={`/portfolio/${slug}`} className="group block">
      <article className={`relative w-full overflow-hidden border border-[rgba(24,31,43,0.12)] bg-white shadow-[0_18px_44px_rgba(15,23,42,0.08)] transition-[box-shadow,border-color] duration-400 group-hover:border-[rgba(24,31,43,0.18)] group-hover:shadow-[0_28px_64px_rgba(15,23,42,0.14)] ${isFeatured ? "aspect-[16/11]" : "aspect-[4/3]"}`}>
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          width={600}
          height={400}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2U5ZWFlZiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIi8+"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[rgba(11,18,32,0.96)] via-[rgba(11,18,32,0.54)] to-transparent p-6">
          <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/74">{category}</p>
          <h3 className={`${isFeatured ? "text-3xl md:text-4xl" : "text-[1.75rem]"} text-white`}>{title}</h3>
          {description ? (
            <p className={`mt-3 max-w-xl text-sm leading-6 text-white/78 ${isFeatured ? "line-clamp-3" : "line-clamp-2"}`}>
              {description}
            </p>
          ) : null}
          {highlights.length > 0 ? (
            <ul className={`mt-4 flex flex-wrap gap-2 ${isFeatured ? "max-w-2xl" : "max-w-md"}`}>
              {highlights.slice(0, isFeatured ? 3 : 2).map((highlight) => (
                <li
                  key={highlight}
                  className="rounded-full border border-white/16 bg-white/10 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/86 backdrop-blur-sm"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </article>
    </Link>
  )
}
