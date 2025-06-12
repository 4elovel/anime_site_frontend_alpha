import type { Metadata } from "next";

export const dynamicParams = true;

export async function generateStaticParams() {
  // Optionally pre-render some anime pages at build time
  // You can fetch slugs from your backend here
  return [];
}

export const metadata: Metadata = {
  title: "Anime",
};

export default function AnimeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
