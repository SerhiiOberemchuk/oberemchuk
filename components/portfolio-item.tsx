import Image from "next/image";
import {Link} from "@/i18n/navigation";

interface PortfolioItemProps {
  imageSrc: string;
  title: string;
  category: string;
  slug: string;
}

export default function PortfolioItem({
  imageSrc,
  title,
  category,
  slug,
}: PortfolioItemProps) {
  return (
    <Link
      href={`/portfolio/${slug}`}
      className="group relative block overflow-hidden rounded-lg"
    >
      <article className="relative aspect-video w-full overflow-hidden rounded-lg">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          width={600}
          height={400}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2U5ZWFlZiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIi8+"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-6 opacity-0 transition-opacity group-hover:opacity-100">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-sm text-white/90">{category}</p>
        </div>
      </article>
    </Link>
  );
}
