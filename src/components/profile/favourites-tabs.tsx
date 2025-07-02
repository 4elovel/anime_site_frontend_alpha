import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoveRight } from "lucide-react";

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
  {
    id: 3,
    title: "Революціонерка Утена",
    year: 1997,
    mediaType: "TV Series",
    imageUrl: "/assets/profile/mock-history-anime-card.png",
  },
  {
    id: 4,
    title: "Озирнись",
    year: 2006,
    mediaType: "Movie",
    imageUrl: "/assets/profile/mock-history-anime-card2.png",
  },
];

export default function FavouritesTabs({ isLoading }: { isLoading: boolean }) {
  return (
    <div className="hidden w-full flex-col md:flex">
      <Tabs
        className="flex w-full flex-col gap-12 bg-transparent text-white"
        defaultValue="anime"
      >
        <TabsList className="flex h-12 w-full flex-row justify-between border-none bg-transparent py-0">
          <div className="flex h-full max-w-sm flex-row gap-2.5 rounded-sm border border-white bg-transparent px-4 py-0 text-white">
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
          </div>
          <Button
            variant="secondary"
            size="icon"
            className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm border-2 border-white bg-transparent hover:bg-white"
          >
            <MoveRight className="h-6 w-6 text-white transition-colors group-hover:text-black" />
          </Button>
        </TabsList>
        <TabsContent
          value="anime"
          className="w-full border-none bg-transparent!"
        >
          <Card className="border-none bg-transparent! p-0 text-white!">
            <CardContent className="flex w-full flex-row gap-6 border-none bg-transparent! p-0">
              {animeList.map((anime) => (
                <FavouritesCard
                  key={anime.id}
                  imageUrl={anime.imageUrl}
                  title={anime.title}
                  year={anime.year}
                  mediaType={anime.mediaType}
                  isLoading={isLoading}
                />
              ))}
            </CardContent>
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
