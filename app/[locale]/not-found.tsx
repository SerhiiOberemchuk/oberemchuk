import { Link } from "@/i18n/navigation";

import { Suspense } from "react";

export default function NotFoundPage() {
  return (
    <div className="container mx-auto max-w-3xl py-20 text-center">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Сторінку не знайдено
      </h1>
      <p className="mt-4 text-gray-600">Схоже, такої сторінки не існує.</p>
      <div className="mt-8">
        <Suspense fallback={<div>Завантаження...</div>}>
          <Link href="/" className="text-green-600 hover:text-green-700">
            На головну
          </Link>
        </Suspense>
      </div>
    </div>
  );
}
