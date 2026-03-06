import Image from "next/image";
import Link from "next/link";

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
    <article className="group relative overflow-hidden rounded-lg h-full">
      <Link
        href={`/portfolio/${slug}`}
        className="block h-full"
        aria-label={`Переглянути проєкт ${title}`}
      >
        <figure className="aspect-video w-full overflow-hidden rounded-lg h-full">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={title}
            width={600}
            height={400}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            priority
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2U5ZWFlZiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIi8+"
          />
          <figcaption className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100 flex flex-col justify-end p-6">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-sm text-white/80">{category}</p>
          </figcaption>
        </figure>
      </Link>
    </article>
  );
}

