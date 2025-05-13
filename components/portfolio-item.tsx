import Image from "next/image"
import Link from "next/link"

interface PortfolioItemProps {
  imageSrc: string
  title: string
  category: string
  slug: string // Тепер slug є обов'язковим параметром
}

export default function PortfolioItem({ imageSrc, title, category, slug }: PortfolioItemProps) {
  return (
    <Link href={`/portfolio/${slug}`} className="group relative overflow-hidden rounded-lg">
      <div className="aspect-video w-full overflow-hidden rounded-lg">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          width={600}
          height={400}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100 flex flex-col justify-end p-6">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm text-white/80">{category}</p>
      </div>
    </Link>
  )
}
