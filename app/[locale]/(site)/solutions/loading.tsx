// The implicit Suspense boundary from loading.tsx lets unknown slugs resolve
// notFound() inside the PPR hole (404/noindex) instead of failing on-demand
// static generation with a 500. Mirrors services/loading.tsx.
export default function Loading() {
  return null;
}
