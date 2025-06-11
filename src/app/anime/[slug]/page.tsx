// Dynamic anime page by slug
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Anime {
  id: number;
  title: string;
  description: string;
  image: string;
  slug: string;
}

async function getAnime(slug: string): Promise<Anime | null> {
  try {
    // Replace with your Laravel backend API endpoint
    const res = await fetch(`http://localhost:8000/api/anime/${slug}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const anime = await getAnime(params.slug);
  return {
    title: anime ? anime.title : 'Anime Not Found',
    description: anime ? anime.description : 'Anime not found',
  };
}

export default async function AnimePage({ params }: { params: { slug: string } }) {
  const anime = await getAnime(params.slug);
  if (!anime) return notFound();

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{anime.title}</h1>
      <img src={anime.image} alt={anime.title} className="rounded-lg mb-6 w-full max-h-96 object-cover" />
      <div className="prose prose-lg text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: anime.description }} />
    </div>
  );
}
