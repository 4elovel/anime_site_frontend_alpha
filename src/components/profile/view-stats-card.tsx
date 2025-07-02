import { AnimeChartRadial } from "@/components/profile/anime-chart-radial";
import { Card, CardContent } from "@/components/ui/card";

import { AnimeStatsBullet } from "@/components/profile/anime-stats-bullet";

import { Skeleton } from "@/components/ui/skeleton";

export function ViewStatsCard({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      {isLoading ? (
        <Skeleton className="h-50 w-full bg-stone-500 md:max-w-100" />
      ) : (
        <Card className="z-1 m-0 flex w-full bg-transparent px-3 py-0 md:max-w-100">
          <CardContent className="flex flex-row justify-around p-0! py-0!">
            <AnimeChartRadial isLoading={isLoading} />
            <div className="flex flex-col items-center justify-center gap-4">
              <AnimeStatsBullet
                text="Дивлюсь"
                number={7}
                circleColor="#2b94ab"
              />
              <AnimeStatsBullet
                text="Заплановано"
                number={13}
                circleColor="#ab872b"
              />
              <AnimeStatsBullet
                text="Закинуто"
                number={2}
                circleColor="#952828"
              />
              <AnimeStatsBullet
                text="Відкладено"
                number={0}
                circleColor="#5c5c5c"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
