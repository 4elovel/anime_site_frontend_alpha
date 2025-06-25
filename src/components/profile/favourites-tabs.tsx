import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import FavouritesCard from "@/components/profile/favourites-card";

const animeList = [
  {
    id: 0,
    title: "Революціонерка Утена",
    year: 1997,
    mediaType: "TV Series",
    imageUrl: "/assets/profile/mock-history-anime-card.png",
  },
  {
    id: 1,
    title: "Озирнись",
    year: 2006,
    mediaType: "Movie",
    imageUrl: "/assets/profile/mock-history-anime-card2.png",
  },
  {
    id: 2,
    title: "Муміші",
    year: 2019,
    mediaType: "TV Series",
    imageUrl: "/assets/profile/mock-history-anime-card3.png",
  },
];

export default function FavouritesTabs() {
  return (
    <div className="flex w-full flex-col">
      <Tabs className="w-full bg-transparent text-white" defaultValue="anime">
        <TabsList className="flex h-12 w-full max-w-sm flex-row gap-2.5 border border-white bg-transparent px-4 py-0 text-white">
          <TabsTrigger
            className="hover:text-blue! rounded-sm text-white transition-colors aria-selected:bg-[#78788066]!"
            value="anime"
          >
            Аніме
          </TabsTrigger>
          <TabsTrigger
            className="hover:text-blue! text-white transition-colors aria-selected:bg-[#78788066]!"
            value="characters"
          >
            Персонажі
          </TabsTrigger>
          <TabsTrigger
            className="hover:text-blue! text-white transition-colors aria-selected:bg-[#78788066]!"
            value="collections"
          >
            Колекції
          </TabsTrigger>
        </TabsList>
        <TabsContent value="anime" className="w-full bg-transparent">
          <Card>
            <CardHeader>
              <CardTitle>Аніме</CardTitle>
              <CardDescription>
                Change your favourite anime here.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex w-full flex-row bg-transparent">
              {animeList.map((anime) => (
                <FavouritesCard
                  key={anime.id}
                  imageUrl={anime.imageUrl}
                  title={anime.title}
                  year={anime.year}
                  mediaType={anime.mediaType}
                />
              ))}
            </CardContent>
            <CardFooter>
              <Button>Save favourites</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="characters">
          <Card>
            <CardHeader>
              <CardTitle>Персонажі</CardTitle>
              <CardDescription>Change your characters here.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6"></CardContent>
            <CardFooter>
              <Button>Save character</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
