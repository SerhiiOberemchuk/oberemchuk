import { Link } from "@/i18n/navigation";
import { Suspense } from "react";

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-3xl py-20 text-center">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 text-gray-600">
        The page you are looking for does not exist.
      </p>
      <div className="mt-8">
        <Suspense fallback={<div>Loading...</div>}>
          <Link href="/" className="text-green-600 hover:text-green-700">
            Back to home
          </Link>
        </Suspense>
      </div>
    </div>
  );
}
